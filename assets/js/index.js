var ua = navigator.userAgent;
var isPlaying = false;
var currVideoId = 0;

/* mock */
var videos = [
  {
    id: 0,
    video:
      'https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200f6b0000boapv5pevctq96jgh70g&line=0&ratio=540p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH',
    poster:
      'https://p1.pstatp.com/large/tos-cn-p-0015/a1613666cd974ad088c2af230290406b_1576633763.jpg'
  },
  {
    id: 1,
    video: './video2.mp4',
    poster:
      'https://p9.pstatp.com/large/tos-cn-p-0015/0df7905402df42cb87b1b798bfd9a6af_1579049169.jpg'
  },
  {
    id: 2,
    video: './video3.mp4',
    poster:
      'https://p1.pstatp.com/large/tos-cn-p-0015/a2a8b40b2fd347cdbc4bce905cbc364f_1578538470.jpg'
  },
  {
    id: 3,
    video: './video4.mp4',
    poster:
      'https://p1.pstatp.com/large/tos-cn-p-0015/5826a8404ce148d3b1da10a35a5d0f37_1577960083.jpg'
  }
];

videos.forEach((video, i) => {
  $('.swiper-slide')
    .eq(i)
    .find('.video-box')
    .css({
      backgroundImage: `url(${video.poster})`
    });
});

initSwiper();
// document.addEventListener(
//   'WeixinJSBridgeReady',
//   function() {
//     /* 初始化swiper */
//     initSwiper();
//   },
//   false
// );

function initSwiper() {
  var currIndex = 0;
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    watchSlidesProgress: true,
    on: {
      slideChangeTransitionEnd: function() {
        setVideo(this.activeIndex);
      },
      tap: function() {}
    }
  });

  // preloadVideo(videos[0].video);

  /**
   * 点击视频播放或暂停
   *
   */
  $('.video-box').click(function() {
    if (isPlaying) {
      var v = document.querySelector('.video');
      v.pause();
      $('.swiper-slide')
        .eq(currIndex)
        .find('.play-btn')
        .show();
      return;
    }
    setVideo(currIndex);
  });

  // swiper.appendSlide('<div class="swiper-slide">这是一个新的slide</div>');
}

/**
 * 设置视频
 * @param {*} params
 */
function setVideo(index) {
  var v = document.querySelector('.video');
  v.src = videos[index].video;
  v.play();
  v.oncanplay = function() {
    currVideoId = videos[index].id;
    console.log('currentVideo-->', videos[index].id);
    console.log('oncanplay');
    console.log('当前播放时间:', v.currentTime, '总时长：', v.duration);
  };
  v.ontimeupdate = function() {
    isPlaying = true;

    if (
      v.currentTime > 0.05 &&
      $(`.swiper-slide:eq(${index}) .video-box`).css('opacity') != '0'
    ) {
      $(`.swiper-slide:eq(${index}) .video-box`).css({
        opacity: 0
      });
    }

    $('.line').css({
      width: Math.ceil((v.currentTime / v.duration) * 100) + '%'
    });
  };
}

/**
 * 视频预加载
 */
function preloadVideo(url) {
  var img = new Image();
  img.src = url;
}
