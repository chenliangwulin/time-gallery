
document.body.addEventListener('touchmove', event => event.preventDefault(), { passive: false });

const app = {
    init() {
        let height = window.innerHeight/window.innerWidth * 750;
        let timeGallery = new TimeGallery({
            id: 'gallery-canvas',             // 定义画布的id（必选）
            width: 750,                       // 定义画布的宽度，根据设计稿定义（可选）
            resourcesPath: 'assets/images/',  // 定义资源文件的默认路劲（可选）
            resources: [                      // 定义资源文件（必选）
                { src: 'scene_start_text.png', id: 'scene_start_text' },

                { src: 'scene_1_text.png', id: 'scene_1_text' },
                { src: 'scene_2_text.png', id: 'scene_2_text' },
                { src: 'scene_3_text_1.png', id: 'scene_3_text_1' },
                { src: 'scene_3_text_2.png', id: 'scene_3_text_2' },
                { src: 'scene_4_text_1.png', id: 'scene_4_text_1' },
                { src: 'scene_4_text_2.png', id: 'scene_4_text_2' },
                { src: 'scene_5_text.png', id: 'scene_5_text' },
                { src: 'scene_6_text.png', id: 'scene_6_text' },

                { src: 'scene_1_role.png', id: 'scene_1_role' },
                { src: 'scene_2_role.png', id: 'scene_2_role' },
                { src: 'scene_3_role.png', id: 'scene_3_role' },
                { src: 'scene_4_role_2.png', id: 'scene_4_role' },
                { src: 'scene_5_role.png', id: 'scene_5_role' },

                { src: 'scene_1_bg.png', id: 'scene_1_bg' },
                { src: 'scene_2_bg.png', id: 'scene_2_bg' },
                { src: 'scene_2_piano.png', id: 'scene_2_piano' },
                { src: 'scene_3_bg.png', id: 'scene_3_bg' },
                { src: 'scene_4_bg.png', id: 'scene_4_bg' },
                { src: 'scene_5_bg.png', id: 'scene_5_bg' },

                { src: 'scene_1_curve.png', id: 'scene_1_curve' },
                { src: 'scene_2_curve.png', id: 'scene_2_curve' },
                { src: 'scene_3_curve.png', id: 'scene_3_curve' },
                { src: 'scene_4_curve.png', id: 'scene_4_curve' },
                { src: 'scene_5_curve.png', id: 'scene_5_curve' },
                { src: 'scene_6_curve.png', id: 'scene_6_curve' },

                { src: 'scene_1_note_sprite.png', id: 'scene_1_note_sprite' },
                { src: 'scene_2_note_sprite.png', id: 'scene_2_note_sprite' },
                { src: 'scene_3_note_sprite.png', id: 'scene_3_note_sprite' },
                { src: 'scene_4_note_sprite.png', id: 'scene_4_note_sprite' },
                { src: 'scene_5_note_sprite.png', id: 'scene_5_note_sprite' },
            ],
            sprites(gallery) {
                return {
                    scene_1_notes: {
                        images: [gallery.getImage('scene_1_note_sprite')],
                        frames: [
                            [0, 1032, 489, 103],
                            [0, 944, 489, 67],
                            [0, 817, 489, 48],
                            [0, 723, 489, 92],
                            [0, 602, 489, 64],
                            [0, 380, 489, 110],
                            [0, 322, 489, 40],
                            [0, 250, 489, 54],
                            [0, 168, 489, 46],
                            [0, 0, 489, 54],
                        ],
                        animations: {
                            note_1: [0],
                            note_2: [1],
                            note_3: [2],
                            note_4: [3],
                            note_5: [4],
                            note_6: [5],
                            note_7: [6],
                            note_8: [7],
                            note_9: [8],
                            note_10: [9],
                        }
                    },
                    scene_2_notes: {
                        images: [gallery.getImage('scene_2_note_sprite')],
                        frames: [
                            [423, 292, 14, 40],
                            [339, 274, 25, 57],
                            [254, 300, 36, 30],
                            [194, 374, 42, 32],
                            [148, 410, 16, 36],
                            [66, 316, 32, 60],
                            [38, 184, 43, 64],
                            [0, 84, 49, 46],
                            [152, 92, 18, 48],
                            [235, 0, 18, 42],
                        ],
                        animations: {
                            note_1: [0],
                            note_2: [1],
                            note_3: [2],
                            note_4: [3],
                            note_5: [4],
                            note_6: [5],
                            note_7: [6],
                            note_8: [7],
                            note_9: [8],
                            note_10: [9],
                        }
                    },
                    scene_3_notes: {
                        images: [gallery.getImage('scene_3_note_sprite')],
                        frames: [
                            [95, 368, 42, 32],
                            [103, 313, 16, 30],
                            [92, 256, 18, 34],
                            [128, 228, 17, 36],
                            [78, 139, 48, 46],
                            [114, 53, 18, 48],
                            [50, 49, 16, 40],
                            [0, 0, 23, 34],
                        ],
                        animations: {
                            note_1: [0],
                            note_2: [1],
                            note_3: [2],
                            note_4: [3],
                            note_5: [4],
                            note_6: [5],
                            note_7: [6],
                            note_8: [7],
                        }
                    },
                    scene_4_notes: {
                        images: [gallery.getImage('scene_4_note_sprite')],
                        frames: [
                            [0, 343, 16, 36],
                            [20, 457, 18, 34],
                            [95, 488, 18, 40],
                            [138, 383, 48, 46],
                            [223, 355, 23, 34],
                            [264, 372, 18, 47],
                            [326, 343, 16, 39],
                            [320, 187, 22, 43],
                            [177, 180, 36, 38],
                            [153, 114, 26, 20],
                            [165, 0, 14, 33],
                        ],
                        animations: {
                            note_1: [0],
                            note_2: [1],
                            note_3: [2],
                            note_4: [3],
                            note_5: [4],
                            note_6: [5],
                            note_7: [6],
                            note_8: [7],
                            note_9: [8],
                            note_10: [9],
                            note_11: [10],
                        }
                    },
                    scene_5_notes: {
                        images: [gallery.getImage('scene_5_note_sprite')],
                        frames: [
                            [0, 190, 62, 82],
                            [64, 318, 64, 80],
                            [41, 430, 35, 30],
                            [314, 644, 106, 38],
                            [393, 584, 16, 37],
                            [475, 467, 90, 46],
                            [520, 384, 98, 60],
                            [525, 125, 34, 164],
                        ],
                        animations: {
                            note_1: [0],
                            note_2: [1],
                            note_3: [2],
                            note_4: [3],
                            note_5: [4],
                            note_6: [5],
                            note_7: [6],
                            note_8: [7],
                        }
                    },
                    scene_1_text: {
                        images:[gallery.getImage('scene_1_text')],
                        frames: [
                            [0, 0, 51, 286],
                            [51, 0, 51, 286],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                        }
                    },
                    scene_2_text: {
                        images:[gallery.getImage('scene_2_text')],
                        frames: [
                            [0, 0, 50, 286],
                            [50, 0, 42, 286],
                            [90, 0, 38, 286],
                            [130, 0, 52, 286],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                            text_4: [3],
                        }
                    },
                    scene_3_text_1: {
                        images:[gallery.getImage('scene_3_text_1')],
                        frames: [
                            [0, 0, 52, 258],
                            [52, 0, 40, 258],
                            [92, 0, 40, 258],
                            [132, 0, 50, 258],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                            text_4: [3],
                        }
                    },
                    scene_3_text_2: {
                        images:[gallery.getImage('scene_3_text_2')],
                        frames: [
                            [0, 0, 459, 65],
                            [0, 65, 459, 72],
                            [0, 137, 459, 63],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                        }
                    },
                    scene_4_text_1: {
                        images:[gallery.getImage('scene_4_text_1')],
                        frames: [
                            [0, 0, 444, 52],
                            [0, 52, 444, 40],
                            [0, 92, 444, 40],
                            [0, 132, 444, 50],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                            text_4: [3],
                        }
                    },
                    scene_4_text_2: {
                        images:[gallery.getImage('scene_4_text_2')],
                        frames: [
                            [0, 0, 50, 482],
                            [50, 0, 40, 482],
                            [90, 0, 40, 482],
                            [130, 0, 52, 482],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                            text_4: [3],
                        }
                    },
                    scene_4_text: {
                        images:[gallery.getImage('scene_4_text')],
                        frames: [
                            [0, 0, 499, 114],
                            [0, 114, 499, 72],
                            [0, 186, 499, 27],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                        }
                    },
                    scene_5_text: {
                        images:[gallery.getImage('scene_5_text')],
                        frames: [
                            [0, 0, 402, 32],
                            [0, 32, 402, 40],
                            [0, 72, 402, 40],
                            [0, 114, 402, 42],
                            [0, 154, 402, 33],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                            text_4: [3],
                            text_5: [4],
                        }
                    },
                    scene_6_text: {
                        images:[gallery.getImage('scene_6_text')],
                        frames: [
                            [0, 0, 442, 34],
                            [0, 80, 442, 34],
                            [0, 160, 442, 34],
                            [0, 206, 442, 193],
                        ],
                        animations: {
                            text_1: [0],
                            text_2: [1],
                            text_3: [2],
                            text_4: [3],
                        }
                    },
                }
            },           // 定义雪碧图或序列帧动画属性（可选）
            data: this.canvasData,            // 定义画布数据（必选）
            delayTime: (height - 272)/2,      // 定义画布开始的位置，默认是顶部 0（可选）
            onInit() {                        // 定义初始时候的回调（可选）
                console.log('初始化回调')
            },
            onEnd() {                         // 定义画布结束时候的回调（可选）
                console.log('结束回调');
            }
        });

        timeGallery.play();
    },

    /** 创建长图数据
    *** @gallery TimeGallery 实例自身, 方便调用自身定义的属性来创建数据
    **/
    canvasData(gallery) {
        // 定义默认的动画长度，屏幕的高度
        const duration = gallery.height/2;
        return [
            {
                id: 'scene_start_text',
                type: 'bitmap',
                image: gallery.getImage('scene_start_text'),
                prop: {
                    x: (gallery.width - gallery.getImage('scene_start_text').width)/2,
                }
            },
            {
                id: 'scene_1_container',
                prop: {
                    y: 524,
                },
                children: [
                    {
                        id: 'scene_1_bg',
                        type: 'bitmap',
                        image: gallery.getImage('scene_1_bg'),
                        prop: {
                            y: 502,
                        }
                    },
                    {
                        id: 'scene_1_role',
                        type: 'sprite',
                        sheet: {
                            images:[gallery.getImage('scene_1_role')],//图片路径
                            frames: {
                                height: 816,
                                width: 600,
                                count: 6,
                            },
                            animations: {
                                role: [0, 5, 'role', 0.05],
                            }
                        },
                        methods: {
                            gotoAndPlay: ['role']
                        },
                        prop: {
                            y: 780,
                            x: 150,
                        },
                    },
                    {
                        id: 'scene_1_curve',
                        type: 'bitmap',
                        image: gallery.getImage('scene_1_curve'),
                        prop: {
                            x: 434,
                            alpha: 0,
                        },
                        animation: {
                            alpha: 1,
                            duration
                        }
                    },
                    {
                        id: 'scene_1_text_container',
                        prop: {
                            x: 160,
                            y: 804,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_text'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    x: 0,
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 200,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_text'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_1_text').frames[1][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                    {
                        id: 'scene_1_note_container',
                        prop: {
                            x: 210,
                            y: -200,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_1']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[0][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[0][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_2']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[1][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[1][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_3']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[2][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[2][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_4']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[3][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[3][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_5']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[4][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[4][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_6']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[5][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[5][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_7']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[6][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[6][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_8']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[7][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[7][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_9']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[8][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[8][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_1_notes'),
                                methods: {
                                    gotoAndPlay:['note_10']
                                },
                                prop: {
                                    x: 0,
                                    y: gallery.getSprite('scene_1_notes').frames[9][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: -30,
                                    y: gallery.getSprite('scene_1_notes').frames[9][1] - 200,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                        ]
                    },
                ]
            },
            {
                id: 'scene_2_container',
                prop: {
                    y: 2366,
                },
                children: [
                    {
                        id: 'scene_2_bg',
                        type: 'bitmap',
                        image: gallery.getImage('scene_2_bg'),
                    },
                    {
                        id: 'scene_2_curve',
                        type: 'bitmap',
                        image: gallery.getImage('scene_2_curve'),
                        prop: {
                            y: 22,
                            x: 10,
                            alpha: 0,
                        },
                        animation: {
                            alpha: 1,
                            duration
                        }
                    },
                    {
                        id: 'scene_2_note_container',
                        prop: {
                            x: 45,
                            y: 82,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_1']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[0][0],
                                    y: gallery.getSprite('scene_2_notes').frames[0][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[0][0] - 50,
                                    y: gallery.getSprite('scene_2_notes').frames[0][1] - 30,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[1][0],
                                    y: gallery.getSprite('scene_2_notes').frames[1][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[1][0] - 50,
                                    y: gallery.getSprite('scene_2_notes').frames[1][1] - 20,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_3']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[2][0],
                                    y: gallery.getSprite('scene_2_notes').frames[2][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[2][0] - 30,
                                    y: gallery.getSprite('scene_2_notes').frames[2][1] + 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_4']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[3][0],
                                    y: gallery.getSprite('scene_2_notes').frames[3][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[3][0] - 50,
                                    y: gallery.getSprite('scene_2_notes').frames[3][1] + 30,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_5']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[4][0],
                                    y: gallery.getSprite('scene_2_notes').frames[4][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[4][0] - 100,
                                    y: gallery.getSprite('scene_2_notes').frames[4][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_6']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[5][0],
                                    y: gallery.getSprite('scene_2_notes').frames[5][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[5][0] - 30,
                                    y: gallery.getSprite('scene_2_notes').frames[5][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_7']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[6][0],
                                    y: gallery.getSprite('scene_2_notes').frames[6][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[6][0] - 30,
                                    y: gallery.getSprite('scene_2_notes').frames[6][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_8']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[7][0],
                                    y: gallery.getSprite('scene_2_notes').frames[7][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[7][0] + 50,
                                    y: gallery.getSprite('scene_2_notes').frames[7][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_9']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[8][0],
                                    y: gallery.getSprite('scene_2_notes').frames[8][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[8][0] + 50,
                                    y: gallery.getSprite('scene_2_notes').frames[8][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_notes'),
                                methods: {
                                    gotoAndPlay:['note_10']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_notes').frames[9][0],
                                    y: gallery.getSprite('scene_2_notes').frames[9][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_2_notes').frames[9][0] + 50,
                                    y: gallery.getSprite('scene_2_notes').frames[9][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                        ]
                    },
                    {
                        id: 'scene_2_piano',
                        type: 'bitmap',
                        image: gallery.getImage('scene_2_piano'),
                        prop: {
                            y: 446,
                        },
                    },
                    {
                        id: 'scene_2_role',
                        type: 'sprite',
                        sheet: {
                            images:[gallery.getImage('scene_2_role')],//图片路径
                            frames: {
                                width: 500,
                                height: 618,
                                count: 6,
                            },
                            animations: {
                                role: [0, 5, 'role', 0.05],
                            }
                        },
                        methods: {
                            gotoAndPlay: ['role']
                        },
                        prop: {
                            y: 568,
                            x: -50,
                        },
                    },
                    {
                        id: 'scene_2_text_container',
                        prop: {
                            x: 470,
                            y: 72,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_text'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    y: 200,
                                    x: gallery.getSprite('scene_2_text').frames[0][0],
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 300,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_text'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_text').frames[1][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 200,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_text'),
                                methods: {
                                    gotoAndPlay:['text_3']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_text').frames[2][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 100,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_2_text'),
                                methods: {
                                    gotoAndPlay:['text_4']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_2_text').frames[3][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                ]
            },
            {
                id: 'scene_3_container',
                prop: {
                    x: 0,
                    y: 3576,
                },
                children: [
                    {
                        id: 'scene_3_bg',
                        type: 'bitmap',
                        image: gallery.getImage('scene_3_bg'),
                    },
                    {
                        id: 'scene_3_curve',
                        type: 'bitmap',
                        image: gallery.getImage('scene_3_curve'),
                        prop: {
                            x: 88,
                            y: 316,
                            alpha: 0,
                        },
                        animation: {
                            alpha: 1,
                            duration
                        }
                    },
                    {
                        id: 'scene_3_note_container',
                        prop: {
                            x: 174,
                            y: 332,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_1']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[0][0],
                                    y: gallery.getSprite('scene_3_notes').frames[0][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[0][0] - 20,
                                    y: gallery.getSprite('scene_3_notes').frames[0][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[1][0],
                                    y: gallery.getSprite('scene_3_notes').frames[1][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[1][0] - 20,
                                    y: gallery.getSprite('scene_3_notes').frames[1][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_3']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[2][0],
                                    y: gallery.getSprite('scene_3_notes').frames[2][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[2][0] - 20,
                                    y: gallery.getSprite('scene_3_notes').frames[2][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_4']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[3][0],
                                    y: gallery.getSprite('scene_3_notes').frames[3][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[3][0] - 30,
                                    y: gallery.getSprite('scene_3_notes').frames[3][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_5']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[4][0],
                                    y: gallery.getSprite('scene_3_notes').frames[4][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[4][0] - 30,
                                    y: gallery.getSprite('scene_3_notes').frames[4][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_6']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[5][0],
                                    y: gallery.getSprite('scene_3_notes').frames[5][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[5][0] - 10,
                                    y: gallery.getSprite('scene_3_notes').frames[5][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_7']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[6][0],
                                    y: gallery.getSprite('scene_3_notes').frames[6][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[6][0] - 20,
                                    y: gallery.getSprite('scene_3_notes').frames[6][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_notes'),
                                methods: {
                                    gotoAndPlay:['note_8']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_notes').frames[7][0],
                                    y: gallery.getSprite('scene_3_notes').frames[7][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_3_notes').frames[7][0] - 30,
                                    y: gallery.getSprite('scene_3_notes').frames[7][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                        ]
                    },
                    {
                        id: 'scene_3_role',
                        type: 'sprite',
                        sheet: {
                            images:[gallery.getImage('scene_3_role')],//图片路径
                            frames: {
                                width: 750,
                                height: 708,
                                count: 6,
                            },
                            animations: {
                                role: [0, 5, 'role', 0.05],
                            }
                        },
                        methods: {
                            gotoAndPlay: ['role']
                        },
                        prop: {
                            y: 564,
                        },
                    },
                    {
                        id: 'scene_3_text_1_container',
                        prop: {
                            x: 490,
                            y: 300,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_text_1'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    y: 200,
                                    x: gallery.getSprite('scene_3_text_1').frames[0][0],
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 300,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_text_1'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_text_1').frames[1][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 200,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_text_1'),
                                methods: {
                                    gotoAndPlay:['text_3']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_text_1').frames[2][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 100,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_text_1'),
                                methods: {
                                    gotoAndPlay:['text_4']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_3_text_1').frames[3][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                    {
                        id: 'scene_3_text_2_container',
                        prop: {
                            x: 46,
                            y: 1244,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_text_2'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    x: 200,
                                    y: 50,
                                    alpha: 0,
                                },
                                animation: {
                                    x: 0,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_text_2'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    x: 200,
                                    y: 90,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 100,
                                    x: 0,
                                    y: 40,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_3_text_2'),
                                methods: {
                                    gotoAndPlay:['text_3']
                                },
                                prop: {
                                    x: 200,
                                    y: 128,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 200,
                                    x: 0,
                                    y: 78,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                ]
            },
            {
                id: 'scene_4_container',
                prop: {
                    y: 5132,
                },
                children: [
                    {
                        id: 'scene_4_bg',
                        type: 'bitmap',
                        image: gallery.getImage('scene_4_bg'),
                    },
                    {
                        id: 'scene_4_role',
                        type: 'sprite',
                        sheet: {
                            images:[gallery.getImage('scene_4_role')],//图片路径
                            frames: {
                                width: 750,
                                height: 1334,
                                count: 6,
                            },
                            animations: {
                                role: [0, 5, 'role', 0.05],
                            }
                        },
                        methods: {
                            gotoAndPlay: ['role']
                        },
                        prop: {
                            y: 190,
                        },
                    },
                    {
                        id: 'scene_4_curve',
                        type: 'bitmap',
                        image: gallery.getImage('scene_4_curve'),
                        prop: {
                            x: 212,
                            y: 476,
                            alpha: 0,
                        },
                        animation: {
                            alpha: 1,
                            duration
                        }
                    },
                    {
                        id: 'scene_4_note_container',
                        prop: {
                            x: 278,
                            y: 568,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_1']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[0][0],
                                    y: gallery.getSprite('scene_4_notes').frames[0][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[0][0] + 100,
                                    y: gallery.getSprite('scene_4_notes').frames[0][1] - 30,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[1][0],
                                    y: gallery.getSprite('scene_4_notes').frames[1][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[1][0] + 100,
                                    y: gallery.getSprite('scene_4_notes').frames[1][1] - 30,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_3']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[2][0],
                                    y: gallery.getSprite('scene_4_notes').frames[2][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[2][0] + 100,
                                    y: gallery.getSprite('scene_4_notes').frames[2][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_4']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[3][0],
                                    y: gallery.getSprite('scene_4_notes').frames[3][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[3][0] + 100,
                                    y: gallery.getSprite('scene_4_notes').frames[3][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_5']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[4][0],
                                    y: gallery.getSprite('scene_4_notes').frames[4][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[4][0] + 100,
                                    y: gallery.getSprite('scene_4_notes').frames[4][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_6']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[5][0],
                                    y: gallery.getSprite('scene_4_notes').frames[5][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[5][0] + 100,
                                    y: gallery.getSprite('scene_4_notes').frames[5][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_7']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[6][0],
                                    y: gallery.getSprite('scene_4_notes').frames[6][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[6][0] - 20,
                                    y: gallery.getSprite('scene_4_notes').frames[6][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_8']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[7][0],
                                    y: gallery.getSprite('scene_4_notes').frames[7][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[7][0] - 100,
                                    y: gallery.getSprite('scene_4_notes').frames[7][1] - 10,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_9']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[8][0],
                                    y: gallery.getSprite('scene_4_notes').frames[8][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[8][0] - 50,
                                    y: gallery.getSprite('scene_4_notes').frames[8][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_10']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[9][0],
                                    y: gallery.getSprite('scene_4_notes').frames[9][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[9][0] + 10,
                                    y: gallery.getSprite('scene_4_notes').frames[9][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_notes'),
                                methods: {
                                    gotoAndPlay:['note_11']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_notes').frames[10][0],
                                    y: gallery.getSprite('scene_4_notes').frames[10][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_4_notes').frames[10][0] + 10,
                                    y: gallery.getSprite('scene_4_notes').frames[10][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                        ]
                    },
                    {
                        id: 'scene_4_text_1_container',
                        prop: {
                            x: 316,
                            y: 270,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_1'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_4_text_1').frames[0][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    x: 0,
                                    y: gallery.getSprite('scene_4_text_1').frames[0][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_1'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_4_text_1').frames[1][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 100,
                                    x: 0,
                                    y: gallery.getSprite('scene_4_text_1').frames[1][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_1'),
                                methods: {
                                    gotoAndPlay:['text_3']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_4_text_1').frames[2][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 200,
                                    x: 0,
                                    y: gallery.getSprite('scene_4_text_1').frames[2][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_1'),
                                methods: {
                                    gotoAndPlay:['text_4']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_4_text_1').frames[3][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 200,
                                    x: 0,
                                    y: gallery.getSprite('scene_4_text_1').frames[3][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                    {
                        id: 'scene_4_text_2_container',
                        prop: {
                            x: 20,
                            y: 788,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_2'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_text_2').frames[0][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 300,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_2'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_text_2').frames[1][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 200,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_2'),
                                methods: {
                                    gotoAndPlay:['text_3']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_text_2').frames[2][0],
                                    y: gallery.getSprite('scene_4_text_2').frames[2][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    delay: 100,
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_4_text_2'),
                                methods: {
                                    gotoAndPlay:['text_4']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_4_text_2').frames[3][0],
                                    y: 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: 0,
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                ]
            },
            {
                id: 'scene_5_container',
                prop: {
                    y: 7102,
                },
                children: [
                    {
                        id: 'scene_5_bg',
                        type: 'bitmap',
                        image: gallery.getImage('scene_5_bg'),
                    },
                    {
                        id: 'scene_5_role',
                        type: 'sprite',
                        sheet: {
                            images:[gallery.getImage('scene_5_role')],//图片路径
                            frames: {
                                width: 750,
                                height: 1334,
                                count: 6,
                            },
                            animations: {
                                role: [0, 5, 'role', 0.05],
                            }
                        },
                        methods: {
                            gotoAndPlay: ['role']
                        },
                        prop: {
                            y: 270,
                        },
                    },
                    {
                        id: 'scene_5_curve',
                        type: 'bitmap',
                        image: gallery.getImage('scene_5_curve'),
                        prop: {
                            y: 474,
                            alpha: 0,
                        },
                        animation: {
                            alpha: 1,
                            duration
                        }
                    },
                    {
                        id: 'scene_5_note_container',
                        prop: {
                            x: 34,
                            y: 494,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_1']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[0][0],
                                    y: gallery.getSprite('scene_5_notes').frames[0][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[0][0] - 50,
                                    y: gallery.getSprite('scene_5_notes').frames[0][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_2']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[1][0],
                                    y: gallery.getSprite('scene_5_notes').frames[1][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[1][0] - 30,
                                    y: gallery.getSprite('scene_5_notes').frames[1][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_3']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[2][0],
                                    y: gallery.getSprite('scene_5_notes').frames[2][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[2][0] + 30,
                                    y: gallery.getSprite('scene_5_notes').frames[2][1] - 30,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },

                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_4']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[3][0],
                                    y: gallery.getSprite('scene_5_notes').frames[3][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[3][0] + 50,
                                    y: gallery.getSprite('scene_5_notes').frames[3][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_5']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[4][0],
                                    y: gallery.getSprite('scene_5_notes').frames[4][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[4][0] + 50,
                                    y: gallery.getSprite('scene_5_notes').frames[4][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_6']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[5][0],
                                    y: gallery.getSprite('scene_5_notes').frames[5][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[5][0] + 30,
                                    y: gallery.getSprite('scene_5_notes').frames[5][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_7']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[6][0],
                                    y: gallery.getSprite('scene_5_notes').frames[6][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[6][0] - 10,
                                    y: gallery.getSprite('scene_5_notes').frames[6][1] - 100,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_notes'),
                                methods: {
                                    gotoAndPlay:['note_8']
                                },
                                prop: {
                                    x: gallery.getSprite('scene_5_notes').frames[7][0],
                                    y: gallery.getSprite('scene_5_notes').frames[7][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: gallery.getSprite('scene_5_notes').frames[7][0] + 10,
                                    y: gallery.getSprite('scene_5_notes').frames[7][1] - 50,
                                    alpha: 1,
                                    duration: gallery.height,
                                },
                            },
                        ]
                    },
                    {
                        id: 'scene_5_text_container',
                        prop: {
                            x: 302,
                            y: 1418,
                        },
                        children: [
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_text'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_5_text').frames[0][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: 0,
                                    y: gallery.getSprite('scene_5_text').frames[0][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_text'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_5_text').frames[1][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: 0,
                                    y: gallery.getSprite('scene_5_text').frames[1][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_text'),
                                methods: {
                                    gotoAndPlay:['text_3']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_5_text').frames[2][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: 0,
                                    y: gallery.getSprite('scene_5_text').frames[2][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_text'),
                                methods: {
                                    gotoAndPlay:['text_4']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_5_text').frames[3][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: 0,
                                    y: gallery.getSprite('scene_5_text').frames[3][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_5_text'),
                                methods: {
                                    gotoAndPlay:['text_5']
                                },
                                prop: {
                                    x: 200,
                                    y: gallery.getSprite('scene_5_text').frames[4][1],
                                    alpha: 0,
                                },
                                animation: {
                                    x: 0,
                                    y: gallery.getSprite('scene_5_text').frames[4][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                ]
            },
            {
                id: 'scene_6_container',
                prop: {
                    y: 9216,
                },
                children: [
                    {
                        id: 'scene_6_curve',
                        type: 'bitmap',
                        image: gallery.getImage('scene_6_curve'),
                        prop: {
                            y: 172,
                        }
                    },
                    {
                        id: 'scene_6_text_container',
                        prop: {
                            x: (gallery.width - gallery.getImage('scene_6_text').width)/2,
                        },
                        children:[
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_6_text'),
                                methods: {
                                    gotoAndPlay:['text_1']
                                },
                                prop: {
                                    y: gallery.getSprite('scene_6_text').frames[0][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: gallery.getSprite('scene_6_text').frames[0][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_6_text'),
                                methods: {
                                    gotoAndPlay:['text_2']
                                },
                                prop: {
                                    y: gallery.getSprite('scene_6_text').frames[1][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: gallery.getSprite('scene_6_text').frames[1][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_6_text'),
                                methods: {
                                    gotoAndPlay:['text_3']
                                },
                                prop: {
                                    y: gallery.getSprite('scene_6_text').frames[2][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: gallery.getSprite('scene_6_text').frames[2][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                            {
                                type: 'sprite',
                                sheet: gallery.getSprite('scene_6_text'),
                                methods: {
                                    gotoAndPlay:['text_4']
                                },
                                prop: {
                                    y: gallery.getSprite('scene_6_text').frames[3][1] + 200,
                                    alpha: 0,
                                },
                                animation: {
                                    y: gallery.getSprite('scene_6_text').frames[3][1],
                                    alpha: 1,
                                    duration: 200,
                                },
                            },
                        ]
                    },
                ]
            }
        ]
    },

};

app.init();