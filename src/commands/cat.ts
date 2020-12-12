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

// Imports
import { Client, Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

interface CatData {
    link: string;
}

export async function run(client: Client, message: Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): Promise<void> {
    const msg = await message.channel.send('Fetching a cat picture...');
    const body = <CatData>await fetch('https://some-random-api.ml/img/cat').then((res) => res.json());
    let embed = new MessageEmbed().setTitle(`Cat for ${message.author.username}`).setImage(body.link).setTimestamp(Date.now()).setColor('RANDOM');
    msg.edit(embed);
}

// Config
export const config = {
    name: 'cat',
    description: 'Get a cat picture~',
    enabled: true,
    aliases: ['meow','kitty'], // command aliases to load

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
