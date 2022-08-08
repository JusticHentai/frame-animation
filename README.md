# Frame-animation

基于 raf 和 canvas 的帧动画工具

## Install

```bash
npm i @justichentai/frame-animation
```

## Usage

### Simple Example

```ts
import FrameAnime from '@justichentai/frame-animation'

const anime = new FrameAnime({  
  frame: 24,  
  url: 'url',  
  duration: 2000,  
  el: dom,  
})  
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

this api are used in element size resize
```ts
anime.update()
```

