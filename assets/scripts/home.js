$(document).ready(function() {
  $('.counter').counterUp({
    delay: 1,
    time: 1000
  });

  $.fn.isOnScreen = function() {
    var win = $(window);

    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  };

  var heroVideoWrap = $('.video-wrap');
  var heroVideo = $('#hero-video');
  var soundEnabled = false;

  function toggleSound() {
    heroVideo.prop('muted', !soundEnabled);

    if(soundEnabled) {
      heroVideoWrap.removeClass('muted')
      heroVideoWrap.addClass('sound')
    } else {
      heroVideoWrap.removeClass('sound')
      heroVideoWrap.addClass('muted')
    }

    soundEnabled = !soundEnabled;
  }

  $('.video-wrap .play').click(function() {
    toggleSound();
  })

  $('.status-icon').click(function() {
    toggleSound();
  })


  //anchor link
  $(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  // Email Validation/Interaction
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  var contactForm = $('.subscribe-updates');
  var contactFormSubmitButton = $(".subscribe-updates .input-group button");
  var inputGroup = $('.subscribe-updates .input-group')
  var emailBox = $('.subscribe-updates .input-group input')

  contactForm.submit(function(event) {
    event.preventDefault();
    contactFormSubmitButton.click();
  });

  var apiUrl = "https://blockv.api-us1.com";
  var apiString = apiUrl + "/admin/api.php";
  var apiKey = "f2ec2ed8677320cf24e162d440927b5f993c7489e2acc5f999f385f816b8fdcd724caf87";

  contactFormSubmitButton.on('click touch', function() {
    if(isEmail(emailBox.val())) {
      var userId = Date.now();
      var userIdProp = "p[" + userId + "]";
      inputGroup.addClass('valid').removeClass('invalid');

      var contact = {
        "api_action": "contact_add",
        "api_key": apiKey,
        "email": emailBox.val(),
      }

      contact[userIdProp] = userId;

      $.post(apiString,
        {
          "api_action": "contact_add",
          "api_key": apiKey,
          "email": emailBox.val(),
          userIdProp: userId,
        }, function(response) {
          console.log("Response: ", response);
        });

      setTimeout(function() {
        inputGroup.removeClass('valid');
        emailBox.val('');
      }, 3500);
    } else {
      if(emailBox.val() == "") {
        inputGroup.removeClass('invalid');
      } else {
        inputGroup.removeClass('valid').addClass('invalid');
      }
    }
  });

  emailBox.on('focus', function() {
    inputGroup.removeClass('invalid');
  })

  $(".slider-apps").slick({
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "arrows": false
  });

  var tryItSlider = $(".slider-try-it");

  tryItSlider.slick({
    "dots": false,
    "infinite": true,
    "false": true,
    "autoplaySpeed": false,
    "arrows": false,
    "cssEase": "linear",
  });

  // var roadmapList = $ (".roadmap-list");
  // var roadmapItemsActive = 0;
  // var roadmapItems = roadmapList.children ();
  // var roadmapIsVisible = false;

  var emailForm = $('.email-form-field');
  var emailFormIsVisible = false;
  var emailFormEnabled = false;

  function enablePlaceholder() {
    var i = 0;
    var txt = 'Enter your e-mail address';
    var speed = 100;
    var placeholderText = '';

    function typeWriter() {
      if(i < txt.length) {
        placeholderText += txt.charAt(i);
        emailForm.attr('placeholder', placeholderText);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }

  // function clearActiveRoadmapStep (number) {
  //   roadmapList.removeClass ('active-' + roadmapItemsActive);
  // }

  function getCoordinate (position) {
    return parseFloat(position + 2 * event.accelerationIncludingGravity.x).toFixed(2);
  }

  if(window.matchMedia('(max-width: 767px)').matches) {
    // roadmapItems.click (function () {
    //   roadmapItems.removeClass ('active');
    //   $ (this).addClass ('active');
    // })

    $('.video-wrap').attr('data-wow-delay', '0s');
    $('.hero-section .content-wrap .decoration').attr('data-wow-delay', '0s');
    $('.stats-block').attr('data-wow-delay', '0.5s');

    window.ondevicemotion = function(event) {
      var title = $('.gradient-title');
      var darkColor = '#b8893d ';
      var lightColor = '#ddc297 ';

      title.css('background-image', 'linear-gradient(135deg, ' +
        darkColor +' 0%, ' +
        lightColor + getCoordinate(10) + '%, ' +
        darkColor + getCoordinate(20) + '%, ' +
        darkColor + getCoordinate(30) + '%, ' +
        lightColor + getCoordinate(35) + '%, ' +
        darkColor + getCoordinate(50) + '%, ' +
        darkColor + getCoordinate(60) + '%, ' +
        lightColor + getCoordinate(75) + '%, ' +
        darkColor + getCoordinate(85) + '%, ' +
        lightColor + getCoordinate(90) + '%, ' +
        darkColor + ' 100%')
    }
  } else {
    // setInterval (function () {
    //   if (roadmapIsVisible) {
    //     roadmapItems.removeClass ('active');
    //     clearActiveRoadmapStep (roadmapItemsActive);
    //     if (roadmapItemsActive === roadmapItems.length - 1) {
    //       roadmapItemsActive = 0;
    //     } else {
    //       roadmapItemsActive++;
    //     }
    //     $ (roadmapItems[roadmapItemsActive]).addClass ('active');
    //   }
    // }, 5000);

    // roadmapItems.hover (function () {
    //   roadmapItems.removeClass ('active');
    //   $ (this).addClass ('active');
    // });
  }

  // Gift button
  var giftBlockIsVisible = false;
  var giftStep = 0;
  var giftStepsList = $('.steps-list li');


  function giftButtonEvent() {
    switch(giftStep) {
      case 6:
        giftStep = 0;
        tryItSlider.slick('slickGoTo', 1);
        break;
      default:
        if(giftStep < 6) {
          tryItSlider.slick('slickGoTo', giftStep + 1);
        }
    }
    giftStep++;
  }

  function updateTryItList(slideNumber) {
    giftStepsList.removeClass('active');
    if(slideNumber === -1) {
      giftStepsList.eq(0).addClass('active');
    } else {
      giftStepsList.eq(slideNumber).addClass('active');
    }
  }

  tryItSlider.on('afterChange', function(slick, currentSlide){
    var currentSiderId = $('.slider-try-it .slick-active').attr('data-slick-index');
    updateTryItList(currentSiderId - 1);
  });

  // Video script
  setTimeout(function() {
    document.getElementById("hero-video").play();
  }, 2000);

  window.onscroll = function() {
    if(!emailFormEnabled) {
      emailFormEnabled = true;
      setTimeout(function() {
        if(emailForm.isOnScreen()) {
          enablePlaceholder();
        }
      }, 2000);
    }

    if($('.steps-list').isOnScreen() && !giftBlockIsVisible) {
      giftBlockIsVisible = true;

      if(window.matchMedia('(min-width: 768px)').matches) {
        setInterval (function () {
          giftButtonEvent();
        }, 3000);
      }
    }
  }
});

