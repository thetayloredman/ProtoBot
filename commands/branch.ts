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
import { exec, ExecException } from 'child_process';

// Interfaces, owo
interface Client extends discord.Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

// Main
export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i'|'w'|'e', message: string) => void): void {
    // Safety check
    if (message.author.id !== client.config.ownerID) {
        console.log('w', `User ${message.author.tag} tried to use branch! Destination: ${args[0]}`);
        message.reply('You don\'t have permission to do that!');
        return;
    }

    if (!args[0]) {
        message.reply('What branch did you want to switch to, tho?');
    }

    let embed: discord.MessageEmbed = new discord.MessageEmbed()
        .setTitle('Branch Switch')
        .setDescription(`Please wait.. Switching to \`${args[0]}\`...`)
        .addField('Status', `\`$ git branch ${args[0]}\``);

    message.channel.send(embed).then((m: discord.Message) => {
        exec(`git checkout ${args[0]}`, (error: ExecException|null, stdout: string, stderr: string) => {
           
            embed = new discord.MessageEmbed()
                // eslint-disable-next-line no-constant-condition
                .setTitle(`Branch Switch [${stderr.startsWith('Switched') ? 'Complete' : 'Failed'}]`)
                .setDescription(stderr.startsWith('Switched') ? `Switched to branch ${args[0]}` : 'Failed to switch to branch. (Does it exist?)');
                
            if (stderr) {
                embed.addField('Log', `\`\`\`
${stderr ?? '<none>'}${stdout !== '' ? `\n${stdout}` : ''}
\`\`\``);
            }

            m.edit(embed);
            
        });
    });
}

// Config
export const config = {
    name: 'branch',
    description: 'Changes the current branch [owner only]',
    enabled: true,
    
    // To restrict the command, change the "false" to the following
    // format:
    // 
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {  } // owner only
};
