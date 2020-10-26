// DFur
// By BadBoyHaloCat
// Very owo code i have here~

// +-------------------------------------------------+
// | LEGAL STUFF                        not very owo |
// |=================================================|
// | +---------------------------------------------+ |
// | | COPYRIGHT                                   | |
// | |=============================================| |
// | | Copyright (C) 2020  Logan Devine            | |
// | |                                             | |
// | | DFur is licensed under exclusive            | |
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
    [key: string]: any
}

interface PastaData {
    id: number,
    name: string,
    text: string
}

// Main
export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i'|'w'|'e', message: string) => void) {
    if (!args[0] || args[0].toLowerCase() !== 'nsfw-ok') {
        message.channel.send(`<@${message.author.id}>,
:warning: **POTENTIAL NSFW WARNING** :warning:
The command you just ran has been flagged as **potentially *Not Safe For Work***.
We have not ran this command, *yet*.
If you consent to viewing potentially NSFW content, please run this command:
\`${client.config.prefix}pasta nsfw-ok\``);
    } else {
        const pastas: PastaData[] = [
            {
                id: 1,
                name: 'furry shit',
                text:
                    '​x3 nuzzles, pounces on you, uwu you so warm (Ooh)'                     + '\n' +
                    'Couldn\'t help but notice your bulge from across the floor'            + '\n' +
                    'Nuzzles your necky wecky~ murr~, hehe'                                 + '\n' +
                    'Unzips your baggy ass pants, oof baby you so musky'                    + '\n' +
                    'Take me home, pet me, and make me yours and don\'t forget to stuff me' + '\n' +
                    'See me wag my widdle baby tail all for your bulgy-wulgy'               + '\n' +
                    'Kissies and lickies your neck (Mmh)'                                   + '\n' +
                    'I hope daddy likies'                                                   + '\n' +
                    'Nuzzles and wuzzles your chest (Yuh)'                                  + '\n' +
                    'I be (Yeah) gettin’ thirsty'                                           + '\n' +
                    'Hey, I got a little itch, you think you can help me?'                  + '\n' +
                    'Only seven inches long, uwu, please adopt me'                          + '\n' +
                    'Paws on your bulge as I lick my lips (UwU, punish me please)'          + '\n' +
                    'Bout to hit \'em with this furry shit (He don\'t see it comin\')'
            }
        ];

        // Get random item
        const pasta: PastaData = pastas[Math.floor(Math.random() * pastas.length)];

        message.reply(`**Got your pasta!**
**Found a problem? This pasta's ID is \`${pasta.id}\`.**

**${pasta.name}**

${pasta.text}`);
    }
}

// Config
export const config = {
    name: 'pasta',
    description: '**POTENTIAL NSFW WARNING**\nGet a random copypasta'
}