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
let star;
let increment = -0.02;
let christmasMusic;
let messageText;
let starImageArray = [];

function preload() {
    this.load.image('background', './assets/images/back_2.png');
    this.load.image("christmasTree","./assets/images/tree_1.png")
    this.load.image("ribbonOrigin","./assets/images/ribbon.png")
    this.load.image("ribbonClear","./assets/images/ribbonClear.png")
    this.load.image("christmasBall","./assets/images/obj/obj_08.png")
    this.load.image("gift","./assets/images/obj/obj_09.png")
    this.load.image("star","./assets/images/obj/obj_29.png")
    this.load.image("bells","./assets/images/obj/obj_02.png")
    this.load.image("snow","./assets/images/snow.png")
    this.load.audio("christmasMusic","./assets/audio/christmasMusic.mp3")

} //"background" = lable name, the seoncd one is the relative directory

function create() {
    let backgroundImage = this.add.image(0, 0, 'background'); // (x,y,lable)
    backgroundImage.setOrigin(0, 0); // set the image position from left top corner
    backgroundImage.setScale(0.5);

    

    for (let i=0; i<130;i++){
         starImageArray[i] = this.add.image(Phaser.Math.Between(0,611),Phaser.Math.Between(0,500),"star")
         starImageArray[i].setScale(Phaser.Math.FloatBetween(0.02,0.05));
         starImageArray[i].alpha=Phaser.Math.FloatBetween(0.4,0.9); //opacity
     }

    star = this.add.image(100,100,"star");
    star.setScale(0.04)

    let christmasTree = this.add.image(305,550,"christmasTree");
    christmasTree.setScale(0.5);

    let ribbonOrigin = this.add.image(280,550,"ribbonOrigin");
    ribbonOrigin.setScale(0.6);
    let ribbonClear = this.add.image(280,550,"ribbonClear");
    ribbonClear.setScale(0.6);
    let tweenRibbonClear = this.tweens.add({
        targets: ribbonClear,
        alpha: 0.2,
        duration: 1000,//1000ms = 2s
        ease: 'Power2',
        yoyo: true, // 來回兩個value
        loop: -1 // -1= inifinite
        });

    let christmasBall1 = this.add.image(220,600,"christmasBall");
    christmasBall1.setScale(0.4);
    let christmasBall2 = this.add.image(380,700,"christmasBall");
    christmasBall2.setScale(0.4);
    let christmasBall3 = this.add.image(380,510,"christmasBall");
    christmasBall3.setScale(0.35);
    let christmasBall4 = this.add.image(240,450,"christmasBall");
    christmasBall4.setScale(0.35);
    let christmasBall5 = this.add.image(320,300,"christmasBall");
    christmasBall5.setScale(0.3);
    let christmasBall6 = this.add.image(180,780,"christmasBall");
    christmasBall6.setScale(0.4);

    let musicIcon = this.add.image(300,220,"bells").setInteractive();
    musicIcon.setScale(0.5);
    musicIcon.on("pointerdown",musicControl);
    christmasMusic = this.sound.add("christmasMusic");
    
    messageText = this.add.text(150,100,"Merry Christmas",{ fontFamily: "montserrat", fontSize: 48, color: "#D9027D"})
    messageText.alpha = 0;
    let giftIcon = this.add.image(520,920,"gift").setInteractive();
    giftIcon.on("pointerdown",textControl);
    
    // for (let i=0; i<30;i++){
    //      let snow = this.add.image(Phaser.Math.Between(0,611),Phaser.Math.Between(0,1100),"snow")
    //      snow.setScale(Phaser.Math.FloatBetween(0.01,0.35));

    // }

    let snows = this.physics.add.group({
        defaultKey:"snow",
        maxSize: 50
    });
    let timer = this.time.addEvent({
        delay: 500, //ms
        callback: spawnSnow,
    //args:[]
        callbackScope: this,
        repeat:-1  
    });


}


function update() {
    star.alpha += increment;
    if((star.alpha <=0.3) ||(star.alpha >=1))
        increment = - increment;
    for (let i=0; i<100 ; i++){
        starImageArray[i].alpha = Phaser.Math.FloatBetween(0.4,1);
    }

    snows.getChildren().forEach(
        function(snow){
            if(snow.y>980) snow.destroy();
        }, this);
    
}


function musicControl(){
    if (christmasMusic.isPlaying){
        christmasMusic.stop();
    } else{
        christmasMusic.play();
    }
}

function textControl(){
    if (messageText.alpha>0){
        messageText.alpha = 0;
    } else {
        messageText.alpha = 1;
    }

}

function spawnSnow(){
    let snow = snows.get();
    if (snow){
        snow.setPosition(Phaser.Math.Between(0,611),0);
        snow.setVelocity(0,100);
        }
    }