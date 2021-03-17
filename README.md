# TypeScript boilerplate for streamdeck plugins

Minical code example to create a StreamDeck plugin with TypeScript.

To use it :

- `npm i`
- Replace every `com.thibautsabot.boilerplate` occurence with your plugin ID
- Replace every `boilerplate` imports, filenames and variables occurences
- That's it, you're good to go !

To make the developper experience easier, you can run `refreshPlugin.sh` on each change.

The script will close the StreamDeck application, build your plugin, copy it to the OSX Plugin folder, and restart StreamDeck.

(If you are looking for the official JS boilerplate go here : https://github.com/elgatosf/streamdeck-plugintemplate)

## Technologies

- TypeScript
- Jest (for tests)
- Eslint
- Prettier
- Browserify

## Credits
Huge credits to https://github.com/XeroxDev/Stream-Deck-TS-SDK.
This boilerplate is based on their library.

Inspired from https://github.com/dflydev/streamdeck-restreamio/ and https://github.com/XeroxDev/YTMD-StreamDeck

Also thanks to https://github.com/FritzAndFriends/StreamDeckToolkit for the restart script.