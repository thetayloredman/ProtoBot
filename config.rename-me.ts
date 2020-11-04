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

// Interface
interface ProtoBotConfig {
    token: string,
    dirs: {
        commands: string,
        modules: string
    },
    prefixes: string[],
    cooldowns: {
        tildes: number,
        owos: number,
        uwus: number
    },
    ownerID: string
}

// Ms conversion functions
function seconds(count: number): number {
    return 1000 * count;
}
function minutes(count: number): number {
    return seconds(60) * count;
}

// Main
const config: ProtoBotConfig = {
    token: 'your-super-cool-token',
    dirs: {
        commands: './commands/',
        modules: './modules/'
    },
    // The first prefix listed here will
    // be the "primary prefix", the one
    // displayed in most places.
    //          vvv
    prefixes: [ '~', 'proto, ', 'proto,', 'proto ', 'pb, ', 'pb,', 'pb ', 'protobot, ', 'protobot,', 'protobot ' ],
    cooldowns: {
        tildes: minutes(1),
        owos: seconds(30),
        uwus: seconds(30)
    },
    ownerID: 'your-user-id'
};

// Export
export { ProtoBotConfig };
export default config;
