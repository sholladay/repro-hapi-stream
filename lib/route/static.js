'use strict';

module.exports = {
    method  : 'GET',
    path    : '/static/{file*}',
    handler : {
        directory : {
            path            : '.',
            redirectToSlash : true
        }
    }
};
