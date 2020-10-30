// ProtoBot
// By BadBoyHaloCat
// Very owo code i have here~

// +-------------------------------------------------+
// | LEGAL STUFF                        not very owo |
// |=================================================|
// | +---------------------------------------------+ |
// | | COPYRIGHT                                   | |
// | |=============================================| |
// | | Copyright (C) 2020  Logan Devine            | |
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

// Main
export default function log(mode: 'i'|'w'|'e', message: string): void {
    let msg = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let preparsedDate: any = new Date(Date.now()).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    preparsedDate = preparsedDate.split(', ');
    preparsedDate[1] = preparsedDate[1].split(' ');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let preparsedTime: any = new Date(Date.now()).toLocaleTimeString('en-US' /* no opts needed */);
    preparsedTime = preparsedTime.split(' ');
    preparsedTime[0] = preparsedTime[0].split(':');

    // Parse date/time
    const parsedDate = `${chalk.green(preparsedDate[0])} ${chalk.yellow(preparsedDate[1][0])} ${chalk.yellow.bold(preparsedDate[1][1])} ${chalk.green.bold(preparsedDate[2])}`;
    const sep: string = chalk.yellow(':');
    const parsedTime = `${chalk.yellow.bold(preparsedTime[0][0])}${sep}${chalk.yellow.bold(preparsedTime[0][1])}${sep}${chalk.yellow.bold(preparsedTime[0][2])} ${chalk.red(preparsedTime[1])}`;
    
    switch (mode) {
    case 'i':
        msg = `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(']')} ${message}`;
        break;
    case 'w':
        msg = `${chalk.yellow('[')}${chalk.yellow.bold('WARN')}${chalk.yellow(']')} ${message}`;
        break;
    case 'e':
        msg = `${chalk.red('[')}${chalk.red.bold('ERR!')}${chalk.red(']')} ${message}`;
        break;
    default:
        msg = `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(']')} ${message}`;
        break;
    }

    const brackets: string[] = [ chalk.yellow('['), chalk.yellow(']') ];

    msg = `${brackets[0]}${parsedDate} ${parsedTime}${brackets[1]} ${msg}`;

    console.log(msg);
}
