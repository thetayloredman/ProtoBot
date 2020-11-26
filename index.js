"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Support source maps
require("source-map-support/register");
// Modules
const discord_js_1 = __importDefault(require("discord.js"));
const enmap_1 = __importDefault(require("enmap"));
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
// Log import
const log_1 = __importDefault(require("./log"));
// Config import
const config_1 = __importDefault(require("./config"));
// Initialize client
const client = new discord_js_1.default.Client();
// Set config in
client.config = config_1.default;
// Defaults
client.defaults = {};
client.defaults.USER_STATS = { hugs: 0 };
client.defaults.USER_CONFS = { markov_optin: false };
// dbs
client.cooldowns = new enmap_1.default({ name: 'cooldowns' });
client.tildes = new enmap_1.default({ name: 'tildes' });
client.owos = new enmap_1.default({ name: 'owos' });
client.uwus = new enmap_1.default({ name: 'uwus' });
client.ustats = new enmap_1.default({ name: 'ustats' });
client.uconfs = new enmap_1.default({ name: 'uconfs' });
client.markovMessages = new enmap_1.default({ name: 'markovMessages' });
client.gconfs = new enmap_1.default({ name: 'gconfs' });
client.fursonas = new enmap_1.default({ name: 'fursonas' });
// in memory dbs
client.commands = new enmap_1.default();
client.commandsConfig = new enmap_1.default();
client.commandsRefs = new enmap_1.default(); // Refs are basically aliases that "link" to the actual command
client.modules = new enmap_1.default();
// Ready event
client.on('ready', async () => {
    var _a, _b, _c;
    console.clear();
    const userCountsPerGuild = client.guilds.cache.map((g) => g.memberCount - 1);
    let userTotal = 0;
    // eslint-disable-next-line no-extra-parens
    userCountsPerGuild.forEach((item) => (userTotal += item));
    const userAvg = userTotal / userCountsPerGuild.length;
    log_1.default('i', 'Ready!');
    log_1.default('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('BOT')}${chalk_1.default.green(']')} Username: ${(_b = chalk_1.default.red((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag)) !== null && _b !== void 0 ? _b : '(error: client.user is undefined)'}`);
    log_1.default('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('GUILDS')}${chalk_1.default.green(']')} In ${chalk_1.default.red(client.guilds.cache.size)} guilds!`);
    log_1.default('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('CHANNELS')}${chalk_1.default.green(']')} With ${chalk_1.default.red(client.channels.cache.size)} channels!`);
    log_1.default('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('USERS')}${chalk_1.default.green(']')} Total ${chalk_1.default.red(userTotal)} users! (${chalk_1.default.red('excluding')} ${chalk_1.default.red.bold('self')})`);
    log_1.default('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('USERAVG')}${chalk_1.default.green(']')} Average user count per guilds: ${chalk_1.default.red(Math.round(userAvg))}`);
    log_1.default('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('PREFIXES')}${chalk_1.default.green(']')} Loaded ${chalk_1.default.red(client.config.prefixes.length)} prefixes!`);
    function loadCmds() {
        function l(type, message) {
            log_1.default(type, `${chalk_1.default.yellow('[')}${chalk_1.default.yellow.bold('CMDLOAD')}${chalk_1.default.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial command load...');
        fs.readdir(client.config.dirs.commands, (err, files) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.commands}:`);
                // @ts-ignore
                l('e', err);
            }
            else {
                files.forEach((path) => {
                    var _a;
                    if (path.endsWith('.ts')) {
                        if (!files.includes(path.replace('.ts', '.js'))) {
                            l('e', `UncompiledCommandWarning: Found a .ts file: ${path}, that wasn't paired with a compiled .js file!`);
                            l('e', `${chalk_1.default.blue('[')}${chalk_1.default.blue.bold('HINT')}${chalk_1.default.blue(']')} Did you forget to run ${chalk_1.default.inverse('tsc')}?`);
                            l('e', `Failed to load command ${path.replace('.ts', '')}.`);
                        }
                    }
                    else if (path.endsWith('.js')) {
                        // show scrapped cmd warning
                        if (!files.includes(path.replace('.js', '.ts'))) {
                            l('w', `CommandScrapWarning: Found a .js file: ${path}, that wasn't paired with a .ts file!`);
                            l('w', 'Still loading scrapped command!');
                            l('w', `${chalk_1.default.blue('[')}${chalk_1.default.blue.bold('HINT')}${chalk_1.default.blue(']')} Did you delete a command without deleting the .js file?`);
                        }
                        if (path.replace('.js', '').toLowerCase() !== path.replace('.js', '')) {
                            l('w', `CommandCasedWarning: Command at ${path} has a name with a capital letter!`);
                            l('w', `Will be loaded as "${path.replace('.js', '').toLowerCase()}"!`);
                            path = path.toLowerCase();
                        }
                        // normal load
                        const commandData = require(client.config.dirs.commands.endsWith('/')
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
                        ((_a = commandData.config.aliases) !== null && _a !== void 0 ? _a : []).forEach((alias) => {
                            l('i', `Loaded alias ${alias}!`);
                            client.commandsRefs.set(alias, cmdName);
                        });
                        l('i', `Finished loading command "${cmdName}"!`);
                    }
                    else if (path.endsWith('.map')) {
                        return;
                    }
                    else {
                        // unknown ext
                        l('w', `File in commands dir with unknown extension: ${path}`);
                    }
                });
            }
        });
    }
    loadCmds();
    function loadMods() {
        function l(type, message) {
            log_1.default(type, `${chalk_1.default.yellow('[')}${chalk_1.default.yellow.bold('MODLOAD')}${chalk_1.default.yellow(']')} ${message}`);
        }
        l('i', 'Beginning initial module load...');
        fs.readdir(client.config.dirs.modules, (err, files) => {
            if (err) {
                l('e', `Failed to read directory ${client.config.dirs.modules}:`);
                // @ts-ignore
                l('e', err);
            }
            else {
                files.forEach((path) => {
                    if (path.endsWith('.ts')) {
                        if (!files.includes(path.replace('.ts', '.js'))) {
                            l('e', `UncompiledModuleWarning: Found a .ts file: ${path}, that wasn't paired with a compiled .js file!`);
                            l('e', `${chalk_1.default.blue('[')}${chalk_1.default.blue.bold('HINT')}${chalk_1.default.blue(']')} Did you forget to run ${chalk_1.default.inverse('tsc')}?`);
                            l('e', `Failed to load module ${path.replace('.ts', '')}.`);
                        }
                    }
                    else if (path.endsWith('.js')) {
                        // show scrapped cmd warning
                        if (!files.includes(path.replace('.js', '.ts'))) {
                            l('w', `ModuleScrapWarning: Found a .js file: ${path}, that wasn't paired with a .ts file!`);
                            l('w', 'Still loading scrapped module!');
                            l('w', `${chalk_1.default.blue('[')}${chalk_1.default.blue.bold('HINT')}${chalk_1.default.blue(']')} Did you delete a module without deleting the .js file?`);
                        }
                        // normal load
                        const moduleData = require(client.config.dirs.modules.endsWith('/')
                            ? client.config.dirs.modules + path
                            : `${client.config.dirs.modules}/${path}`);
                        const modName = path.replace('.js', '');
                        l('i', `Loading module "${modName}"...`);
                        client.modules.set(modName, moduleData);
                        l('i', `Finished loading module "${modName}"!`);
                    }
                    else if (path.endsWith('.map')) {
                        return;
                    }
                    else {
                        // unknown ext
                        l('w', `File in modules dir with unknown extension: ${path}`);
                    }
                });
            }
        });
    }
    loadMods();
    // Status
    (_c = client.user) === null || _c === void 0 ? void 0 : _c.setActivity(`${client.config.prefixes[0]}about | Written for furries, by furries!`, { type: 'PLAYING' });
});
// Message handler
client.on('message', (message) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    client.ustats.ensure(message.author.id, client.defaults.USER_STATS);
    client.uconfs.ensure(message.author.id, client.defaults.USER_CONFS);
    if (message.author.bot || message.channel.type === 'dm') {
        // exit
        return;
    }
    // @ts-ignore
    client.modules.forEach((moduleData) => {
        log_1.default('i', `${chalk_1.default.green('[')}${chalk_1.default.green.bold('ModuleRunner')}${chalk_1.default.green(']')} Running module ${moduleData.config.name}!`);
        moduleData.run(client, message, log_1.default);
    });
    let msgIsCommand = false;
    let prefixLen = 0;
    client.config.prefixes.forEach((item) => {
        if (!msgIsCommand && message.content.toLowerCase().startsWith(item)) {
            msgIsCommand = true;
            prefixLen = item.length;
        }
    });
    if (msgIsCommand) {
        const args = message.content.slice(prefixLen).split(/ +/g);
        let command = (_b = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
        if (!command) {
            // exit
            return;
        }
        log_1.default('i', `Running command "${command}" for "${message.author.tag}" with args "${args.join(' ')}"!`);
        log_1.default('i', `Command found at: ${(_d = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : 'unknown'} (${(_f = (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : 'unknown'}) => #${(_h = (_g = message.channel) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : '#unknown'} (${(_k = (_j = message.channel) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : 'unknown'}) => ${message.id}`);
        log_1.default('i', 'Resolving alias...');
        command = client.commandsRefs.get(command);
        log_1.default('i', `Alias resolved to "${command}"!`);
        const commandExec = (_l = client.commands.get(command)) === null || _l === void 0 ? void 0 : _l.run;
        const commandConfig = (_m = client.commands.get(command)) === null || _m === void 0 ? void 0 : _m.config;
        if (!commandExec) {
            // exit
            log_1.default('i', `Failed to find command "${command}", exiting handler.`);
            return;
        }
        else {
            // Now we check for specific things to prevent the command from running
            // in it's configuration.
            if (!commandConfig.enabled) {
                log_1.default('i', 'Command is disabled!');
                message.reply('That command is disabled!');
                return;
            }
            if (commandConfig.restrict !== false && commandConfig.restrict !== undefined) {
                // Command is restricted!
                if (!((_o = commandConfig.restrict.users) !== null && _o !== void 0 ? _o : []).includes(message.author.id) && client.config.ownerID !== message.author.id) {
                    if (client.config.ownerID !== message.author.id) {
                        // User isn't authorized.
                        //
                        // Reasoning for this:
                        // - Command is restricted
                        // - They aren't one of the allowed users
                        // - They aren't the owner
                        log_1.default('i', 'User unauthorized!');
                        message.reply("You aren't authorized to do that!");
                        return;
                    }
                }
            }
            commandExec(client, message, args, log_1.default);
        }
    }
});
// Handle rate limits
client.on('rateLimit', (data) => {
    log_1.default('w', 'Got hit with a ratelimit!');
    log_1.default('w', `Ratelimited when performing ${data.method} ${data.path}`);
    log_1.default('w', `API route was ${data.route} and limit hit was ${data.limit}/${data.timeout}ms (${data.timeout / 1000} seconds).`);
    log_1.default('w', 'Operations have been paused until the ratelimit is lifted!');
});
// When the process exits, wrap up.
process.on('exit', (code) => {
    client.destroy(); // Kill the client
    // NOTE: you can't log here
});
// If we get an uncaught exception, close ASAP.
process.on('uncaughtException', async (error) => {
    var _a, _b;
    client.destroy();
    log_1.default('e', 'An uncaught exception occured!');
    log_1.default('e', `Error thrown was:`);
    (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split('\n').forEach((item) => {
        log_1.default('e', `${item}`);
    });
    log_1.default('e', 'Stack trace dump:');
    let stack = (_b = new Error().stack) === null || _b === void 0 ? void 0 : _b.split('\n');
    stack === null || stack === void 0 ? void 0 : stack.shift();
    if (!stack) {
        stack = [];
    }
    stack.forEach((item) => {
        log_1.default('e', `${item}`);
    });
    log_1.default('e', 'Process exiting.');
    log_1.default('e', 'Exit code 5.');
    log_1.default('e', 'Goodbye!');
    await log_1.default('CLOSE_STREAMS');
    process.exit(5);
});
// Log in
client.login(client.config.token);
//# sourceMappingURL=index.js.map