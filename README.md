# GMajor Mobile
[![Build Status](https://travis-ci.org/gMajr/gMajorMobile.svg?branch=master)](https://travis-ci.org/gMajr/gMajorMobile)
[![Gulp](http://img.shields.io/badge/Built%20with-Gulp-blue.svg)](http://gulpjs.com)
> Music is the universal language

## Table of Contents
1. [Introduction](#Introduction)
1. [Wiki](#Wiki)
1. [Website](#Website)
1. [Database Setup](#Database Setup)
1. [Local Setup](#Local Setup)
1. [Deployment Setup](#Deployment)
1. [Requirements](#Requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)
1. [Style](#Style)


## Introduction
This is an ionic app that runs on Safari for iOS7 and Chrome 36+. The backend is a 
MongoDB database served by [mongolab](https://mongolab.com/). The DB is controlled by the [Node.js MongoDB Driver](http://docs.mongodb.org/ecosystem/drivers/node-js/). The Web Audio API is used to generate sounds without using recorded samples. While it can be built down to a web site for testing purposes, it's expected to be run on a mobile device. 

## Website
Product website can be found [here](http://gmajr.github.io) and is still in development.  

## Wiki
The [Wiki](https://github.com/gMajr/gMajorMobile/wiki) contains information about the structure and usage of the app. 


## Database Setup
The app depends on a MongoDB server for storage. If you plan to deploy with Azure, you should follow the instructions in [Azure Deployment](https://github.com/gMajr/gMajorMobile/wiki/Azure-Deployment), which will include setting up your DB. Even if you don't, you need to set up a MongoDB server if you want to test and develop with a working database. We recommend creating a mongolab account, as the mongolab setup is documented in [Setting up MongoDB with Mongolab](https://github.com/gMajr/gMajorMobile/wiki/Setting-up-MongoDB-with-Mongolab)

## Local Setup
1. `sudo npm install -g bower`
1. `npm install`
1. `bower install`
1. `npm install -g ionic`
1. `gulp` (concatenates js files, serves the app at localhost:8080, watches for file changes and recompiles them and restarts server as needed)

## Deployment Setup
See [Azure Deployment](https://github.com/gMajr/gMajorMobile/wiki/Azure-Deployment)


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

To build and test in a web browser:
`gulp serve-ionic`

To build and test on iOS:
`ionic emulate iOS`

To build and test on Andriod:
`ionic emulate android`

If emulation for a device fails. You should remove that platform and add it again. For instance:
`cordova platform remove ios`

and then 
`cordova platform add ios`

### Tasks

See the projects backlog in asana [here](https://app.asana.com/0/14549969807992/14549969807992)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Style
See the [Style Guide](https://github.com/gMajr/gMajorMobile/wiki/Style-Guide)
