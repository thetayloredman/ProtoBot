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
import type { Client, Message } from 'discord.js';
import type Logger from '@lib/interfaces/Logger';

// Main
export function run(client: Client, message: Message, log: Logger): void {
    // Get the user's current cooldowns (in timestamps)

    const cooldowns = client.cooldowns.ensure(message.author.id, client.defaults.COOLDOWNS).uwus;

    // Check cooldown
    if (!cooldowns || cooldowns + client.config.cooldowns.uwus - Date.now() < 1) {
        let hasPrefix = false;
        client.config.prefixes.forEach((prefix: string) => {
            if (!hasPrefix && message.content.startsWith(prefix)) {
                hasPrefix = true;
            }
        });
        if (message.content.toLowerCase().includes('uwu') && !hasPrefix) {
            client.uwus.ensure(message.author.id, 0);
            client.uwus.inc(message.author.id);
            client.cooldowns.set(message.author.id, Date.now(), 'uwus');

            log(
                'i',
                `${chalk.green('[')}${chalk.green.bold('UwUHandler')}${chalk.green(']')} ${chalk.red('[')}${chalk.red.bold('+')}${chalk.red(
                    ']'
                )} Added uwu!`
            );
        }
    } else {
        log(
            'i',
            `${chalk.green('[')}${chalk.green.bold('UwUHandler')}${chalk.green(']')} User still on cooldown! ${chalk.red(
                cooldowns + client.config.cooldowns.uwus - Date.now()
            )} ms remaining!`
        );
    }
}

// Config
export const config = {
    name: 'uwus',
    description: 'Detects a message containing "uwu" and logs it.'
};
