'use strict';

const path = require('path');
const { Readable } = require('stream');
const joi = require('joi');
const boom = require('boom');
const content = require('content');

module.exports = {
    method : 'POST',
    path   : '/cats',
    config : {
        description : 'Upload a cat',
        tags        : ['feline', 'animal'],
        payload     : {
            output   : 'stream',
            allow    : 'multipart/form-data',
            parse    : true,
            maxBytes : 20000000
        },
        validate : {
            payload : {
                description : joi.string().required().min(3).max(100),
                image       : joi.object().required().type(Readable).description('Image file')
            }
        },
        response : {
            schema : joi.string().required()
        }
    },
    handler(request) {
        const { image, description } = request.payload;
        const fileType = content.type(image.hapi.headers['content-type']).mime;
        const isAllowedType = ['image/png'].includes(fileType);
        const isAllowedExt = ['.png'].includes(path.extname(image.hapi.filename));

        if (!isAllowedType || !isAllowedExt) {
            throw boom.unsupportedMediaType();
        }

        return `A ${description} in ${image.hapi.headers['content-type']} format`;
    }
};
