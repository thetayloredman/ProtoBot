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

import config from '@root/config';
import { Client as BaseClient, ClientOptions } from 'discord.js';
import enmap from 'enmap';

export default class Client extends BaseClient {
    public constructor(options?: ClientOptions) {
        super(options);
        this.config = config;
        this.defaults = {
            USER_CONFS: { markov_optin: false },
            USER_STATS: { hugs: 0 },
            COOLDOWNS: { owos: 0, uwus: 0, tildes: 0 }
        };
        this.cooldowns = new enmap({ name: 'cooldowns' });
        this.tildes = new enmap({ name: 'tildes' });
        this.owos = new enmap({ name: 'owos' });
        this.uwus = new enmap({ name: 'uwus' });
        this.ustats = new enmap({ name: 'ustats' });
        this.uconfs = new enmap({ name: 'uconfs' });
        this.markovMessages = new enmap({ name: 'markovMessages' });
        this.fursonas = new enmap({ name: 'fursonas' });

        // In memory items
        this.commands = new enmap();
        this.commandsConfig = new enmap();
        this.commandsRefs = new enmap(); // Refs are basically aliases that "link" to the actual command
        this.modules = new enmap();
    }
}
