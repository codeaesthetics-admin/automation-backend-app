var admin = require("firebase-admin");

var serviceAccount = require("../utils/quotely-320f9-firebase-adminsdk-6iks2-d76d7dc254.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
module.exports = admin