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
import chalk from 'chalk';
import { exec, ExecException } from 'child_process';
import Client from '@lib/Client';

// Main
export function run(client: Client, message: discord.Message, args: string[], log: (mode: 'i' | 'w' | 'e', message: string) => void): void {
    // Safety check
    if (message.author.id !== client.config.ownerID) {
        log('w', `User ${message.author.tag} tried to use branch! Destination: ${args[0]}`);
        message.reply("You don't have permission to do that!");
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
        exec(`git checkout ${args[0]}`, (error: ExecException | null, stdout: string, stderr: string) => {
            embed = new discord.MessageEmbed()
                .setTitle(`Branch Switch [${stderr.startsWith('Switched') ? 'Complete' : 'Failed'}]`)
                .setDescription(stderr.startsWith('Switched') ? `Switched to branch ${args[0]}` : 'Failed to switch to branch. (Does it exist?)');

            if (stderr) {
                embed.addField(
                    'Log',
                    `\`\`\`
${stderr ?? '<none>'}${stdout !== '' ? `\n${stdout}` : ''}
\`\`\``
                );
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
    aliases: [],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {} // owner only
};
