'use strict';

const path = require('path');
const portType = require('port-type');
const joi = require('joi');
const hapi = require('hapi');
const inert = require('inert');

/* eslint-disable global-require */
const routes = [
    require('./lib/route/static'),
    require('./lib/route/home'),
    require('./lib/route/cats')
];
/* eslint-enable global-require */

const provision = async (option) => {
    const port = joi.number().integer().min(0).max(65535);
    const config = joi.attempt(option, joi.object().required().keys({
        port : port.default(portType.haveRights(443) ? 443 : 3000)
    }));

    const server = hapi.server({
        debug : {
            log     : ['error'],
            request : ['error']
        },
        routes : {
            validate : {
                // See: https://github.com/hapijs/hapi/issues/3706
                failAction : (request, h, err) => {
                    throw err;
                }
            },
            files : {
                relativeTo : path.join(__dirname, 'lib', 'static')
            }
        },
        host   : 'localhost',
        port   : config.port
    });

    await server.register([
        inert
    ]);

    server.route(routes);

    return server;
};

module.exports = provision;
