$ (document).ready (function () {
  $.fn.isOnScreen = function () {
    var win = $ (window);

    var viewport = {
      top: win.scrollTop (),
      left: win.scrollLeft ()
    };
    viewport.right = viewport.left + win.width ();
    viewport.bottom = viewport.top + win.height ();

    var bounds = this.offset ();
    bounds.right = bounds.left + this.outerWidth ();
    bounds.bottom = bounds.top + this.outerHeight ();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  };

  function checkPos (number) {
    if (number > 100) {
      return 100;
    } else {
      return number;
    }
  }

  var heroVideo = $ ('#hero-video');

  // Run video after 2s
  setTimeout (function () {
    document.getElementById ("hero-video").play ();
  }, 2000);

  $ ('.video-wrap .play').click (function () {
    heroVideo.prop ('muted', false);
  })

  $ ('.video-wrap .mute-icon').click (function () {
    heroVideo.prop ('muted', true);
  })

  $ (document).on ('click', 'a[href^="#"]', function (event) {
    event.preventDefault ();

    $ ('html, body').animate ({
      scrollTop: $ ($.attr (this, 'href')).offset ().top
    }, 500);
  });

  new WOW ().init ();

  // Email Validation/Interaction
  function isEmail (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test (email);
  }

  var contactForm = $ ('.subscribe-updates');
  var contactFormSubmitButton = $ (".subscribe-updates .input-group button");
  var inputGroup = $ ('.subscribe-updates .input-group')
  var emailBox = $ ('.subscribe-updates .input-group input')

  contactForm.submit (function (event) {
    event.preventDefault ();
    contactFormSubmitButton.click ();
  });

  var apiUrl = "https://blockv.api-us1.com";
  var apiString = apiUrl + "/admin/api.php";
  var apiKey = "f2ec2ed8677320cf24e162d440927b5f993c7489e2acc5f999f385f816b8fdcd724caf87";

  contactFormSubmitButton.on ('click touch', function () {
    if (isEmail (emailBox.val ())) {
      var userId = Date.now ();
      var userIdProp = "p[" + userId + "]";
      inputGroup.addClass ('valid').removeClass ('invalid');

      var contact = {
        "api_action": "contact_add",
        "api_key": apiKey,
        "email": emailBox.val (),
      }

      contact[userIdProp] = userId;

      $.post (apiString,
        {
          "api_action": "contact_add",
          "api_key": apiKey,
          "email": emailBox.val (),
          userIdProp: userId,
        }, function (response) {
          console.log ("Response: ", response);
        });

      setTimeout (function () {
        inputGroup.removeClass ('valid');
        emailBox.val ('');
      }, 3500);
    } else {
      if (emailBox.val () == "") {
        inputGroup.removeClass ('invalid');
      } else {
        inputGroup.removeClass ('valid').addClass ('invalid');
      }
    }
  });

  emailBox.on ('focus', function () {
    inputGroup.removeClass ('invalid');
  })

  $ (".slider-apps").slick ({
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "arrows": false
  });

  var tryItSlider = $ (".slider-try-it");

  tryItSlider.slick ({
    "dots": false,
    "infinite": true,
    "false": true,
    "autoplaySpeed": 2000,
    "arrows": false,
    "fade": true,
    "cssEase": "linear"
  });

  var roadmapList = $ (".roadmap-list");
  var roadmapItemsActive = 0;
  var roadmapItems = roadmapList.children ();
  var roadmapIsVisible = false;

  var emailForm = $('.email-form-field');
  var emailFormIsVisible = false;
  var emailFormEnabled = false;

  function enablePlaceholder () {
    var i = 0;
    var txt = 'Enter your e-mail address';
    var speed = 100;
    var placeholderText = '';

    function typeWriter() {
      if (i < txt.length) {
        placeholderText += txt.charAt(i);
        emailForm.attr('placeholder', placeholderText);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }

  window.onscroll = function () {
    if (roadmapList.isOnScreen ()) {
      roadmapIsVisible = true;
    }

    if (!emailFormEnabled) {
      emailFormEnabled = true;
      setTimeout(function () {
        if (emailForm.isOnScreen ()) {enablePlaceholder()};
      }, 2000);
    }
  }

  function clearActiveRoadmapStep (number) {
    roadmapList.removeClass ('active-' + roadmapItemsActive);
  }

  if (window.matchMedia ('(max-width: 767px)').matches) {
    roadmapItems.click (function () {
      roadmapItems.removeClass ('active');
      $ (this).addClass ('active');
    })

    window.ondevicemotion = function (event) {
      var title = $ ('.gradient-title');
      title.css ('background-image', 'linear-gradient(to left, #58421d 0%, #d0ac71 ' + (parseFloat (40 + 4 * event.accelerationIncludingGravity.x).toFixed (2)) + '%, #d0ac71 ' + (parseFloat (60 + 4 * event.accelerationIncludingGravity.x).toFixed (2)) + '%, #58421d 100%')
    }
  } else {
    setInterval (function () {
      if (roadmapIsVisible) {
        roadmapItems.removeClass ('active');
        clearActiveRoadmapStep (roadmapItemsActive);
        if (roadmapItemsActive === roadmapItems.length - 1) {
          roadmapItemsActive = 0;
        } else {
          roadmapItemsActive++;
        }
        $ (roadmapItems[roadmapItemsActive]).addClass ('active');
      }
    }, 5000);

    roadmapItems.hover (function () {
      roadmapItems.removeClass ('active');
      $ (this).addClass ('active');
    });
  }
  
  // Gift button

  var giftButton = $('#gift-button');
  var giftStep = 0;
  var giftStepsList = $('.steps-list li');
  var giftProgressbar = $('.gift-progress .progress-bar');

  giftButton.click(giftButtonEvent);

  function giftButtonEvent () {
    switch(giftStep) {
      case 0:
        $('.present-image-wrap').removeClass('animated');
        giftButton.text('Next Step');
        giftStepsList.eq( giftStep ).addClass('done');
        tryItSlider.slick('slickGoTo', giftStep + 1);
        giftProgressbar.css('width', '18%');
        break;
      case 5:
        giftButton.text('Well done!!!');
        giftStepsList.eq( giftStep ).addClass('done');
        giftButton.attr('disabled', true);
        tryItSlider.slick('slickGoTo', giftStep + 1);
        giftProgressbar.css('width', '100%');
        break;
      default:
        giftStepsList.eq( giftStep ).addClass('done');
        if( giftStep < 6) {
          tryItSlider.slick('slickGoTo', giftStep + 1);
          giftProgressbar.css('width', 100 / 6 * (giftStep + 1) + '%');
        }
    }
    giftStep++;
  }
});
