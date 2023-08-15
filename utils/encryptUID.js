// // import CryptoJS from "crypto-js";
// const CryptoJS = require("crypto-js");
// require("dotenv").config({ path: "../.env" });

// const secretKey = process.env.secretKey;

// // function encryptUID(uid) {
// //   const encryptedUID = CryptoJS.AES.encrypt(uid, secretKey).toString();
// //   return encryptedUID;
// // }

// // function decryptUID(encryptedUID) {
// //   const decryptedBytes = CryptoJS.AES.decrypt(encryptedUID, secretKey);
// //   const decryptedUID = decryptedBytes.toString(CryptoJS.enc.Utf8);
// //   return decryptedUID;
// // }

// module.exports = {
//   encryptUID: (uid) => {
//     const encryptedUID = CryptoJS.AES.encrypt(uid, secretKey).toString();
//     return encryptedUID;
//   },
//   decryptUID: (encryptUID) => {
//     const decryptedBytes = CryptoJS.AES.decrypt(encryptedUID, secretKey);
//     const decryptedUID = decryptedBytes.toString(CryptoJS.enc.Utf8);
//     return decryptedUID;
//   },
// };

// // const originalUID = "GYVQ5CJAHkQU6hz53HDAANmM7q63";

// // const encryptedUID = encryptUID(originalUID);
// // console.log("Encrypted UID:", encryptedUID);

// // const decryptedUID = decryptUID(encryptedUID);
// // console.log("Decrypted UID:", decryptedUID);
