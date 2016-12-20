'use strict';

const _server = require('./init')('hangman', {
    port: 3000
});
const app = _server.hapi;
const debug = require('debug')('hangman:start');



app.register([require('inert'), require('vision'), require('nes')], (error) => {
    if (error) {
        debug('Application failed to register dependencies: %s', error);
        process.exit(1);
    }
    app.route(require('./routes'));
});



app.start((error) => {
    if (error) {
        debug('Application failed to start: %s', error);
        process.exit(1);
    }
    debug(`Server running at ${app.info.uri}`);
});
