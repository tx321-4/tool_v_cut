const rd = require('rd');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const vpath = path.resolve(__dirname,"..")+ '\\static\\videos\\';


exports.vcut = async(req, res) =>{
  try{
    var files = rd.readSync(vpath);// 获取目录下所有文件和文件夹
    res.json({
      'data': files
    })
  }catch(err){
    throw new Error(err);
  }
}