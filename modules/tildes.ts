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
import discord from 'discord.js';
import chalk from 'chalk';

// Interfaces, owo
interface Client extends discord.Client {
    [key: string]: any
}

// Main
export function run(client: Client, message: discord.Message, log: (mode: 'i'|'w'|'e', message: string) => void) {
    // Get the user's current cooldowns (in timestamps)
    const cooldowns = client.cooldowns.ensure(message.author.id, 0, 'tildes');

    // Check cooldown
    if (!cooldowns || (cooldowns + client.config.cooldowns.tildes) - Date.now() < 1) {
        if (message.content.endsWith('~') && !/~~+/.test(message.content) && !message.content.startsWith('~')) {
            //                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //                           Don't flag strikethrough
            //                           markdown as a valid tilde!

            client.tildes.ensure(message.author.id, 0);
            client.tildes.inc(message.author.id);
            client.cooldowns.set(message.author.id, Date.now(), 'tildes');

            log('i', `${chalk.green('[')}${chalk.green.bold('TildeHandler')}${chalk.green(']')} ${chalk.red('[')}${chalk.red.bold('+')}${chalk.red(']')} Added tilde!`);
        }
    } else {
        log('i', `${chalk.green('[')}${chalk.green.bold('TildeHandler')}${chalk.green(']')} User still on cooldown! ${chalk.red((cooldowns + client.config.cooldowns.tildes) - Date.now())} ms remaining!`);
    }
}

// Config
export const config = {
    name: 'tildes',
    description: 'Detects a message ending in ~ and logs it.'
}