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
    this.music = new Music();
  }

  init(speed) {
    this.x = this.rnd(0, window.innerWidth - ENEMY_WIDTH) // 随机x位置
    this.y = -this.height

    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新敌机位置
  update() {
    this.y += this[__.speed]

    // 对象回收
    if ( this.y > window.innerHeight + this.height )
      databus.removeEnemey(this)
  }

  attacked() {
    this.lifes = this.lifes - 1;
console.log('----1----', this.lifes);
    if(this.lifes <= 0) {
      this.playAnimation()
      this.music.playExplosion()

      databus.score += 2
    }
  }
}
