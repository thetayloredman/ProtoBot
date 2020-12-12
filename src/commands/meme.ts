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

interface MemeData {
    postLink: string;
    title: string;
    url: string;
    subreddit: string;
}

export async function run(client: Client, message: Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    const body = <MemeData>await fetch('https://meme-api.herokuapp.com/gimme').then((res) => res.json());
    let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(body.title)
        .setURL(body.postLink)
        .setImage(body.url)
        .setFooter(`From r/${body.subreddit}`);
    message.channel.send(embed)
}
