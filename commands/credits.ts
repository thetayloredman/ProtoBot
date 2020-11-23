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

// Interfaces, owo
interface Client extends discord.Client {
    [key: string]: any;
}

// Main
interface CreditedUser {
    tag: string; // full tag "BadBoyHaloCat#1826"
    userID: string;
}

interface CreditItem {
    item: string;
    users: CreditedUser[];
}

type Credits = CreditItem[];

export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    // Add credits data here
    const credits: Credits = [
        {
            item: 'Offering to rewrite all of ProtoBot',
            users: [{ tag: 'antemortem#0110', userID: '730159185517477900' }]
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
                str += `Thank you, ${user.tag} (\`${user.userID}\`)`;
            } else {
                if (index !== item.users.length) {
                    str += `, ${user.tag} (\`${user.userID}\`)`;
                } else {
                    str += ` and ${user.tag} (\`${user.userID}\`)`;
                }
            }
        });

        embed.addField(item.item, str);
    });

    message.channel.send(embed);
}

// Config
export const config = {
    name: 'My Cool Command',
    description: 'Does stuff',
    enabled: true,

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
