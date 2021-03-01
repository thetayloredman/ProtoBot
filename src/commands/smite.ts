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
interface IEmoteData {
    cloud: string;
    bolt: string;
    cloud_bolt: string;
}
export function run(client: Client, message: Message, args: string[], log: (mode: 'v' | 'i' | 'w' | 'e', message: string) => void): void {
    if (!args[0]) {
        message.reply('Who..?').then((m) => {
            setTimeout(async () => {
                await m.delete();
                await message.delete().catch(() => {
                    log('w', 'Failed to delete actual command message! Error');
                });
            });
        });
    } else {
        const userID: string = args[0].replace(/[<@!>]/g, '');
        const emotes: IEmoteData = {
            cloud: '☁️',
            bolt: '⚡',
            cloud_bolt: '🌩️'
        };
        // Move to local scope
        const { cloud, bolt, cloud_bolt } = emotes;
        message.channel.send(`Hehe, <@${userID}> **SMITTEN** by <@${message.author.id}>!
\`\`\`
${cloud}${cloud}${cloud}${cloud_bolt}${cloud}
      ${bolt}
     ${bolt}
    ${bolt}
   ${bolt}
\`\`\``);
        message.delete().catch(() => {
            log('w', 'Failed to delete smite cmd message!');
        });
    }
}

// Config
export const config = {
    name: 'smite',
    description: 'Smites a user!',
    enabled: true,
    aliases: ['bolt'], // command aliases to load

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
