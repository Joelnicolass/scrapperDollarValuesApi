"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveInJson = void 0;
const saveInJson = (data, name) => {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, `../storage/${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data));
};
exports.saveInJson = saveInJson;
