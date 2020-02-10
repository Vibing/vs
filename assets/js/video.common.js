var vc = {
  /* 当前视频id */
  videoId: '',

  /* 是否播放中 */
  isPlaying: false,

  /* 当前滑屏索引 */
  currIndex: 0,

  /* 上次浏览的滑屏索引 */
  oldIndex: null,

  /**
   * swiper插件初始化
   * @param {*} params
   * {
   *  onSlideEnd: 当滑动结束时回调
   * }
   */
  swiperInit: function(params) {
    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      watchSlidesProgress: true,
      on: {
        slideChangeTransitionEnd: function() {
          vc.oldIndex = vc.currIndex;
          vc.currIndex = this.activeIndex;
          vc.isPlaying = false;
          if (params.onSlideEnd) {
            params.onSlideEnd(this.activeIndex, vc.oldIndex);
          }
        },
        tap: function() {}
      }
    });
  },

  /* 返回当前滑屏对象 */
  swiperSlide: function(index) {
    return $('.swiper-slide').eq(index === undefined ? vc.currIndex : index);
  },

  /**
   * 加载视频
   * {
   *  id: 视频id
   *  video: video的DOM对象
   *  src: 视频url
   *  oncanplay: 视频可以播放时的回调
   *  ontimeupdate: 视频播放过程回调
   * }
   */
  loadVideo: function(params, isFirst) {
    vc.videoId = params.id;
    params.video.src = params.src;

    vc.oldIndex !== null && params.video.play();
    params.video.oncanplay = function() {
      console.log('currentVideo-->', params.id);
      console.log('oncanplay');
      console.log(
        '当前播放时间:',
        params.video.currentTime,
        '总时长：',
        params.video.duration
      );
      if (params.oncanplay) {
        params.oncanplay();
      }
    };

    params.video.ontimeupdate = function() {
      // 设为播放中
      if (params.video.currentTime > 0.15) {
        vc.isPlaying = true;
        console.log('currentTime-->>');
      }

      $('.line').css({
        width:
          Math.ceil((params.video.currentTime / params.video.duration) * 100) +
          '%'
      });

      if (params.ontimeupdate) {
        params.ontimeupdate();
      }
    };
  },

  /**
   * 视频暂停或播放
   * {
   *  video: 视频对象
   * }
   * @param {*} param
   */
  playOrPause: function(param) {
    if (vc.isPlaying) {
      param.video.pause();
      setTimeout(function() {
        vc.isPlaying = false;
      });

      vc.swiperSlide()
        .find('.play-btn')
        .show();
      return;
    }

    param.video.play();
    vc.isPlaying = true;
    vc.swiperSlide()
      .find('.play-btn')
      .hide();
  },

  /**
   * 隐藏该视频的封面图及播放按钮
   * ps: 视频滑动时，当前视频播放时将封面图和播放按钮隐藏
   * 并将上次浏览的视频封面图和播放按钮显示
   */
  bogusToggle: function(currentTime) {
    // 当前视频封面是否隐藏
    var opacity = $('.video-box')
      .eq(vc.currIndex)
      .css('opacity');

    if (currentTime > 0.05 && opacity !== '0') {
      // 隐藏当前视频封面
      $('.video-box')
        .eq(vc.currIndex)
        .css({
          opacity: 0
        });

      // 隐藏当前视频播放按钮
      vc.swiperSlide()
        .find('.play-btn')
        .hide();

      // 隐藏loading
    }

    // 上次浏览的视频是否隐藏
    var oldOpacity = $('.video-box')
      .eq(vc.oldIndex)
      .css('opacity');

    // 如果存在oldIndex
    if (vc.oldIndex !== null && oldOpacity !== '1') {
      // 显示当前视频封面
      $('.video-box')
        .eq(vc.oldIndex)
        .css({
          opacity: 1
        });
      vc.swiperSlide(vc.oldIndex)
        .find('.play-btn')
        .show();
    }
  }
};
