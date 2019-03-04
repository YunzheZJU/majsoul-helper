修改自Chrome Extension示例。

与majsoul-plus劫持资源请求的思路不同，我想从游戏引擎入手调用其api进行资源的替换。

这两天里又是查Chrome Extension文档又是读Laya Air源码，最后还是写不下去了。

原因是难以解决的两个问题：
1. 清除旧资源并创建新资源后对旧资源有依赖的组件没有得到更新。
2. 加载全部资源之后导致进入牌桌时发生glTexture错误。

但我做到了几件事：
1. 向运行环境注入代码并保持通信。
1. 调用Laya api读取游戏贴图（纹理）。
1. 创建Chrome Snippet调出Laya的Debug Tool。（未包含在本仓库中）
