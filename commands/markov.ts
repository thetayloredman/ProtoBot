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
import Markov, { MarkovResult } from 'markov-strings';
import * as fs from 'fs';

// Interfaces, owo
interface Client extends discord.Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

// Main
export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i'|'w'|'e', message: string) => void): void {
    if (!args[0]) {
        message.reply(`**Markov Chain Generation**

ProtoBot can generate a message based on a markov chain.

This chain is trained based on all messages in this guild, from opted in users.

\`\`\`adoc
===== MARKOV MODULE =====

==== OPTIN/OPTOUT =====
${client.config.prefixes[0]}markov optin :: Opt in to data collection -- Please check ${client.config.prefixes[0]}markov privacy
${client.config.prefixes[0]}markov optout :: Stop data collection
${client.config.prefixes[0]}markov privacy :: View the privacy policy

==== GENERATE ====
${client.config.prefixes[0]}markov generate :: Generate a markov chain.
\`\`\``);
    } else if (['optin', 'oi', 'enable'].includes(args[0].toLowerCase())) {
        message.reply('Opted in!');
        client.uconfs.set(message.author.id, true, 'markov_optin');
        log('i', 'Opted user in.');
    } else if (['optout', 'oo', 'disable'].includes(args[0].toLowerCase())) {
        message.reply('Opted out!');
        client.uconfs.set(message.author.id, false, 'markov_optin');
        log('i', 'Opted user out.');
    } else if (['generate', 'g', 'gen', 'c', 'create', 'm', 'make'].includes(args[0].toLowerCase())) {
        const chain = new Markov({ stateSize: 2 });
        // @ts-ignore
        const data = Object.entries(client.markovMessages.get(message.guild.id)).map(i => i[1].content);
        chain.addData(data);
        let out: string|MarkovResult = '';
        try {
            out = chain.generate({
                maxTries: 20,
                prng: Math.random,
                filter: (result) => {
                    return result.string.split(' ').length >= 1; // at least a word!
                }
            });
        } catch (e) {
            out = '';
            message.reply('Failed. (Not enough data?)');
            log('e', `Failed to generate markov chain: ${e}`);
            return;
        }
        log('i', `Generated: ${out.string}`);
        message.reply(out.string.replace(/<@!(?.)+>/g, ''));
    } else if (['privacy'].includes(args[0].toLowerCase())) {
        log('i', 'Sending privacy info...');
        message.reply('Sending the privacy policy to your DM...').then((m: discord.Message) => {
            message.author.send(`**Privacy info about ProtoBot's markov generation**

All ProtoBot staff are careful about your privacy.
This message contains all you need to know about how we handle your data.

**Data we collect**
When ProtoBot sees a message from an opted-in member, ProtoBot will collect this message.

The exact data collected is:
- *The message content*
- *The message's guild (server) ID*
- *The message's author ID*
- *The message's ID*

**When your data is used**
This message data is only used when fed into the Markov generator for that guild.

**Opting Out**
To stop data collection, run \`${client.config.prefixes[0]}markov optout\`.

**How long we keep the data**
We keep this data forever, until the database gets too large.
You may request deletion of your data, however!

**Viewing your data**
Please DM \`BadBoyHaloCat#1826\` on Discord and state what data you would like.
We will provide as much info as possible.

**Deleting your data**
Please DM \`BadBoyHaloCat#1826\` on Discord and state what data you would like deleted.
We will delete as much info as you would like, as long as it is **your** data.`).then(() => {
    m.edit('Sent the privacy policy to your DM!');
    log('i', 'Sent privacy info.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}).catch((err: any) => {
    m.edit('Failed to send privacy policy. Please enable DMs!');
    log('e', `Failed to send privacy info: ${err}`);
});
        })
    } else {
        message.reply(`Try ${client.config.prefixes[0]}markov for help!`);
    }
}

// Config
export const config = {
    name: 'markov',
    description: 'Do some magic with the built-in markov chain generator!',
    enabled: true,
    
    // To restrict the command, change the "false" to the following
    // format:
    // 
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
