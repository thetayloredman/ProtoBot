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
// Main
function fireStats(userID, message, client) {
    var _a, _b, _c;
    const uData = client.ustats.get(userID);
    message.reply(`**User info for \`${userID}\`:**
Hugs: ${uData.hugs}
uwus: ${(_a = client.uwus.get(userID)) !== null && _a !== void 0 ? _a : 0}
owos: ${(_b = client.owos.get(userID)) !== null && _b !== void 0 ? _b : 0}
Tildes: ${(_c = client.tildes.get(userID)) !== null && _c !== void 0 ? _c : 0}`);
}
function run(client, message, args, log) {
    let userID;
    if (!args[0]) {
        userID = message.author.id;
    }
    else if (/<@!?.+>/.test(args[0])) {
        userID = args[0].replace(/[<@!>]/g, '');
    }
    else {
        userID = args[0];
    }
    if (!client.ustats.get(userID)) {
        client.users
            .fetch(userID)
            .then((user) => {
            client.ustats.ensure(user.id, client.defaults.USER_STATS);
            // @ts-ignore
            fireStats(userID, message, client);
        })
            .catch((reason) => {
            log('i', `Unknown user ${userID}!`);
            message.reply('Unknown user!');
            return;
        });
        return;
    }
    else {
        fireStats(userID, message, client);
    }
}
exports.run = run;
// Config
exports.config = {
    name: 'info',
    description: "Get a user's stats!",
    enabled: true,
    aliases: ['user'],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
//# sourceMappingURL=info.js.map