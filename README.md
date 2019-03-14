# time-gallery
基于 createJs 实现长图加动画的效果，用户可通过上下滑动屏幕控制长图进度。

## 前言
之前公司要开发一个长图加动画的H5项目，我看到很多类似的案例是基于白鹭来开发，但因为本人没接触过白鹭，于是自己就基于 createJs 扩展开发一个长图加动画的框架。

因为后来很多同事问我拿源码开发类似的项目，所以就决定把源码分享出来一起学习。

在这里不需要掌握 createJs，如果想做类似项目的朋友可直接使用。

当然，如果熟悉 createJs 的朋友，可基于源码 **SRC** 扩展更多满足自己想要的功能。

## 案例参考

![](http://news.gd.sina.com.cn/staff/zt2/works/images/qrcode/chunsheng.png)
![](http://news.gd.sina.com.cn/staff/zt2/works/images/qrcode/picc_69.png)
![](http://news.gd.sina.com.cn/staff/zt2/works/images/qrcode/nfdw.png)

## 使用

HTML
```
<body>
    <canvas id="gallery-canvas" style="width:100%"></canvas>
</body>

<script src="preloadjs.min.js"></script>
<script src="easeljs.min.js"></script>
<script src="time-gallery.min.js"></script>
```
JS
```
var gallery = new TimeGallery({
    id: 'gallery-canvas',                                   // 定义画布的id（必选）
    width: 750,                                             // 定义画布的宽度，根据设计稿定义（必选）
    height: window.innerHeight/window.innerWidth * 750,     // 定义画布的高度，目前是屏幕高度（必选）
    resourcesPath: 'assets/images/',                        // 定义资源文件的默认路劲（可选）
    resources: [                                            // 定义资源文件（必选）
        { src: 'demo.png', id: 'demo' },
        { src: 'demo-sprite.png', id: 'demo-sprite' },
    ],
    data: [],                                               // 定义画布数据（必选）
});

gallery.play();
```
这里我们就成功的创建了一个空白的画布，下一步我们需要建立数据。

## 创建数据
TimeGallery 是通过遍历 data 属性里定义的数据来创建对象，data 可接收自身(content上下文)作为参数。

**可能当你往下看的时候，你可能会觉得贴的代码很多，有点复杂。其实你主要了解如何创建数据，数据有哪些类型与属性，然后练练手，你就大概知道怎样创建数据。**

```
// 定义画布数据
function canvasData(ctx) {
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
                    image: ctx.getImage('demo'),    
                    prop: {
                        x: 100，
                        y: 100，
                    }
                }
            ]
        }
    ]
}

// 把数据传给 data
var gallery = new TimeGallery({
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

gallery.play();
```
这里我们定义了一个 ID 为 demo-container 的容器, 位于画布 x: 0，y: 0 的位置，容器内定义了一个为 Bitmap 的子类型，位于 demo-container 容器 x: 100, y: 100的位置。

把函数 **canvasData** 定义的数据目录传给 **data** 属性。

这时候，你应该看到一张静态的图片在画面上。

## 数据类型
数据类型分别有 **Container, Bitmap, Text, Shape, Sprite**，以下是每个类型的基本属性:
```
{
    id: 'name',             // 为元素指定 ID，方便其他元素调用 startById，endById，afterById
    type: '',               // 为元素指定数据类型，默认是 Container

    // 定义基础属性
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
    // 定义动画属性
    animation: {
        startById: '',      // 与指定 ID 元素同步执行动画，不能与 afterById 共用，ID 元素必须已创建。
        endById: '',        // 与指定 ID 元素同步结束动画，ID 元素必须已创建，动画开始位置必须小于指定 ID 元素的结束位置。
        afterById: '',      // 在指定 ID 元素结束后执行动画，ID 元素必须已创建。
        musicById: '',      // 当动画开始执行时候，播放指定 ID <audio> 
        x: 0,               // 动画结束后的 X 位置
        y: 0,               // 动画结束后的 Y 位置
        top: 0,             // 调整动画执行位置，例如 top:-100, 则元素在执行动画的时候延迟100像素
        scaleX: 1,          // 动画结束后的 Scale X
        scaleY: 1,          // 动画结束后的 Scale Y
        skewX: null,        // 动画结束后的 Skew X 
        skewY: null,        // 动画结束后的 Skew Y
        rotation: 0,        // 动画结束后的旋转度数 
        alpha: 1,           // 动画结束后透明度
        sprite: [],         // 动画组，根据执行进度按索引替换图片
        duration: 0,        // 动画执行长度
    },
    // 定义事件
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
        // 定义类型
    ]
}
```
#### 图片 Bitmap
```
{
    type: 'bitmap',
    image: 'image.jpg',  // 建议通过 ctx.getImage(id) 获取 resources 定义的资源
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
#### 矢量图 Shape
```
type: 'shape',
prop: {
    width: 750,
    height: 750,
    y: 0,
    graphics: {
        beginFill: ['#e8340c'],    // [填充颜色]
        drawRect: [0, 0, 750, 750] // 创建矩形 [填充坐标X，填充坐标Y，填充宽度，填充高度] 
        // drawCircle: [0, 0, 25]; // 创建圆形 [填充坐标X，填充坐标Y，半径]
    }
}
```
#### 精灵图 Sprite

```
{
    type: 'sprite',
    sheet: {
        images:[ctx.getImage('demo')], // [图片路径]
        frames: {'height': 292, 'width': 165, 'count': 64, 'regX': 0,  'regY': 0}, // 每帧的尺寸，count是总帧数
        animations: {
            run: [0, 5, 'jump', 0.05],  //[开始帧，结束帧，动画完成后的动作，速度]
            jump: [26]
        }
    },
    method: {
        gotoAndPlay: ['run'] // 执行 run 帧动画
    }
}

{
    type: 'sprite',
    sheet: {
        images:[ctx.getImage('demo')], // [图片路径]
        frames: {'height': 292, 'width': 165, 'count': 64, 'regX': 0,  'regY': 0}, // 每帧的尺寸，count是总帧数
        animations: {
            run: [0, 5, 'jump', 0.05],  //[开始帧，结束帧，动画完成后的动作，速度]
            jump: [26]
        }
    },
    method: {
        gotoAndPlay: ['run'] // 执行 run 帧动画
    }
}

```

