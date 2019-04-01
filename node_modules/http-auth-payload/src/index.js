'use strict';

function httpAuthPayload(req, res, next) {
    req.auth = parseRequest(req);

    if (req.auth.type === 'none') {
        req.hasAuth = false;
    }
    else {
        req.hasAuth = true;
    }

    next();
}

function parse(value) {
    if (! value.length) {
        return {
            type: 'none',
            payload: '',
        };
    }

    var parts = value.split(' ');

    if (parts.length < 2) {
        return {
            type: parts[0],
            payload: '',
        };
    }

    var type = parts.shift().toLowerCase();
    var payload = parts.join(' ');

    return {type, payload};
}

function parseRequest(request) {
    var authorization;
    if (request.headers.hasOwnProperty('authorization')) {
        authorization = request.headers.authorization;
    }
    else {
        authorization = '';
    }

    return parse(authorization);
}

module.exports = httpAuthPayload;

httpAuthPayload.parse = parse;
httpAuthPayload.parseRequest = parseRequest;
