const rd = require('rd');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const path2 = path.resolve(__dirname, '..');
const vpath = path2 + '\\static\\videos\\';
const dirCache = {};

exports.vcut = async (req, res) => {
  try {
    var files = rd.readSync(vpath);// 获取目录下所有文件和文件夹
    res.json({
      'data': files
    })
  } catch (err) {
    throw new Error(err);
  }
}
exports.vcut2 = async (req, res) => {
  try {
    var files = rd.readSync(vpath);// 获取目录下所有文件和文件夹
    let urls = []
    for (var i in files) { // 遍历
      if (!fs.lstatSync(files[i]).isDirectory()) { // 判断是否为文件
        if (files[i].toLowerCase().split('.mp4').reverse()[0].length == 0) { // 判断是否为MP4格式文件
          let url = (vpath.replace(path2, "") + files[i].replace(vpath, "")).replace(/\\/g, '/'); //获取文件的web路径
          //urls.push(url)
          createImage(url).then(async (res) => {
            urls.push(res)

          }, async (err) => {
            throw new Error(err)
          })
        }
      }
    }
    setTimeout(() => {
      res.json({
        'code': 0,
        'message':'截图完成',
        'data': urls
      })
    }, 100);
    // res.send('截图完成')
  } catch (error) {
    throw new Error(error);

  }
}

const createImage = (src) => {
  return new Promise((reslove, reject) => {
    var info = {}
    try {
      src = '.' + src;
      let fileName = src.substring(src.lastIndexOf('/') + 1).split('.')[0];
      let folder = './static/img' + src.substring(src.indexOf('/', src.indexOf('/', src.indexOf('/') + 1) + 1), src.lastIndexOf('/') + 1);
      let url = folder + fileName + '.jpg'
      mkdir(folder)
      info = {
        imgfileName: fileName,
        imgfolder: folder,
        imgurl: url
      }
      ffmpeg(src)
        .on('filenames', (filenames) => {
          imageName = filenames[0];
        })
        .on('end', () => {
        })
        .screenshots({
          // Will take screens at 20%, 40%, 60% and 80% of the video
          //timestamps: [30.5, '50%', '01:10.123'],
          timestamps: ['00:02.000'],
          folder: folder,
          filename: fileName + '.jpg',

        });
      reslove(info);
    } catch (error) {
      reject(error)
    }
  })
}

function mkdir (filepath) {
  const arr = filepath.split('/');
  let dir = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (!dirCache[dir] && !fs.existsSync(dir)) {
      dirCache[dir] = true;
      fs.mkdirSync(dir);
    }
    dir = dir + '/' + arr[i];
  }
}