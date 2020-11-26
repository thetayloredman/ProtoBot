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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.run = void 0;
// Modules
const discord_js_1 = __importDefault(require("discord.js"));
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
// Main
function run(client, message, args, log) {
    // Safety check
    if (message.author.id !== client.config.ownerID) {
        log('w', `User ${message.author.tag} tried to use "update"!`);
        message.reply("You don't have permission to do that!");
        return;
    }
    log('i', `User "${message.author.tag}" has triggered an update!`);
    const embed = new discord_js_1.default.MessageEmbed().setTitle('Update').setDescription('Updating the bot... This may take a while...');
    function l(mode, message) {
        return log(mode, `${chalk_1.default.green('[')}${chalk_1.default.green.bold('Updater')}${chalk_1.default.green(']')} ${message}`);
    }
    l('i', 'Getting git status...');
    message.channel.send(embed).then((m) => {
        child_process_1.exec('git status', (error, stdout, stderr) => {
            if (error) {
                l('e', `Failed to update: ${error}`);
                m.edit(`Failed to update: ${error}`);
            }
            else {
                l('i', 'Got git status!');
                embed.addField('Git Status', `\`\`\`
$ git status

${stdout === '' ? stderr : stdout}
\`\`\``);
                l('i', 'Adding files...');
                child_process_1.exec('git add .', (error2, stdout2, stderr2) => {
                    if (error2) {
                        l('e', `Failed to update: ${error2}`);
                        m.edit(`Failed to update: ${error2}`);
                    }
                    else {
                        l('i', 'Added files!');
                        embed.addField('Git Add Result', `\`\`\`
$ git add .

${stdout2 === '' ? stderr2 : stdout2}
\`\`\``);
                        l('i', 'Committing...');
                        child_process_1.exec('git commit -m "ProtoBot -- Update (Found uncommitted changes)"', (error3, stderr3, stdout3) => {
                            l('i', 'Committed!');
                            embed.addField('Git Commit Result', `\`\`\`
$ git commit -m "ProtoBot -- Update (Found uncommitted changes)"

${stdout3 === '' ? stderr3 : stdout3}
\`\`\``);
                            l('i', 'Syncing...');
                            child_process_1.exec('git fetch && git pull --no-rebase && git push', (error4, stderr4, stdout4) => {
                                if (error4) {
                                    l('e', `Failed to update: ${error4}`);
                                    m.edit(`Failed to update: ${error4}`);
                                }
                                else {
                                    l('i', 'Synced!');
                                    embed
                                        .addField('Git Sync (fetch -> pull -> push) Result', `\`\`\`
$ git fetch && git pull --no-rebase && git push

${stdout4 === '' ? stderr4 : stdout4}
\`\`\``)
                                        .addField('Status', '**Complete.**')
                                        .addField('Restart to apply changes', `To apply the update, run ${client.config.prefixes[0]}restart.`);
                                    m.edit(embed);
                                    l('i', 'Update completed!');
                                }
                            });
                        });
                    }
                });
            }
        });
    });
}
exports.run = run;
// Config
exports.config = {
    name: 'update',
    description: 'Update the bot!',
    enabled: true,
    aliases: ['upd'],
    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {} // owner only
};
//# sourceMappingURL=update.js.map