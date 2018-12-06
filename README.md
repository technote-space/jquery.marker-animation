# jQuery Marker Animation

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

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
### font_weight
文字の太さを指定します。
```
$('.marker-animation').markerAnimation({
    font_weight: 'bold'
});
```
デフォルトは太字です。  
太字にしない場合はnullを設定してください。
### repeat
アニメーションを繰り返すかどうかを指定します。
```
$('.marker-animation').markerAnimation({
    repeat: false
});
```
trueにすると一度画面から外れて再び表示された際に再度アニメーションが実行されます。
