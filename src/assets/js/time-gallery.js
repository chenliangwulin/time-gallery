/**
 *  @Width: 画布宽
 *  @Height: 画布高
 *  @isState: 是否启动 Stage.js 测试FPS, 依赖 stage.js
 *  @isLog: 是否打印数据结构
 *  @direction: 可设置水平(horizontal)或垂直(vertical)
 *  @resourcesPath: 图片资源加载的默认路劲
 *  @resources: 图片资源
 *  @sprites: 自定义雪碧图数据数组，方便创建数据的时候可随时调用雪碧图
 *  @data: 创建画布数据
 *  @onInit: 初始化后的回调
 *  @onEnd: 结束后的回调
 *  @onTickStart: 每一帧的开始前回调
 *  @onTickEnd: 每一帧的结束后回调
 *  @mapStart: 定义画布始点位置
 *  @mapActive: 定义画布当前的播放的位置（可方便测试）
 *  @mapEnd: 画布默认结束位置，默认是 animatePlayEnd 最大值或地图的高度
 *  @mapPlay: 定义画布播放动画的位置（默认元素再屏幕底部的位置开始播放动画）
 *  @touchSpeed: 定义用户滑动速度，越大，滑动的速度越快
 *  @autoPlay: 是否自动播放
 *  @autoSpeed: 自动播放速度
 */

class TimeGallery {

    constructor (options) {

        if (options.id === '') {
            console.error('ID not exist');
        }

        this.width = options.width || window.innerWidth;
        this.height = options.height || window.innerHeight;
        this._stage = new createjs.Stage(document.getElementById(options.id));
        this._stage.canvas.width = this.width;
        this._stage.canvas.height = this.height;
        this._loadQueue = null;
        this._isLoading = false;
        this._isEnd = false;
        this._dirGroup = {
            horizontal: 'horizontal',
            vertical: 'vertical'
        };

        this.isVertical = (options.direction || this._dirGroup.vertical) === this._dirGroup.vertical;
        this.isMoving = false;
        this.isState = options.isState || false;
        this.isLog = options.isLog || false;

        this.autoPlay = options.autoPlay || false;
        this.autoSpeed = options.autoSpeed || 1;

        this.resourcesPath = options.resourcesPath || '';
        this.resources = options.resources || [];
        this.sprites = options.sprites || {};
        this.data = options.data || [];

        this.onInit = options.onInit || null;
        this.onEnd = options.onEnd || null;
        this.onTickStart = options.onTickStart || null;
        this.onTickEnd = options.onTickEnd || null;

        this.mapStart = options.mapStart || 0;
        this.mapActive = options.mapActive || 0;
        this.mapEnd = options.mapEnd || 0;
        this.mapPlay = options.mapPlay || (this.isVertical? this.height : this.width);

        this.objects = {};
        this.animatorsGroup = [];              // 执行动画的数组
        this.touchData = {
            touchstart: 0,			           // TouchStart 初始 Y 位置
            touchmove: 0,                      // TouchMove  初始 Y 距离
            friction : 0.9,		               // 摩擦值
            speed: options.touchSpeed || 1,    // Touch 滑动速度
            isInertance: false                 // 惯性
        };

        this.init();
    }

    init() {
        this._preload(this.resources, {
            path: this.resourcesPath,
            onComplete: () => {

                if (typeof this.sprites === 'function') this.sprites = this.sprites(this);
                if (typeof this.data === 'function') this.data = this.data(this);

                const data = [
                    {
                        id: 'map',
                        children: this.data
                    }
                ];

                // 渲染图像数据
                this._render(data, null, (displayObject, obj) => {
                    if (displayObject) {
                        if (obj.animation) {
                            displayObject.animation = this._createAnimate(displayObject, obj.animation);
                            this.animatorsGroup.push({displayObject});
                        }
                    }
                });

                this.map = this.objects['map'];

                let mapActive = this.mapActive? -this.mapActive : -this.mapStart;

                if (this.isVertical) {
                    this.map.y = mapActive
                } else {
                    this.map.x = mapActive;
                }

                if (!this.mapEnd) {
                    let mapLong;
                    if (this.isVertical) {
                        mapLong = this.map.getBounds().height + this.map.getBounds().y - this.height;
                    } else {
                        mapLong = this.map.getBounds().width + this.map.getBounds().x - this.width;
                    }
                    let maxAnimatePlayEnd = Math.max.apply(Math, this.animatorsGroup.map((item) => {return item.displayObject.animation.animatePlayEnd}));
                    this.mapEnd = Math.max(mapLong, maxAnimatePlayEnd);
                }

                // 初始化滑动事件
                this._initTouchEvent();

                if (this.onInit) this.onInit();

                // 是否打印 FPS 状态，依赖 state.js
                if (this.isState) this._stats();

                this._stage.update();
            }
        });

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
    }

    play() {
        createjs.Ticker.addEventListener('tick', this._onTick.bind(this));
    }
    
    replay() {
        this._isEnd = false;

        this.touchData.touchstart = 0;
        this.touchData.touchmove = 0;
        this.touchData.isInertance = false;

        if (this.isVertical) {
            this.map.y = -this.mapStart;
        } else {
            this.map.x = -this.mapStart;
        }

        this.animatorsGroup.forEach((item) => {
            item.displayObject.animation.set(0);
        });

        this._stage.update();

        this.play();
    }

    stop() {
        createjs.Ticker.removeAllEventListeners();
    }

    getImage(id) {
        return this._loadQueue[id];
    }

    _onTick() {
        if (!this._isLoading && this.map) {

            if (this.autoPlay || this.isMoving) {

                if (this.onTickStart) this.onTickStart(this);

                let pos;

                if (this.autoPlay) {
                    if (this.isVertical) {
                        this.map.y -= this.autoSpeed;
                        pos = -this.map.y;
                    } else {
                        this.map.x -= this.autoSpeed;
                        pos = -this.map.x;
                    }

                    if (this.touchData.touchmove !== 0) {
                        this.touchData.touchstart = 0;
                        this.touchData.touchmove = 0;
                        this.touchData.isInertance = false;
                        this.isMoving = false;
                    }
                } else if (this.isMoving) {

                    // 如果是惯性
                    if (this.touchData.isInertance) {
                        // 惯性减速
                        this.touchData.touchmove *= this.touchData.friction;

                        if (Math.abs(this.touchData.touchmove) <= 1) {
                            this.touchData.touchstart = 0;
                            this.touchData.touchmove = 0;
                            this.touchData.isInertance = false;
                            this.isMoving = false;
                        }
                    }

                    // 根据滑动的位置记录动画执行
                    if (this.isVertical) {
                        this.map.y += this.touchData.touchmove * this.touchData.speed;
                        pos = -this.map.y;
                    } else {
                        this.map.x += this.touchData.touchmove * this.touchData.speed;
                        pos = -this.map.x;
                    }
                }

                if (pos < this.mapStart) {
                    if (this.isVertical) {
                        this.map.y = -this.mapStart;
                    } else {
                        this.map.x = -this.mapStart;
                    }
                }

                if (pos > this.mapEnd) {

                    if (this._isEnd) return;

                    this._isEnd = true;

                    if (this.isVertical) {
                        this.map.y = -this.mapEnd;
                    } else {
                        this.map.x = -this.mapEnd;
                    }

                    if (this.onEnd) {
                        this.onEnd();
                        return;
                    }
                }

                this.mapActive = this.isVertical? -this.map.y : -this.map.x;

                this._updateAnimators();
            }

        }

        if (this.isState) {
            this.stats.update();
        }
    }

    _updateAnimators() {
        let pos = this.isVertical? -this.map.y : -this.map.x;

        this.animatorsGroup.map((obj) => {
            let displayObject = obj.displayObject;
            let animatePlayStart = displayObject.animation.animatePlayStart;
            let animatePlayEnd   = displayObject.animation.animatePlayEnd;

            if (pos >= animatePlayStart && pos < animatePlayEnd ) {
                let duration = Math.abs(pos - animatePlayStart);
                displayObject.animation.update(duration);
            } else if (pos < animatePlayStart) {
                displayObject.animation.update(0);
            } else if (pos > animatePlayEnd) {
                displayObject.animation.update(animatePlayEnd - animatePlayStart);
            }
        });

        if (this.onTickEnd) this.onTickEnd(this);

        this._stage.update();
    }

    // 初始化手势
    _initTouchEvent() {

        this._stage.canvas.addEventListener('touchstart', (e) => {

            if (this.autoPlay) return;

            if (this.isVertical) {
                this.touchData.touchstart = e.touches[0].clientY;
            } else {
                this.touchData.touchstart = e.touches[0].clientX;
            }

            this.touchData.isInertance = false;
            this.isMoving = false;
        });

        this._stage.canvas.addEventListener('touchmove', (e) => {
            if (this.isVertical) {
                this.touchData.touchmove = e.touches[0].clientY - this.touchData.touchstart;
                this.touchData.touchstart = e.touches[0].clientY;
            } else {
                this.touchData.touchmove = e.touches[0].clientX - this.touchData.touchstart;
                this.touchData.touchstart = e.touches[0].clientX;
            }
            this.isMoving = true;
        });

        this._stage.canvas.addEventListener('touchend', () => {
            if (this.autoPlay) return;
            this.touchData.isInertance = true;
        });

    }

    _preload(manifest = [], { onComplete = () => {}, onProgress = () => {}, path = ''} = {}) {

        this._isLoading = true;

        let fileList = null;

        if (Array.isArray(manifest)) {
            if (manifest.length === 0) return;
            fileList = manifest;
        } else if (typeof(manifest) === 'string') {
            fileList = [
                {
                    src: manifest,
                    id: manifest
                }
            ];
        } else if (typeof(manifest) === 'object') {
            if (!manifest.id) {
                manifest.id = manifest.src;
            }
            fileList = [manifest];
        } else {
            return false;
        }

        let loadedNumber = 0;
        let preloadNumber = fileList.length;
        let images = {};

        for (let i = 0; i < preloadNumber; i++) {
            let image = new Image();
            let file = fileList[i];
            let fileType = typeof(file);
            let src = '';

            if (fileType === 'object') {
                src = file.src;
            } else if (fileType === 'string') {
                src = file;
            }

            image.src = path + src;
            image.onload = () => {
                if (file.id) {
                    images[file.id] = image;
                } else {
                    images[src] = image;
                }
                loadedNumber++;

                let progress = Math.floor(loadedNumber/preloadNumber * 100);
                onProgress(progress);

                if (progress >= 100) {
                    this._isLoading = false;
                    this._loadQueue = images;
                    onComplete();
                }
            };
        }

        // 基于 PreloadJs
        // this._loadQueue = new createjs.LoadQueue(true, path);
        //
        // if (progress) this._loadQueue.on('progress', e => onProgress(e));
        //
        // this._loadQueue.on('complete', e => {
        //     this._isLoading = false;
        //     if (onComplete) onComplete(e);
        // });
        //
        // this._loadQueue.loadManifest(loadManifest);
    }

    _addObj(obj = {}) {

        let displayObject = null;

        switch (obj.type) {
            case 'shape':
                displayObject = new createjs.Shape();
                break;
            case 'bitmap':
                if (obj.image) {
                    displayObject = new createjs.Bitmap(obj.image);
                }
                break;
            case 'text':
                displayObject = new createjs.Text();
                break;
            case 'sprite':
                if (obj.sheet) {
                    let spriteSheet = new createjs.SpriteSheet(obj.sheet);
                    displayObject = new createjs.Sprite(spriteSheet);
                }
                break;
            default:
                displayObject = new createjs.Container();
                break;
        }

        if (obj.type) {
            displayObject.type = obj.type;
        } else {
            displayObject.type = 'container';
        }

        if (obj.id) displayObject.name = obj.id;

        if (obj.parent_id) displayObject.parentId = obj.parent_id;

        if (obj.prop) {
            for (let propKey of Object.keys(obj.prop)) {
                // 判断属性类型
                if (displayObject[propKey] instanceof Object) {
                    for (let key of Object.keys(obj.prop[propKey])) {
                        if (typeof displayObject[propKey][key] === 'function') {
                            displayObject[propKey][key](...obj.prop[propKey][key]);
                        } else {
                            displayObject[propKey][key] = obj.prop[propKey][key];
                        }
                    }
                } else if (typeof displayObject[propKey] === 'function') {
                    displayObject[propKey](...obj.prop[propKey]);
                } else {
                    displayObject[propKey] = obj.prop[propKey];
                }
            }

            if (obj.type === 'text' && obj.prop.align) {
                switch (obj.prop.align) {
                    case 'center':
                        displayObject.x = (this.width - displayObject.getBounds().width)/2;
                        break;
                    case 'right':
                        displayObject.x = this.width - displayObject.getBounds().width;
                        break;
                    default:
                        displayObject.x = 0;
                }
            }
        }

        if (obj.method) {
            for (let key of Object.keys(obj.method)) {
                displayObject[key](...obj.method[key]);
            }
        }

        if (obj.event) {
            if (obj.event.handle) {
                let type = obj.event.type || 'click';
                displayObject.addEventListener(type, obj.event.handle)
            }
        }

        if (displayObject.getBounds()) {
            let bounds = displayObject.getBounds();
            displayObject.width = bounds.width;
            displayObject.height = bounds.height;
        }

        return displayObject;

    }

    _render(data = [], parent_id, custom = () => {}) {

        if (data instanceof Object) {
            data = Array.from(data)
        }

        data.map((obj) => {

            obj.parent_id = parent_id;

            this.objects[obj.id] = this._addObj(obj);

            if (this.isLog) {
                console.group(obj.id + ':');
                console.table({
                    x : this.objects[obj.id].x,
                    y : this.objects[obj.id].y,
                    regX : this.objects[obj.id].regX,
                    regY : this.objects[obj.id].regY,
                    scaleX : this.objects[obj.id].scaleX,
                    scaleY : this.objects[obj.id].scaleY,
                    rotation : this.objects[obj.id].rotation,
                    alpha : this.objects[obj.id].alpha,
                    visible : this.objects[obj.id].visible
                });
            }

            if (parent_id) {
                this.objects[parent_id].addChild(this.objects[obj.id]);
            } else {
                this._stage.addChild(this.objects[obj.id]);
            }

            // 自定义属性
            if (custom) {
                custom(this.objects[obj.id], obj);
            }

            if (obj.children) {
                this._render(obj.children, obj.id, custom);
            }

            if (this.isLog) {
                console.groupEnd();
            }

        });

        this._stage.update();

    }

    _createAnimate(displayObject, {
        x = null,
        y = null,
        scaleX = null,
        scaleY = null,
        skewX = null,
        skewY = null,
        rotation = null,
        alpha = 1,
        top = 0,
        duration = 0,
        sprite = [],
        startById = null,
        endById = null,
        afterById = null,
        musicById = null,
    } = {}) {
        let mapPos = (this.isVertical? displayObject.y : displayObject.x) + _initAnimatePosition(this),        // 对象位置
            startX = displayObject.x,                    // 动画 X 开始
            startY = displayObject.y,                    // 动画 Y 开始
            endX = x,                                    // 动画 X 结束
            endY = y,                                    // 动画 Y 结束
            initAlpha = displayObject.alpha,
            initScaleX = displayObject.scaleX,
            initScaleY = displayObject.scaleY,
            initSkewX = displayObject.skewX,
            initSkewY = displayObject.skewY,
            initRotation = displayObject.rotation,
            isMusic = false,
            isPlay = false;

        let animatePlayStart = 0;                          // 对象开始执行动画位置
        let animatePlayEnd = 0;                            // 对象结束执行动画位置

        if (startById) {
            animatePlayStart = this.objects[startById].animation.animatePlayStart;
        } else if (afterById) {
            animatePlayStart = this.objects[afterById].animation.animatePlayEnd;
        } else {
            if (mapPos - top >= this.mapPlay) {
                animatePlayStart = mapPos - top - this.mapPlay;
            } else {
                animatePlayStart = this.mapStart;
            }
        }

        if (endById && animatePlayStart < this.objects[endById].animation.animatePlayEnd) {
            animatePlayEnd = this.objects[endById].animation.animatePlayEnd;
            duration = animatePlayEnd - animatePlayStart;
        } else {
            animatePlayEnd = animatePlayStart + duration;
        }

        function _initAnimatePosition(ctx) {
            let sum = 0;

            _countSumY(displayObject);

            return sum;

            function _countSumY(displayObject) {
                let parent = displayObject.parent;

                if (parent && parent.parent !== null) {
                    sum += ctx.isVertical? parent.y : parent.x;
                    _countSumY(parent);
                }
            }
        }

        function _animate(rate) {

            let progress = rate/duration;

            if (sprite.length > 1) {
                let length = sprite.length;
                let durationSegment = duration/length;
                let currentIndex = Math.min(rate/durationSegment | 0, length - 1);
                displayObject.image = sprite[currentIndex];
            }

            if(endX || endX === 0) displayObject.x = progress * (endX - startX) + startX;
            if(endY || endY === 0) displayObject.y = progress *  (endY - startY) + startY;
            if(alpha || alpha === 0) displayObject.alpha = progress * (alpha - initAlpha) + initAlpha;
            if(scaleX || scaleX === 0) displayObject.scaleX = progress * (scaleX - initScaleX) + initScaleX;
            if(scaleY || scaleY === 0) displayObject.scaleY = progress * (scaleY - initScaleY) + initScaleY;
            if(skewX || skewX === 0) displayObject.skewX = progress * (skewX - initSkewX) + initSkewX;
            if(skewY || skewY === 0) displayObject.skewY = progress * (skewY - initSkewY) + initSkewY;
            if(rotation || rotation === 0) displayObject.rotation = progress * (rotation - initRotation) + initRotation;
        }

        return {
            animatePlayStart,
            animatePlayEnd,
            update(rate) {
                let progress = rate/duration;

                if ((progress === 0 || progress === 1) && isPlay === false) {
                    return;
                }

                if (progress >= 1) {
                    progress = 1;
                    isPlay = false;
                } else if (progress <= 0) {
                    progress = 0;
                    isPlay = false;
                } else {
                    isPlay = true;
                }

                if (musicById) {
                    let music = document.getElementById(musicById);
                    if (music) {
                        if (isMusic === false) {
                            isMusic = true;
                            music.currentTime = 0;
                            music.play();
                        } else if (isMusic === true && progress === 0) {
                            music.pause();
                            isMusic = false;
                        }

                        if (music.loop && isMusic === true && progress === 1) {
                            music.pause();
                            isMusic = false;
                        }
                    }
                }

                _animate(rate)
            },
            set(rate) {
                if (isPlay) isPlay = false;
                if (isMusic) isMusic = false;

                _animate(rate)
            }
        }
    }

    _stats () {
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
    }
}

