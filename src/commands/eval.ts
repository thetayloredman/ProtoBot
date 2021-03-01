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

// Main
export async function run(
    client: Client,
    message: Message,
    args: string[],
    log: (mode: 'v' | 'i' | 'w' | 'e', message: string) => void
): Promise<void> {
    /**
     * Credit to WilsonTheWolf for some of this eval code!
     */
    // Safety check
    let silent = false;
    if (args[0] === '-s') {
        args.shift();
        silent = true;
    }
    let code: string = args.join(' ');
    if (message.author.id !== client.config.ownerID) {
        log(
            'w',
            `User ${message.author.tag} tried to use eval! Code:
${code}`
        );
        message.reply("You don't have permission to do that!");
        return;
    }

    const embed = new discord.MessageEmbed().setFooter(`Eval command executed by ${message.author.username}`).setTimestamp();
    let msg;
    let response;
    let e = false;
    try {
        if (code.includes('await') && !message.content.includes('\n')) {
            code = `( async () => {return ${code}})()`;
        } else if (code.includes('await') && message.content.includes('\n')) {
            code = `( async () => {${code}})()`;
        }
        // eslint-disable-next-line no-eval
        response = await eval(code);
        if (typeof response !== 'string') {
            response = require('util').inspect(response, { depth: 3 });
        }
    } catch (err) {
        e = true;
        response = err.toString();
        const Linter = require('eslint').Linter;
        const linter = new Linter();
        const lint = linter.verify(code, {
            env: { commonjs: true, es2021: true, node: true },
            extends: 'eslint:recommended',
            parserOptions: { ecmaVersion: 12 }
        });
        const error = lint.find((e: any) => e.fatal);
        if (error) {
            const line = code.split('\n')[error.line - 1];
            const match = line.slice(error.column - 1).match(/\w+/i);
            const length = match ? match[0].length : 1;
            response = `${line}
${' '.repeat(error.column - 1)}${'^'.repeat(length)}
[${error.line}:${error.column}] ${error.message} `;
        }
    }
    const length = `\`\`\`${response}\`\`\``.length;
    embed
        .setTitle(e ? '**Error**' : '**Success**')
        .setColor(e ? 'RED' : 'GREEN')
        .setDescription(`\`\`\`${response.substr(0, 2042)}\`\`\``);
    if (length >= 2049 && !silent) {
        // dont do this on silent items
        log(e ? 'e' : 'i', `An eval command executed by ${message.author.username}'s response was too long (${length}/2048).`);
        log(e ? 'e' : 'i', `Error: ${e ? 'Yes' : 'No'}`);
        log(e ? 'e' : 'i', 'Output:');
        response.split('\n').forEach((b: string) => {
            log(e ? 'e' : 'i', b);
        });
        embed.addField('Note:', `The response was too long with a length of \`${length}/2048\` characters. it was logged to the console. `);
    } else if (!silent) {
        // use different log for silent items
        log(e ? 'e' : 'i', `An eval command has been executed by ${message.author.username}!`);
        log(e ? 'e' : 'i', `Error: ${e ? 'Yes' : 'No'}`);
        log(e ? 'e' : 'i', 'Output:');
        response.split('\n').forEach((b: string) => {
            log(e ? 'e' : 'i', b);
        });
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
            log('e', 'Failed to delete command message with silent eval!');
        });
        log(e ? 'e' : 'i', 'Silent eval output:');
        log(e ? 'e' : 'i', `Error: ${e ? 'Yes' : 'No'}`);
        log(e ? 'e' : 'i', 'Output:');
        response.split('\n').forEach((b: string) => {
            log(e ? 'e' : 'i', b);
        });
    }
}

// Config
export const config = {
    name: 'eval',
    description: 'Execute code!',
    enabled: true,
    aliases: ['e'],

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {} // owner only
};
