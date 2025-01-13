
console.log("token handler")
// if (access_token) {
//   window.location.href = "landingpage.html";
// }


const jwt = require('jsonwebtoken');
console.log(jwt)
const token = localStorage.getItem("token");
const secret = "your_secret_key";

// try {
//     const decoded = jwt.verify(token, secret);
//     console.log("Token is valid:", decoded);
// } catch (err) {
//     if (err.name === "TokenExpiredError") {
//         console.log("Token is expired.");
//     } else {
//         console.log("Token is invalid:", err.message);
//     }
// }