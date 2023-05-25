/**
 * Module dependencies.
 */

import { app } from './app.js';
import http from 'http';

/**
 * Get port from environment and store in Express.
 */
const PORT = process.env.PORT || '3000'
app.set('port', PORT);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT);
// server.on('listening', onListening);
console.log('Listening on ' + PORT + "...");
