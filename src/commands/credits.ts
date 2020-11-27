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
interface CreditedUser {
    tag: string; // full tag "BadBoyHaloCat#1826"
}

interface CreditItem {
    item: string;
    users: CreditedUser[];
}

type Credits = CreditItem[];

export function run(client: Client, message: Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    // Add credits data here
    const credits: Credits = [
        {
            item: 'Writing the core of ProtoBot',
            users: [{ tag: 'BadBoyHaloCat#1826' }]
        },
        {
            item: 'Offering to rewrite all of ProtoBot',
            users: [{ tag: 'antemortem#0110' }]
        },
        {
            item: 'Inspiration',
            users: [{ tag: 'DeveloperUmbreon#3344' }]
        },
        {
            item: 'Just existing idk',
            users: [{ tag: 'boa#1665' }, { tag: 'ElectricLeAluki#9621' }, { tag: 'charmines#1522' }]
        },
        {
            item: 'Adding taco command o3o',
            users: [{ tag: 'Mr. El#2628' }]
        }
    ];

    const embed = new discord.MessageEmbed()
        .setTitle('Credits to all those who helped make ProtoBot possible')
        .setColor('RANDOM')
        .setFooter('Thank you, all.')
        .setDescription('Come on, read this! They worked hard for it!');

    credits.forEach((item: CreditItem) => {
        let str = '';
        item.users.forEach((user: CreditedUser, index: number) => {
            if (str.length === 0) {
                str += `Thank you, ${user.tag}`;
            } else {
                if (index !== item.users.length - 1) {
                    str += `, ${user.tag}`;
                } else {
                    str += `, and ${user.tag}`;
                }
            }
        });

        embed.addField(item.item, str);
    });

    message.channel.send(embed);
}

// Config
export const config = {
    name: 'credits',
    description: 'See the bot credits!',
    enabled: true,
    aliases: [],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
