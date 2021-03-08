/**
 * ProtoBot -- A Discord furry bot
 * Copyright (C) 2020, 2021  BadBoyHaloCat
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
import type Logger from '@lib/interfaces/Logger';

// Main
export function run(client: Client, message: Message, args: string[], log: Logger): void {
    log('i', 'Fursona command fired!');
    // Get their fursona, PLS GIB I WANT AAAA >w<
    if (!args[0]) {
        // If they haven't set one...
        const fursona = client.fursonas.get(message.author.id);
        if (!fursona) {
            log('i', 'No fursona for user!');
            message.reply("You haven't set a fursona yet! To do this, run the command `fursona set`.");
        } else {
            // They have one!
            log('i', 'Displaying fursona!');
            const embed = new discord.MessageEmbed().setTitle('Fursona').setDescription('Here is your current fursona information.');

            embed.addField('Name', fursona.name || '<unset>', true);
            embed.addField('Bio', fursona.bio || '<unset>', true);
            embed.addField('Type', fursona.type || '<unset>');

            message.channel.send(embed);
        }
    } else if (args[0].toLowerCase() === 'set') {
        log('i', 'Setting fursona!');
        if (!args[1]) {
            log('i', 'Showing set help!');
            message.reply(`\`\`\`adoc
===== FURSONA HELP =====
${client.config.prefixes[0]}fursona set name <name> :: Set your fursona's name
${client.config.prefixes[0]}fursona set bio <bio>   :: Set your fursona's bio
${client.config.prefixes[0]}fursona set type <type> :: Set your fursona's breed/type
\`\`\``);
        } else if (args[1].toLowerCase() === 'name') {
            if (!args[2]) {
                const temp = client.fursonas.ensure(message.author.id, {});
                if ('name' in temp) {
                    delete temp.name;
                    message.reply('Deleted value.');
                    client.fursonas.set(message.author.id, temp);
                    return;
                }
                client.fursonas.set(message.author.id, temp);
                message.reply('You need to provide a value!');
                return;
            }
            client.fursonas.ensure(message.author.id, {});
            client.fursonas.set(message.author.id, args.slice(2).join(' '), 'name');
            message.channel.send('Set!');
        } else if (args[1].toLowerCase() === 'bio') {
            if (!args[2]) {
                const temp = client.fursonas.ensure(message.author.id, {});
                if ('bio' in temp) {
                    delete temp.bio;
                    message.reply('Deleted value.');
                    client.fursonas.set(message.author.id, temp);
                    return;
                }
                client.fursonas.set(message.author.id, temp);
                message.reply('You need to provide a value!');
                return;
            }
            client.fursonas.ensure(message.author.id, {});
            client.fursonas.set(message.author.id, args.slice(2).join(' '), 'bio');
            message.channel.send('Set!');
        } else if (args[1].toLowerCase() === 'type') {
            if (!args[2]) {
                const temp = client.fursonas.ensure(message.author.id, {});
                if ('type' in temp) {
                    delete temp.type;
                    message.reply('Deleted value.');
                    client.fursonas.set(message.author.id, temp);
                    return;
                }
                client.fursonas.set(message.author.id, temp);
                message.reply('You need to provide a value!');
                return;
            }
            client.fursonas.ensure(message.author.id, {});
            client.fursonas.set(message.author.id, args.slice(2).join(' '), 'type');
            message.channel.send('Set!');
        } else {
            message.channel.send('Unknown option! Try `fursona set`.');
        }
    }
}

// Config
export const config = {
    name: 'fursona',
    description: 'See/edit your fursona details!',
    enabled: true,
    aliases: ['sona'],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: false
};
