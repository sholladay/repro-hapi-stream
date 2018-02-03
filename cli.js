#!/usr/bin/env node

// TODO: Use port-drop when it becomes viable.
// https://github.com/hapijs/hapi/issues/3204

'use strict';

// Fail fast if a rejected promise is not caught.
require('throw-rejects')();

const cli = require('meow')();

const server = require('.');

server(cli.flags).then(async (app) => {
    await app.start();
    console.log('Server ready at:', app.info.uri);
});
