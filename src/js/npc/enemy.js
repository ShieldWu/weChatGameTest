import Animation from '../base/animation'
import DataBus   from '../databus'
import Music     from '../runtime/music'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()


export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.music = new Music();
    this.lifes = 1;

    this.initExplosionAnimation()
  }

  rnd(start, end){
    return Math.floor(Math.random() * (end - start) + start)
  }

  init(speed) {
    this.x = this.rnd(0, window.innerWidth - ENEMY_WIDTH) // 随机x位置
    this.y = -this.height

    this[__.speed] = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新敌机位置
  update() {
    this.y += this[__.speed]

    // 对象回收
    if ( this.y > window.innerHeight + this.height )
      databus.removeEnemey(this)
  }

  getScore() {
    return 1;
  }

  attacked() {
    this.lifes = this.lifes - 1;

    if(this.lifes <= 0) {
      this.playAnimation()
      this.music.playExplosion()

      databus.score += this.getScore()
    }
  }
}
