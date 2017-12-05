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

  contactForm.submit(function( event ) {
    event.preventDefault();
    contactFormSubmitButton.click();
  });

  var apiUrl = "https://blockv.api-us1.com";
  var apiString = apiUrl + "/admin/api.php";
  var apiKey = "f2ec2ed8677320cf24e162d440927b5f993c7489e2acc5f999f385f816b8fdcd724caf87";

  contactFormSubmitButton.on ('click touch', function () {
    if (isEmail (emailBox.val())) {
      var userId = Date.now();
      var userIdProp = "p[" + userId + "]";
      inputGroup.addClass ('valid').removeClass ('invalid');

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
          userIdProp: emailBox.val(),
        }, function (response) {
          console.log ("Response: ", response);
        });

      setTimeout (function () {
        inputGroup.removeClass ('valid');
        emailBox.val('');
      }, 3500);
    } else {
      if (emailBox.val() == "") {
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
  $ (".slider-try-it").slick ({
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "arrows": false,
    "fade": true,
    "cssEase": "linear"
  });

  var roadmapList = $ (".roadmap-list");
  var roadmapItemsActive = 0;
  var roadmapItems = roadmapList.children ();
  var isVisible = false;

  window.onscroll = function () {
    if (roadmapList.isOnScreen ()) {
      isVisible = true;
    }
  }

  setInterval (function () {
    if (isVisible) {
      $ (roadmapItems[roadmapItemsActive]).removeClass ('active');
      roadmapList.removeClass ('active-' + roadmapItemsActive);
      if (roadmapItemsActive === roadmapItems.length - 1) {
        roadmapItemsActive = 0;
      } else {
        roadmapItemsActive++;
      }
      $ (roadmapItems[roadmapItemsActive]).addClass ('active');
      roadmapList.addClass ('active-' + roadmapItemsActive);
    }
  }, 3000);
});
