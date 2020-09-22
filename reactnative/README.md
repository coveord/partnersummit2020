# reactnative

## macOS only

This project was built for iOS as a demo, and can only be ran from a macOS system.

Feel free to consult the source code in `./app` and `./components`.

## Project setup
```
npm install
```

## Install watchman
```
brew install watchman
```

## Install Xcode

Make sure Xcode is installed properly from the Mac App Store. 

## Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

## Installing an iOS Simulator in Xcode

To install a simulator, open Xcode > Preferences... and select the Components tab. Select a simulator with the corresponding version of iOS you wish to use.

## CocoaPods

```
sudo gem install cocoapods
```

### Compiles for ios
```
npm run ios
```
This should start a simulator on your machine and run the project.
