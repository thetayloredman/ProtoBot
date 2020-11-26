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
function run(client, message, args, log) {
    let tops = client.owos.map((count, id) => [count, id]);
    tops = tops.sort((item1, item2) => (item1[0] > item2[0] ? -1 : item1[0] < item2[0] ? 1 : 0));
    const t10 = [tops[0], tops[1], tops[2], tops[3], tops[4], tops[5], tops[6], tops[7], tops[8], tops[9]];
    // @ts-ignore
    const t10ids = t10.map((item) => (item ? item[1] : undefined));
    const uintop = t10ids.includes(message.author.id);
    (async () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const u1 = t10ids[0] ? await client.users.fetch(t10ids[0]) : null;
        const u2 = t10ids[1] ? await client.users.fetch(t10ids[1]) : null;
        const u3 = t10ids[2] ? await client.users.fetch(t10ids[2]) : null;
        const u4 = t10ids[3] ? await client.users.fetch(t10ids[3]) : null;
        const u5 = t10ids[4] ? await client.users.fetch(t10ids[4]) : null;
        const u6 = t10ids[5] ? await client.users.fetch(t10ids[5]) : null;
        const u7 = t10ids[6] ? await client.users.fetch(t10ids[6]) : null;
        const u8 = t10ids[7] ? await client.users.fetch(t10ids[7]) : null;
        const u9 = t10ids[8] ? await client.users.fetch(t10ids[8]) : null;
        const u10 = t10ids[9] ? await client.users.fetch(t10ids[9]) : null;
        let msg = '```adoc\n';
        msg += '===== OWO LEADERBOARD =====\n';
        msg += '\n';
        msg += ` 1 :: ${(_a = u1 === null || u1 === void 0 ? void 0 : u1.tag) !== null && _a !== void 0 ? _a : '(none)'}${t10[0] ? ` with ${t10[0][0]} owos` : ''}\n`;
        msg += ` 2 :: ${(_b = u2 === null || u2 === void 0 ? void 0 : u2.tag) !== null && _b !== void 0 ? _b : '(none)'}${t10[1] ? ` with ${t10[1][0]} owos` : ''}\n`;
        msg += ` 3 :: ${(_c = u3 === null || u3 === void 0 ? void 0 : u3.tag) !== null && _c !== void 0 ? _c : '(none)'}${t10[2] ? ` with ${t10[2][0]} owos` : ''}\n`;
        msg += ` 4 :: ${(_d = u4 === null || u4 === void 0 ? void 0 : u4.tag) !== null && _d !== void 0 ? _d : '(none)'}${t10[3] ? ` with ${t10[3][0]} owos` : ''}\n`;
        msg += ` 5 :: ${(_e = u5 === null || u5 === void 0 ? void 0 : u5.tag) !== null && _e !== void 0 ? _e : '(none)'}${t10[4] ? ` with ${t10[4][0]} owos` : ''}\n`;
        msg += ` 6 :: ${(_f = u6 === null || u6 === void 0 ? void 0 : u6.tag) !== null && _f !== void 0 ? _f : '(none)'}${t10[5] ? ` with ${t10[5][0]} owos` : ''}\n`;
        msg += ` 7 :: ${(_g = u7 === null || u7 === void 0 ? void 0 : u7.tag) !== null && _g !== void 0 ? _g : '(none)'}${t10[6] ? ` with ${t10[6][0]} owos` : ''}\n`;
        msg += ` 8 :: ${(_h = u8 === null || u8 === void 0 ? void 0 : u8.tag) !== null && _h !== void 0 ? _h : '(none)'}${t10[7] ? ` with ${t10[7][0]} owos` : ''}\n`;
        msg += ` 9 :: ${(_j = u9 === null || u9 === void 0 ? void 0 : u9.tag) !== null && _j !== void 0 ? _j : '(none)'}${t10[8] ? ` with ${t10[8][0]} owos` : ''}\n`;
        msg += `10 :: ${(_k = u10 === null || u10 === void 0 ? void 0 : u10.tag) !== null && _k !== void 0 ? _k : '(none)'}${t10[9] ? ` with ${t10[9][0]} owos` : ''}\n`;
        msg += '```';
        message.reply(msg);
    })();
}
exports.run = run;
// Config
exports.config = {
    name: 'owos',
    description: 'Shows a leaderboard of the messages containing "owo"!',
    enabled: true,
    aliases: [],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
//# sourceMappingURL=owos.js.map