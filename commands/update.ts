// ProtoBot
// By BadBoyHaloCat
// Very owo code i have here~

// +-------------------------------------------------+
// | LEGAL STUFF                        not very owo |
// |=================================================|
// | +---------------------------------------------+ |
// | | COPYRIGHT                                   | |
// | |=============================================| |
// | | Copyright (C) 2020  BadBoyHaloCat           | |
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
import chalk from 'chalk';
import { exec, ExecException } from 'child_process';

// Interfaces, owo
interface Client extends discord.Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// Main
export function run(
    client: Client,
    message: discord.Message,
    args: string[],
    log: (mode: 'i' | 'w' | 'e', message: string) => void
): void {
    // Safety check
    if (message.author.id !== client.config.ownerID) {
        log('w', `User ${message.author.tag} tried to use "update"!`);
        message.reply("You don't have permission to do that!");
        return;
    }

    log('i', `User "${message.author.tag}" has triggered an update!`);

    let embed: discord.MessageEmbed = new discord.MessageEmbed()
        .setTitle('Update')
        .setDescription('Here is your live progress report on the update!')
        .addField('Status', '`$ git status`');

    function l(mode: 'i' | 'w' | 'e', message: string): void {
        return log(
            mode,
            `${chalk.green('[')}${chalk.green.bold('Updater')}${chalk.green(
                ']'
            )} ${message}`
        );
    }

    l('i', 'Getting git status...');

    message.channel.send(embed).then((m: discord.Message) => {
        exec(
            'git status',
            (error: ExecException | null, stdout: string, stderr: string) => {
                if (error) {
                    l('e', `Failed to update: ${error}`);
                    m.edit(`Failed to update: ${error}`);
                } else {
                    l('i', 'Got git status!');
                    embed = new discord.MessageEmbed()
                        .setTitle('Update')
                        .setDescription(
                            'Here is your live progress report on the update!'
                        )
                        .addField(
                            'Git Status',
                            `\`\`\`
$ git status

${stdout === '' ? stderr : stdout}
\`\`\``
                        )
                        .addField('Status', '`$ git add .`');

                    m.edit(embed);

                    l('i', 'Adding files...');
                    exec(
                        'git add .',
                        (
                            error2: ExecException | null,
                            stdout2: string,
                            stderr2: string
                        ) => {
                            if (error2) {
                                l('e', `Failed to update: ${error2}`);
                                m.edit(`Failed to update: ${error2}`);
                            } else {
                                l('i', 'Added files!');
                                embed = new discord.MessageEmbed()
                                    .setTitle('Update')
                                    .setDescription(
                                        'Here is your live progress report on the update!'
                                    )
                                    .addField(
                                        'Git Status',
                                        `\`\`\`
$ git status

${stdout === '' ? stderr : stdout}
\`\`\``
                                    )
                                    .addField(
                                        'Git Add Result',
                                        `\`\`\`
$ git add .

${stdout2 === '' ? stderr2 : stdout2}
\`\`\``
                                    )
                                    .addField(
                                        'Status',
                                        '`$ git commit -m "ProtoBot -- Update (Found uncommitted changes)"`'
                                    );

                                m.edit(embed);

                                l('i', 'Committing...');

                                exec(
                                    'git commit -m "ProtoBot -- Update (Found uncommitted changes)"',
                                    (
                                        error3: ExecException | null,
                                        stderr3: string,
                                        stdout3: string
                                    ) => {
                                        l('i', 'Committed!');
                                        embed = new discord.MessageEmbed()
                                            .setTitle('Update')
                                            .setDescription(
                                                'Here is your live progress report on the update!'
                                            )
                                            .addField(
                                                'Git Status',
                                                `\`\`\`
$ git status

${stdout === '' ? stderr : stdout}
\`\`\``
                                            )
                                            .addField(
                                                'Git Add Result',
                                                `\`\`\`
$ git add .

${stdout2 === '' ? stderr2 : stdout2}
\`\`\``
                                            )
                                            .addField(
                                                'Git Commit Result',
                                                `\`\`\`
$ git commit -m "ProtoBot -- Update (Found uncommitted changes)"

${stdout3 === '' ? stderr3 : stdout3}
\`\`\``
                                            )
                                            .addField(
                                                'Status',
                                                '`$ git fetch && git pull --no-rebase && git push`'
                                            );

                                        m.edit(embed);

                                        l('i', 'Syncing...');

                                        exec(
                                            'git fetch && git pull --no-rebase && git push',
                                            (
                                                error4: ExecException | null,
                                                stderr4: string,
                                                stdout4: string
                                            ) => {
                                                if (error4) {
                                                    l(
                                                        'e',
                                                        `Failed to update: ${error4}`
                                                    );
                                                    m.edit(
                                                        `Failed to update: ${error4}`
                                                    );
                                                } else {
                                                    l('i', 'Synced!');
                                                    embed = new discord.MessageEmbed()
                                                        .setTitle(
                                                            'Update [Complete]'
                                                        )
                                                        .setDescription(
                                                            'Here is the update log!'
                                                        )
                                                        .addField(
                                                            'Git Status',
                                                            `\`\`\`
$ git status

${stdout === '' ? stderr : stdout}
\`\`\``
                                                        )
                                                        .addField(
                                                            'Git Add Result',
                                                            `\`\`\`
$ git add .

${stdout2 === '' ? stderr2 : stdout2}
\`\`\``
                                                        )
                                                        .addField(
                                                            'Git Commit Result',
                                                            `\`\`\`
$ git commit -m "ProtoBot -- Update (Found uncommitted changes)"

${stdout3 === '' ? stderr3 : stdout3}
\`\`\``
                                                        )
                                                        .addField(
                                                            'Git Sync (fetch -> pull -> push) Result',
                                                            `\`\`\`
$ git fetch && git pull --no-rebase && git push

${stdout4 === '' ? stderr4 : stdout4}
\`\`\``
                                                        )
                                                        .addField(
                                                            'Status',
                                                            '**Complete.**'
                                                        )
                                                        .addField(
                                                            'Restart to apply changes',
                                                            `To apply the update, run ${client.config.prefixes[0]}restart.`
                                                        );

                                                    m.edit(embed);

                                                    l('i', 'Update completed!');
                                                }
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    });
}

// Config
export const config = {
    name: 'update',
    description: 'Update the bot!',
    enabled: true,

    // To restrict the command, change the "false" to the following
    // format:
    //
    // restrict: { users: [ "array", "of", "authorized", "user", "IDs" ] }
    restrict: {} // owner only
};
