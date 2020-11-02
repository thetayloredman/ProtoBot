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
import discord from 'discord.js';
import chalk from 'chalk';

// Interfaces, owo
interface Client extends discord.Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

// Main
export function run(client: Client, message: discord.Message, log: (mode: 'i'|'w'|'e', message: string) => void): void {
    // Get the user's current cooldowns (in timestamps)
    const cooldowns = client.cooldowns.ensure(message.author.id, 0, 'owos');

    // Check cooldown
    if (!cooldowns || cooldowns + client.config.cooldowns.owos - Date.now() < 1) {
        let hasPrefix = false;
        client.config.prefixes.forEach((prefix: string) => {
            if (!hasPrefix && message.content.startsWith(prefix)) {
                hasPrefix = true;
            }
        });
        if (message.content.toLowerCase().includes('owo') && !hasPrefix) {
            client.owos.ensure(message.author.id, 0);
            client.owos.inc(message.author.id);
            client.cooldowns.set(message.author.id, Date.now(), 'owos');

            log('i', `${chalk.green('[')}${chalk.green.bold('OwOHandler')}${chalk.green(']')} ${chalk.red('[')}${chalk.red.bold('+')}${chalk.red(']')} Added owo!`);
        }
    } else {
        log('i', `${chalk.green('[')}${chalk.green.bold('OwOHandler')}${chalk.green(']')} User still on cooldown! ${chalk.red(cooldowns + client.config.cooldowns.owos - Date.now())} ms remaining!`);
    }
}

// Config
export const config = {
    name: 'owos',
    description: 'Detects a message containing "owo" and logs it.'
};
