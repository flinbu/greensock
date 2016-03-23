function fancyBackground(el) {

  var lines = (el.data('lines')) ? el.data('lines') : 10,
      lineWidth = (el.data('line-width')) ? el.data('line-width') : 10,
      minHeightPCT = (el.data('min-height')) ? el.data('min-height') : 30,
      maxHeightPCT = (el.data('max-height')) ? el.data('max-height') : 80,
      winWidth = $(window).width(),
      spaceLines = lines * lineWidth,
      spaceGutter = (el.data('gutter')) ? el.data('gutter') : (winWidth / lines) / 2,
      animDuration = (el.data('duration')) ? el.data('duration') : 30
      fancyHolder = $('<div>')
        .attr('class', 'fancy-holder').css({
          width : '100%',
          height : '100%',
          position : 'absolute',
          left : 0,
          top : 0
        });
  el.css({
    position : 'relative'
  });
  function generate() {
    el.find('.fancy-holder').html('');
    for (i = 0; i < lines; i++) {
      var tl = new TimelineMax({paused: false});
      var randompct = Math.floor(Math.random() * (maxHeightPCT - minHeightPCT + 1) + minHeightPCT),
          randColor = Math.floor(Math.random() * (11)),
          top = (100 - randompct) / 2,
          line = $('<div>')
            .attr('class', 'fancy-line color-' + randColor)
            .css({
              position : 'absolute',
              width : lineWidth + 'px',
              height : randompct + '%',
              left : spaceGutter + (lineWidth * i) + (spaceGutter * i) + 'px',
              top : randompct + 'px',
              borderRadius : '10px'
            });
      line.appendTo(fancyHolder);
      var duration = animDuration,
          part = duration / 2,
          tw_in = TweenMax.to(line, part, {
            top : el.height() - ((el.height() * randompct) / 100) + randompct,
            ease : Ease.easeInOut,
            delay : randompct / 2
          }),
          tw_out = TweenMax.to(line, part, {
            top : randompct,
            ease : Ease.easeInOut,
            delay : part * randompct / 3
          });
      tl.add(tw_in, '-=' + (duration - (randompct / 100)));
      tl.add(tw_out, '-=' + (duration - (randompct / 100)));
      tl.repeat(-1);
    }
    el.addClass('fancy-background')
      .append(fancyHolder);
  }
  generate();
}
(function ($) {
  $.fn.fancyBackground = function() {
    var el = $(this);
    fancyBackground(el);
  };
})(jQuery);
