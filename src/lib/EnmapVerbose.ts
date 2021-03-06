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

import log from '../log';
import chalk from 'chalk';
import { highlight } from 'cli-highlight';

/**
 * Called on every query to the Enmap internal database.
 * @param query The SQL query ran
 */
export default function EnmapVerbose(dbname: string, query: string): void {
    log(
        'v',
        `${chalk.blue('[')}${chalk.blue.bold('DatabaseQuery')}${chalk.blue(']')} ${chalk.underline('Query')} ${chalk.red(dbname)}: ${highlight(
            query,
            { language: 'sql' }
        )}`
    );
}
