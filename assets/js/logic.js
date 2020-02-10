var videoHtml = function(src) {
  return `
  <video
        class="video"
        style="object-fit: fill;"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        playsinline="true"
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="false"
        width="100%"
        height="100%"
        preload="auto"
        autoplay="autoplay"
        poster=""
        loop
        src="${src}"
      >
        
      </video>
  `;
};
/* mock */
var videos = [
  {
    id: 10,
    video: '../../video.mp4',
    poster:
      'https://p1.pstatp.com/large/tos-cn-p-0015/a1613666cd974ad088c2af230290406b_1576633763.jpg'
  },
  {
    id: 11,
    video: '../../video2.mp4',
    poster:
      'https://p9.pstatp.com/large/tos-cn-p-0015/0df7905402df42cb87b1b798bfd9a6af_1579049169.jpg'
  },
  {
    id: 0,
    video:
      'https://aweme.snssdk.com/aweme/v1/playwm/?s_vid=93f1b41336a8b7a442dbf1c29c6bbc566a4883a8737218900b951ba94ce7b43aed5835f4f511506f835976579d457396d1b3fa788179a456d136939c1729390c&line=0',
    poster:
      'https://p1.pstatp.com/large/tos-cn-p-0015/a1613666cd974ad088c2af230290406b_1576633763.jpg'
  },
  {
    id: 1,
    video:
      'https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200f6b0000boapv5pevctq96jgh70g&line=0&ratio=540p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH',
    poster:
      'https://p9.pstatp.com/large/tos-cn-p-0015/0df7905402df42cb87b1b798bfd9a6af_1579049169.jpg'
  },
  {
    id: 2,
    video:
      'https://aweme.snssdk.com/aweme/v1/playwm/?s_vid=93f1b41336a8b7a442dbf1c29c6bbc56cec542cdd0327ca8e92539b7c9ad4559aec394004ceff9dedcbad67b2a4b66ce5d651e0715f4b61951f99aecee8bee4c&line=0',
    poster:
      'https://p1.pstatp.com/large/tos-cn-p-0015/a2a8b40b2fd347cdbc4bce905cbc364f_1578538470.jpg'
  },
  {
    id: 3,
    video:
      'https://aweme.snssdk.com/aweme/v1/playwm/?s_vid=93f1b41336a8b7a442dbf1c29c6bbc56743cad8b00395045ea562ee9df6004f0da8676eeb4a1f8af8c9048a3c43c94d8d8b3a443eba1b05bf7a4d6d6acec6258&line=0',
    poster:
      'https://p1.pstatp.com/large/tos-cn-p-0015/5826a8404ce148d3b1da10a35a5d0f37_1577960083.jpg'
  }
];

document.getElementById('video-dom').innerHTML = videoHtml(videos[0].video);

var videoDom = document.querySelector('.video');
console.log(videoDom);

videos.forEach((video, i) => {
  $('.swiper-slide')
    .eq(i)
    .find('.video-box')
    .css({
      backgroundImage: `url(${video.poster})`
    });
});

vc.swiperInit({
  onSlideEnd: function(activeIndex, oldIndex) {
    var currVideo = videos[vc.currIndex];
    console.log('currVideo.video-->', currVideo.video);

    vc.loadVideo({
      id: currVideo.id,
      video: videoDom,
      src: currVideo.video,
      oncanplay: function() {},
      ontimeupdate: function() {
        // 隐藏当前视频封面图及播放按钮 显示上次浏览的封面图和播放按钮
        vc.bogusToggle(videoDom.currentTime);
      }
    });
  }
});

firstVideoInit();

/**
 * 初始化第一个视频
 * @param {*} params
 */
function firstVideoInit() {
  var currVideo = videos[vc.currIndex];
  vc.loadVideo({
    id: currVideo.id,
    video: videoDom,
    src: currVideo.video,
    oncanplay: function() {},
    ontimeupdate: function() {
      // 隐藏当前视频封面图及播放按钮 显示上次浏览的封面图和播放按钮
      vc.bogusToggle(videoDom.currentTime);
    }
  });

  $('.video-box').click(function() {
    vc.playOrPause({
      video: videoDom
    });
  });
}
