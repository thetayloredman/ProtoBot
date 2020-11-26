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
    const cooldowns = client.cooldowns.ensure(message.author.id, 0, 'uwus');
    // Check cooldown
    if (!cooldowns || cooldowns + client.config.cooldowns.uwus - Date.now() < 1) {
        let hasPrefix = false;
        client.config.prefixes.forEach((prefix) => {
            if (!hasPrefix && message.content.startsWith(prefix)) {
                hasPrefix = true;
            }
        });
        if (message.content.toLowerCase().includes('uwu') && !hasPrefix) {
            client.uwus.ensure(message.author.id, 0);
            client.uwus.inc(message.author.id);
            client.cooldowns.set(message.author.id, Date.now(), 'uwus');
            log('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('UwUHandler')}${chalk_1.default.green(']')} ${chalk_1.default.red('[')}${chalk_1.default.red.bold('+')}${chalk_1.default.red(']')} Added uwu!`);
        }
    }
    else {
        log('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('UwUHandler')}${chalk_1.default.green(']')} User still on cooldown! ${chalk_1.default.red(cooldowns + client.config.cooldowns.uwus - Date.now())} ms remaining!`);
    }
}
exports.run = run;
// Config
exports.config = {
    name: 'uwus',
    description: 'Detects a message containing "uwu" and logs it.'
};
//# sourceMappingURL=uwus.js.map