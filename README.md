# **@aoitelegram/plugins**

[![NPM Version](https://img.shields.io/npm/v/@aoitelegram/plugins)](https://www.npmjs.com/package/@aoitelegram/plugins)
[![Bot API](https://img.shields.io/badge/Bot%20API-v.7.2-00aced.svg?style=flat-square&logo=telegram)](https://core.telegram.org/bots/api)
[![NPM Downloads](https://img.shields.io/npm/dt/@aoitelegram/plugins.svg?maxAge=3600)](https://www.npmjs.com/package/@aoitelegram/plugins)
[![License](https://img.shields.io/npm/l/@aoitelegram/plugins)](https://github.com/aoitelegram/plugins/blob/main/LICENSE)

## Installation

```sh
npm i @aoitelegram/plugins
```

## Usage

- This library is official.

```js
const { AoiClient } = require("aoitelegram");
const { PluginManager } = require("@aoitelegram/plugins");

const client = new AoiClient({
  // Bot configuration
});

const plugins = new PluginManager({
  aoitelegram: client,
  searchingForPlugins: true,
});

plugins.loadPlugins(["giveaway"], {
  logger: true,
  strictMode: false,
  excludedFunctions: [],
  includedFunctions: [],
});

plugins.loadDirPlugins("path", {
  logger: true,
  strictMode: false,
  excludedFunctions: [],
  includedFunctions: [],
});

client.connect();
```

### Parameters method:

| Parameter         | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| logger            | Show notifications upon successful plugin loading.                                    |
| strictMode        | Determines if the plugin can overwrite existing functions (true - no / false - yes).  |
| excludedFunctions | Exclude all functions from the plugin (i.e., functions listed here cannot be loaded). |
| includedFunctions | Load only these specified functions from the plugin.                                  |

## Documentation

For detailed documentation and usage instructions, please refer to the [aoitelegram Wiki](https://aoitelegram.vercel.app/).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/aoitelegram/plugins/blob/main/LICENSE) file for details.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a `GitHub` issue or submit a pull request. Additionally, feel free to reach out to me on Telegram via my username `@SempaiJS` or on Discord using my username `sempaika_chess`.
