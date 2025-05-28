const crypto = require("crypto");

const charSets = {
  special: "!@#$%^&*()_+{}:\"'<>?|[];,./`~",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
};

function genratr(query) {
  const sets = [];
  let pool = "";

  // Build the character pool and active sets
  for (const key in query) {
    if (charSets[key]) {
      const set = charSets[key];
      sets.push(set);
      pool += set;
    }
  }

  if (sets.length === 0) return null;

  let length = parseInt(query.length, 10);
  if (!Number.isInteger(length) || length <= 0) length = 12;
  length = Math.max(sets.length, Math.min(length, 100)); // enforce valid range

  const password = new Array(length);

  // One char from each set to guarantee diversity
  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    password[i] = set[crypto.randomInt(set.length)];
  }

  // Fill remaining slots with any char from the full pool
  for (let i = sets.length; i < length; i++) {
    password[i] = pool[crypto.randomInt(pool.length)];
  }

  // Shuffle using Fisher-Yates (in-place)
  for (let i = password.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}

module.exports = genratr;
