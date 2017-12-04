$(document).ready(function() {
  setTimeout(function(){
    document.getElementById("hero-video").play();
  }, 2000);

  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  new WOW().init();

  var navMain = $(".navbar-collapse");
  navMain.on("click", "a", null, function () {
    navMain.collapse('hide');
  });

  // var s = skrollr.init();

  // Email Validation/Interaction
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  var inputGroup = $('.subscribe-updates .input-group')
  var emailBox = $('.subscribe-updates .input-group input')

  $(".subscribe-updates .input-group button").on('click touch', function () {
    console.log(emailBox.val());
    if (isEmail(emailBox.val())) {
      inputGroup.addClass('valid').removeClass('invalid');
      setTimeout(function() {
        inputGroup.removeClass('valid');
        emailBox.val('');
      }, 3500);
    } else {
      if (emailBox.val() == "") {
        inputGroup.removeClass('invalid');
      } else {
        inputGroup.removeClass('valid').addClass('invalid');
      }
    }
  });
  emailBox.on('focus', function () {
    inputGroup.removeClass('invalid');
  })

  $(".slider-apps").slick({"dots": false, "infinite": true, "autoplay": true, "autoplaySpeed": 2000, "arrows":false});
  $(".slider-try-it").slick({"dots": false, "infinite": true, "autoplay": true, "autoplaySpeed": 2000, "arrows":false, "fade": true, "cssEase": "linear"});

  var roadmapList = $(".roadmap-list");
  var roadmapItemsActive = 0;
  var roadmapItems = $(".roadmap-list").children();
  var isVisible = false;

  $.fn.isOnScreen = function(){
    var win = $(window);

    var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

  };


  window.onscroll = function() {
    if (roadmapList.isOnScreen()) {
      isVisible = true;
    }
  }

  setInterval(function() {
    if(isVisible) {
      $(roadmapItems[roadmapItemsActive]).removeClass('active');
      if(roadmapItemsActive === roadmapItems.length - 2) {
        roadmapItemsActive = 0;
      } else {
        roadmapItemsActive++;
      }
      $(roadmapItems[roadmapItemsActive]).addClass('active');
    }
  }, 3000);
});
