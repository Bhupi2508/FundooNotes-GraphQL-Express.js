"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memcached_1 = __importDefault(require("memcached"));
const util_1 = require("util");
class MemcachedCache {
    constructor(serverLocation, options) {
        this.defaultSetOptions = {
            ttl: 300,
        };
        const client = new memcached_1.default(serverLocation, options);
        client.del = util_1.promisify(client.del).bind(client);
        client.get = util_1.promisify(client.get).bind(client);
        client.set = util_1.promisify(client.set).bind(client);
        client.flush = util_1.promisify(client.flush).bind(client);
        this.client = client;
    }
    set(key, value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ttl } = Object.assign({}, this.defaultSetOptions, options);
            yield this.client.set(key, value, ttl);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.get(key);
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.del(key);
        });
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.flush();
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.end();
        });
    }
}
exports.MemcachedCache = MemcachedCache;
//# sourceMappingURL=index.js.map