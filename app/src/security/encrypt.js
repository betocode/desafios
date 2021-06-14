// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

// async function encrypt(textToBeEncrypted) {
//   const hash = await bcrypt.hash(textToBeEncrypted, saltRounds);
//   return hash;
// }
// async function compareEncrypt(text, encryptedText) {
//   const result = await bcrypt.compare(text, encryptedText);
//   return result;
// }

const crypto = require("crypto");

const key = Buffer.from("abcd1234abcd1234abcd1234abcd1234", "utf-8");
const iv = Buffer.from("abcd1234abcd1234", "utf-8");

function encrypt(text) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

function decrypt(text) {
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key),
    Buffer.from(iv.toString("hex"), "hex")
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
