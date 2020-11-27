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

// Imports
import Enmap from 'enmap';
import Config from '@lib/interfaces/Config';
import Fursona from '@lib/interfaces/Fursona';
import UserConfig from '@lib/interfaces/UserConfig';
import UserStats from '@lib/interfaces/UserStats';
import Cooldowns from '@lib/interfaces/Cooldowns';
import Command from '@lib/interfaces/Command';
import CommandConfig from '@lib/interfaces/CommandConfig';
import Module from '@lib/interfaces/Module';
import MarkovData from '@lib/interfaces/MarkovData';

// Discord.js
declare module 'discord.js' {
    interface Client {
        config: Config;
        defaults: {
            USER_CONFS: UserConfig;
            USER_STATS: UserStats;
        };
        cooldowns: Enmap<string, Cooldowns>;
        tildes: Enmap<string, number>;
        owos: Enmap<string, number>;
        uwus: Enmap<string, number>;
        ustats: Enmap<string, UserStats>;
        uconfs: Enmap<string, UserConfig>;
        // might remove markovs soon its taking a lot of space
        markovMessages: Enmap<string, MarkovData>;
        fursonas: Enmap<string, Fursona>;

        // In memory
        commands: Enmap<string, Command>;
        commandsConfig: Enmap<string, CommandConfig>; // NOTE: is this redundant?
        commandsRefs: Enmap<string, string>;
        modules: Enmap<string, Module>;
    }
}
