/**
 * ProtoBot -- A Discord furry bot
 * Copyright (C) 2020, 2021  BadBoyHaloCat
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
import type Logger from '@lib/interfaces/Logger';

interface MemeData {
    postLink: string;
    title: string;
    url: string;
    subreddit: string;
}

export async function run(client: Client, message: Message, args: string[], log: Logger): Promise<void> {
    const body = <MemeData>await fetch('https://meme-api.herokuapp.com/gimme').then((res) => res.json());
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(body.title)
        .setURL(body.postLink)
        .setImage(body.url)
        .setFooter(`From r/${body.subreddit}`);
    message.channel.send(embed);
}

// Config
export const config = {
    name: 'meme',
    description: 'Get a fresh meme!',
    enabled: true,
    aliases: [], // command aliases to load

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
