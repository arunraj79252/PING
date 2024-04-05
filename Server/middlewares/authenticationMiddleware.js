const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('../configs/firebaseServiceAccount/ping-c18f7-firebase-adminsdk-126bw-13c39d9dfa.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Middleware function to verify authentication token
async function verifyAuthToken(req, res, next) {
    const authToken = req.headers.authorization;
    try {
        const decodedToken = await admin.auth().verifyIdToken(authToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying auth token:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}
module.exports = verifyAuthToken;