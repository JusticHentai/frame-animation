import { DefaultOptions, InnerOptions, Options } from './types'
import canvasClearness from './utils/canvasClearness'
import canvasDraw from './utils/canvasDrawFrame'
import getCurrentFrame from './utils/getCurrentFrame'
import getDomSize from './utils/getDomSize'
import imageLoad from './utils/imageLoad'

const defaults: DefaultOptions = {
  duration: 1000,
  column: 0,
}

/**
 * 外部使用对象
 */
export default class FrameAnimation {
  public options: InnerOptions

  constructor(options: Options) {
    this.options = { ...defaults, ...options }
  }

  async init() {
    // 初始化图片
    await this.imageInit()

    // 初始化 canvas 对象
    this.canvasInit()

    // 获取当前 dom 大小
    const { width, height } = getDomSize(this.options.el)

    // 初始化 canvas 清晰度
    canvasClearness({
      width,
      height,
      canvas: this.canvas,
    })
  }

  // image 实例
  image!: HTMLImageElement

  /**
   * 初始化图片
   */
  async imageInit() {
    this.image = await imageLoad(this.options.url) // 加载图片

    this.options['imageLoadComplete'] &&
      this.options['imageLoadComplete'](this.image) // 回调
  }

  // canvas 实例
  canvas!: HTMLCanvasElement

  /**
   * 初始化 canvas
   */
  canvasInit() {
    this.canvas = document.createElement('canvas')

    this.options.el.appendChild(this.canvas)
  }

  animeState = false // 帧动画状态 true 运行中 false 没有运行
  renderFrameID!: number // 记录渲染 ID

  lastFrame = 0 // 用于记录渲染期间的上一帧
  initialFrame!: number // 用于记录每次动作的开始帧数
  initialTime!: number // 用于记录每次动作的开始时间

  /**
   * 开始渲染动画
   */
  animeStart() {
    this.animeState = true // 启动动画
    this.initialFrame = this.lastFrame // 记录开始动画的初始帧数
    this.initialTime = Date.now() // 记录开始动画的初始时间

    this.renderFrameID = requestAnimationFrame(this.renderFrame) // 记录当前动作的id 并开启动作
  }

  /**
   * 渲染每一帧
   */
  renderFrame = () => {
    // 递归退出条件
    if (!this.animeState) {
      cancelAnimationFrame(this.renderFrameID)
      return
    }

    const { frame, duration, el, column } = this.options

    // 获取当前要渲染的帧数
    const currentFrame = getCurrentFrame({
      initialFrame: this.initialFrame,
      initialTime: this.initialTime,
      duration,
      frame,
    })

    // 已经渲染过就不反复渲染了
    if (currentFrame === this.lastFrame) {
      // 继续渲染下一帧
      this.renderFrameID = requestAnimationFrame(this.renderFrame)

      return
    }

    // 获取当前尺寸
    const { width, height } = getDomSize(el)

    // 渲染
    canvasDraw({
      currentFrame,
      frame,
      column,
      width,
      height,
      canvas: this.canvas,
      image: this.image,
    })

    // 储存最后一帧
    this.lastFrame = currentFrame

    // 继续渲染下一帧
    this.renderFrameID = requestAnimationFrame(this.renderFrame)
  }

  /**
   * 动画暂停
   */
  animePause() {
    this.animeState = false // 暂停动画
  }

  /**
   * 启动动画
   */
  play(): FrameAnimation {
    this.animeStart()

    return this
  }

  /**
   * 暂停动画
   */
  pause(): FrameAnimation {
    this.animePause()

    return this
  }

  /**
   * 尺寸变动时更新
   */
  update(): FrameAnimation {
    // 获取当前 dom 大小
    const { width, height } = getDomSize(this.options.el)

    // 初始化 canvas 清晰度
    canvasClearness({
      width,
      height,
      canvas: this.canvas,
    })

    return this
  }
}
