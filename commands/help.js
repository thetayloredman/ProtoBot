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
function run(client, message, args, log) {
    log('i', 'Giving help command info!');
    const embed = new discord_js_1.default.MessageEmbed()
        .setTitle('ProtoBot Help')
        .setAuthor('ProtoBot')
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`)
        .setDescription('Here are all of my commands!');
    client.commandsConfig.forEach((command) => {
        embed.addField(command.name, `${command.description}${command.enabled ? '' : ' **[Disabled]**'}${command.restrict ? ' **[Restricted]**' : ''}`, true);
    });
    message.channel.send(embed);
}
exports.run = run;
// Config
exports.config = {
    name: 'help',
    description: 'List all available commands!',
    enabled: true,
    aliases: ['h'],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
//# sourceMappingURL=help.js.map