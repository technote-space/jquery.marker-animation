# jQuery Marker Animation

[![npm version](https://badge.fury.io/js/jquery.marker-animation.svg)](https://badge.fury.io/js/jquery.marker-animation)
[![CI Status](https://github.com/technote-space/jquery.marker-animation/workflows/CI/badge.svg)](https://github.com/technote-space/jquery.marker-animation/actions)
[![codecov](https://codecov.io/gh/technote-space/jquery.marker-animation/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/jquery.marker-animation)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/jquery.marker-animation/badge)](https://www.codefactor.io/repository/github/technote-space/jquery.marker-animation)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/jquery.marker-animation/blob/master/LICENSE)

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

蛍光ペンで塗るようなアニメーションを表示するjQueryプラグイン

[デモ](https://technote-space.github.io/jquery.marker-animation/)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [スクリーンショット](#%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88)
  - [動作](#%E5%8B%95%E4%BD%9C)
- [Installation](#installation)
  - [npmから利用](#npm%E3%81%8B%E3%82%89%E5%88%A9%E7%94%A8)
  - [ダウンロードして利用](#%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%97%E3%81%A6%E5%88%A9%E7%94%A8)
  - [WordPressで利用](#wordpress%E3%81%A7%E5%88%A9%E7%94%A8)
- [基本的な使用方法](#%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
- [オプション](#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)
  - [color](#color)
  - [thickness](#thickness)
  - [duration](#duration)
  - [delay](#delay)
  - [font_weight](#font_weight)
  - [repeat](#repeat)
  - [stripe](#stripe)
  - [rtl](#rtl)
- [個別に値を指定する方法](#%E5%80%8B%E5%88%A5%E3%81%AB%E5%80%A4%E3%82%92%E6%8C%87%E5%AE%9A%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)
  - [例1: 色の変更](#%E4%BE%8B1-%E8%89%B2%E3%81%AE%E5%A4%89%E6%9B%B4)
  - [例2: 複数設定](#%E4%BE%8B2-%E8%A4%87%E6%95%B0%E8%A8%AD%E5%AE%9A)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## スクリーンショット
### 動作
![動作](https://raw.githubusercontent.com/technote-space/jquery.marker-animation/images/marker-animation.gif)

## Installation
### npmから利用
https://www.npmjs.com/package/jquery.marker-animation

```bash
npm install --save jquery.marker-animation
```

### ダウンロードして利用
[リリースバージョン](https://github.com/technote-space/jquery.marker-animation/releases/latest/download/index.js)をダウンロードして
```html
<script type="text/javascript" src="/assets/jquery.marker-animation/index.js"></script>
```
のように読み込む

### WordPressで利用
プラグインとして利用できるようにしました。  

[GitHub](https://github.com/technote-space/marker-animation)

## 基本的な使用方法
```html
文章文章文章<span class="marker-animation">強調したい文字</span>文章文章文章文章
```

```html
<script>
    $('.marker-animation').markerAnimation();
</script>
```

## オプション
### color
マーカーの色を指定
```javascript
$('.marker-animation').markerAnimation({
    color: '#fe9'
});
```

### thickness
マーカーの太さを指定
```javascript
$('.marker-animation').markerAnimation({
    thickness: '.6em'
});
```

### duration
マーカーを塗るのを完了するまでの時間を指定
```javascript
$('.marker-animation').markerAnimation({
    duration: '2s'
});
```

### delay
マーカーを塗るのを開始するまでの時間を指定
```javascript
$('.marker-animation').markerAnimation({
    duration: '.1s'
});
```

### font_weight
文字の太さを指定
```javascript
$('.marker-animation').markerAnimation({
    font_weight: 'bold'
});
```
デフォルトは太字です。  
太字にしない場合はnullを設定してください。

### repeat
アニメーションを繰り返すかどうかを指定
```javascript
$('.marker-animation').markerAnimation({
    repeat: false
});
```
trueにすると一度画面から外れて再び表示された際に再度アニメーションが実行されます。

### stripe
ストライプデザインにするかどうかを指定
```javascript
$('.marker-animation').markerAnimation({
    stripe: false
});
```
これが `true` の場合はアニメーションなしの動作になります。  
![stripe](https://raw.githubusercontent.com/technote-space/jquery.marker-animation/images/stripe.png)

### rtl
右書き動作にするかどうかを指定
```javascript
$('.marker-animation').markerAnimation({
    rtl: false
});
```

## 個別に値を指定する方法
`data-ma_[オプション名]` の形式で個別にオプションを指定することが可能です。
### 例1: 色の変更
```html
文章文章文章<span class="marker-animation" data-ma_color="red">強調したい文字</span>文章文章文章文章
```
この例ではマーカーの色が赤色になります。
### 例2: 複数設定
```html
文章文章文章<span class="marker-animation" data-ma_repeat="true" data-ma_font_weight="null" data-ma_delay="2s">強調したい文字</span>文章文章文章文章
```
この例では
* 画面から外れるごとにアニメーションが実行
* 太文字ではない
* ２秒遅れてアニメーション開始

が設定されます。
