const charSets = {
  special: "!@#$%^&*()_+{}:\"'<>?|[];,./`~", // Set of special characters
  lowercase: "abcdefghijklmnopqrstuvwxyz", // Set of lowercase letters
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Set of uppercase letters
  numbers: "0123456789", // Set of numbers
};

function genratr(query) {
  const s = Object.keys(query) // Extract selected character sets from query
    .filter((p) => charSets[p]) // Filter out invalid keys
    .map((p) => charSets[p]) // Retrieve the character sets
    .join(""); // Combine selected sets into a single string

  if (!s) return null; // If no valid character sets, return null

  let l = parseInt(query.length) || 12; // Retrieve desired length or set default to 12
  l = Math.min(l, 100); // Ensure length is not more than 100

  return Array.from(
    { length: l },
    () => s[Math.floor(Math.random() * s.length)] // Generate a random character from the combined set
  ).join(""); // Combine the random characters into a string of the desired length
}

module.exports = genratr; // Export the genratr function
