# Time-Gallery 2X
基于 CreateJs 实现长图滑动加动画的效果，整段长图可想象成是一段时间轴，在时间轴上自定义各种动画，通过滑动或自定义交互控制时间轴播放。

## 前言
之前公司要开发一个长图加动画的H5项目，我看到很多类似的案例是基于白鹭来开发，但因为本人没接触过白鹭，于是自己就基于 CreateJs 扩展开发一个长图滑动加动画的框架。

因为后来很多同事问我拿源码开发类似的项目，所以就决定把源码分享出来一起学习。

在这里不需要掌握 CreateJs，如果想做类似项目的朋友可直接使用。

当然，如果熟悉 CreateJs 的朋友，可基于源码 **SRC** 扩展更多满足自己想要的功能。

## 案例参考

![](http://news.gd.sina.com.cn/staff/zt2/qrcode/yzf_gallery.png)
![](http://news.gd.sina.com.cn/staff/zt2/qrcode/chunsheng.png?v=0.1)
![](http://news.gd.sina.com.cn/staff/zt2/qrcode/picc_69.png?v=0.1)
![](http://news.gd.sina.com.cn/staff/zt2/qrcode/nfdw.png?v=0.1)

## 使用

HTML
```
<body>
    <canvas id="gallery-canvas" style="width:100%"></canvas>
</body>

<script src="easeljs.min.js"></script>
<script src="time-gallery.2.0.0.min.js"></script>
```
JS
```
var timeGallery = new TimeGallery({
    id: 'gallery-canvas',                                   // 定义画布的 ID（必选）
    width: 750,                                             // 定义画布的宽度，根据设计稿定义（可选）
    height: window.innerHeight/window.innerWidth * 750,     // 定义画布的高度，默认是全屏高度（可选）
    resourcesPath: 'assets/images/',                        // 定义资源文件的默认路劲（可选）
    resources: [                                            // 定义资源文件（必选）
        { src: 'demo.png', id: 'demo' },
        { src: 'demo-sprite.png', id: 'demo-sprite' },
    ],
    data: [],                                               // 定义画布元素（必选）
});

timeGallery.play();
```
这里我们就成功的创建了一个空白的画布，下一步我们需要建立画布元素。

## 创建元素
TimeGallery 是通过遍历 data 属性的数组对象的来创建画布元素，data 可定义为函数并接收 TimeGallery 实例作为参数。

**可能当你往下看的时候，你可能会觉得贴的代码很多，有点复杂。其实你主要了解如何创建元素，元素有哪些类型与属性，然后练练手，你就大概知道怎样创建。**

```
// 定义画布元素函数
// 返回数组对象
function canvasData(timeGallery) {
    return [
        {
            id: 'demo-container',
            prop: {
                x: 0,
                y: 0,                
            },
            children: [
                {
                    id: 'demo-bitmap',
                    type: 'bitmap',
                    image: timeGallery.getImage('demo'),
                    prop: {
                        x: 100,
                        y: 100,
                    }
                }
            ]
        }
    ]
}

// 把定义函数传给 data 属性
var timeGallery = new TimeGallery({
    id: 'gallery-canvas',                                   
    width: 750,                                             
    height: window.innerHeight/window.innerWidth * 750,     
    resourcesPath: 'assets/images/',                        
    resources: [                                            
        { src: 'demo.png', id: 'demo' },
        { src: 'demo-sprite.png', id: 'demo-sprite' },
    ],
    data: canvasData, // 这里
});

timeGallery.play();
```
这里我们定义了一个 ID 为 demo-container 的容器, 位于画布 x: 0，y: 0 的位置，容器内定义了一个为 Bitmap 的子类型，位于 demo-container 容器 x: 100, y: 100的位置。

把函数 **canvasData** 定义的元素传给 **data** 属性。

这时候，你应该看到一张静态的图片在画面上。

## 元素类型
数据类型分别有 **Container, Bitmap, Sprite, Shape, Text**，以下是各类型的基本属性:
```
{
    id: 'name',             // 为元素指定 ID
    type: '',               // 为元素指定类型，默认是 Container

    // 可定义基础属性
    prop: {
        x: 0,               // 基于父元素定义初始 X 位置 
        y: 0,               // 基于父元素定义初始 Y 位置 
        regX: 0,            // 定义元素 X 中心点
        regY: 0,            // 定义元素 Y 中心点
        scaleX: 1,          // 定义元素初始 Scale X
        scaleY: 1,          // 定义元素初始 Scale Y
        skewX: null,        // 定义元素初始 Skew X 
        skewY: null,        // 定义元素初始 Skew Y
        rotation: 0,        // 定义元素初始旋转度数
        alpha: 1,           // 定义元素初始透明度（0-1）
        visible: true,      // 定义元素是否可见
    },

    // 可定义方法
    methods: {
      cache: [x, y, width, height] // 为定义的对象定义缓存区域，有效提供渲染性能, 特别是 Bitmap 用到大图情况
    }

    // 可定义动画属性
    animation: {
        startById: '',      // 与指定 ID 元素同步执行动画，不能与 afterById、endById 共用，ID 元素必须已创建。
        endById: '',        // 与指定 ID 元素同步结束动画，不能与 afterById、startById 共用，ID 元素必须已创建。
        afterById: '',      // 在指定 ID 元素结束后执行动画，不能与 startById、endById 共用，ID 元素必须已创建。
        musicById: '',      // 当动画开始执行时候，播放指定 ID <audio>
        musicStopById: '',  // 当动画开始执行时候，停止播放指定 ID <audio>
        x: 0,               // 动画结束后的 X 位置
        y: 0,               // 动画结束后的 Y 位置
        delay: 0,           // 延迟动画播放，例如 delay:100, 则元素在执行动画的时候延迟 100 像素
        scaleX: 1,          // 动画结束后的 Scale X
        scaleY: 1,          // 动画结束后的 Scale Y
        skewX: null,        // 动画结束后的 Skew X 
        skewY: null,        // 动画结束后的 Skew Y
        rotation: 0,        // 动画结束后的旋转度数 
        alpha: 1,           // 动画结束后透明度
        sprite: [],         // 动画组，根据执行进度按索引替换图片
        duration: 0,        // 动画执行长度
    },

    // 可定义事件
    event: {
        type: 'click',
        handle: function(e) {
            console.log(e)
        }
    }
}
```

#### 类型 Container
```
// 可理解是空的 DIV 容器，可多层封装
{
    type: 'container',  // 可不写，默认是 Container
    children: [
        // 定义子元素
    ]
}
```
#### 图片 Bitmap
```
{
    type: 'bitmap',
    image: 'image.jpg',  // 建议通过 timeGallery.getImage(id) 获取 resources 定义的资源
}
```
#### 矢量图 Shape
```
{
  type: 'shape',
  graphics: {
      beginFill: '#04014e',
      beginStroke: '#ffffff',
      // beginBitmapStroke: ['image.jpg', 'no-repeat'],
      setStrokeStyle: 10,
      drawRect: [0, 0, 200, 200],
      // drawRoundRect: [0, 0, 100, 100, 10],
      // drawCircle: [0, 0, 200],
      // drawEllipse: [0, 0, 100, 200],
      // beginLinearGradientFill: [["#000","#FFF"], [0, 1], 0, 20, 0, 120],
  }
}
```
#### 精灵图 Sprite

```
// 创建序列帧动画
{
    type: 'sprite',
    sheet: {
        images:[timeGallery.getImage('demo')], // [图片路径]
        frames: {'height': 292, 'width': 165, 'count': 64, 'regX': 0,  'regY': 0}, // 每帧的尺寸，count是总帧数
        animations: {
            run: [0, 5, 'jump', 0.05],  // [开始帧，结束帧，动画完成后的动作，速度]
            jump: [26]
        }
    },
    method: {
        gotoAndPlay: ['run'] // 执行 run 帧动画
    }
}

// 利用序列帧，模拟创建雪碧图
{
    type: 'sprite',
    sheet: {
        images:[timeGallery.getImage('sprites')], // [图片路径]
        frames: [                      // [x, y, width, height]
            [0, 1032, 489, 103],       
            [0, 944, 489, 67],
            [0, 817, 489, 48],
        ],
        animations: {                  // 指定每组动作对应 frames 帧
            sprite_1: [0],
            sprite_2: [1],
            sprite_3: [2],
        }
    },
    method: {
        gotoAndPlay: ['sprite_1']
    }
}

```
#### 文字 Text
```
{
    type: 'text',
    prop: {
         text: '你输入的文字内容',
         font: 'normal 36px Arial',  // '样式 大小 字体'
         color: '#000',
    }
}
```

以上都是比较常用，更多属性可参考 http://www.createjs.cc/src/docs/easeljs/classes/Container.html
- 可通过 prop 定义对象的 Properties, 如 prop: {name: 'name'}
- 可通过 method 定义对象 Methods 方法，通过 [] 传参，如method: {cache: [0, 0, 100, 100]}

## Basic

- `width: window.innerWidth`      定义画布宽度
- `height: window.innerHeight`    定义画布高度

- `isState: false`                是否启动 **Stage.js** 用于测试FPS, 须引入 stage.js 文件
- `isLog: false`                  是否打印 **data** 数据结构，方便了解
- `isTouch: true`                 是否启动滑动事件, 若 **false** 你可通过获取 canvas 属性自定义事件

- `resourcesPath: ''`             图片资源加载的默认路劲
- `resources: []`                 图片资源列表，可 'name.png' 、['name.png', 'name-2.png'] 或 { id: 'name', src: 'name.png'}
- `sprites: []`                   存放 Sprite 数据，在创建 sprite 类型对象时候可通过 TimeGallery 实例获取，适合重复调用与统一管理
- `data: []`                      定义时间轴数据结构，通过遍历数据渲染画面
- `direction: vertical`           定义时间轴滑动方向，可设置水平(horizontal)或垂直(vertical)

- `delayTime: 0`                  定义时间轴延迟时间
- `activeTime: 0`                 定义时间轴当前时间
- `endTime: 0`                    定义时间轴结束时间（默认取最后一个动画结束位置或画布的高度/宽度中的最大值）
- `playLine: width 或 height`     定义动画播放线（如垂直方向则动画从屏幕底部出现的时候执行动画，水平方向则屏幕右边）
- `touchSpeed：1`                 定义用户滑动速度
- `autoPlay：false`               定义是否自动播放
- `autoSpeed：1`                  定义自动播放的速度
- `autoUpdate：false`             定义是否自动刷新画面，默认滑动的时候才刷新

## Properties
- `canvas`                        获取 Canvas 对象
- `sprites`                       获取 sprites 定义信息
- `autoSpeed`                     获取或定义 autoPlay 的播放速度
- `autoUpdate`                    获取或定义是否自动更新

## CallBack
- `onInit()`                      渲染完成后的回调
- `onEnd()`                       滑动到最底后的回调
- `onTickStart(timeGallery)`      每一帧的开始前回调，可选 TimeGallery 实例作为参数
- `onTickEnd(timeGallery)`        每一帧的结束后回调，可选 TimeGallery 实例作为参数
- `onTimeToStart(timeGallery)`    onTimeTo 开始前回调，可选 TimeGallery 实例作为参数
- `onTimeToEnd(timeGallery)`      onTimeTo 结束后回调，可选 TimeGallery 实例作为参数

## Methods
- `init()`                        渲染实例
- `play()`                        开始动画
- `stop()`                        停止动画
- `replay()`                      重新开始
- `destroy()`                     摧毁实例
- `remove(id)`                    删除指定的数据对象，包括它的子对象
- `getActiveTime()`               获取时间轴的当前时间位置
- `getEndTime()`                  获取时间轴的总时间
- `getObject(id)`                 获取 Data 定义的数据类型信息
- `getImage(id)`                  获取 Resources 定义的图片资源信息
- `getSprite(id)`                 获取 Sprites 定义的精灵图数据信息
- `timeTo(number, time, callback)`滑动到指定位置，可传绝对位置 number、相对位置 '+number'、'-number'。time(单位ms) 可选，默认是 0

## NPM

```
npm install
```

```
gulp
```

