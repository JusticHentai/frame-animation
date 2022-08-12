# Frame-animation

raf and canvas based frame animation tools
Support for arbitrary rows of frame animation originals

[中文文档](https://juejin.cn/post/7130862826486235167)

## Install

```bash
npm i @justichentai/frame-animation
```

## Usage

### Simple Example

frame-animation will automatically detect the size of your mounted element
Make sure the size of the element is equal to the size of one frame
```ts
import FrameAnime from '@justichentai/frame-animation'

const anime = new FrameAnime({  
  frame: 24,  
  url: 'url',  
  duration: 2000,  
  el: dom,  
})  

await anime.init()

anime.play()
```

### Options

```ts
export interface Options {  
  el: HTMLDivElement // 要挂载的 dom  
  url: string // 帧动画图片 url  
  frame: number // 帧数  
  duration?: number // 持续时间 按 ms 计时  
  column?: number // 帧动画图片 每行的列数 0 表示一行  
  imageLoadComplete?: (url: HTMLImageElement) => any // 图片加载完毕回调  
}
```

If the original image of your frame animation looks like this one line past
![keyFrameTest.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f6ef5f987184bb196f796533166d5a1~tplv-k3u1fbpfcp-watermark.image?)

column set to 0 or not set
If you have multiple rows, set column to how many columns there are in each row

### Load Image

```ts
await anime.init()
```

### Start Animation

```ts
anime.play()
```

### Pause Animation

```ts
anime.pause()
```

### Update

this api is used in element size resize
```ts
anime.update()
```