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
import { Uwuifier } from 'uwuifier';

// Interfaces, owo
interface Client extends discord.Client {
    [key: string]: any;
}

// Main
export function run(
    client: Client,
    message: discord.Message,
    args: string[],
    log: (mode: 'i' | 'w' | 'e', message: string) => void
): void {
    if (args.length === 0) {
        message.reply('**Error:** No text provided!');
        return;
    }
    const uwuify: Uwuifier = new Uwuifier();
    const msg: string = uwuify.uwuifySentence(args.join(' '));
    // @ts-ignore
    message.channel.send(`**Uwuified text:** ${msg}`);
}

// Config
export const config = {
    name: 'uwuify',
    description:
        'Converts all of your text to UwU-talk!\nPowered by [Uwuifier](https://github.com/Schotsl/Uwuifier)',
    enabled: true,

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
