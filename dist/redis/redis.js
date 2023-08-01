"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisFunction = void 0;
const redis_1 = require("redis");
let client = (0, redis_1.createClient)();
const redisFunction = () => {
    client.connect()
        .then(() => {
        console.log("Redis connected");
    });
};
exports.redisFunction = redisFunction;
exports.default = client;
//# sourceMappingURL=redis.js.map