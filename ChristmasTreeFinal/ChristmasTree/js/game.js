let config = {
    type: Phaser.AUTO,
    width: 611,
    height: 980,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload : preload,     
        create: create,     
        update : update   
    }
};

let game = new Phaser.Game(config);
let starImage;
let inc = -0.02;
let christmasMusic;
let messageText;
let starImageArray = [];
let snowflakes;

function preload() {
    this.load.image('background', './assets/images/back_2.png');
    this.load.image('tree', './assets/images/tree_2.png');
    this.load.image('ribbon', './assets/images/ribbon.png');
    this.load.image('ribbonClear', './assets/images/ribbonClear.png');
    this.load.image('bauble', './assets/images/obj/obj_08.png');
    this.load.image('star', './assets/images/obj/star.png');
    this.load.image('bells', './assets/images/obj/obj_02.png');
    this.load.image('gift', './assets/images/obj/obj_09.png');
    this.load.image('snowflake', './assets/images/snowflake.png');
    this.load.audio('christmasMusic', './assets/audio/christmasMusic.mp3');
}

function create() {
    let backgroundImage = this.add.image(0, 0, 'background');
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(0.5);
    for (let i=0; i<100; i++) {
        starImageArray[i] = this.add.image(Phaser.Math.Between(0, 611), 
        Phaser.Math.Between(0, 500), 'star');
        starImageArray[i].setScale(Phaser.Math.FloatBetween(0.3, 0.9));
        starImageArray[i].alpha = Phaser.Math.FloatBetween(0.4, 1);
    }
    starImage = this.add.image(100, 100, 'star');
    let treeImage = this.add.image(305, 500, 'tree');
    treeImage.setScale(0.5);
    let ribbonImage = this.add.image(290, 500, 'ribbon');
    ribbonImage.setScale(0.5);
    let ribbonClearImage = this.add.image(290, 500, 'ribbonClear');
    ribbonClearImage.setScale(0.5);
    let tweenRibbonClear = this.tweens.add({
        targets: ribbonClearImage,
        alpha: 0.2,
        duration: 1000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
        });
    let baubleImage1 = this.add.image(400, 520, 'bauble');
    baubleImage1.setScale(0.5);
    let baubleImage2 = this.add.image(180, 640, 'bauble');
    baubleImage2.setScale(0.5);
    let giftImage = this.add.image(500, 800, 'gift').setInteractive();
    giftImage.setScale(0.8);
    giftImage.on('pointerdown', giftControl);
    let musicIcon = this.add.image(80, 900, 'bells').setInteractive();
    musicIcon.setScale(0.5);
    musicIcon.on('pointerdown', musicControl);
    christmasMusic = this.sound.add('christmasMusic');
    messageText = this.add.text(150, 70, 'Vous avez gagné un super cadeau',
    { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });
    messageText.alpha = 0;
    snowflakes = this.physics.add.group({
        defaultKey: 'snowflake',
        maxSize: 50
        });
    let timer = this.time.addEvent({
        delay: 200, // ms
        callback: spawnSnowflake,
        callbackScope: this,
        repeat: -1
        });
}

function update() {
    starImage.alpha += inc;
    if ((starImage.alpha<=0.3)||(starImage.alpha>=1)) inc = -inc;
    for (let i=0; i<100; i++) {
        starImageArray[i].alpha = Phaser.Math.FloatBetween(0.4, 1);
    }
    snowflakes.getChildren().forEach(
        function(snowflake) {
            if (snowflake.y>980) snowflake.destroy();
        }, this);
}

function musicControl(){    
    christmasMusic.play();
}

function giftControl(){    
    messageText.alpha = 1;
}

function spawnSnowflake(){    
    let snowflake = snowflakes.get();
    if (snowflake) {
        snowflake.setPosition(Phaser.Math.Between(0, 611), 0);
        snowflake.setVelocity(0, 100);
        }
}