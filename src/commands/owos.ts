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
import discord from 'discord.js';
import type { Client, Message, User } from 'discord.js';
import type Logger from '@lib/interfaces/Logger';

// Types
type UserOrNull = User | null;
type LotsOfUsers = [UserOrNull, UserOrNull, UserOrNull, UserOrNull, UserOrNull, UserOrNull, UserOrNull, UserOrNull, UserOrNull, UserOrNull];

// Main
export function run(client: Client, message: Message, args: string[], log: Logger): void {
    const sorted: [number, string][] = client.owos
        .map((count, id) => [count, id] as [number, string]) // cast it to [number, string] because [1, "foo"] is (number | string)[]
        .sort(([x], [y]) => (x > y ? -1 : x < y ? 1 : 0));
    const top10: ([number, string] | undefined)[] = sorted.slice(0, 9);
    // @ts-ignore
    const top10ids: string[] = top10.map((item) => (item ? item[1] : undefined));
    const userInTop: boolean = top10ids.includes(message.author.id);

    (async () => {
        const getUser = async (n: number): Promise<User | null> => (top10ids[n] ? await client.users.fetch(top10ids[n]) : null);
        const getUsers = async (): Promise<LotsOfUsers> => [
            await getUser(0),
            await getUser(1),
            await getUser(2),
            await getUser(3),
            await getUser(4),
            await getUser(5),
            await getUser(6),
            await getUser(7),
            await getUser(8),
            await getUser(9)
        ];

        const [u1,u2,u3,u4,u5,u6,u7,u8,u9,u10] = await getUsers()

        let msg = '```adoc\n';
        msg += '===== OWO LEADERBOARD =====\n';
        msg += '\n';
        msg += ` 1 :: ${u1?.tag ?? '(none)'}${top10[0] ? ` with ${top10[0][0]} owos` : ''}\n`;
        msg += ` 2 :: ${u2?.tag ?? '(none)'}${top10[1] ? ` with ${top10[1][0]} owos` : ''}\n`;
        msg += ` 3 :: ${u3?.tag ?? '(none)'}${top10[2] ? ` with ${top10[2][0]} owos` : ''}\n`;
        msg += ` 4 :: ${u4?.tag ?? '(none)'}${top10[3] ? ` with ${top10[3][0]} owos` : ''}\n`;
        msg += ` 5 :: ${u5?.tag ?? '(none)'}${top10[4] ? ` with ${top10[4][0]} owos` : ''}\n`;
        msg += ` 6 :: ${u6?.tag ?? '(none)'}${top10[5] ? ` with ${top10[5][0]} owos` : ''}\n`;
        msg += ` 7 :: ${u7?.tag ?? '(none)'}${top10[6] ? ` with ${top10[6][0]} owos` : ''}\n`;
        msg += ` 8 :: ${u8?.tag ?? '(none)'}${top10[7] ? ` with ${top10[7][0]} owos` : ''}\n`;
        msg += ` 9 :: ${u9?.tag ?? '(none)'}${top10[8] ? ` with ${top10[8][0]} owos` : ''}\n`;
        msg += `10 :: ${u10?.tag ?? '(none)'}${top10[9] ? ` with ${top10[9][0]} owos` : ''}\n`;
        if (!userInTop) {
            const ownIndex = sorted.map((i) => i[1]).indexOf(message.author.id);
            if (ownIndex > -1) {
                const ownOwos = client.owos.get(message.author.id);
                msg += '...\n';
                msg += `${ownIndex} :: ${message.author.tag ?? '(none)'}${ownOwos ? ` with ${ownOwos} owos` : ''}\n`;
            }
        }
        msg += '```';
        message.reply(msg);
    })();
}

// Config
export const config = {
    name: 'owos',
    description: 'Shows a leaderboard of the messages containing "owo"!',
    enabled: true,
    aliases: [],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
