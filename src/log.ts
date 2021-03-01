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

// Modules
import chalk from 'chalk';
import * as fs from 'fs';
import strip from 'strip-ansi';
import * as util from 'util';

// Create logging streams
const logInitTime: number = Date.now();
try {
    fs.readdirSync('../logs/');
} catch (e) {
    if (e.code === 'ENOENT') {
        try {
            fs.mkdirSync('../logs/');
        } catch (e2) {
            console.error(e2);
            process.exit(1);
        }
    } else {
        console.error(e);
        process.exit(1);
    }
}
try {
    fs.mkdirSync(`../logs/${logInitTime}/`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
let verboseStr: fs.WriteStream;
try {
    verboseStr = fs.createWriteStream(`../logs/${logInitTime}/verbose.log`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
let allStr: fs.WriteStream;
try {
    allStr = fs.createWriteStream(`../logs/${logInitTime}/all.log`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
let warnStr: fs.WriteStream;
try {
    warnStr = fs.createWriteStream(`../logs/${logInitTime}/warn.log`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
let errStr: fs.WriteStream;
try {
    errStr = fs.createWriteStream(`../logs/${logInitTime}/err.log`);
} catch (e) {
    console.error(e);
    process.exit(1);
}

// Log to file func
function writeItem(mode: 'v' | 'i' | 'w' | 'e', message: string): void {
    if (mode === 'e') {
        errStr.write(`${strip(message)}\n`);
        warnStr.write(`${strip(message)}\n`);
        allStr.write(`${strip(message)}\n`);
        verboseStr.write(`${strip(message)}\n`);
    } else if (mode === 'w') {
        warnStr.write(`${strip(message)}\n`);
        allStr.write(`${strip(message)}\n`);
        verboseStr.write(`${strip(message)}\n`);
    } else if (mode === 'i') {
        allStr.write(`${strip(message)}\n`);
        verboseStr.write(`${strip(message)}\n`);
    } else if (mode === 'v') {
        verboseStr.write(`${strip(message)}\n`);
    }
}

// Main
export default function log(mode: 'CLOSE_STREAMS'): Promise<void>;
export default function log(mode: 'v' | 'i' | 'w' | 'e', message: any): void;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function log(mode: 'v' | 'i' | 'w' | 'e' | 'CLOSE_STREAMS', message?: any): void | Promise<void> {
    if (mode === 'CLOSE_STREAMS') {
        // Close all of the file streams
        return new Promise((resolve) => {
            errStr.end(() => {
                warnStr.end(() => {
                    allStr.end(() => {
                        resolve();
                    });
                });
            });
        });
    } else {
        if (typeof message !== 'string') {
            // Use util.inspect to color the message
            message = util.inspect(message, { colors: true });
        }
        let msg = '';
        let preparsedDate: any = new Date(Date.now()).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        preparsedDate = preparsedDate.split(', ');
        preparsedDate[1] = preparsedDate[1].split(' ');
        let preparsedTime: any = new Date(Date.now()).toLocaleTimeString('en-US' /* no opts needed */);
        preparsedTime = preparsedTime.split(' ');
        preparsedTime[0] = preparsedTime[0].split(':');

        // Parse date/time
        const parsedDate = `${chalk.green(preparsedDate[0])} ${chalk.yellow(preparsedDate[1][0])} ${chalk.yellow.bold(
            preparsedDate[1][1]
        )} ${chalk.green.bold(preparsedDate[2])}`;
        const sep: string = chalk.yellow(':');
        const parsedTime = `${chalk.yellow.bold(preparsedTime[0][0])}${sep}${chalk.yellow.bold(preparsedTime[0][1])}${sep}${chalk.yellow.bold(
            preparsedTime[0][2]
        )} ${chalk.red(preparsedTime[1])}`;

        switch (mode) {
            case 'v':
                // Verbose
                msg = `${chalk.cyan('[')}${chalk.cyan.bold('VERBOSE')}${chalk.blue(']')} ${message}`;
                break;
            case 'i':
                // Info
                msg = `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(']')} ${message}`;
                break;
            case 'w':
                // Warning
                msg = `${chalk.yellow('[')}${chalk.yellow.bold('WARN')}${chalk.yellow(']')} ${message}`;
                break;
            case 'e':
                // Error
                msg = `${chalk.red('[')}${chalk.red.bold('ERR')}${chalk.red(']')} ${message}`;
                break;
            default:
                // Default
                msg = `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(']')} ${message}`;

                // Throw a warning for invalid name
                log('w', `[log] Invalid log level ${mode}`);
                break;
        }

        const brackets: string[] = [chalk.yellow('['), chalk.yellow(']')];

        msg = `${brackets[0]}${parsedDate} ${parsedTime}${brackets[1]} ${msg}`;

        console.log(msg);
        // @ts-ignore
        writeItem(mode, msg);

        return undefined;
    }
}
