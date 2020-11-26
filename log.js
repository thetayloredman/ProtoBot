"use strict";
/**
 * ProtoBot -- A Discord furry bot
 * Copyright (C) 2020  BadBoyHaloCat
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
// Create logging streams
const logInitTime = Date.now();
try {
    fs.readdirSync('./logs/');
}
catch (e) {
    if (e.code === 'ENOENT') {
        try {
            fs.mkdirSync('./logs/');
        }
        catch (e2) {
            console.error(e2);
            process.exit(1);
        }
    }
    else {
        console.error(e);
        process.exit(1);
    }
}
try {
    fs.mkdirSync(`./logs/${logInitTime}/`);
}
catch (e) {
    console.error(e);
    process.exit(1);
}
let allStr = null;
try {
    allStr = fs.createWriteStream(`./logs/${logInitTime}/all.log`);
}
catch (e) {
    console.error(e);
    process.exit(1);
}
let warnStr = null;
try {
    warnStr = fs.createWriteStream(`./logs/${logInitTime}/warn.log`);
}
catch (e) {
    console.error(e);
    process.exit(1);
}
let errStr = null;
try {
    errStr = fs.createWriteStream(`./logs/${logInitTime}/err.log`);
}
catch (e) {
    console.error(e);
    process.exit(1);
}
// Log to file func
function writeItem(mode, message) {
    if (mode === 'e') {
        errStr === null || errStr === void 0 ? void 0 : errStr.write(`${strip_ansi_1.default(message)}\n`);
        warnStr === null || warnStr === void 0 ? void 0 : warnStr.write(`${strip_ansi_1.default(message)}\n`);
        allStr === null || allStr === void 0 ? void 0 : allStr.write(`${strip_ansi_1.default(message)}\n`);
    }
    else if (mode === 'w') {
        warnStr === null || warnStr === void 0 ? void 0 : warnStr.write(`${strip_ansi_1.default(message)}\n`);
        allStr === null || allStr === void 0 ? void 0 : allStr.write(`${strip_ansi_1.default(message)}\n`);
    }
    else if (mode === 'i') {
        allStr === null || allStr === void 0 ? void 0 : allStr.write(`${strip_ansi_1.default(message)}\n`);
    }
}
function log(mode, message) {
    if (mode === 'CLOSE_STREAMS') {
        return new Promise((resolve, reject) => {
            errStr === null || errStr === void 0 ? void 0 : errStr.end(() => {
                warnStr === null || warnStr === void 0 ? void 0 : warnStr.end(() => {
                    allStr === null || allStr === void 0 ? void 0 : allStr.end(() => {
                        resolve();
                    });
                });
            });
        });
    }
    else {
        let msg = '';
        let preparsedDate = new Date(Date.now()).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        preparsedDate = preparsedDate.split(', ');
        preparsedDate[1] = preparsedDate[1].split(' ');
        let preparsedTime = new Date(Date.now()).toLocaleTimeString('en-US' /* no opts needed */);
        preparsedTime = preparsedTime.split(' ');
        preparsedTime[0] = preparsedTime[0].split(':');
        // Parse date/time
        const parsedDate = `${chalk_1.default.green(preparsedDate[0])} ${chalk_1.default.yellow(preparsedDate[1][0])} ${chalk_1.default.yellow.bold(preparsedDate[1][1])} ${chalk_1.default.green.bold(preparsedDate[2])}`;
        const sep = chalk_1.default.yellow(':');
        const parsedTime = `${chalk_1.default.yellow.bold(preparsedTime[0][0])}${sep}${chalk_1.default.yellow.bold(preparsedTime[0][1])}${sep}${chalk_1.default.yellow.bold(preparsedTime[0][2])} ${chalk_1.default.red(preparsedTime[1])}`;
        switch (mode) {
            case 'i':
                msg = `${chalk_1.default.blue('[')}${chalk_1.default.blue.bold('INFO')}${chalk_1.default.blue(']')} ${message}`;
                break;
            case 'w':
                msg = `${chalk_1.default.yellow('[')}${chalk_1.default.yellow.bold('WARN')}${chalk_1.default.yellow(']')} ${message}`;
                break;
            case 'e':
                msg = `${chalk_1.default.red('[')}${chalk_1.default.red.bold('ERR')}${chalk_1.default.red(']')} ${message}`;
                break;
            default:
                msg = `${chalk_1.default.blue('[')}${chalk_1.default.blue.bold('INFO')}${chalk_1.default.blue(']')} ${message}`;
                break;
        }
        const brackets = [chalk_1.default.yellow('['), chalk_1.default.yellow(']')];
        msg = `${brackets[0]}${parsedDate} ${parsedTime}${brackets[1]} ${msg}`;
        console.log(msg);
        // @ts-ignore
        writeItem(mode, msg);
        return undefined;
    }
}
exports.default = log;
//# sourceMappingURL=log.js.map