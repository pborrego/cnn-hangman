'use strict';

const Hapi = require('hapi');
const Podium = require('podium');


class Server extends Podium {
    constructor(type, options) {
        /* get access to parent `this` context */
        super(type);

        /* event type */
        this._type = type || '';

        /* process base path e.g. __dirname */
        this.basePath = options.basePath || process.cwd();

        this.host = options.host || '0.0.0.0';

        /* server connection port */
        this.port = options.port || 7416;

        /* hapi server instance */
        this.server = new Hapi.Server();
        this.server.connection({
            host: this.host,
            port: this.port,
        });
    }

    // get App
    static instance(type, options) {
        if (Server._instance === null || Server._instance === undefined) {
            Server._instance = new Server(type, options);
        }

        return Server._instance;
    }

    set routes(routes) {
        this.server.route(routes);
    }

    get cwd() {
        return this.basePath;
    }

    get hapi() {
        return this.server;
    }
}


module.exports = function init(type, options) {
    const server = Server.instance(type, options);
    return server;
};
