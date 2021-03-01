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

import chalk from 'chalk';
import log from '../log';
import bytes from 'bytes';

function l(mode: 'v' | 'i' | 'w' | 'e', message: any) {
    log(mode, `${chalk.blue('[')}${chalk.blue.bold('MemStat')}${chalk.blue(']')} ${message}`);
}

export default function memstat(): { residentSetSize: number; heapUsed: number; heapTotal: number; arrayBuffers: number; external: number } {
    l('i', 'Getting memory status...');
    const { rss: residentSetSize, heapTotal, heapUsed, external, arrayBuffers } = process.memoryUsage();

    const out = { residentSetSize, heapTotal, heapUsed, external, arrayBuffers };

    l('v', 'Finished getting memory status!');
    l('v', 'MemStat results:');
    l('v', `Resident Set Size (total allocated memory): ${bytes(residentSetSize)}`);
    l('v', `Heap Used: ${bytes(heapUsed)}`);
    l('v', `Heap Allocated: ${bytes(heapTotal)}`);
    l('v', `Array Buffers: ${bytes(arrayBuffers)}`);
    l('v', `External: ${bytes(external)}`);

    return out;
}
