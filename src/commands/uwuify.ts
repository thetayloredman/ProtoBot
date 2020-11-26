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
import { Uwuifier } from 'uwuifier';

// Interfaces, owo
interface Client extends discord.Client {
    [key: string]: any;
}

// Main
export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    if (args.length === 0) {
        message.reply('**Error:** No text provided!');
        return;
    }
    const uwuify: Uwuifier = new Uwuifier();
    const msg: string = uwuify.uwuifySentence(args.join(' '));
    // @ts-ignore
    message.channel.send(`**Uwuified text:** ${msg}`);
}

// Config
export const config = {
    name: 'uwuify',
    description: 'Converts all of your text to UwU-talk!\nPowered by [Uwuifier](https://github.com/Schotsl/Uwuifier)',
    enabled: true,
    aliases: ['uwu'],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
