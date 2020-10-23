// DFur
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
// | | DFur is licensed under exclusive            | |
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
import config from './config';
import { DFurConfig } from './config';

// Interfaces, owo
interface Client extends discord.Client {
    config?: DFurConfig
}

// Initialize client~
const client: Client = new discord.Client();

// Set config in
client.config = config;

// Ready event
client.on('ready', () => {
    log('i', 'Ready!');
    log('i', `${chalk.green('[')}${chalk.green.bold('GUILDS')}${chalk.green(']')} In ${chalk.red(client.guilds.cache.size)} guilds!`);
    log('i', `${chalk.green('[')}${chalk.green.bold('CHANNELS')}${chalk.green(']')} With ${chalk.red(client.channels.cache.size)} channels!`);
    log('i', `${chalk.green('[')}${chalk.green.bold('USERS')}${chalk.green(']')} Total ${chalk.red(client.users.cache.size - 1)} users! (${chalk.red('excluding')} ${chalk.red.bold('self')})`);
});

// Log in
client.login(client.config.token);