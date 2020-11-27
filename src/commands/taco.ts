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
import type { Client, Message } from 'discord.js';

// Main
// ===== COMMAND MADE BY Mr. EL =====
export function run(client: Client, message: Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    // If it's FurDevs, we can ping mr. el:
    if (message.guild?.id === '731520035717251142') {
        const embed = new discord.MessageEmbed()
            .setTitle('🌮 El is taco')
            .setDescription('Indeed, <@326394970002948096> is a taco. o3o')
            .setColor('RANDOM')
            .setFooter('Command made by Mr. El and BadBoyHaloCat.')
            .setTimestamp();

        message.channel.send(embed);
    } else {
        message.reply('This command is only available in a special server! ;)');
    }
}

// Config
export const config = {
    name: 'taco',
    description: 'taco go brrrrrrr',
    enabled: true,
    aliases: ['tacos'], // command aliases to load

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
