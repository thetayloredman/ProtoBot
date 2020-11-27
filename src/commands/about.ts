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
import type { Client, Message } from 'discord.js';

// Main
export function run(client: Client, message: Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    message.channel.send(`**Oh hewwo there <@${message.author.id}>!**

**I'm ProtoBot.**

I'm a Discord bot with furries in mind.

I'm made mostly by **@BadBoyHaloCat#1826** and my secondary developer is **@DeveloperRaco#1337**.

My prefix is \`${client.config.prefixes[0]}\`.

Feel free to send a DM to **@BadBoyHaloCat#1826** for support.

**I'm open source!** https://github.com/thetayloredman/ProtoBot`);
}

// Config
export const config = {
    name: 'about',
    description: 'Learn about me!',
    enabled: true,
    aliases: [],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
