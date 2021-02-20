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

// Modules
import discord from 'discord.js';
import type { Client, Message } from 'discord.js';
import { exec, ExecException } from 'child_process';

// Main
export function run(client: Client, message: Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    // Safety check, because we don't want those hax0rs in
    let silent = false;
    if (args[0] === '-s') {
        args.shift();
        silent = true;
    }
    const code: string = args.join(' ');
    if (message.author.id !== client.config.ownerID) {
        log(
            'w',
            `User ${message.author.tag} tried to use exec! Code:
${code}`
        );
        message.reply("You don't have permission to do that!");
        return;
    }

    const embed = new discord.MessageEmbed().setFooter(`Exec command executed by ${message.author.username}`).setTimestamp();
    let e = false;

    exec(code, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error || stderr) {
            e = true;
        }

        if (stderr) {
            embed.addField('STDERR', `\`\`\`${stderr.substr(0, 2042)}\`\`\``);
        }

        if (stdout) {
            embed.addField('STDOUT', `\`\`\`${stdout.substr(0, 2042)}\`\`\``);
        }

        if (error) {
            embed.addField('ExecError', `\`\`\`${error.toString().substr(0, 2042)}\`\`\``);
        }

        const parsed = [(error ?? { toString: () => '' }).toString(), stderr, stdout].reduce((a, b) => (a.length > b.length ? a : b));

        embed
            .setTitle(e ? '**Error**' : '**Success**')
            .setColor(e ? 'RED' : 'GREEN')
            .setDescription('Here is your output!');

        if (parsed.length >= 2049 && !silent) {
            // dont do this on silent items
            log(e ? 'e' : 'i', `An exec command executed by ${message.author.username}'s response was too long (${parsed.length}/2048).`);
            log(e ? 'e' : 'i', `Error: ${e ? 'Yes' : 'No'}`);
            log(e ? 'e' : 'i', 'Output:');
            if (error) {
                log(e ? 'e' : 'i', 'ExecError:');
                error
                    .toString()
                    .split('\n')
                    .forEach((b: string) => {
                        log(e ? 'e' : 'i', b);
                    });
            }
            if (stderr) {
                log(e ? 'e' : 'i', 'STDERR:');
                stderr.split('\n').forEach((b: string) => {
                    log(e ? 'e' : 'i', b);
                });
            }
            if (stdout) {
                log(e ? 'e' : 'i', 'STDOUT:');
                stdout.split('\n').forEach((b: string) => {
                    log(e ? 'e' : 'i', b);
                });
            }
            embed.addField('Note:', `The response was too long with a length of \`${parsed.length}/2048\` characters. it was logged to the console.`);
        } else if (!silent) {
            // use different log for silent items
            log(e ? 'e' : 'i', `An exec command has been executed by ${message.author.username}!`);
            log(e ? 'e' : 'i', `Error: ${e ? 'Yes' : 'No'}`);
            log(e ? 'e' : 'i', 'Output:');
            if (error) {
                log(e ? 'e' : 'i', 'ExecError:');
                error
                    .toString()
                    .split('\n')
                    .forEach((b: string) => {
                        log(e ? 'e' : 'i', b);
                    });
            }
            if (stderr) {
                log(e ? 'e' : 'i', 'STDERR:');
                stderr.split('\n').forEach((b: string) => {
                    log(e ? 'e' : 'i', b);
                });
            }
            if (stdout) {
                log(e ? 'e' : 'i', 'STDOUT:');
                stdout.split('\n').forEach((b: string) => {
                    log(e ? 'e' : 'i', b);
                });
            }
        }

        if (!silent) {
            try {
                message.channel.send(embed);
            } catch (e) {
                log('e', e);
            }
        } else {
            message.delete().catch(() => {
                // delete silent msg
                log('e', 'Failed to delete command message with silent exec!');
            });
            log(e ? 'e' : 'i', 'Silent exec output:');
            log(e ? 'e' : 'i', `Error: ${e ? 'Yes' : 'No'}`);
            log(e ? 'e' : 'i', 'Output:');
            parsed.split('\n').forEach((b: string) => {
                log(e ? 'e' : 'i', b);
            });
        }
    });
}

// Config
export const config = {
    name: 'exec',
    description: 'Execute a `bash` script! [owner only]',
    enabled: true,
    aliases: ['ex'],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {} // owner only
};
