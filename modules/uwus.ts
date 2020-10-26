// DFur
// By BadBoyHaloCat
// Very uwu code i have here~

// +-------------------------------------------------+
// | LEGAL STUFF                        not very uwu |
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
import discord from 'discord.js';
import chalk from 'chalk';

// Interfaces, uwu
interface Client extends discord.Client {
    [key: string]: any
}

// Main
export function run(client: Client, message: discord.Message, log: (mode: 'i'|'w'|'e', message: string) => void) {
    // Get the user's current cooldowns (in timestamps)
    const cooldowns = client.cooldowns.ensure(message.author.id, 0, 'uwus');

    // Check cooldown
    if (!cooldowns || (cooldowns + client.config.cooldowns.uwus) - Date.now() < 1) {
        if (message.content.toLowerCase().includes('uwu') && !message.content.startsWith('~')) {
            client.uwus.ensure(message.author.id, 0);
            client.uwus.inc(message.author.id);
            client.cooldowns.set(message.author.id, Date.now(), 'uwus');

            log('i', `${chalk.green('[')}${chalk.green.bold('UwUHandler')}${chalk.green(']')} Added uwu!`);
        }
    } else {
        log('i', `${chalk.green('[')}${chalk.green.bold('UwUHandler')}${chalk.green(']')} User still on cooldown! ${chalk.red((cooldowns + client.config.cooldowns.uwus) - Date.now())} ms remaining!`);
    }
}

// Config
export const config = {
    name: 'uwus',
    description: 'Detects a message containing "uwu" and logs it.'
}