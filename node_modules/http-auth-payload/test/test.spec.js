const http = require('http');
const assert = require('assert');
const httpAuthPayload = require('../');

describe('httpAuthPayload', () => {
    it('Should get authentiaction data', (done) => {
        server = http.createServer((req, res) => {
            httpAuthPayload(req, res, () => {
                assert.ok(!! req.auth, 'req.auth defined');
                assert.ok(req.hasAuth, 'hasAuth is `true`');
                assert.equal('object', typeof req.auth, 'req.auth is an object');

                assert.equal('signature', req.auth.type, 'auth type is "signature"');
                assert.equal('test', req.auth.payload, 'auth payload is "test"');

                server.close();

                done();
            });
        });

        server.listen();

        http.request({
            host: 'localhost',
            port: server.address().port,
            headers: {
                'authorization': 'Signature test',
            },
        })
        .end();
    });

    it('Should set default data', (done) => {
        server = http.createServer((req, res) => {
            httpAuthPayload(req, res, () => {
                assert.ok(!! req.auth, 'req.auth defined');
                assert.equal('object', typeof req.auth, 'req.auth is an object');

                assert.equal('none', req.auth.type, 'auth type is "none"');
                assert.equal('', req.auth.payload, 'auth payload is empty string');

                server.close();

                done();
            });
        });

        server.listen();

        http.request({
            host: 'localhost',
            port: server.address().port,
        })
        .end();
    });
});
