var Context = {
    canvas: null,
    context: null,
    create: function (canvas_name) {
        this.canvas = document.getElementById(canvas_name);
        this.canvas.height = 600;
        this.canvas.width = 1024;
        this.canvas.setAttribute('style', 'background: url(././img/map/map_day1.jpg)');
        this.context = this.canvas.getContext('2d');
        this.context.globalCompositeOperation = 'destination-over';
        return this.context;
    }
};


var Sprite = function (filename, is_pattern) {
    //Constructor
    this.image = null;
    this.pattern = null;
    this.TO_RADIANS = Math.PI / 180;

    if (filename !== undefined && filename !== '' && filename != null) {
        this.image = new Image();
        this.image.src = filename;
        if (is_pattern) {
            this.pattern = Context.context.createPattern(this.image, 'repeat');
        }
    } else {
        console.log('Unable to load sprite');
    }


    this.draw = function (sx, sy, sw, sh, dx, dy, dw, dh) {
        //Pattern
        if (this.pattern != null) {
            Context.context.fillStyle = this.pattern;

            Context.context.fillRect(sx, sy, sw, sh);
        } else {
            if (sw !== undefined || sh !== undefined) {
                Context.context.drawImage(this.image, sx, sy, this.image.width, this.image.height, dx, dy, dw, dh);
            } else {
                Context.context.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
            }
        }
    };


    this.rotate = function (x, y, angle) {
        Context.context.save();
        Context.context.translate(x, y);
        Context.context.rotate(angle * this.TO_RADIANS);
        Context.context.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
        Context.context.restore();
    };

    this.clear = function (x, y, w, h) {
        Context.context.clearRect(x, y, w, h);
        // console.log('da vao ham xoa');
    };

    this.setUrl = function (url) {
        this.image.src = url;
    }

};

var Knight = {
    sx: 0,
    sy: 0,
    sw: 40,
    sh: 40,
    dx: 0,
    dy: 80,
    dw: 130,
    dh: 60
};

var Tree = {
    sx: 0,
    sy: 30,
    sw: 20,
    sh: 20,
    dx: 0,
    dy: 0,
    dw: 40,
    dh: 60
};


$(document).ready(function () {
    var canvas = document.getElementById('scene_game');
    Context.create('scene_game');

    var knight = '././img/knight/Knight_idle_01.png';
    var tree = '././img/tileset/forest/forest_day/tree.png';
    var stone = '././img/tileset/forest/forest_day/rock.png';

    // var KnightIdle = [
    //     '././img/knight/Knight_idle_01.png',
    //     '././img/knight/Knight_idle_02.png',
    //     '././img/knight/Knight_idle_03.png',
    //     '././img/knight/Knight_idle_04.png',
    //     '././img/knight/Knight_idle_05.png',
    //     '././img/knight/Knight_idle_06.png'
    // ];

    var KnightAttack = [
        '././img/knight/Knight_attack_01.png',
        '././img/knight/Knight_attack_02.png',
        '././img/knight/Knight_attack_03.png',
        '././img/knight/Knight_attack_04.png',
        '././img/knight/Knight_attack_05.png',
        '././img/knight/Knight_attack_06.png'
    ];

    var KnightSkill = [
        '././img/knight/Knight_strike_01.png',
        '././img/knight/Knight_strike_02.png',
        '././img/knight/Knight_strike_03.png'
    ];

    // var arrSkill = [
    //     '././img/skill_effect_fireball/fireball_01.png',
    //     '././img/skill_effect_fireball/fireball_02.png',
    //     '././img/skill_effect_fireball/fireball_03.png'
    // ];


    //Setup map level 1
    var map_lv_1 = [
        {
            sx : 0,
            sy : 0,
            sw : Tree.sw,
            sh : Tree.sh,
            dx : 10,
            dy : 60,
            dw : Tree.dw,
            dh : Tree.dh
        },
        {
            sx : 0,
            sy : 0,
            sw : Tree.sw,
            sh : Tree.sh,
            dx : 320,
            dy : 130,
            dw : Tree.dw,
            dh : Tree.dh
        },
        {
            sx : 0,
            sy : 0,
            sw : Tree.sw,
            sh : Tree.sh,
            dx : 400,
            dy : 330,
            dw : Tree.dw,
            dh : Tree.dh
        },
        {
            sx : 0,
            sy : 0,
            sw : Tree.sw,
            sh : Tree.sh,
            dx : 440,
            dy : 330,
            dw : Tree.dw,
            dh : Tree.dh
        },
        {
            sx : 0,
            sy : 0,
            sw : Tree.sw,
            sh : Tree.sh,
            dx : 880,
            dy : 400,
            dw : Tree.dw,
            dh : Tree.dh
        },
        {
            sx : 0,
            sy : 0,
            sw : Tree.sw,
            sh : Tree.sh,
            dx : 20,
            dy : 370,
            dw : Tree.dw,
            dh : Tree.dh
        },
    ];


    var image = new Sprite(knight, false);

    var pattern = new Sprite(tree, false);

    var imgStone = new Sprite(stone, false);

    function initMap() {
        setInterval(function () {
            image.draw(Knight.sx, Knight.sy, Knight.sw, Knight.sh, Knight.dx, Knight.dy, Knight.dw, Knight.dh);

            // Tree ria tường bên trên;
            for (var i = 0; i < 100; i++) {
                pattern.draw(Tree.sx, Tree.sy, Tree.sw, Tree.sh, Tree.dx, Tree.dy, Tree.dw, Tree.dh);
                Tree.dx += 50;
                if (Tree.dx >= canvas.width) break;
            }

            // Tree ria tường dưới
            Tree.dx = -10;
            for (var j = 0; j < 100; j++) {
                var newDy = canvas.height - 50;
                pattern.draw(Tree.sx, Tree.sy, Tree.sw, Tree.sh, Tree.dx, newDy, Tree.dw, Tree.dh);
                Tree.dx += 50;
                if (Tree.dx >= canvas.width) break;
            }

            // Map
            for (var m = 0; m < map_lv_1.length; m++) {
                pattern.draw(map_lv_1[m].sx, map_lv_1[m].sy, map_lv_1[m].sw, map_lv_1[m].sh, map_lv_1[m].dx, map_lv_1[m].dy,
                    map_lv_1[m].dw, map_lv_1[m].dh);
            }

            //bãi đá 1
            imgStone.draw(0, 0, 20, 20, canvas.width - 180, 180, 40, 40);
            //bãi đá 2
            imgStone.draw(0, 0, 20, 20, 300, canvas.height / 2, 40, 40);
            Tree.dx = 0;
        }, 0.1);
    }

    setTimeout(function () {
        // image.draw(0, 74, 256, 32);
        initMap();
        console.log(canvas.width + ' va ' + Tree.dx);

        // image.rotate(115, 160, angle += 4.0);

        var step = 5;
        // di chuyen nhan vat!
        document.onkeypress = function (e) {
            var oldX = Knight.dx + 25;
            var oldY = Knight.dy + 15;
            var oldWidth = Knight.dw / 1.3;
            var oldHeight = Knight.dh - 10;
            switch (e.code) {
                case 'KeyW': // W
                    // image.image.src = knight;
                    Knight.dy -= step;
                    break;
                case 'KeyS': // S
                    // image.image.src = knight;
                    Knight.dy += step;
                    break;
                case 'KeyA': // A
                    // image.image.src = knight;
                    Knight.dx -= step;
                    break;
                case 'KeyD': // D
                    // image.image.src = knight;
                    Knight.dx += step;
                    break;
                case 'Space': // ATTACK

                    var attackIndex = 0;
                    var intervalAttack = setInterval(function () {
                        image.image.src = KnightAttack[attackIndex];
                        image.clear(oldX, oldY, oldWidth, oldHeight);
                        attackIndex++;
                        image.draw(Knight.sx, Knight.sy, Knight.sw, Knight.sh, Knight.dx, Knight.dy, Knight.dw, Knight.dh)
                        console.log(image.image.src);
                        if (attackIndex === KnightAttack.length) {
                            clearInterval(intervalAttack);
                            image.image.src = knight;
                        }
                    }, 150);

                    break;
                case 'KeyK':

                    var kSkillIndex = 0;
                    var intervalKnightSkill = setInterval(function () {
                        image.image.src = KnightSkill[kSkillIndex];
                        image.clear(oldX, oldY, oldWidth, oldHeight);
                        kSkillIndex++;
                        image.draw(Knight.sx, Knight.sy, Knight.sw, Knight.sh, Knight.dx, Knight.dy, Knight.dw, Knight.dh);
                        console.log(image.image.src);
                        if (kSkillIndex === KnightSkill.length) {
                            clearInterval(intervalKnightSkill);
                            image.image.src = knight;
                        }
                    }, 200);

                    break;
                default:
                    break;
            }
            image.clear(oldX, oldY, oldWidth, oldHeight);
            image.draw(Knight.sx, Knight.sy, Knight.sw, Knight.sh, Knight.dx, Knight.dy, Knight.dw, Knight.dh);
        }
    }, 1000);


    var socket = io.connect('http://localhost:8088', {'transports': ['websocket']});
    socket.on('connect', function () {
        console.log('Connected')
    });

    socket.on('disconnect', function () {
        console.log('Disconnect');
    });

    var account = $('input[name="account"]');

    var btnLogin = $('#btnLogin');

    var password = $('input[name="password"]');

    btnLogin.on('click', function () {
        var data = {
            'account': account.val(),
            'password': password.val()
        };
        socket.emit('AccountLogin', data);
        console.log(data);
    });

    socket.on('UserInfo', function (data) {
        localStorage.setItem('Account', data);
        $('#FORM_LOGIN').remove();
        $('#box_game').removeClass('d-none');

        setTimeout(function () {
            $('#box_game').addClass('active');
        }, 300);
    });

});

