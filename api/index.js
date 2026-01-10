import('../dist/index.cjs').then(m => module.exports = m.default || m);

// This tells Vercel to run your Express app as a serverless function
const app = require('../dist/index.cjs');

module.exports = app;