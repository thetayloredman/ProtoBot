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
    [key: string]: any
}

// Main
function fireStats(userID: string, message: discord.Message, client: Client): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uData: any = client.ustats.get(userID);
    message.reply(`**User info for \`${userID}\`:**
Hugs: ${uData.hugs}`);
}

export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i'|'w'|'e', message: string) => void): void {
    let userID: string|undefined;
    if (!args[0]) {
        userID = message.author.id;
    } else if (/<@!?.+>/.test(args[0])) {
        userID = args[0].replace(/[<@!>]/g, '');
    } else {
        userID = args[0];
    }

    if (!client.ustats.get(userID)) {
        client.users.fetch(userID).then((user: discord.User) => {
            client.ustats.ensure(user.id, client.defaults.USER_STATS);
            // @ts-ignore
            fireStats(userID, message, client);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).catch((reason: any) => {
            log('i', `Unknown user ${userID}!`);
            message.reply('Unknown user!');
            return;
        });
        return;
    } else {
        fireStats(userID, message, client);
    }
}

// Config
export const config = {
    name: 'info',
    description: 'Get a user\'s stats!',
    enabled: true,
    
    // To restrict the command, change the "false" to the following
    // format:
    // 
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
