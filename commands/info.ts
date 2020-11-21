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
function fireStats(
    userID: string,
    message: discord.Message,
    client: Client
): void {
    const uData: any = client.ustats.get(userID);
    message.reply(`**User info for \`${userID}\`:**
Hugs: ${uData.hugs}
uwus: ${client.uwus.get(userID) ?? 0}
owos: ${client.owos.get(userID) ?? 0}
Tildes: ${client.tildes.get(userID) ?? 0}`);
}

export function run(
    client: Client,
    message: discord.Message,
    args: string[],
    log: (mode: 'i' | 'w' | 'e', message: string) => void
): void {
    let userID: string | undefined;
    if (!args[0]) {
        userID = message.author.id;
    } else if (/<@!?.+>/.test(args[0])) {
        userID = args[0].replace(/[<@!>]/g, '');
    } else {
        userID = args[0];
    }

    if (!client.ustats.get(userID)) {
        client.users
            .fetch(userID)
            .then((user: discord.User) => {
                client.ustats.ensure(user.id, client.defaults.USER_STATS);
                // @ts-ignore
                fireStats(userID, message, client);
            })
            .catch((reason: any) => {
                log('i', `Unknown user ${userID}!`);
                message.reply('Unknown user!');
                return;
            });
        return;
    } else {
        fireStats(userID, message, client);
    }
}

// Config
export const config = {
    name: 'info',
    description: "Get a user's stats!",
    enabled: true,

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
