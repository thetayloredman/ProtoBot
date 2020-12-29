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

// Aliases
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    '@lib': __dirname + '/lib',
    '@root': __dirname + '/'
});

// Support source maps
// source map much uwu
import 'source-map-support/register';

// Modules
import * as fs from 'fs';
import chalk from 'chalk';
import Client from '@lib/Client';
import discord from 'discord.js';
import type Command from '@lib/interfaces/Command';

// Log import
import log from './log';

// Initialize client
const client = new Client();

// Ready event
client.on('ready', async () => {
    console.clear();
    const userCountsPerGuild = client.guilds.cache.map((g) => g.memberCount - 1);
    let userTotal = 0;
    userCountsPerGuild.forEach((item) => (userTotal += item));
    const userAvg = userTotal / userCountsPerGuild.length;
    // prettier-ignore
    (() => {
        log('i', 'PPPPPPPPPPPPPPPPP                                                 tttt                           BBBBBBBBBBBBBBBBB                             tttt');
        log('i', 'P::::::::::::::::P                                             ttt:::t                           B::::::::::::::::B                         ttt:::t');
        log('i', 'P::::::PPPPPP:::::P                                            t:::::t                           B::::::BBBBBB:::::B                        t:::::t');
        log('i', 'PP:::::P     P:::::P                                           t:::::t                           BB:::::B     B:::::B                       t:::::t');
        log('i', '  P::::P     P:::::Prrrrr   rrrrrrrrr      ooooooooooo   ttttttt:::::ttttttt       ooooooooooo     B::::B     B:::::B   ooooooooooo   ttttttt:::::ttttttt');
        log('i', '  P::::P     P:::::Pr::::rrr:::::::::r   oo:::::::::::oo t:::::::::::::::::t     oo:::::::::::oo   B::::B     B:::::B oo:::::::::::oo t:::::::::::::::::t');
        log('i', '  P::::PPPPPP:::::P r:::::::::::::::::r o:::::::::::::::ot:::::::::::::::::t    o:::::::::::::::o  B::::BBBBBB:::::B o:::::::::::::::ot:::::::::::::::::t');
        log('i', '  P:::::::::::::PP  rr::::::rrrrr::::::ro:::::ooooo:::::otttttt:::::::tttttt    o:::::ooooo:::::o  B:::::::::::::BB  o:::::ooooo:::::otttttt:::::::tttttt');
        log('i', '  P::::PPPPPPPPP     r:::::r     r:::::ro::::o     o::::o      t:::::t          o::::o     o::::o  B::::BBBBBB:::::B o::::o     o::::o      t:::::t');
        log('i', '  P::::P             r:::::r     rrrrrrro::::o     o::::o      t:::::t          o::::o     o::::o  B::::B     B:::::Bo::::o     o::::o      t:::::t');
        log('i', '  P::::P             r:::::r            o::::o     o::::o      t:::::t          o::::o     o::::o  B::::B     B:::::Bo::::o     o::::o      t:::::t');
        log('i', '  P::::P             r:::::r            o::::o     o::::o      t:::::t    tttttto::::o     o::::o  B::::B     B:::::Bo::::o     o::::o      t:::::t    tttttt');
        log('i', 'PP::::::PP           r:::::r            o:::::ooooo:::::o      t::::::tttt:::::to:::::ooooo:::::oBB:::::BBBBBB::::::Bo:::::ooooo:::::o      t::::::tttt:::::t');
        log('i', 'P::::::::P           r:::::r            o:::::::::::::::o      tt::::::::::::::to:::::::::::::::oB:::::::::::::::::B o:::::::::::::::o      tt::::::::::::::t');
        log('i', 'P::::::::P           r:::::r             oo:::::::::::oo         tt:::::::::::tt oo:::::::::::oo B::::::::::::::::B   oo:::::::::::oo         tt:::::::::::tt');
        log('i', 'PPPPPPPPPP           rrrrrrr               ooooooooooo             ttttttttttt     ooooooooooo   BBBBBBBBBBBBBBBBB      ooooooooooo             ttttttttttt');
    })()
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
        function l(type: 'i' | 'w' | 'e', message: any) {
            log(type, `${chalk.yellow('[')}${chalk.yellow.bold('CMDLOAD')}${chalk.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial command load...');
        fs.readdir(client.config.dirs.commands, (err, files) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.commands}:`);
                l('e', err);
            } else {
                files.forEach((path) => {
                    if (path.endsWith('.js')) {
                        if (path.replace('.js', '').toLowerCase() !== path.replace('.js', '')) {
                            l('w', `CommandCasedWarning: Command at ${path} has a name with a capital letter!`);
                            l('w', `Will be loaded as "${path.replace('.js', '').toLowerCase()}"!`);
                            path = path.toLowerCase();
                        }
                        // normal load
                        const commandData = <Command>require(client.config.dirs.commands.endsWith('/')
                            ? client.config.dirs.commands + path
                            : `${client.config.dirs.commands}/${path}`);
                        const cmdName = path.replace('.js', '');
                        l('i', `Loading command "${cmdName}"...`);
                        client.commandsConfig.set(cmdName, commandData.config);
                        client.commands.set(cmdName, commandData);
                        // Load aliases into the refs along with the base command
                        l('i', `Loading command aliases for ${cmdName}...`);
                        l('i', 'Loaded base alias!');
                        client.commandsRefs.set(cmdName, cmdName); // base
                        (commandData.config.aliases ?? []).forEach((alias) => {
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
        function l(type: 'i' | 'w' | 'e', message: any) {
            log(type, `${chalk.yellow('[')}${chalk.yellow.bold('MODLOAD')}${chalk.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial module load...');
        fs.readdir(client.config.dirs.modules, (err, files) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.modules}:`);
                l('e', err);
            } else {
                files.forEach((path: string) => {
                    if (path.endsWith('.js')) {
                        // normal load
                        const moduleData = require(client.config.dirs.modules.endsWith('/')
                            ? client.config.dirs.modules + path
                            : `${client.config.dirs.modules}/${path}`);
                        const modName = path.replace('.js', '');
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
    client.cooldowns.ensure(message.author.id, client.defaults.COOLDOWNS);
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
    let prefixUsed;
    for (const prefix of client.config.prefixes) {
        if (message.content.toLowerCase().startsWith(prefix)) {
            msgIsCommand = true;
            prefixLen = prefix.length;
            prefixUsed = prefix;
            break;
        }
    }

    // if it's a command, we handle it.
    if (msgIsCommand) {
        const args: string[] = message.content.slice(prefixLen).split(/ +/g);
        let command = args.shift()?.toLowerCase() ?? '';

        // quit if the command couldn't be fetched
        if (!command) {
            return;
        }

        // verbose info
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

        const commandData: Command | undefined = client.commands.get(command);
        if (!commandData) {
            // exit
            log('i', `Failed to find command "${command}", exiting handler.`);
            return;
        }

        const { run: commandExec, config: commandConfig } = commandData;
        // Now we check for specific things to prevent the command from running
        // in it's configuration.
        if (!commandConfig.enabled) {
            log('i', 'Command is disabled!');
            message.reply('That command is disabled!');
            return;
        }
        if (
            commandConfig.restrict &&
            commandConfig.restrict.users &&
            !commandConfig.restrict.users.includes(message.author.id) &&
            message.author.id !== client.config.ownerID
        ) {
            // User isn't authorised; the user is either not whitelisted to use the command and/or they're not an owner.
            log('i', 'User unauthorized!');
            message.reply("You aren't authorized to do that!");
            return;
        }
        commandExec(client, message, args, log);
    }
});

// Handle rate limits
client.on('rateLimit', (data) => {
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
process.on('uncaughtException', async (error) => {
    client.destroy();
    log('e', 'An uncaught exception occured!');
    log('e', `Error thrown was:`);
    error.stack?.split('\n').forEach((item) => {
        log('e', `${item}`);
    });
    log('e', 'Stack trace dump:');
    let stack = new Error().stack?.split('\n');
    stack?.shift();
    if (!stack) {
        stack = [];
    }
    stack.forEach((item) => {
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
