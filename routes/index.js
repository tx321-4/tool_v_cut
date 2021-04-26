var express = require('express');
var router = express.Router();
const videocut = require('./videocut');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 创建视频截图
router.get('/videocut',videocut.vcut);
router.get('/videocut2',videocut.vcut2);


module.exports = router;
