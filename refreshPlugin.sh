#!/bin/sh

echo 'Killing the Stream Deck process'

pkill 'Stream Deck'

# Pull the UUID from the manifest.json
uuid=$(sed -n 's/.*"UUID": "\(.*\)"/\1/p' com.thibautsabot.streamdeck.boilerplate.sdPlugin/manifest.json)

# Pull the plugin name from the UUID
pluginName="com.thibautsabot.streamdeck.boilerplate"

pluginsDir="$HOME/Library/Application Support/com.elgato.StreamDeck/Plugins"
projectDir=$(PWD)

echo 'Building from sources'
npm run build

echo "Installing the $pluginName plugin to $pluginsDir"

# Push the plugins directory on the stack
pushd "$pluginsDir"

# Check if the plugin direcotyr exists and remove it
[ -d "$pluginName.sdPlugin" ] && rm -r $pluginName.sdPlugin
# Create the plugins directory
mkdir $pluginName.sdPlugin

# Copy content from local folder to Application folder
cp -R "$projectDir/com.thibautsabot.streamdeck.boilerplate.sdPlugin/" $pluginName.sdPlugin

# Pop the plugins directory off the stack returning to where we were
popd

echo "Done installing ${pluginName}"

# Reopen the Stream Deck app on background
open /Applications/Stream\ Deck.app &

exit