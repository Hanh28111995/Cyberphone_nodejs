
  const change_show_item = () => {
    if ($(window).width() < 700) {
      $('.your-class').slick('slickSetOption', 'slidesToShow', 1)
      $('.slick-prev').css('display', 'block')
      $('.slick-next').css('display', 'block')
    }
    if ($(window).width() > 700 && $(window).width() < 1020) {
      $('.your-class').slick('slickSetOption', 'slidesToShow', 2)
      $('.slick-prev').css('display', 'block')
      $('.slick-next').css('display', 'block')
    }
    if ($(window).width() < 1500 && $(window).width() > 1020) {
      $('.your-class').slick('slickSetOption', 'slidesToShow', 3)
      $('.slick-prev').css('display', 'block')
      $('.slick-next').css('display', 'block')
    }
    if ($(window).width() > 1500) {
      $('.your-class').slick('slickSetOption', 'slidesToShow', 4)
      if ($('.item-product').length <= 4) {
        $('.slick-prev').css('display', 'none')
        $('.slick-next').css('display', 'none')
      } else {
        $('.slick-prev').css('display', 'block')
        $('.slick-next').css('display', 'block')
      }
    }
    $('.slick-slider').slick('slickGoTo', 0)
  }

  const call_slick = () => {
    $('.your-class').slick({
      speed: 1000,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false,
      arrows: true,
      // slidesToShow: 4 ,
    })
    change_show_item()

    $(window).resize(function () {
      $('.slick-slider').slick('slickGoTo', 0)
      change_show_item()
    })
  }
