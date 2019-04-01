# HTTP Authorization Payload Middleware

Parse authorization http header and add auth information into request object.

![Build](https://img.shields.io/travis/rumkin/http-auth-payload.svg)

## Install

Install with npm:
```bash
npm i http-auth-payload
```

## Usage

Usage example with express application:

```javascript
const express = require('express');
const httpAuthPayload = require('http-auth-payload');

express()
    .use(httpAuthPayload)
    .use((req, res, next) => {
        if (req.auth.type !== 'bearer') {
            res.status(403).send('Access denied');
            return;
        }

        if (req.auth.payload !== 'secret-token') {
            res.status(403).send('Access denied');
            return;
        }

        next();
    })
    .use((req, res, next) => {
        res.send('Logged in');
    })
    .listen();
```

If authorization header not passed or empty then type has value `none` and
request property 'hasAuth' is `false`.

## API

### (req, res, next)

Module exports middleware.

### parse(authorization) => AuthObject

Method parse authorization and return auth object:

```
{
    type: 'http',
    payload: '...',
}
```

### parseRequest(request) => AuthObject

Method get request's authorization header and parse it with `parse` method.


## License

MIT.
