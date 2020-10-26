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
                name: 'furry shit - song by Senzawa',
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
                    'I be (Yeah) gettin\' thirsty'                                           + '\n' +
                    'Hey, I got a little itch, you think you can help me?'                  + '\n' +
                    'Only seven inches long, uwu, please adopt me'                          + '\n' +
                    'Paws on your bulge as I lick my lips (UwU, punish me please)'          + '\n' +
                    'Bout to hit \'em with this furry shit (He don\'t see it comin\')'
            },
            {
                id: 2,
                name: 'I\'m a furry uwu - song by MatryoshkaGumi',
                text:
                    'I walk a furry road, the only one that I have ever known'              + '\n' +
                    'Don’t know where it goes, but it’s only me and I just OwO'             + '\n' +
                    ''                                                                      + '\n' +
                    'I just OwO'                                                            + '\n' +
                    'I just OwO'                                                            + '\n' +
                    ''                                                                      + '\n' +
                    'I just OwO'                                                            + '\n' +
                    'My sona\'s the only one who walks behind me'                           + '\n' +
                    'My Furry account\'s the only one that’s active'                        + '\n' +
                    'Sometime I wish somefur out there would help me'                       + '\n' +
                    'With my de-press-ion'                                                  + '\n' +
                    ''                                                                      + '\n' +
                    'What\'s this OwO UwU ewe'                                              + '\n' +
                    'Help me I\'m a gay fur-ury'                                            + '\n' +
                    ''                                                                      + '\n' +
                    'I want to write some more'                                             + '\n' +
                    'But I’m running out of lines and I\'m kinda bored'                     + '\n' +
                    'Yeet my-self in-to the voi-oi-oi-oi-oi-oi-oi-oi-oid'
            },
            {
                id: 3,
                name: 'Furries at Work - by u/turbowo on r/furrypasta',
                text:
                    'It\'s Wednesday morning, 6:58 AM.'                                     + '\n' +
                    ''                                                                      + '\n' +
                    'You arrive at the office and sit down in front of your monitor.'       + '\ ' +
                    'It blinks awake as your computer boots up, nearly blinding you with'   + '\ ' +
                    'its piercing white light. With a deep sigh, you log in and check your' + '\ ' +
                    'email. George can\'t find an icon on his desktop, and Karen'           + '\ ' +
                    'downloaded another virus. You roll your eyes and get to work.'         + '\n' +
                    ''                                                                      + '\n' +
                    'Half an hour later, you check your to-do list. There are a few items,' + '\ ' +
                    'but none of them are urgent or important in the slightest. You could'  + '\ ' +
                    'apply yourself and finish them within an hour or two, but then you'    + '\ ' +
                    'wouldn\'t have a way to look busy. If you don\'t look busy, you'       + '\ ' +
                    'don\'t look necessary; and if you don\'t look necessary, you get'      + '\ ' +
                    'pushed to part-time status; and if you get pushed to part-time, you'   + '\ ' +
                    'lose your insurance.'                                                  + '\n' +
                    ''                                                                      + '\n' +
                    'So, you open a few emails alongside a spreadsheet. You look around'    + '\ ' +
                    'before opening a private Firefox window in the bottom corner of your'  + '\ ' +
                    'screen; it won\'t hide your browsing history from IT, but being a'     + '\ ' +
                    'furry, you *are* IT. You log into Reddit and find a message'           + '\ ' +
                    'notification:'                                                         + '\n' +
                    ''                                                                      + '\n' +
                    '> *OwO your sona is soooo cute!*'                                      + '\n' +
                    ''                                                                      + '\n' +
                    'You smile before typing a reply:'                                      + '\n' +
                    ''                                                                      + '\n' +
                    '> *no u UwU*'
            },
            {
                id: 4,
                name: 'A store full of cuties - by u/Freddy_Fazzle_Berry on r/furrypasta',
                text:
                    'So, i walked into a shop today, and there was nothing but cuties!'     + '\ ' +
                    'Like, the store was full of them! I think. . .I think everyone'        + '\ ' +
                    'reading this was there right now, and I just stared. I stared, and'    + '\ ' +
                    'thought "Wow. Thoes are some cute little furballs right there."'
            }
        ];
        log('i', `${chalk.green('[')}${chalk.green.bold('PastaLoader')}${chalk.green(']')} Loaded ${chalk.red(pastas.length)} pastas!`);

        // Get random item
        const pasta: PastaData = pastas[Math.floor(Math.random() * pastas.length)];

        log('i', `${chalk.green('[')}${chalk.green.bold('PastaDelivery')}${chalk.green(']')} Delivered pasta ${chalk.red(pasta.name)} (ID ${chalk.red.bold(pasta.id)})!`)

        message.reply(`**Got your pasta (/song)!**
**Found a problem? This item's ID is \`${pasta.id}\`.**

**${pasta.name}**

${pasta.text}`);
    }
}

// Config
export const config = {
    name: 'pasta',
    description: '**POTENTIAL NSFW WARNING**\nGet a random copypasta/song'
}