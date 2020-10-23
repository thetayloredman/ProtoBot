// DFur
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
// | | DFur is licensed under exclusive            | |
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

// Main
export default function log(mode: 'i'|'w'|'e'|'info'|'warn'|'err'|'warning'|'error', message: string) {
    let msg: string = '';

    // First, we convert the extended ones like "info" and "warning" down
    // to the single letter ones like "i" and "w".
    if (mode === 'info') {
        mode = 'i';
    } else if (mode === 'warn' || mode === 'warning') {
        mode = 'w';
    } else if (mode === 'err' || mode === 'error') {
        mode = 'e';
    }

    // Now, we actually split the logs into different code paths.
    switch (mode) {
        case 'i':
            msg += `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(']')} ${chalk.blue(message)}`;
            break;
        case 'w':
            msg == `${chalk.yellow('[')}${chalk.yellow.bold('WARN')}${chalk.yellow(']')} ${chalk.yellow(message)}`;
            break;
        case 'e':
            msg == `${chalk.red('[')}${chalk.red.bold('ERR')}${chalk.red(']')} ${chalk.red(message)}`;
            break;
        default:
            msg += `${chalk.blue('[')}${chalk.blue.bold('INFO')}${chalk.blue(']')} ${chalk.blue(message)}`;
            break;
    }

    console.log(msg);
}