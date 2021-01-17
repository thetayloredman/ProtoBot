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
export function run(client: Client, message: Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    let tops: [number, string][] = client.tildes.map((count: number, id: string) => [count, id]);
    tops = tops.sort((item1: [number, string], item2: [number, string]) => (item1[0] > item2[0] ? -1 : item1[0] < item2[0] ? 1 : 0));
    const t10: ([number, string] | undefined)[] = [tops[0], tops[1], tops[2], tops[3], tops[4], tops[5], tops[6], tops[7], tops[8], tops[9]];
    // @ts-ignore
    const t10ids: string[] = t10.map((item: [number, string] | undefined) => (item ? item[1] : undefined));
    const uintop: boolean = t10ids.includes(message.author.id);

    (async () => {
        const u1 = t10ids[0] ? await client.users.fetch(t10ids[0]) : null;
        const u2 = t10ids[1] ? await client.users.fetch(t10ids[1]) : null;
        const u3 = t10ids[2] ? await client.users.fetch(t10ids[2]) : null;
        const u4 = t10ids[3] ? await client.users.fetch(t10ids[3]) : null;
        const u5 = t10ids[4] ? await client.users.fetch(t10ids[4]) : null;
        const u6 = t10ids[5] ? await client.users.fetch(t10ids[5]) : null;
        const u7 = t10ids[6] ? await client.users.fetch(t10ids[6]) : null;
        const u8 = t10ids[7] ? await client.users.fetch(t10ids[7]) : null;
        const u9 = t10ids[8] ? await client.users.fetch(t10ids[8]) : null;
        const u10 = t10ids[9] ? await client.users.fetch(t10ids[9]) : null;

        let msg = '```adoc\n';
        msg += '===== TILDE LEADERBOARD =====\n';
        msg += '\n';
        msg += ` 1 :: ${u1?.tag ?? '(none)'}${t10[0] ? ` with ${t10[0][0]} tildes` : ''}\n`;
        msg += ` 2 :: ${u2?.tag ?? '(none)'}${t10[1] ? ` with ${t10[1][0]} tildes` : ''}\n`;
        msg += ` 3 :: ${u3?.tag ?? '(none)'}${t10[2] ? ` with ${t10[2][0]} tildes` : ''}\n`;
        msg += ` 4 :: ${u4?.tag ?? '(none)'}${t10[3] ? ` with ${t10[3][0]} tildes` : ''}\n`;
        msg += ` 5 :: ${u5?.tag ?? '(none)'}${t10[4] ? ` with ${t10[4][0]} tildes` : ''}\n`;
        msg += ` 6 :: ${u6?.tag ?? '(none)'}${t10[5] ? ` with ${t10[5][0]} tildes` : ''}\n`;
        msg += ` 7 :: ${u7?.tag ?? '(none)'}${t10[6] ? ` with ${t10[6][0]} tildes` : ''}\n`;
        msg += ` 8 :: ${u8?.tag ?? '(none)'}${t10[7] ? ` with ${t10[7][0]} tildes` : ''}\n`;
        msg += ` 9 :: ${u9?.tag ?? '(none)'}${t10[8] ? ` with ${t10[8][0]} tildes` : ''}\n`;
        msg += `10 :: ${u10?.tag ?? '(none)'}${t10[9] ? ` with ${t10[9][0]} tildes` : ''}\n`;
        if (!uintop) {
            const ownIndex = client.tildes.indexes.indexOf(message.author.id);
            if (ownIndex > -1) {
                const ownTildes = client.tildes.get(message.author.id);
                msg += '====================';
                msg += `${ownIndex} :: ${message.author.tag ?? '(none)'}${ownTildes ? ` with ${ownTildes} tildes` : ''}\n`;
            }
        }
        msg += '```';
        message.reply(msg);
    })();
}

// Config
export const config = {
    name: 'tildes',
    description: 'Shows a leaderboard of the messages ending in "~"!',
    enabled: true,
    aliases: [],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
