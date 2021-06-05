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

// Modules
import type { Client, Message } from 'discord.js';
import Uwuifier from 'uwuifier';
import type Logger from '@lib/interfaces/Logger';

// Main
export function run(client: Client, message: Message, args: string[], log: Logger): void {
    let intense = false;
    if (args[0] === '-i') {
        intense = true;
        args.shift();
    }
    if (args.length === 0) {
        message.reply('**Error:** No text provided!');
        return;
    }
    const uwuify: Uwuifier = new Uwuifier();
    uwuify.actions = [
        '*blushes*',
        '*whispers to self*',
        '*cries*',
        '*screams*',
        '*sweats*',
        '*twerks*',
        '*runs away*',
        '*screeches*',
        '*walks away*',
        '*looks at you*',
        '*starts twerking*',
        '*huggles tightly*',
        '*boops your nose*'
    ];
    const msg: string = uwuify.uwuifySentence(args.join(' '));
    // @ts-ignore
    message.channel.send(`${intense ? msg.replace(/u/gi, 'UwU').replace(/o/gi, 'OwO') : msg}`, { split: { prepend: '...', append: '...' } });
}

// Config
export const config = {
    name: 'uwuify',
    description:
        'Converts all of your text to UwU-talk!\nIntense mode available with `-i` flag: `~uwuify -i text`\nPowered by [Uwuifier](https://github.com/Schotsl/Uwuifier)',
    enabled: true,
    aliases: ['uwu'],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
