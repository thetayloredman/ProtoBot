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

// Config types
import Config from '@lib/interfaces/Config';

// Ms conversion functions
function seconds(count: number): number {
    return 1000 * count;
}
function minutes(count: number): number {
    return seconds(60) * count;
}

// Main
const config: Config = {
    token: 'your-super-cool-token',
    dirs: {
        commands: './commands/',
        hooks: './hooks/'
    },
    // The first prefix listed here will
    // be the "primary prefix", the one
    // displayed in most places.
    //          vvv
    prefixes: ['~', 'proto, ', 'proto,', 'proto ', 'pb, ', 'pb,', 'pb ', 'protobot, ', 'protobot,', 'protobot '],
    cooldowns: {
        tildes: minutes(1),
        owos: seconds(30),
        uwus: seconds(30)
    },
    ownerID: 'your-user-id'
};

// Export
export default config;
