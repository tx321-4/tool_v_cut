## expree版 本地视频截图
### 介绍
*  这是一个本地服务使用的小工具
*  用于批量处理视频截图 => 获取视频的首帧并保存下来
*  自动遍历文件夹中的视频


### 初始化项目
* 全局安装`express` 
  * npm install -g express
* 全局安装`express` 项目生成器 
  * npm install express-generator -g
* 创建项目 express 项目名
  * express app

### 技能
* express
* fluent-ffmpeg ！！！！重点

### fluent-ffmpeg
>  用于处理视频，音频
* 参考链接：[关于nodejs中使用fluent-ffmpeg模块、ffmpeg工具的使用心得](https://blog.csdn.net/qq_19788257/article/details/83011732)

### 启动
* 前提 ffmpeg软件 安装成功
* npm install || yarn 安装
* DEBUG=tool_v_cut:* npm start // 启动项目
* 把视频文件夹放在`static` 文件夹下
* 访问地址
  * http://localhost:3000/videocut // 查看视频路径
  * http://localhost:3000/videocut2 // 生成视频截图

### 修改视频截图帧数
```javascript
// routes\videocut.js
ffmpeg(src)
  .on('filenames', (filenames) => {
   ...
  })
  .on('end', () => {
  })
  .screenshots({
    ...
    timestamps: ['00:02.000'],  // 截取视频第2秒
    ....
  });
```