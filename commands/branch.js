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
const child_process_1 = require("child_process");
// Main
function run(client, message, args, log) {
    // Safety check
    if (message.author.id !== client.config.ownerID) {
        log('w', `User ${message.author.tag} tried to use branch! Destination: ${args[0]}`);
        message.reply("You don't have permission to do that!");
        return;
    }
    if (!args[0]) {
        message.reply('What branch did you want to switch to, tho?');
    }
    let embed = new discord_js_1.default.MessageEmbed()
        .setTitle('Branch Switch')
        .setDescription(`Please wait.. Switching to \`${args[0]}\`...`)
        .addField('Status', `\`$ git branch ${args[0]}\``);
    message.channel.send(embed).then((m) => {
        child_process_1.exec(`git checkout ${args[0]}`, (error, stdout, stderr) => {
            embed = new discord_js_1.default.MessageEmbed()
                .setTitle(`Branch Switch [${stderr.startsWith('Switched') ? 'Complete' : 'Failed'}]`)
                .setDescription(stderr.startsWith('Switched') ? `Switched to branch ${args[0]}` : 'Failed to switch to branch. (Does it exist?)');
            if (stderr) {
                embed.addField('Log', `\`\`\`
${stderr !== null && stderr !== void 0 ? stderr : '<none>'}${stdout !== '' ? `\n${stdout}` : ''}
\`\`\``);
            }
            m.edit(embed);
        });
    });
}
exports.run = run;
// Config
exports.config = {
    name: 'branch',
    description: 'Changes the current branch [owner only]',
    enabled: true,
    aliases: [],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {} // owner only
};
//# sourceMappingURL=branch.js.map