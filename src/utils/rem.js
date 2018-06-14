;
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);


// ios下状态栏遮挡
  var standalone = win.navigator.standalone,
    userAgent = win.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent ),
    uc = /ucbrowser/.test(userAgent),
    qihoo = /qihoobrowser/.test(userAgent),
    sogoumobilebrowser = /sogoumobilebrowser/.test(userAgent);

  win.isIosWebview = false;
  win.ios = ios;
  if( ios ) {

    if ( !standalone && safari ) {
      //browser
    } else if ( standalone && !safari ) {
      //standalone

    } else if ( !standalone && !safari ) {
      //uiwebview  【不是uc也不是360也不是搜狗】
      if(!uc && !qihoo && !sogoumobilebrowser){
        isIosWebview = true;
      }

    };
  } else {
    //not iOS
  };



})(document, window);
