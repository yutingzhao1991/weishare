var wechat = require('wechat');

function weishare(token) {
    return wechat(token, function (req, res, next) {
      // 微信输入信息都在req.weixin上
      var message = req.weixin;
      if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
      } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
        res.reply({
          title: "来段音乐吧",
          description: "一无所有",
          musicUrl: "http://mp3.com/xx.mp3",
          hdMusicUrl: "http://mp3.com/xx.mp3"
        });
      } else {
        // 回复高富帅(图文回复)
        res.reply([
          {
            title: '你来我家接我吧',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'http://nodeapi.cloudfoundry.com/'
          }
        ]);
      }
    });
}

exports.weishare = weishare;