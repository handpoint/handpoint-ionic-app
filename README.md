# Handpoint Payments Starter App

## Overview
This is a demo app for the [Handpoint Cordova Plugin](https://github.com/handpoint/cordova-plugin-handpoint/). The app is fully functional. If you want to test your card reader just update the next line with your shared secret in **app.component.ts** before building the app:

```javascript
  // set shared secret
  this.sdk.setSharedSecret('0102030405060708091011121314151617181920212223242526272829303132').then(() => {
    …
  }, …); 
```
<img height="417" widht="890" src="https://user-images.githubusercontent.com/3254688/37241612-ded07e34-2453-11e8-9d34-ca61af5cd0aa.png"/>
<br>
<img height="417" widht="890" src="https://user-images.githubusercontent.com/3254688/37241613-e009d084-2453-11e8-971b-8fa17eace6a0.png"/>

## Prerequisites
* [Install node (v6.10.0)](https://nodejs.org/es/download/)
* Update `npm` to Latest: `npm install -g npm`
* Install `grunt`: `npm install -g grunt`
* Install the ionic CLI (`npm install -g ionic`)

## Getting Started
* Clone this repository: `git clone https://github.com/handpoint/handpoint-ionic-app`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.

## Build
### Android
* Add platform `ionic add platform android`
* Run `ionic cordova build android`

### IOS
* Add platform `ionic add platform ios`
* Run `ionic cordova build ios`

