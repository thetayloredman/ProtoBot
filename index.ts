// ProtoBot
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
import enmap from 'enmap';
import chalk from 'chalk';
import * as fs from 'fs';

// Log import
import log from './log';

// Config import
import config, { ProtoBotConfig } from './config';

// Interfaces, owo
interface Client extends discord.Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

// Initialize client
const client: Client = new discord.Client();

// Set config in
client.config = config;

// Defaults
client.defaults = {};
client.defaults.USER_STATS = { hugs: 0 };

// dbs
client.cooldowns = new enmap({ name: 'cooldowns' });
client.tildes = new enmap({ name: 'tildes' });
client.owos = new enmap({ name: 'owos' });
client.uwus = new enmap({ name: 'uwus' });
client.ustats = new enmap({ name: 'ustats' });

// in memory dbs
client.commands = new enmap();
client.commandsConfig = new enmap();
client.modules = new enmap();

// Ready event
client.on('ready', async () => {
    console.clear();
    log('i', 'Ready!');
    log('i', `${chalk.green('[')}${chalk.green.bold('BOT')}${chalk.green(']')} Username: ${chalk.red(client.user?.tag) ?? '(error: client.user is undefined)'}`);
    log('i', `${chalk.green('[')}${chalk.green.bold('GUILDS')}${chalk.green(']')} In ${chalk.red(client.guilds.cache.size)} guilds!`);
    log('i', `${chalk.green('[')}${chalk.green.bold('CHANNELS')}${chalk.green(']')} With ${chalk.red(client.channels.cache.size)} channels!`);
    log('i', `${chalk.green('[')}${chalk.green.bold('USERS')}${chalk.green(']')} Total ${chalk.red(client.users.cache.size - 1)} users! (${chalk.red('excluding')} ${chalk.red.bold('self')})`);
    log('i', `${chalk.green('[')}${chalk.green.bold('PREFIXES')}${chalk.green(']')} Loaded ${chalk.red(client.config.prefixes.length)} prefixes!`);
    function loadCmds(): void {
        function l(type: 'i'|'w'|'e', message: string) {
            log(type, `${chalk.yellow('[')}${chalk.yellow.bold('CMDLOAD')}${chalk.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial command load...');
        // eslint-disable-next-line no-undef
        fs.readdir(client.config.dirs.commands, (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.commands}:`);
                // @ts-ignore
                l('e', err);
            } else {
                files.forEach((path: string) => {
                    if (path.endsWith('.ts')) {
                        if (!files.includes(path.replace('.ts', '.js'))) {
                            l('e', 'UncompiledCommandWarning: Found a .ts file: ' + path + ', that wasn\'t paired with a compiled .js file!');
                            l('e', `${chalk.blue('[')}${chalk.blue.bold('HINT')}${chalk.blue(']')} Did you forget to run ${chalk.inverse('tsc')}?`);
                            l('e', `Failed to load command ${path.replace('.ts', '')}.`);
                        }
                    } else if (path.endsWith('.js')) {
                        // show scrapped cmd warning
                        if (!files.includes(path.replace('.js', '.ts'))) {
                            l('w', 'CommandScrapWarning: Found a .js file: ' + path + ', that wasn\'t paired with a .ts file!');
                            l('w', 'Still loading scrapped command!');
                            l('w', `${chalk.blue('[')}${chalk.blue.bold('HINT')}${chalk.blue(']')} Did you delete a command without deleting the .js file?`);
                        }
                        // normal load
                        const commandData = require(client.config.dirs.commands.endsWith('/') ? client.config.dirs.commands + path : client.config.dirs.commands + '/' + path);
                        const cmdName: string = path.replace('.js', '');
                        l('i', `Loading command "${cmdName}"...`);
                        client.commandsConfig.set(cmdName, commandData.config);
                        client.commands.set(cmdName, commandData);
                        l('i', `Finished loading command "${cmdName}"!`);
                    } else {
                        // unknown ext
                        l('w', 'File in commands dir with unknown extension: ' + path);
                    }
                });
            }
        });
    }
    loadCmds();
    function loadMods(): void {
        function l(type: 'i'|'w'|'e', message: string) {
            log(type, `${chalk.yellow('[')}${chalk.yellow.bold('MODLOAD')}${chalk.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial module load...');
        // eslint-disable-next-line no-undef
        fs.readdir(client.config.dirs.modules, (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.modules}:`);
                // @ts-ignore
                l('e', err);
            } else {
                files.forEach((path: string) => {
                    if (path.endsWith('.ts')) {
                        if (!files.includes(path.replace('.ts', '.js'))) {
                            l('e', 'UncompiledModuleWarning: Found a .ts file: ' + path + ', that wasn\'t paired with a compiled .js file!');
                            l('e', `${chalk.blue('[')}${chalk.blue.bold('HINT')}${chalk.blue(']')} Did you forget to run ${chalk.inverse('tsc')}?`);
                            l('e', `Failed to load module ${path.replace('.ts', '')}.`);
                        }
                    } else if (path.endsWith('.js')) {
                        // show scrapped cmd warning
                        if (!files.includes(path.replace('.js', '.ts'))) {
                            l('w', 'ModuleScrapWarning: Found a .js file: ' + path + ', that wasn\'t paired with a .ts file!');
                            l('w', 'Still loading scrapped module!');
                            l('w', `${chalk.blue('[')}${chalk.blue.bold('HINT')}${chalk.blue(']')} Did you delete a module without deleting the .js file?`);
                        }
                        // normal load
                        const moduleData = require(client.config.dirs.modules.endsWith('/') ? client.config.dirs.modules + path : client.config.dirs.modules + '/' + path);
                        const modName: string = path.replace('.js', '');
                        l('i', `Loading module "${modName}"...`);
                        client.modules.set(modName, moduleData);
                        l('i', `Finished loading module "${modName}"!`);
                    } else {
                        // unknown ext
                        l('w', 'File in modules dir with unknown extension: ' + path);
                    }
                });
            }
        });
    }
    loadMods();
});

// Message handler
client.on('message', (message: discord.Message) => {
    client.ustats.ensure(message.author.id, client.defaults.USER_STATS);
    if (message.author.bot) {
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
        const command: string|undefined = args.shift();
        if (!command) {
            // exit
            return;
        }

        const commandExec: (client: discord.Client, message: discord.Message, args: string[], log: (mode: 'i'|'w'|'e', message: string) => void) => void|undefined = client.commands.get(command)?.run;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const commandConfig: any = client.commands.get(command)?.config;
        if (!commandExec) {
            // exit
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
                        message.reply('You aren\'t authorized to do that!');
                        return;
                    }
                }
            }
            log('i', 'Running command!');
            commandExec(client, message, args, log);
        }
    }
});

// Log in
client.login(client.config.token);
