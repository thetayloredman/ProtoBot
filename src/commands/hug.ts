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
import type Logger from '@lib/interfaces/Logger';

// Main
export function run(client: Client, message: Message, args: string[], log: Logger): void {
    let userID: string | undefined;
    if (!args[0]) {
        log('i', 'No hug arg provided!');
        message.reply('Who did you want to hug?');
        return;
    } else if (/<@!?.+>/.test(args[0])) {
        userID = args[0].replace(/[<@!>]/g, '');
    } else {
        userID = args[0];
    }

    if (userID === message.author.id) {
        log('i', 'Cannot hug self!');
        message.reply('How are you gonna hug yourself?');
        return;
    }

    client.ustats.ensure(userID, client.defaults.USER_STATS);
    client.ustats.inc(userID, 'hugs');

    message.channel.send(
        `**HUG!**
<@${message.author.id}> huggles <@${userID}> tightly.`,
{ disableMentions: 'everyone' }
    );
    message.delete().catch((err) => {
        log('w', `Failed to delete command message for "hug"!: ${err}`);
    });
}

// Config
export const config = {
    name: 'hug',
    description: 'Hug someone!',
    enabled: true,
    aliases: [],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
