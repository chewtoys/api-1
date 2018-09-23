"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class API {
    constructor() {
        this.class = {};
    }
    call(options) {
        this.class = require('./' + options.classname);
        return this.class[options.method](options.params);
    }
}
exports.default = new API();
//# sourceMappingURL=index.js.map