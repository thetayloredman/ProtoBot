// ProtoBot
// By BadBoyHaloCat
// Very owo code i have here~

// +-------------------------------------------------+
// | LEGAL STUFF                        not very owo |
// |=================================================|
// | +---------------------------------------------+ |
// | | COPYRIGHT                                   | |
// | |=============================================| |
// | | Copyright (C) 2020  BadBoyHaloCat           | |
// | |                                             | |
// | | ProtoBot is licensed under exclusive        | |
// | | copyright. You may NOT use this source      | |
// | | code (the "Bot") for anything other than    | |
// | | usage in non-source form.                   | |
// | |                                             | |
// | | Unless the developers ("We") decide to      | |
// | | remove the copyright on this code and       | |
// | | place it under an applicable Open-source*   | |
// | | licence, you may NOT use this codebase.     | |
// | |                                             | |
// | | The only permitted users of this codebase   | |
// | | are the APPROVED** developers of this code. | |
// | |                                             | |
// | | *  Open-source describes any code licensed  | |
// | |    under an applicable open licence such as | |
// | |    the GNU GPL v3.0. Any licence that       | |
// | |    allows others to modify and create       | |
// | |    derivative works off of the Software is  | |
// | |    considered Open-source.                  | |
// | |                                             | |
// | | ** Approved indicates a developer that has  | |
// | |    invited to contribute to this codebase   | |
// | |    and is not applicable to this copyright. | |
// | +---------------------------------------------+ |
// +-------------------------------------------------+

// Modules
import discord from 'discord.js';
import chalk from 'chalk';

// Interfaces, owo
interface Client extends discord.Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// Types
type FetchedUser = discord.User | null;

// Main
export function run(
    client: Client,
    message: discord.Message,
    args: string[],
    log: (mode: 'i' | 'w' | 'e', message: string) => void
): void {
    let tops: [
        number,
        string
    ][] = client.owos.map((count: number, id: string) => [count, id]);
    tops = tops.sort((item1: [number, string], item2: [number, string]) =>
        item1[0] > item2[0] ? -1 : item1[0] < item2[0] ? 1 : 0
    );
    const t10: ([number, string] | undefined)[] = [
        tops[0],
        tops[1],
        tops[2],
        tops[3],
        tops[4],
        tops[5],
        tops[6],
        tops[7],
        tops[8],
        tops[9]
    ];
    // @ts-ignore
    const t10ids: string[] = t10.map((item: [number | string] | undefined) =>
        item ? item[1] : undefined
    );
    const uintop: boolean = t10ids.includes(message.author.id);

    (async () => {
        const u1: FetchedUser = t10ids[0]
            ? await client.users.fetch(t10ids[0])
            : null;
        const u2: FetchedUser = t10ids[1]
            ? await client.users.fetch(t10ids[1])
            : null;
        const u3: FetchedUser = t10ids[2]
            ? await client.users.fetch(t10ids[2])
            : null;
        const u4: FetchedUser = t10ids[3]
            ? await client.users.fetch(t10ids[3])
            : null;
        const u5: FetchedUser = t10ids[4]
            ? await client.users.fetch(t10ids[4])
            : null;
        const u6: FetchedUser = t10ids[5]
            ? await client.users.fetch(t10ids[5])
            : null;
        const u7: FetchedUser = t10ids[6]
            ? await client.users.fetch(t10ids[6])
            : null;
        const u8: FetchedUser = t10ids[7]
            ? await client.users.fetch(t10ids[7])
            : null;
        const u9: FetchedUser = t10ids[8]
            ? await client.users.fetch(t10ids[8])
            : null;
        const u10: FetchedUser = t10ids[9]
            ? await client.users.fetch(t10ids[9])
            : null;

        let msg = '```adoc\n';
        msg += '===== OWO LEADERBOARD =====\n';
        msg += '\n';
        msg += ` 1 :: ${u1?.tag ?? '(none)'}${
            t10[0] ? ` with ${t10[0][0]} owos` : ''
        }\n`;
        msg += ` 2 :: ${u2?.tag ?? '(none)'}${
            t10[1] ? ` with ${t10[1][0]} owos` : ''
        }\n`;
        msg += ` 3 :: ${u3?.tag ?? '(none)'}${
            t10[2] ? ` with ${t10[2][0]} owos` : ''
        }\n`;
        msg += ` 4 :: ${u4?.tag ?? '(none)'}${
            t10[3] ? ` with ${t10[3][0]} owos` : ''
        }\n`;
        msg += ` 5 :: ${u5?.tag ?? '(none)'}${
            t10[4] ? ` with ${t10[4][0]} owos` : ''
        }\n`;
        msg += ` 6 :: ${u6?.tag ?? '(none)'}${
            t10[5] ? ` with ${t10[5][0]} owos` : ''
        }\n`;
        msg += ` 7 :: ${u7?.tag ?? '(none)'}${
            t10[6] ? ` with ${t10[6][0]} owos` : ''
        }\n`;
        msg += ` 8 :: ${u8?.tag ?? '(none)'}${
            t10[7] ? ` with ${t10[7][0]} owos` : ''
        }\n`;
        msg += ` 9 :: ${u9?.tag ?? '(none)'}${
            t10[8] ? ` with ${t10[8][0]} owos` : ''
        }\n`;
        msg += `10 :: ${u10?.tag ?? '(none)'}${
            t10[9] ? ` with ${t10[9][0]} owos` : ''
        }\n`;
        msg += '```';
        message.reply(msg);
    })();
}

// Config
export const config = {
    name: 'owos',
    description: 'Shows a leaderboard of the messages containing "owo"!',
    enabled: true,

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
