import Animation from '../base/animation'
import DataBus   from '../databus'
import Music     from '../runtime/music'
import Enemy     from './enemy'

const __ = {
  speed: Symbol('speed')
}

const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60
let databus = new DataBus()

export default class HardEnemy extends Enemy {
  constructor() {
    super()

    this.lifes = 2;
    this.startFrame = databus.frame;
    this.music = new Music();
  }

  init(speed) {
    this.x = this.rnd(0, window.innerWidth - ENEMY_WIDTH) // 随机x位置
    this.y = -this.height

    this[__.speed] = speed

    this.visible = true
  }

  update() {
    let frameNumDiff = databus.frame - this.startFrame;

    if(frameNumDiff < 30 || frameNumDiff > 100) {
      this.y += this[__.speed]
    }

    // 对象回收
    if ( this.y > window.innerHeight + this.height )
      databus.removeEnemey(this)
  }

  getScore() {
    return 2;
  }
}
