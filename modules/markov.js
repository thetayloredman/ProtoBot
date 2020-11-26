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
    //                                                      To be safe we will not perform
    //                                                      generation without the guild.
    //                                                      vvvvvvvvvvvvvvvvv
    if (client.uconfs.get(message.author.id, 'markov_optin') && message.guild) {
        // user is opted in
        // extract from message for simplicity
        const { content, author: { id: authorID }, id, guild: { id: guildID } } = message;
        // add message to database
        client.markovMessages.set(message.guild.id, {
            // Message storage structure
            // is in this block.
            content: content,
            author: authorID,
            id: id,
            guild: guildID
        }, message.id);
        log('i', `${chalk_1.default.red('[')}${chalk_1.default.red.bold('MarkovMsgListener')}${chalk_1.default.red(']')} Added message to markov database.`);
    }
    else {
        if (!message.guild) {
            log('e', `${chalk_1.default.red('[')}${chalk_1.default.red.bold('MarkovMsgListener')}${chalk_1.default.red(']')} ${chalk_1.default.blue('message.guild')} was not present!`);
        }
        else {
            log('i', `${chalk_1.default.red('[')}${chalk_1.default.red.bold('MarkovMsgListener')}${chalk_1.default.red(']')} User not opted-in for markov generation.`);
        }
    }
}
exports.run = run;
// Config
exports.config = {
    name: 'markov',
    description: 'Generate a markov chain from the current mood in the chat. [Message Collector]'
};
//# sourceMappingURL=markov.js.map