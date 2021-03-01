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
import type { Client, Message } from 'discord.js';
import type Logger from '@lib/interfaces/Logger';
import sleep from '@lib/sleep';

interface CutieData {
    username: string;
    tag: string;
    id: string;
}

// Main
export async function run(client: Client, message: Message, args: string[], log: Logger): Promise<void> {
    const cuties: CutieData[] = [
        { username: 'Foxley Affection', tag: '6969', id: '701951512410062858' },
        { username: 'CJ_Sever', tag: '6531', id: '699773917577084948' },
        { username: 'DevewoperUmbweon', tag: '0621', id: '679145795714416661' },
        { username: 'boa', tag: '0771', id: '251105781867347969' },
        { username: 'DangItElectric', tag: '9621', id: '388157815136452609' },
        { username: 'Foxes', tag: '3696', id: '649394695570718730' }
    ];

    const m = await message.channel.send(`**Detecting cuties for <@${message.author.id}>...**
This may take a while.`);

    await sleep(3000);

    let str = `**Cutie detection results for <@${message.author.id}>**

I have found **${cuties.length}** cuties!

Cuties found:`;

    for (const cutie of cuties) {
        str += `
- ${cutie.username}#${cutie.tag} (\`${cutie.id}\`)`;
    }

    m.edit(str);
}

// Config
export const config = {
    name: 'cuties',
    description: 'See a list of cuties!',
    enabled: true,
    aliases: ['foxley', 'cutie'], // command aliases to load

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
