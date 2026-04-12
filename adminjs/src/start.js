import 'dotenv/config';
// P1-66: Sentry must be imported before all other modules so it can
// instrument Node.js built-ins for automatic error capture.
import './instrument.js';
import './server.js';
