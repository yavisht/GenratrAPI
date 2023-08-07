# GenratrAPI

<strong></strong>
GenratrAPI is a simple web service built using Node.js and Express that allows you to generate random passwords with varying degrees of complexity. You can customize the password strength by specifying the character sets you want to include (special characters, lowercase letters, uppercase letters, and numbers) and the desired password length.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Getting Started

1. Start the server by running `npm start` or `node app.js`.
2. The server will listen on port 8080 by default. You can change the port by setting the `PORT` environment variable.

## Installation

### Clone this repo

```bash
git clone <this-repo>
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm start
```

## API Endpoints

### Generate a Random Password

- **URL:** `/`
- **Method:** GET

#### Query Parameters

- `special`: Include special characters in the password.
- `lowercase`: Include lowercase letters in the password.
- `uppercase`: Include uppercase letters in the password.
- `numbers`: Include numbers in the password.
- `length`: Desired length of the password (integer, default is 12).

### Invalid Request

Trying to generate a password without specifying any strength settings:

```bash
curl "http://localhost:8080/?length=10"
```

#### Response

```json
{
  "error": "Invalid request"
}
```

### Sample Request

Generate a password with specific settings (20 characters, includes special characters, lowercase and uppercase letters, and numbers):

```bash
curl "http://localhost:8080/?special&lowercase&uppercase&numbers&length=20"
```

#### Response

```json
{
  "password": "ZTd,BCsj2.$uk^4}!R%5"
}
```

## Function Usage

`genratr` provides a function that generates random passwords based on your preferences. You can specify which types of characters to include in the password.

Here's how you can use the `genratr` function in your project:

1. Import the `genratr` function

```javascript
const genratr = require("./lib/genratr");
```

2. Call the `genratr` function with an object containing your preferences. You can specify the character sets you want to include and the desired length of the password. For example:

```javascript
const passwordOptions = {
  special: true, // Include special characters
  lowercase: true, // Include lowercase letters
  uppercase: true, // Include uppercase letters
  numbers: true, // Include numbers
  length: 16, // Set the desired password length (optional, defaults to 12)
};

const password = genratr(passwordOptions);
console.log("Generated Password:", password);
```

## Sample Frontend

```html
<form action="/" method="get">
  <label> <input type="checkbox" name="special" /> Special characters </label>
  <label>
    <input type="checkbox" name="lowercase" /> Lowercase characters
  </label>
  <label>
    <input type="checkbox" name="uppercase" /> Uppercase characters
  </label>
  <label> <input type="checkbox" name="numbers" /> Numbers </label>
  <label>
    Length:
    <input type="number" name="length" value="12" />
  </label>
  <button type="submit">Generate Password</button>
</form>
<p>Password: <span id="password"></span></p>

<script>
  const form = document.querySelector("form");
  const passwordSpan = document.getElementById("password");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();
    const response = await fetch(`/?${params}`);
    const data = await response.json();

    passwordSpan.textContent = data.password;
  });
</script>
```
