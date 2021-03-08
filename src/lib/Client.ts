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

import config from '@root/config';
import { Client as BaseClient, ClientOptions } from 'discord.js';
import Enmap from 'enmap';
import EnmapVerbose from '@lib/EnmapVerbose';

function makeVerboseFunction(name: string): (q: string) => void {
    return (q: string) => EnmapVerbose(name, q);
}

export default class Client extends BaseClient {
    public constructor(options?: ClientOptions) {
        super(options);
        this.config = config;
        this.defaults = {
            USER_CONFS: { markov_optin: false },
            USER_STATS: { hugs: 0 },
            COOLDOWNS: { owos: 0, uwus: 0, tildes: 0 }
        };
        this.cooldowns = new Enmap({ name: 'cooldowns', verbose: makeVerboseFunction('cooldowns') });
        this.tildes = new Enmap({ name: 'tildes', verbose: makeVerboseFunction('tildes') });
        this.owos = new Enmap({ name: 'owos', verbose: makeVerboseFunction('owos') });
        this.uwus = new Enmap({ name: 'uwus', verbose: makeVerboseFunction('uwus') });
        this.ustats = new Enmap({ name: 'ustats', verbose: makeVerboseFunction('ustats') });
        this.uconfs = new Enmap({ name: 'uconfs', verbose: makeVerboseFunction('uconfs') });
        this.fursonas = new Enmap({ name: 'fursonas', verbose: makeVerboseFunction('fursonas') });

        // In memory items
        this.commands = new Enmap();
        this.commandsConfig = new Enmap();
        this.commandsRefs = new Enmap(); // Refs are basically aliases that "link" to the actual command
        this.hooks = new Enmap();
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
