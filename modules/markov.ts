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
import Markov from 'markov-strings';

// Interfaces, owo
interface Client extends discord.Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

// Main
export function run(client: Client, message: discord.Message, log: (mode: 'i'|'w'|'e', message: string) => void): void {
    //                                                      To be safe we will not perform
    //                                                      generation without the guild.
    //                                                      vvvvvvvvvvvvvvvvv
    if (client.uconfs.get(message.author.id, 'markov_optin') && message.guild) {
        // user is opted in

        // extract from message for simplicity
        const {
            content,
            author: { id: authorID },
            id,
            guild: { id: guildID }
        } = message;
        // add message to database
        client.markovMessages.set(message.guild.id, {
            // Message storage structure
            // is in this block.
            content: content,
            author: authorID,
            id: id,
            guild: guildID
        }, message.id);
        let hasPrefix = false;
        client.config.prefixes.forEach((i: string) => {
            if (content.startsWith(i) && !hasPrefix) {
                hasPrefix = true;
            }
        });
        if (hasPrefix) {
            log('i', `${chalk.red('[')}${chalk.red.bold('MarkovMsgListener')}${chalk.red(']')} Message has prefix, cancelling.`);
        }
        log('i', `${chalk.red('[')}${chalk.red.bold('MarkovMsgListener')}${chalk.red(']')} Added message to markov database.`);
        if (Object.keys(client.markovMessages.get(message.guild.id)).length > 2000) {
            log('w', `${chalk.red('[')}${chalk.red.bold('MarkovMsgListener')}${chalk.red(']')} Found more than 2000 messages in guild's cache! Might be time to prune!`);
        }
    } else {
        if (!message.guild) {
            log('e', `${chalk.red('[')}${chalk.red.bold('MarkovMsgListener')}${chalk.red(']')} ${chalk.blue('message.guild')} was not present!`);
        } else {
            log('i', `${chalk.red('[')}${chalk.red.bold('MarkovMsgListener')}${chalk.red(']')} User not opted-in for markov generation.`);
        }
    }
}

// Config
export const config = {
    name: 'markov',
    description: 'Generate a markov chain from the current mood in the chat. [Message Collector]'
};
