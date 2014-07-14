# GMajor Mobile

> Music is the universal language

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)

## Usage

> This is a mobile app built on the Ionic JavaScript framework. It used the Web Audio API to generate sounds without using recorded samples. While it can be built down to a web site for testing purposes, it's expected to be run on a moble device.

## Requirements

- Ionic 1.0.0-beta.9 "gadolinium-gator" for mobile framework
- Apple xcode for iOS building / testing
- Gulp

## Development

### Installing Dependencies

To build / test for iOS you need a Macintosh computer.
Install XCode from the Apple app store here: https://itunes.apple.com/us/app/xcode/id497799835?mt=12

To build / test with Android you need the Android SDK available here:
http://developer.android.com/sdk/index.html
(I recommend installing the link for the stand-alone SDK rather than the one bundled with Eclipse)

Installing the project root directory:

```sh
sudo npm install -g bower
npm install
bower install
npm install -g ionic
```

To build and test in a web browser:
`gulp serve-ionic`

To build and test on iOS:
`ionic emulate iOS`

To build and test on Andriod:
`ionic emulate android`

### Tasks

See the projects backlog in asana [here](https://app.asana.com/0/14549969807992/14549969807992)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.