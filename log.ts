// ProtoBot
// By BadBoyHaloCat
// Very owo code i have here~

// +-------------------------------------------------+
// | LEGAL STUFF                        not very owo |
// |=================================================|
// | +---------------------------------------------+ |
// | | COPYRIGHT                                   | |
// | |=============================================| |
// | | Copyright (C) 2020  BadBoyHaloCat           | |
// | |                                             | |
// | | ProtoBot is licensed under exclusive        | |
// | | copyright. You may NOT use this source      | |
// | | code (the "Bot") for anything other than    | |
// | | usage in non-source form.                   | |
// | |                                             | |
// | | Unless the developers ("We") decide to      | |
// | | remove the copyright on this code and       | |
// | | place it under an applicable Open-source*   | |
// | | licence, you may NOT use this codebase.     | |
// | |                                             | |
// | | The only permitted users of this codebase   | |
// | | are the APPROVED** developers of this code. | |
// | |                                             | |
// | | *  Open-source describes any code licensed  | |
// | |    under an applicable open licence such as | |
// | |    the GNU GPL v3.0. Any licence that       | |
// | |    allows others to modify and create       | |
// | |    derivative works off of the Software is  | |
// | |    considered Open-source.                  | |
// | |                                             | |
// | | ** Approved indicates a developer that has  | |
// | |    invited to contribute to this codebase   | |
// | |    and is not applicable to this copyright. | |
// | +---------------------------------------------+ |
// +-------------------------------------------------+

// Modules
import chalk from 'chalk';
import * as fs from 'fs';
import strip from 'strip-ansi';

// Create logging streams
const logInitTime: number = Date.now();
try {
    fs.readdirSync('./logs/');
} catch (e) {
    if (e.code === 'ENOENT') {
        try {
            fs.mkdirSync('./logs/');
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
    fs.mkdirSync(`./logs/${logInitTime}/`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
let allStr: fs.WriteStream | null = null;
try {
    allStr = fs.createWriteStream(`./logs/${logInitTime}/all.log`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
let warnStr: fs.WriteStream | null = null;
try {
    warnStr = fs.createWriteStream(`./logs/${logInitTime}/warn.log`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
let errStr: fs.WriteStream | null = null;
try {
    errStr = fs.createWriteStream(`./logs/${logInitTime}/err.log`);
} catch (e) {
    console.error(e);
    process.exit(1);
}

// Log to file func
function writeItem(mode: 'i' | 'w' | 'e', message: string): void {
    if (mode === 'e') {
        errStr?.write(`${strip(message)}\n`);
        warnStr?.write(`${strip(message)}\n`);
        allStr?.write(`${strip(message)}\n`);
    } else if (mode === 'w') {
        warnStr?.write(`${strip(message)}\n`);
        allStr?.write(`${strip(message)}\n`);
    } else if (mode === 'i') {
        allStr?.write(`${strip(message)}\n`);
    }
}

// Main
export default function log(mode: 'i' | 'w' | 'e', message: string): void {
    let msg = '';
    let preparsedDate: any = new Date(Date.now()).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    preparsedDate = preparsedDate.split(', ');
    preparsedDate[1] = preparsedDate[1].split(' ');
    let preparsedTime: any = new Date(Date.now()).toLocaleTimeString(
        'en-US' /* no opts needed */
    );
    preparsedTime = preparsedTime.split(' ');
    preparsedTime[0] = preparsedTime[0].split(':');

    // Parse date/time
    const parsedDate = `${chalk.green(preparsedDate[0])} ${chalk.yellow(
        preparsedDate[1][0]
    )} ${chalk.yellow.bold(preparsedDate[1][1])} ${chalk.green.bold(
        preparsedDate[2]
    )}`;
    const sep: string = chalk.yellow(':');
    const parsedTime = `${chalk.yellow.bold(
        preparsedTime[0][0]
    )}${sep}${chalk.yellow.bold(preparsedTime[0][1])}${sep}${chalk.yellow.bold(
        preparsedTime[0][2]
    )} ${chalk.red(preparsedTime[1])}`;

    switch (mode) {
        case 'i':
            msg = `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(
                ']'
            )} ${message}`;
            break;
        case 'w':
            msg = `${chalk.yellow('[')}${chalk.yellow.bold(
                'WARN'
            )}${chalk.yellow(']')} ${message}`;
            break;
        case 'e':
            msg = `${chalk.red('[')}${chalk.red.bold('ERR')}${chalk.red(
                ']'
            )} ${message}`;
            break;
        default:
            msg = `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(
                ']'
            )} ${message}`;
            break;
    }

    const brackets: string[] = [chalk.yellow('['), chalk.yellow(']')];

    msg = `${brackets[0]}${parsedDate} ${parsedTime}${brackets[1]} ${msg}`;

    console.log(msg);
    writeItem(mode, msg);
}
