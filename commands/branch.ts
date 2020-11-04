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

    let embed: discord.MessageEmbed = new discord.MessageEmbed()
        .setTitle('Branch Switch')
        .setDescription(`Please wait.. Switching to \`${  args[0]  }\`...`)
        .addField('Status', `\`$ git branch ${  args[0]  }\``);

    message.channel.send(embed).then((m: discord.Message) => {
        exec(`git branch ${args[0]}`, (error: ExecException|null, stdout: string, stderr: string) => {
            if (error || stderr !== '') {
                embed = new discord.MessageEmbed()
                    .setTitle('Branch Switch [Failed]')
                    .setDescription('The branch switch failed.')
                
                if (error) {
                    embed.addField('ExecError:', error);
                }
                if (stderr) {
                    embed.addField('STDERR', stderr ?? '<none>');
                }
                if (stdout) {
                    embed.addField('STDOUT', stdout ?? '<none>');
                }

                m.edit(embed);
            } else {
                embed = new discord.MessageEmbed()
                    .setTitle('Branch Switch [Complete]')
                    .setDescription('The branch switch completed!')
                    .addField('STDOUT', stdout ?? '<none>');
                
                m.edit(embed);
            }
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