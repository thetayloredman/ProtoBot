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
import discord from 'discord.js';
import chalk from 'chalk';
import Markov from 'markov-strings';

// Interfaces, owo
interface Client extends discord.Client {
    [key: string]: any;
}

// Main
export function run(
    client: Client,
    message: discord.Message,
    log: (mode: 'i' | 'w' | 'e', message: string) => void
): void {
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
        client.markovMessages.set(
            message.guild.id,
            {
                // Message storage structure
                // is in this block.
                content: content,
                author: authorID,
                id: id,
                guild: guildID
            },
            message.id
        );
        log(
            'i',
            `${chalk.red('[')}${chalk.red.bold('MarkovMsgListener')}${chalk.red(
                ']'
            )} Added message to markov database.`
        );
        if (
            Object.keys(client.markovMessages.get(message.guild.id)).length >
            2000
        ) {
            log(
                'w',
                `${chalk.red('[')}${chalk.red.bold(
                    'MarkovMsgListener'
                )}${chalk.red(
                    ']'
                )} Found more than 2000 messages in guild's cache! Might be time to prune!`
            );
        }
    } else {
        if (!message.guild) {
            log(
                'e',
                `${chalk.red('[')}${chalk.red.bold(
                    'MarkovMsgListener'
                )}${chalk.red(']')} ${chalk.blue(
                    'message.guild'
                )} was not present!`
            );
        } else {
            log(
                'i',
                `${chalk.red('[')}${chalk.red.bold(
                    'MarkovMsgListener'
                )}${chalk.red(']')} User not opted-in for markov generation.`
            );
        }
    }
}

// Config
export const config = {
    name: 'markov',
    description:
        'Generate a markov chain from the current mood in the chat. [Message Collector]'
};
