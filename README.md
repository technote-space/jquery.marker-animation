# jQuery Marker Animation

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/jquery.marker-animation/blob/master/LICENSE)

蛍光ペンで塗るようなアニメーションを表示するjQueryプラグイン

![動作](https://raw.githubusercontent.com/technote-space/jquery.marker-animation/master/marker-animation.gif)

## Installation
### ダウンロードして利用
[リリースバージョン](https://raw.githubusercontent.com/technote-space/jquery.marker-animation/master/jquery.marker-animation.min.js)をダウンロードして
```
<script type="text/javascript" src="/assets/jquery.marker-animation.min.js"></script>
```
のように読み込み
### npmから利用
https://www.npmjs.com/package/jquery.marker-animation

```
npm install --save jquery.marker-animation
```

### WordPressで利用
プラグインとして利用できるようにしました。  

[WordPress](https://ja.wordpress.org/plugins/marker-animation/)

[GitHub](https://github.com/technote-space/marker-animation)

## 基本的な使用方法
```
文章文章文章<span class="marker-animation">強調したい文字</span>文章文章文章文章
```

```
<script>
$('.marker-animation').markerAnimation();
</script>
```

## オプション
### color
マーカーの色を指定
```
$('.marker-animation').markerAnimation({
    color: '#fe9'
});
```
### thickness
マーカーの太さを指定
```
$('.marker-animation').markerAnimation({
    thickness: '.6em'
});
```
### duration
マーカーを塗るのを完了するまでの時間を指定
```
$('.marker-animation').markerAnimation({
    duration: '2s'
});
```
### delay
マーカーを塗るのを開始するまでの時間を指定
```
$('.marker-animation').markerAnimation({
    duration: '.1s'
});
```
### font_weight
文字の太さを指定
```
$('.marker-animation').markerAnimation({
    font_weight: 'bold'
});
```
デフォルトは太字です。  
太字にしない場合はnullを設定してください。
### repeat
アニメーションを繰り返すかどうかを指定
```
$('.marker-animation').markerAnimation({
    repeat: false
});
```
trueにすると一度画面から外れて再び表示された際に再度アニメーションが実行されます。
### stripe
ストライプデザインにするかどうかを指定
```
$('.marker-animation').markerAnimation({
    stripe: false
});
```
これが `true` の場合はアニメーションなしの動作になります。  
![stripe](https://raw.githubusercontent.com/technote-space/jquery.marker-animation/master/stripe.png)

## 個別に値を指定する方法
`data-ma_[オプション名]` の形式で個別にオプションを指定することが可能です。
### 例1: 色の変更
```html
文章文章文章<span class="marker-animation" data-ma_color="red">強調したい文字</span>文章文章文章文章
```
この例ではマーカーの色が赤色になります。
### 例2: 複数設定
```
文章文章文章<span class="marker-animation" data-ma_repeat="true" data-ma_fontWeight="null" data-ma_delay="2s">強調したい文字</span>文章文章文章文章
```
この例では
* 画面から外れるごとにアニメーションが実行
* 太文字ではない
* ２秒遅れてアニメーション開始

が設定されます。