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

import type { Client, Message, User } from 'discord.js';

// The number of users that should be displayed on the leaderboard at a
// given time.
const CUTOFF = 10;

function formatRow(index: number, user: User | null, client: Client): string {
    const ranking = (index + 1).toString().padStart(2, ' ');
    const count = user ? client.uwus.get(user?.id) : 0;
    return `${ranking} :: ${user ? `${user.tag} with ${count} uwus` : '(none)'}`;
}

export async function run(client: Client, message: Message): Promise<void> {
    const sorted = client.uwus.map((count, id) => [id, count] as [string, number]).sort((a, b) => b[1] - a[1]);

    // Whether or not the user of the command has placed in the top of the
    // leaderboard.
    let placed = false;

    const buf = ['```adoc\n===== UWU LEADERBOARD ====='];

    for (let i = 0; i < sorted.length && i < CUTOFF; i++) {
        const [id, count] = sorted[i];
        if (id === message.author.id) {
            placed = true;
        }
        // eslint-disable-next-line no-await-in-loop
        const user = await client.users.fetch(id).catch(() => null);
        buf.push(formatRow(i, user, client));
    }

    if (!placed) {
        const index = sorted.findIndex(([id]) => id === message.author.id);
        if (index !== -1) {
            buf.push('...', formatRow(index, message.author, client));
        }
    }

    buf.push('```');
    await message.reply(buf.join('\n'));
}

// Config
export const config = {
    name: 'uwus',
    description: 'Shows a leaderboard of the messages containing "uwu"!',
    enabled: true,
    aliases: [],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
