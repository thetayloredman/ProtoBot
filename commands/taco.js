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
// Modules
const discord_js_1 = __importDefault(require("discord.js"));
// Main
// ===== COMMAND MADE BY Mr. EL =====
function run(client, message, args, log) {
    var _a;
    // If it's FurDevs, we can ping mr. el:
    if (((_a = message === null || message === void 0 ? void 0 : message.guild) === null || _a === void 0 ? void 0 : _a.id) === '731520035717251142') {
        const embed = new discord_js_1.default.MessageEmbed()
            .setTitle('🌮 El is taco')
            .setDescription('Indeed, <@326394970002948096> is a taco. o3o')
            .setColor('RANDOM')
            .setFooter('Command made by Mr. El and BadBoyHaloCat.')
            .setTimestamp();
        message.channel.send(embed);
    }
    else {
        message.reply('This command is only available in a special server! ;)');
    }
}
exports.run = run;
// Config
exports.config = {
    name: 'taco',
    description: 'taco go brrrrrrr',
    enabled: true,
    aliases: ['tacos'],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
//# sourceMappingURL=taco.js.map