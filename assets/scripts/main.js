$(document).ready(function() {
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

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


});
