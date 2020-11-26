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
export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    // Safety check
    if (message.author.id !== client.config.ownerID) {
        console.log('w', `User ${message.author.tag} tried to use "restart"!`);
        message.reply("You don't have permission to do that!");
        return;
    }

    log('w', `${message.author.tag} has triggered a restart!`);
    // restart bot
    message.reply('Goodbye!').then(() => {
        log('w', 'Goodbye!');
        client.destroy();
        process.exit();
    });
}

// Config
export const config = {
    name: 'restart',
    description: 'Restart the bot!',
    enabled: true,
    aliases: ['r'],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {} // owner only
};
