# jQuery Marker Animation

[![npm version](https://badge.fury.io/js/jquery.marker-animation.svg)](https://badge.fury.io/js/jquery.marker-animation)
[![Build Status](https://travis-ci.com/technote-space/jquery.marker-animation.svg?branch=master)](https://travis-ci.com/technote-space/jquery.marker-animation)
[![Coverage Status](https://coveralls.io/repos/github/technote-space/jquery.marker-animation/badge.svg?branch=master)](https://coveralls.io/github/technote-space/jquery.marker-animation?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/jquery.marker-animation/badge)](https://www.codefactor.io/repository/github/technote-space/jquery.marker-animation)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/jquery.marker-animation/blob/master/LICENSE)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

jQuery plugin to add under line animation like highlighter.

[Demonstration](https://technote-space.github.io/jquery.marker-animation/)

<!-- START doctoc -->
<!-- END doctoc -->

## Screenshot
### Behavior
![Behavior](https://raw.githubusercontent.com/technote-space/jquery.marker-animation/images/marker-animation.gif)

## Installation
### Use from download
Download [Release version](https://github.com/technote-space/jquery.marker-animation/releases/latest/download/jquery.marker-animation.min.js) and enqueue script.
```html
<script type="text/javascript" src="/assets/jquery.marker-animation.min.js"></script>
```
### Use from npm
https://www.npmjs.com/package/jquery.marker-animation

```bash
npm install --save jquery.marker-animation
```

### for WordPress
[GitHub](https://github.com/technote-space/marker-animation)

## Usage
```html
Hello, Dolly <span class="marker-animation">Well, hello, Dolly</span> Hello, Dolly
```

```html
<script>
    $('.marker-animation').markerAnimation();
</script>
```

## Options
### color
Set the color of line
```javascript
$('.marker-animation').markerAnimation({
    color: '#fe9'
});
```
### thickness
Set the thickness of line
```javascript
$('.marker-animation').markerAnimation({
    thickness: '.6em'
});
```
### duration
Set the time to complete drawing a line
```javascript
$('.marker-animation').markerAnimation({
    duration: '2s'
});
```
### delay
Set the time to start drawing a line
```javascript
$('.marker-animation').markerAnimation({
    duration: '.1s'
});
```
### font_weight
Set the thickness of characters
```javascript
$('.marker-animation').markerAnimation({
    font_weight: 'bold'
});
```
\[default = `bold`]  
If you do not want to make it bold, please set `null`.
### repeat
Set whether to repeat the animation
```javascript
$('.marker-animation').markerAnimation({
    repeat: false
});
```
If this set to true, the animation will be executed again when it is off screen and displayed again.
### stripe
Set whether to make it stripe design
```javascript
$('.marker-animation').markerAnimation({
    stripe: false
});
```
If this set to true, the animation will not be executed.

![stripe](https://raw.githubusercontent.com/technote-space/jquery.marker-animation/images/stripe.png)

## How to set the value for each
You can set options in the following format.   
```
data-ma_[option name]
```
### e.g. Change color
```html
Hello, Dolly <span class="marker-animation" data-ma_color="red">Well, hello, Dolly</span> Hello, Dolly
```
In this example, the color of the line is red.
### e.g Multiple options
```html
Hello, Dolly <span class="marker-animation" data-ma_repeat="true" data-ma_font_weight="null" data-ma_delay="2s">Well, hello, Dolly</span> Hello, Dolly
```
In this example, the options below are set.
* Repeat animation
* Not bold
* 2sec delay animation
