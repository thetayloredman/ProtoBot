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
import Client from '@lib/Client';

// Main
export function run(client: Client, message: discord.Message, log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    // Get the user's current cooldowns (in timestamps)

    // FIXME: Enmap returning bad types
    // Because of this we cast to "number" ---------------------------------vvvvvvvvvvv
    // @ts-ignore
    const cooldowns = client.cooldowns.ensure(message.author.id, 0, 'tildes') as number;

    // Check cooldown
    if (!cooldowns || cooldowns + client.config.cooldowns.tildes - Date.now() < 1) {
        let hasPrefix = false;
        client.config.prefixes.forEach((prefix: string) => {
            if (!hasPrefix && message.content.startsWith(prefix)) {
                hasPrefix = true;
            }
        });
        if (message.content.endsWith('~') && !/~~+/.test(message.content) && message.content !== '~' && !hasPrefix) {
            //                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //                           Don't flag strikethrough
            //                           markdown as a valid tilde!

            client.tildes.ensure(message.author.id, 0);
            client.tildes.inc(message.author.id);
            client.cooldowns.set(message.author.id, Date.now(), 'tildes');

            log(
                'i',
                `${chalk.green('[')}${chalk.green.bold('TildeHandler')}${chalk.green(']')} ${chalk.red('[')}${chalk.red.bold('+')}${chalk.red(
                    ']'
                )} Added tilde!`
            );
        }
    } else {
        log(
            'i',
            `${chalk.green('[')}${chalk.green.bold('TildeHandler')}${chalk.green(']')} User still on cooldown! ${chalk.red(
                cooldowns + client.config.cooldowns.tildes - Date.now()
            )} ms remaining!`
        );
    }
}

// Config
export const config = {
    name: 'tildes',
    description: 'Detects a message ending in ~ and logs it.'
};
