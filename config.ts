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

// Interface
interface ProtoBotConfig {
    token: string;
    apikeys: {
        nomics: string;
    };
    dirs: {
        commands: string;
        modules: string;
    };
    prefixes: string[];
    cooldowns: {
        tildes: number;
        owos: number;
        uwus: number;
    };
    ownerID: string;
}

// Ms conversion functions
function seconds(count: number): number {
    return 1000 * count;
}
function minutes(count: number): number {
    return seconds(60) * count;
}

// Main
const config: ProtoBotConfig = {
    token: 'NzY5MjI3MzI4Mzg3NDE2MDg0.X5L8xg.Rnl0JJ6Swr5Ss2qOGMkv9VsYTKA',
    // API keys
    apikeys: {
        // Nomics (https://nomics.com/) for the DogeCoin system
        nomics: '3c184f8ec6e8f1cc7478a77c828e2e99'
    },
    dirs: {
        commands: './commands/',
        modules: './modules/'
    },
    prefixes: [
        '~',
        'proto, ',
        'proto,',
        'proto ',
        'pb, ',
        'pb,',
        'pb ',
        'protobot, ',
        'protobot,',
        'protobot '
    ],
    cooldowns: {
        tildes: minutes(1),
        owos: seconds(30),
        uwus: seconds(30)
    },
    ownerID: '302878998692757514'
};

// Export
export { ProtoBotConfig };
export default config;
