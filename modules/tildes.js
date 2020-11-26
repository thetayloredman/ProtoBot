"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.run = void 0;
const chalk_1 = __importDefault(require("chalk"));
// Main
function run(client, message, log) {
    // Get the user's current cooldowns (in timestamps)
    const cooldowns = client.cooldowns.ensure(message.author.id, 0, 'tildes');
    // Check cooldown
    if (!cooldowns || cooldowns + client.config.cooldowns.tildes - Date.now() < 1) {
        let hasPrefix = false;
        client.config.prefixes.forEach((prefix) => {
            if (!hasPrefix && message.content.startsWith(prefix)) {
                hasPrefix = true;
            }
        });
        if (message.content.endsWith('~') && !/~~+/.test(message.content) && message.content !== '~' && !hasPrefix) {
            //                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //                           Don't flag strikethrough
            //                           markdown as a valid tilde!
            client.tildes.ensure(message.author.id, 0);
            client.tildes.inc(message.author.id);
            client.cooldowns.set(message.author.id, Date.now(), 'tildes');
            log('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('TildeHandler')}${chalk_1.default.green(']')} ${chalk_1.default.red('[')}${chalk_1.default.red.bold('+')}${chalk_1.default.red(']')} Added tilde!`);
        }
    }
    else {
        log('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('TildeHandler')}${chalk_1.default.green(']')} User still on cooldown! ${chalk_1.default.red(cooldowns + client.config.cooldowns.tildes - Date.now())} ms remaining!`);
    }
}
exports.run = run;
// Config
exports.config = {
    name: 'tildes',
    description: 'Detects a message ending in ~ and logs it.'
};
//# sourceMappingURL=tildes.js.map