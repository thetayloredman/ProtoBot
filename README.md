# ProtoBot

A Discord furry bot

## OwO What's this??!?!?!?

You just got access to a **top-secret** code repository.

This is where all **live work** on ProtoBot goes!

## Testing

Once you wrote some code, you should test it!

Here's what you need:

- Node.js
- npm (included with Node)

### Step 1: Config

If you haven't already, copy the `config.rename-me.ts` file to `config.ts` and then modify the configuration.

Place your bot token under `token`, and configure prefixes and such to your liking.

### Step 2: Installing Dependencies

Run `npm i`. This will download the latest dependencies, and build the `better-sqlite3` database wrapper.

### Step 3: Compiling and running

Run `npm start`. The current source code will be compiled, and then automatically ran.

## Terminology

### Module

A module is a file usually placed in the `./modules/` folder. It runs on **every single message**. A good example of this is the `owos.ts` module.

What it does, is adds a point to the leaderboard if the user has a message with a `owo` in it.

### Command

A command is any controlled item beginning with a prefix (defined in `config.ts`) and is placed in `./commands/`.

### Enmap

An Enmap is our form of database wrapper.

## Useful resources

- [Discord.js Docs](https://discord.js.org/)
- [MDN](https://developer.mozilla.org/)
- [Enmap Docs](https://enmap.evie.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/) *You might see an invalid SSL certificate warning, bypass it.*
