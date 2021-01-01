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
import EnmapVerbose from '@lib/EnmapVerbose';

export default class Client extends BaseClient {
    public constructor(options?: ClientOptions) {
        super(options);
        this.config = config;
        this.defaults = {
            USER_CONFS: { markov_optin: false },
            USER_STATS: { hugs: 0 },
            COOLDOWNS: { owos: 0, uwus: 0, tildes: 0 }
        };
        this.cooldowns = new enmap({ name: 'cooldowns', verbose: (q: string) => EnmapVerbose('cooldowns', q) });
        this.tildes = new enmap({ name: 'tildes', verbose: (q: string) => EnmapVerbose('tildes', q) });
        this.owos = new enmap({ name: 'owos', verbose: (q: string) => EnmapVerbose('owos', q) });
        this.uwus = new enmap({ name: 'uwus', verbose: (q: string) => EnmapVerbose('uwus', q) });
        this.ustats = new enmap({ name: 'ustats', verbose: (q: string) => EnmapVerbose('ustats', q) });
        this.uconfs = new enmap({ name: 'uconfs', verbose: (q: string) => EnmapVerbose('uconfs', q) });
        this.markovMessages = new enmap({ name: 'markovMessages', verbose: (q: string) => EnmapVerbose('markovMessages', q) });
        this.fursonas = new enmap({ name: 'fursonas', verbose: (q: string) => EnmapVerbose('fursonas', q) });

        // In memory items
        this.commands = new enmap();
        this.commandsConfig = new enmap();
        this.commandsRefs = new enmap(); // Refs are basically aliases that "link" to the actual command
        this.modules = new enmap();
    }

    public async closeDatabases(): Promise<void> {
        await this.cooldowns.close();
        await this.tildes.close();
        await this.owos.close();
        await this.uwus.close();
        await this.ustats.close();
        await this.uconfs.close();
        await this.markovMessages.close();
        await this.fursonas.close();
    }
}
