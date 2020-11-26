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

// Aliases go brrrr
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    '@lib': __dirname + '/lib',
    '@root': __dirname + '/'
});

// Support source maps
import 'source-map-support/register';

// Modules
import discord from 'discord.js';
import enmap from 'enmap';
import chalk from 'chalk';
import * as fs from 'fs';
import Client from '@lib/Client';

// Log import
import log from './log';
import CommandConfig from '@lib/interfaces/CommandConfig';

// Initialize client
const client: Client = new Client();

// Ready event
client.on('ready', async () => {
    console.clear();
    const userCountsPerGuild: number[] = client.guilds.cache.map((g: discord.Guild) => g.memberCount - 1);
    let userTotal = 0;
    // eslint-disable-next-line no-extra-parens
    userCountsPerGuild.forEach((item: number) => (userTotal += item));
    const userAvg = userTotal / userCountsPerGuild.length;
    log('i', 'Ready!');
    log(
        'i',
        `${chalk.green('[')}${chalk.green.bold('BOT')}${chalk.green(']')} Username: ${
            chalk.red(client.user?.tag) ?? '(error: client.user is undefined)'
        }`
    );
    log('i', `${chalk.green('[')}${chalk.green.bold('GUILDS')}${chalk.green(']')} In ${chalk.red(client.guilds.cache.size)} guilds!`);
    log('i', `${chalk.green('[')}${chalk.green.bold('CHANNELS')}${chalk.green(']')} With ${chalk.red(client.channels.cache.size)} channels!`);
    log(
        'i',
        `${chalk.green('[')}${chalk.green.bold('USERS')}${chalk.green(']')} Total ${chalk.red(userTotal)} users! (${chalk.red(
            'excluding'
        )} ${chalk.red.bold('self')})`
    );
    log('i', `${chalk.green('[')}${chalk.green.bold('USERAVG')}${chalk.green(']')} Average user count per guilds: ${chalk.red(Math.round(userAvg))}`);
    log('i', `${chalk.green('[')}${chalk.green.bold('PREFIXES')}${chalk.green(']')} Loaded ${chalk.red(client.config.prefixes.length)} prefixes!`);
    function loadCmds(): void {
        function l(type: 'i' | 'w' | 'e', message: string) {
            log(type, `${chalk.yellow('[')}${chalk.yellow.bold('CMDLOAD')}${chalk.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial command load...');
        fs.readdir(client.config.dirs.commands, (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.commands}:`);
                // @ts-ignore
                l('e', err);
            } else {
                files.forEach((path: string) => {
                    if (path.endsWith('.js')) {
                        if (path.replace('.js', '').toLowerCase() !== path.replace('.js', '')) {
                            l('w', `CommandCasedWarning: Command at ${path} has a name with a capital letter!`);
                            l('w', `Will be loaded as "${path.replace('.js', '').toLowerCase()}"!`);
                            path = path.toLowerCase();
                        }
                        // normal load
                        const commandData = require(client.config.dirs.commands.endsWith('/')
                            ? client.config.dirs.commands + path
                            : `${client.config.dirs.commands}/${path}`);
                        const cmdName: string = path.replace('.js', '');
                        l('i', `Loading command "${cmdName}"...`);
                        client.commandsConfig.set(cmdName, commandData.config);
                        client.commands.set(cmdName, commandData);
                        // Load aliases into the refs along with the base command
                        l('i', `Loading command aliases for ${cmdName}...`);
                        l('i', 'Loaded base alias!');
                        client.commandsRefs.set(cmdName, cmdName); // base
                        (commandData.config.aliases ?? []).forEach((alias: string) => {
                            l('i', `Loaded alias ${alias}!`);
                            client.commandsRefs.set(alias, cmdName);
                        });
                        l('i', `Finished loading command "${cmdName}"!`);
                    } else if (path.endsWith('.map')) {
                        return;
                    } else {
                        // unknown ext
                        l('w', `File in commands dir with unknown extension: ${path}`);
                    }
                });
            }
        });
    }
    loadCmds();
    function loadMods(): void {
        function l(type: 'i' | 'w' | 'e', message: string) {
            log(type, `${chalk.yellow('[')}${chalk.yellow.bold('MODLOAD')}${chalk.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial module load...');
        fs.readdir(client.config.dirs.modules, (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.modules}:`);
                // @ts-ignore
                l('e', err);
            } else {
                files.forEach((path: string) => {
                    if (path.endsWith('.js')) {
                        // normal load
                        const moduleData = require(client.config.dirs.modules.endsWith('/')
                            ? client.config.dirs.modules + path
                            : `${client.config.dirs.modules}/${path}`);
                        const modName: string = path.replace('.js', '');
                        l('i', `Loading module "${modName}"...`);
                        client.modules.set(modName, moduleData);
                        l('i', `Finished loading module "${modName}"!`);
                    } else if (path.endsWith('.map')) {
                        return;
                    } else {
                        // unknown ext
                        l('w', `File in modules dir with unknown extension: ${path}`);
                    }
                });
            }
        });
    }
    loadMods();

    // Status
    client.user?.setActivity(`${client.config.prefixes[0]}about | Written for furries, by furries!`, { type: 'PLAYING' });
});

// Message handler
client.on('message', (message: discord.Message) => {
    client.ustats.ensure(message.author.id, client.defaults.USER_STATS);
    client.uconfs.ensure(message.author.id, client.defaults.USER_CONFS);
    if (message.author.bot || message.channel.type === 'dm') {
        // exit
        return;
    }
    // @ts-ignore
    client.modules.forEach((moduleData) => {
        log('i', `${chalk.green('[')}${chalk.green.bold('ModuleRunner')}${chalk.green(']')} Running module ${moduleData.config.name}!`);
        moduleData.run(client, message, log);
    });
    let msgIsCommand = false;
    let prefixLen = 0;
    client.config.prefixes.forEach((item: string) => {
        if (!msgIsCommand && message.content.toLowerCase().startsWith(item)) {
            msgIsCommand = true;
            prefixLen = item.length;
        }
    });
    if (msgIsCommand) {
        const args: string[] = message.content.slice(prefixLen).split(/ +/g);
        let command: string = args.shift()?.toLowerCase() ?? '';
        if (!command) {
            // exit
            return;
        }

        log('i', `Running command "${command}" for "${message.author.tag}" with args "${args.join(' ')}"!`);
        log(
            'i',
            `Command found at: ${message.guild?.name ?? 'unknown'} (${message.guild?.id ?? 'unknown'}) => #${message.channel?.name ?? '#unknown'} (${
                message.channel?.id ?? 'unknown'
            }) => ${message.id}`
        );

        log('i', 'Resolving alias...');
        command = client.commandsRefs.get(command) ?? '';
        log('i', `Alias resolved to "${command}"!`);

        const commandExec: (
            client: Client,
            message: discord.Message,
            args: string[],
            log: (mode: 'i' | 'w' | 'e', message: string) => void
        ) => void | undefined = client.commands.get(command)?.run;
        const commandConfig: CommandConfig = client.commands.get(command)?.config;
        if (!commandExec) {
            // exit
            log('i', `Failed to find command "${command}", exiting handler.`);
            return;
        } else {
            // Now we check for specific things to prevent the command from running
            // in it's configuration.
            if (!commandConfig.enabled) {
                log('i', 'Command is disabled!');
                message.reply('That command is disabled!');
                return;
            }
            if (commandConfig.restrict !== false && commandConfig.restrict !== undefined) {
                // Command is restricted!
                if (!(commandConfig.restrict.users ?? []).includes(message.author.id) && client.config.ownerID !== message.author.id) {
                    if (client.config.ownerID !== message.author.id) {
                        // User isn't authorized.
                        //
                        // Reasoning for this:
                        // - Command is restricted
                        // - They aren't one of the allowed users
                        // - They aren't the owner
                        log('i', 'User unauthorized!');
                        message.reply("You aren't authorized to do that!");
                        return;
                    }
                }
            }
            commandExec(client, message, args, log);
        }
    }
});

// Handle rate limits
client.on('rateLimit', (data: discord.RateLimitData) => {
    log('w', 'Got hit with a ratelimit!');
    log('w', `Ratelimited when performing ${data.method} ${data.path}`);
    log('w', `API route was ${data.route} and limit hit was ${data.limit}/${data.timeout}ms (${data.timeout / 1000} seconds).`);
    log('w', 'Operations have been paused until the ratelimit is lifted!');
});

// When the process exits, wrap up.
process.on('exit', (code) => {
    client.destroy(); // Kill the client
    // NOTE: you can't log here
});

// If we get an uncaught exception, close ASAP.
process.on('uncaughtException', async (error: Error) => {
    client.destroy();
    log('e', 'An uncaught exception occured!');
    log('e', `Error thrown was:`);
    error.stack?.split('\n').forEach((item: string) => {
        log('e', `${item}`);
    });
    log('e', 'Stack trace dump:');
    let stack = new Error().stack?.split('\n');
    stack?.shift();
    if (!stack) {
        stack = [];
    }
    stack.forEach((item: string) => {
        log('e', `${item}`);
    });
    log('e', 'Process exiting.');
    log('e', 'Exit code 5.');
    log('e', 'Goodbye!');
    await log('CLOSE_STREAMS');
    process.exit(5);
});

// Log in
client.login(client.config.token);
