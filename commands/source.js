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
    message.channel.messages.fetch({ limit: 2 }).then((messages) => {
        const m = messages.last();
        message.reply(`Content of message ID \`${m.id}\` in channel <#${m.channel.id}>${m.content.includes('```') ? ' (**Formatting may be broken, the message contains a code fence**)' : ''}:

${
        // @ts-ignore
        discord_js_1.default.escapeMarkdown(m.content)}`);
    });
}
exports.run = run;
// Config
exports.config = {
    name: 'source',
    description: 'Gets the source of the last message',
    enabled: true,
    aliases: ['src'],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
//# sourceMappingURL=source.js.map