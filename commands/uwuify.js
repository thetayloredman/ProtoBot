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
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.run = void 0;
const uwuifier_1 = require("uwuifier");
// Main
function run(client, message, args, log) {
    if (args.length === 0) {
        message.reply('**Error:** No text provided!');
        return;
    }
    const uwuify = new uwuifier_1.Uwuifier();
    const msg = uwuify.uwuifySentence(args.join(' '));
    // @ts-ignore
    message.channel.send(`**Uwuified text:** ${msg}`);
}
exports.run = run;
// Config
exports.config = {
    name: 'uwuify',
    description: 'Converts all of your text to UwU-talk!\nPowered by [Uwuifier](https://github.com/Schotsl/Uwuifier)',
    enabled: true,
    aliases: ['uwu'],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
//# sourceMappingURL=uwuify.js.map