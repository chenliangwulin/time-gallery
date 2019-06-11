/**
 *  @Width: 画布宽
 *  @Height: 画布高
 *  @isState: 是否启动 Stage.js 测试FPS, 依赖 stats.js
 *  @isLog: 是否打印数据结构
 *  @isTouch: 是否启动滑动事件
 *  @direction: 可设置水平(horizontal)或垂直(vertical)
 *  @resourcesPath: 图片资源加载的默认路劲
 *  @resources: 图片资源
 *  @sprites: 自定义雪碧图数据数组，方便创建数据的时候可随时调用雪碧图
 *  @data: 创建画布数据
 *  @onInit: 初始化后的回调
 *  @onEnd: 结束后的回调
 *  @onTickStart: 每一帧的开始前回调
 *  @onTickEnd: 每一帧的结束后回调
 *  @onTimeToStart: onTimeTo 开始前回调，可选 TimeGallery 实例作为参数
 *  @onTimeToEnd: onTimeTo 结束后回调，可选 TimeGallery 实例作为参数
 *  @delayTime: 定义画布始点位置
 *  @activeTime: 定义画布当前的播放的位置（可方便测试）
 *  @endTime: 画布默认结束位置，默认是 endPlayTime 最大值或地图的高度
 *  @playLine: 定义元素播放线，即元素滑动到此位置后就开始执行动画（默认元素在屏幕底部的位置开始执行动画）
 *  @touchSpeed: 定义用户滑动速度，越大，滑动的速度越快
 *  @autoPlay: 是否自动播放
 *  @autoSpeed: 自动播放速度
 *  @autoUpdate: 是否自动更新
 */

class TimeGallery {

    constructor (options) {

        if (!options.id) return console.error('Canvas id not exist');

        this._stage = new createjs.Stage(document.getElementById(options.id));

        this._loadQueue = null;
        this._isLoading = false;
        this._isEnd = false;
        this._isState = options.isState || false;
        this._isLog = options.isLog || false;
        this._isTouch = options.isTouch !== false;

        this._dirGroup = {
            horizontal: 'horizontal',
            vertical: 'vertical'
        };

        // 定义时间轴的方向
        this._isVertical = (options.direction || this._dirGroup.vertical) === this._dirGroup.vertical;

        // 定义时间轴对象
        this._timeline = null;

        // 定义时间轴延迟时间
        this._delayTime = options.delayTime || 0;

        // 定义时间轴结束的位置
        // 渲染完成后即获取动画组的动画长度与画布长度之间的最大值
        this._endTime = options.endTime || 0;

        // 定义时间轴开始的位置
        this._activeTime = options.activeTime || 0;

        // 定义是否自动播放
        this._autoPlay = options.autoPlay || false;

        // 创建的数据对象
        this._data = options.data || [];

        // 数据实例化对象组
        this._objects = {};

        // 执行动画的数组
        this._animatorsGroup = [];

        // 定义资源默认路劲
        this._resourcesPath = options.resourcesPath || '';

        // 定义资源列表
        this._resources = options.resources || [];
        this._sprites = options.sprites || {};

        // Touch 初始值
        this._touchData = {
            touchstart: 0,			           // TouchStart 初始 Y 位置
            touchmove: 0,                      // TouchMove  初始 Y 距离
            friction : 0.92,		           // 摩擦值
            speed: options.touchSpeed || 1,    // Touch 滑动速度
            isInertance: false                 // 惯性
        };

        this.width = options.width || window.innerWidth;
        this.height = options.height || (this.width? (window.innerHeight/window.innerWidth * this.width) : window.innerHeight);
        this.canvas = this._stage.canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.onInit = options.onInit || null;
        this.onEnd = options.onEnd || null;
        this.onTickStart = options.onTickStart || null;
        this.onTickEnd = options.onTickEnd || null;
        this.onTimeToStart = options.onTimeToStart || null;
        this.onTimeToEnd = options.onTimeToEnd || null;

        this.autoSpeed = options.autoSpeed || 1;
        this.autoUpdate = options.autoUpdate || false;

        // 定义动画播放线
        this.playLine = options.playLine || (this._isVertical? this.height : this.width);

        if (this._isTouch) this._initTouchEvent();

        this.init();
    }

    // 渲染实例
    init() {
        this._preload(this._resources, {
            path: this._resourcesPath,
            onComplete: () => {

                if (typeof this._sprites === 'function') this._sprites = this._sprites(this);

                if (typeof this._data === 'function') this._data = this._data(this);

                const data = [
                    {
                        id: '_timeline',
                        children: [
                            {
                                id: '_timedata',
                                children: this._data
                            }
                        ]
                    }
                ];

                // 渲染图像数据
                this._render(data, null, (displayObject, obj) => {
                    if (displayObject) {
                        if (obj.animation) {
                            displayObject.animation = this._createAnimate(displayObject, obj.animation);
                            this._animatorsGroup.push(displayObject);
                        }
                    }
                });

                this._timeline = this._objects['_timeline'];

                if (this._isVertical) {
                    this._objects['_timedata'].y = this._delayTime;
                } else {
                    this._objects['_timedata'].x = this._delayTime;
                }

                // 获取实例最大时间长度
                if (!this._endTime) {
                    let length, maxEndPlayTime;

                    if (this._isVertical) {
                        length = this._timeline.getBounds().height + this._timeline.getBounds().y - this.height;
                    } else {
                        length = this._timeline.getBounds().width + this._timeline.getBounds().x - this.width;
                    }

                    maxEndPlayTime = Math.max.apply(Math, this._animatorsGroup.map(displayObject => {return displayObject.animation.endPlayTime}));

                    this._endTime = Math.max(length, maxEndPlayTime);
                }

                // 定义当前时间点
                if (this._activeTime) {
                    if (this._activeTime < 0) {
                        this._activeTime = 0;
                    } else if (this._activeTime > this._endTime) {
                        this._activeTime = this._endTime;
                    }

                    let activeTime = -this._activeTime;
                    this._isVertical ? this._timeline.y = activeTime : this._timeline.x = activeTime;
                    this._updateAnimators();
                }

                this._stage.update();

                // 是否打印 FPS 状态，依赖 state.js
                if (this._isState) this._stats();

                // 初始化成功的回调
                if (this.onInit) this.onInit();
            }
        });

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
    }

    // 启动实例
    play() {
        if (this._tickEvent) this.stop();

        this._tickEvent = () => this._onTick();

        createjs.Ticker.addEventListener('tick', this._tickEvent);
    }

    // 重新开始
    replay() {
        this._touchData.touchstart = 0;
        this._touchData.touchmove = 0;
        this._touchData.isInertance = false;

        if (this._isVertical) {
            this._timeline.y = 0;
        } else {
            this._timeline.x = 0;
        }

        this._animatorsGroup.forEach((displayObject) => {
            displayObject.animation.set(0);
        });

        this._stage.update();

        this.play();
    }

    // 停止实例
    stop() {
        createjs.Ticker.removeEventListener('tick', this._tickEvent);
        this._tickEvent = null;
    }

    // 删除 id 数据，包括 id 的子属性
    remove(id) {
        let displayObject = this._objects[id];
        let parent = displayObject.parent;

        parent.removeChild(displayObject);

        this._stage.update();
        this._removeObject(id);
    }

    // 摧毁对象，移除所有 Data 对象
    destroy() {
        this.stop();

        this._initTouchData();

        this._stage.removeAllChildren();
        this._stage.update();

        this._objects = {};
        this._animatorsGroup = [];
        this._endTime = 0;
        this._activeTime = 0;
    }

    // 获取当前时间位置
    getActiveTime() {
        return this._activeTime;
    }

    // 获取总时间
    getEndTime() {
        return this._endTime;
    }

    // 获取 Data 对象信息
    getObject(id = '') {

        if (id === '') return this._objects;

        let displayObject = this._objects[id];

        if (displayObject === undefined) return null;

        let {width, height, regX, regY, rotation, scaleX, scaleY, skewX, skewY, alpha, type, x, y, visible} = displayObject;
        let object = {
            id,
            width,
            height,
            regX,
            regY,
            rotation,
            scaleX,
            scaleY,
            skewX,
            skewY,
            alpha,
            type,
            x,
            y,
            visible,
            target: displayObject
        };

        if (this._isVertical) {
            object.y = this._getObjectTime(displayObject)
        } else {
            object.x = this._getObjectTime(displayObject)
        }

        if (displayObject.animation) {
            object.animation = displayObject.animation;
        }

        return object;
    }

    // 获取图片资源信息
    getImage(id = '') {

        if (id === '') return this._loadQueue;

        return this._loadQueue[id];
    }

    getSprite(id = '') {

        if (id === '') return this._sprites;

        return this._sprites[id];
    }

    timeTo(time, duration = 0, callback) {

        let timeToPos = 0;

        if (typeof(time) === 'string') {
            let prefix = time[0];
            switch (prefix) {
                case '+':
                case '-':
                    timeToPos = this._activeTime + parseInt(time);
                    break;
                default:
                    // timeToPos = this._getObjectTime(this._objects[time])
                    return;
            }
        } else if (typeof(time) === 'number') {
            timeToPos = time;
        } else {
            return
        }

        if (this._activeTime === timeToPos) return;

        if (this.onTimeToStart) this.onTimeToStart(this);

        if (duration === 0) {

            this._activeTime = timeToPos;

            if (this._isVertical) {
                this._timeline.y = -this._activeTime;
            } else {
                this._timeline.x = -this._activeTime;
            }

            this._updateAnimators();

            this._stage.update();

            this._onTimeToEnd(callback);

        } else {

            this.stop();

            let startDate = new Date().getTime();
            let activeDate = 0;
            let timeToDir = 1;
            let timeToStart = 0;
            let timeToMove = 0;
            let timeToProgress = 0;
            let timeToDistance = Math.abs(this._activeTime - timeToPos);

            // 判断滑动方向
            if (this._activeTime > timeToPos) timeToDir = -1;

            // 定义滑动 Ticker 事件
            this._tickEvent = () => {

                if (this.onTickStart) this.onTickStart(this);

                activeDate = new Date().getTime();
                timeToProgress = (activeDate - startDate)/duration;
                timeToMove = Math.floor(timeToProgress * timeToDistance) * timeToDir;

                if (timeToMove > timeToDistance) timeToMove = timeToDistance;

                this._activeTime += (timeToMove - timeToStart);

                timeToStart = timeToMove;

                if (this._activeTime < 0) {

                    if (this._isVertical) {
                        this._activeTime = 0;
                    } else {
                        this._activeTime = 0;
                    }

                    this._onTimeToEnd(callback);

                } else if (this._activeTime >= this._endTime) {

                    this._activeTime = this._endTime;

                    this._onTimeToEnd(callback);

                    this._isEnd = true;

                    if (this.onEnd) this.onEnd();

                } else if (timeToProgress >= 1) {
                    this._onTimeToEnd(callback);
                }

                if (this._isVertical) {
                    this._timeline.y = -this._activeTime
                } else {
                    this._timeline.x = -this._activeTime
                }

                this._updateAnimators();

                if (this.onTickEnd) this.onTickEnd(this);

                this._stage.update();

            };

            createjs.Ticker.addEventListener('tick', this._tickEvent);
        }
    }

    _onTimeToEnd(callback) {
        if (this._touchData.touchmove !== 0) this._initTouchData();
        if (this.onTimeToEnd) this.onTimeToEnd(this);
        if (callback) callback(this);
        this.play();
    }

    _onTick() {
        if (!this._isLoading && this._timeline) {

            if (this.autoUpdate && this.onTickStart) this.onTickStart(this);

            if (this._autoPlay || this._touchData.isMoving) {

                if (!this.autoUpdate && this.onTickStart) this.onTickStart(this);

                let activeTime;

                if (this._touchData.isMoving) {

                    // 如果是惯性
                    if (this._touchData.isInertance) {
                        // 惯性减速
                        this._touchData.touchmove *= this._touchData.friction;

                        if (Math.abs(this._touchData.touchmove) <= 1) this._initTouchData();

                    }

                    // 根据滑动的位置记录动画执行
                    if (this._isVertical) {
                        this._timeline.y += this._touchData.touchmove * this._touchData.speed;
                        activeTime = -this._timeline.y;
                    } else {
                        this._timeline.x += this._touchData.touchmove * this._touchData.speed;
                        activeTime = -this._timeline.x;
                    }

                    this._updateTime(activeTime);

                } else {

                    if (this._isVertical) {
                        this._timeline.y -= this.autoSpeed;
                        activeTime = -this._timeline.y;
                    } else {
                        this._timeline.x -= this.autoSpeed;
                        activeTime = -this._timeline.x;
                    }

                    this._updateTime(activeTime);

                }

                if (this.onTickEnd) this.onTickEnd(this);

                if (!this.autoUpdate) this._stage.update();
            }

            if (this.autoUpdate) this._stage.update();

            if (this._isState) this.stats.update();

        }
    }

    _updateTime(activeTime) {

        if (activeTime < this._endTime) {
            this._isEnd = false;
        }

        if (activeTime < 0) {

            activeTime = 0;

            if (this._isVertical) {
                this._timeline.y = 0;
            } else {
                this._timeline.x = 0;
            }

        } else if (activeTime > this._endTime) {

            activeTime = this._endTime;

            if (this._isVertical) {
                this._timeline.y = -this._endTime;
            } else {
                this._timeline.x = -this._endTime;
            }

            if (this._isEnd) return;

            this._isEnd = true;

            if (this.onEnd) this.onEnd();

        }

        this._activeTime = activeTime;

        this._updateAnimators();
    }

    _updateAnimators() {
        let pos = this._isVertical? -this._timeline.y : -this._timeline.x;

        this._animatorsGroup.map(displayObject => {
            let startPlayTime = displayObject.animation.startPlayTime;
            let endPlayTime   = displayObject.animation.endPlayTime;

            if (pos >= startPlayTime && pos < endPlayTime) {
                displayObject.animation.update(Math.abs(pos - startPlayTime));
            } else if (pos < startPlayTime) {
                displayObject.animation.set(0);
            } else if (pos >= endPlayTime) {
                displayObject.animation.set(endPlayTime - startPlayTime);
            }
        });

        if (this.onTickEnd) this.onTickEnd(this);
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

    _addObject(obj = {}) {

        let displayObject = null;

        switch (obj.type) {
            case 'shape':

                displayObject = new createjs.Shape();

                if (obj.graphics) {
                    for (let key of Object.keys(obj.graphics)) {
                        if (Array.isArray(obj.graphics[key])) {
                            displayObject.graphics[key](...obj.graphics[key])
                        } else if (obj.graphics[key] instanceof Object) {
                            displayObject.graphics[key](obj.graphics[key])
                        } else {
                            displayObject.graphics[key](obj.graphics[key]);
                        }
                    }
                }

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

        if (obj.parent_id) displayObject.parent_id = obj.parent_id;

        if (obj.prop) {
            for (let propKey of Object.keys(obj.prop)) {
                switch (propKey) {
                    case 'index':
                        break;
                    default:
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

        if (obj.methods) {
            for (let key of Object.keys(obj.methods)) {
                displayObject[key](...obj.methods[key]);
            }
        }

        if (obj.events) {
            if (obj.events.handle) {
                let type = obj.events.type || 'click';
                displayObject.addEventListener(type, obj.events.handle)
            }
        }

        // if (displayObject.getBounds()) {
        //     let bounds = displayObject.getBounds();
        //     displayObject.width = bounds.width;
        //     displayObject.height = bounds.height;
        // }

        return displayObject;

    }

    _removeObject(id) {
        let displayObject = this._objects[id];

        delete this._objects[id];

        if (displayObject.animation) {
            this._removeAnimator(displayObject.name)
        }

        let children = displayObject.children;

        if (children) {
            children.forEach(child => {
                delete this._objects[child.name];
                if (child.children) {
                    this._removeObject(child);
                }

                if (child.animation) {
                    this._removeAnimator(child.name)
                }
            })
        }
    }

    _removeAnimator(id) {
        for(let i = 0, len = this._animatorsGroup.length; i < len; i++ ){
            if (this._animatorsGroup[i].name === id) {
                this._animatorsGroup.splice(i, 1);
                return;
            }
        }
    }

    _render(data = [], parent_id, custom = () => {}) {

        if (data instanceof Object) data = Array.from(data);

        data.map((obj, index) => {

            obj.parent_id = parent_id;

            if (obj.id === undefined) obj.id = `${parent_id}_${index}`;

            if (this._objects[obj.id]) {
                console.error(`Data id:'${obj.id}' is it exists already`);
                return;
            }

            this._objects[obj.id] = this._addObject(obj);

            if (this._isLog) {
                console.group(obj.id + ':');
                console.table({
                    x : this._objects[obj.id].x,
                    y : this._objects[obj.id].y,
                    regX : this._objects[obj.id].regX,
                    regY : this._objects[obj.id].regY,
                    scaleX : this._objects[obj.id].scaleX,
                    scaleY : this._objects[obj.id].scaleY,
                    rotation : this._objects[obj.id].rotation,
                    alpha : this._objects[obj.id].alpha,
                    visible : this._objects[obj.id].visible
                });
            }

            if (parent_id) {
                this._objects[parent_id].addChild(this._objects[obj.id]);
            } else {
                this._stage.addChild(this._objects[obj.id]);
            }

            // 自定义属性
            if (custom) {
                custom(this._objects[obj.id], obj);
            }

            if (obj.children) {
                this._render(obj.children, obj.id, custom);
            }

            if (this._isLog) {
                console.groupEnd();
            }

        });

        data.map(obj => {
            if (parent_id) {
                if (obj.prop && obj.prop.index) {
                    let index = obj.prop.index;
                    let number = this._objects[parent_id].numChildren;

                    if (index > number) {
                        index = number - 1;
                    }

                    this._objects[parent_id].setChildIndex(this._objects[obj.id], index);

                    console.log(this._objects[parent_id].getChildIndex(this._objects[obj.id]));
                }
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
        delay = 0,
        duration = 0,
        sprite = [],
        startById = null,
        endById = null,
        afterById = null,
        musicById = null,
        musicStopById = null,
    } = {}) {
        let mapPos = this._getObjectTime(displayObject) + this._delayTime,
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
            isPlay = false,
            music = null,
            musicStop = null;

        let startPlayTime = 0;                          // 对象开始执行动画位置
        let endPlayTime = 0;                            // 对象结束执行动画位置

        if (top) {
            delay = -top;
        }

        if (startById) {
            startPlayTime = this._objects[startById].animation.startPlayTime + delay;
        } else if (afterById) {
            startPlayTime = this._objects[afterById].animation.endPlayTime + delay;
        } else if (endById) {
            startPlayTime = this._objects[endById].animation.endPlayTime - duration + delay;
        } else {
            if (mapPos + delay >= this.playLine) {
                startPlayTime = mapPos + delay - this.playLine;
            } else {
                startPlayTime = 0;
            }
        }

        if (endById) {
            endPlayTime = this._objects[endById].animation.endPlayTime;
        } else {
            endPlayTime = startPlayTime + duration;
        }

        if (musicById) {
            music = document.getElementById(musicById);
        }

        if (musicStopById) {
            musicStop = document.getElementById(musicStopById);
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
            if(scaleX || scaleX === 0) displayObject.scaleX = progress * (scaleX - initScaleX) + initScaleX;
            if(scaleY || scaleY === 0) displayObject.scaleY = progress * (scaleY - initScaleY) + initScaleY;
            if(skewX || skewX === 0) displayObject.skewX = progress * (skewX - initSkewX) + initSkewX;
            if(skewY || skewY === 0) displayObject.skewY = progress * (skewY - initSkewY) + initSkewY;
            if(rotation || rotation === 0) displayObject.rotation = progress * (rotation - initRotation) + initRotation;
            if(alpha || alpha === 0) displayObject.alpha = progress * (alpha - initAlpha) + initAlpha;
        }

        return {
            startPlayTime,
            endPlayTime,
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

                if (music) {
                    if (isMusic === false) {
                        music.currentTime = 0;
                        music.play();
                        isMusic = true;
                    } else if (isMusic === true && progress === 0) {
                        if (!music.paused) {
                            music.pause();
                            isMusic = false;
                        }
                    }
                }

                if (musicStop) {
                    if (!musicStop.paused) musicStop.pause();
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

    _getObjectTime(displayObject) {
        let sum = this._isVertical? displayObject.y : displayObject.x;
        let _this = this;

        _countTime(displayObject);

        return sum;

        function _countTime(displayObject) {
            let parent = displayObject.parent;

            if (parent && parent.name !== '_timeline') {
                sum += _this._isVertical? parent.y : parent.x;
                _countTime(parent);
            }
        }
    }

    // 初始化手势
    _initTouchEvent() {
        this.canvas.addEventListener('touchstart', (e) => {
            if (this._isVertical) {
                this._touchData.touchstart = e.touches[0].clientY;
            } else {
                this._touchData.touchstart = e.touches[0].clientX;
            }

            this._touchData.isInertance = false;
            this._touchData.isMoving = false;
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (this._isVertical) {
                this._touchData.touchmove = e.touches[0].clientY - this._touchData.touchstart;
                this._touchData.touchstart = e.touches[0].clientY;
            } else {
                this._touchData.touchmove = e.touches[0].clientX - this._touchData.touchstart;
                this._touchData.touchstart = e.touches[0].clientX;
            }
            this._touchData.isMoving = true;
        });

        this.canvas.addEventListener('touchend', () => {
            this._touchData.isInertance = true;
        });
    }

    _initTouchData() {
        this._touchData.touchstart = 0;
        this._touchData.touchmove = 0;
        this._touchData.isInertance = false;
        this._touchData.isMoving = false;
    }

    _stats () {
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
    }
}