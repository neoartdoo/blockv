
//Mobile Menu
setTimeout(function () {
  $(".menu-animated").on('click', function () {
    $('.main-nav').toggleClass('open');
    $('body').toggleClass('nav-open');
    $(this).toggleClass('close-menu');
  });
}, 1000);
$(document).ready(function () {


  setTimeout(function () {
    $('.countdown-wrapper').addClass('show');

    $(window).scrollTop(0);
  }, 2000);
})

// Header Sticky on Scroll
$(window).on("scroll", function () {
  var scroll = $(window).scrollTop(),
    header = $(".main-header"),
    logo = $(".logo");

  countdown = $(".countdown-wrapper.index");
  header.toggleClass("sticky", (scroll > 1));
  logo.toggleClass("sticky", (scroll > 1));
  $('.hero-sect').toggleClass("sticky", (scroll > 1));
  $('body').toggleClass("sticky", (scroll > 1));

  if (countdown.hasClass("hide")) {
    countdown.appendTo('.main-header .container');
    // countdown.fadeOut(300);
    // setTimeout(function() {

    // }, 300);
    // countdown.fadeIn(300);
  } else {
    countdown.appendTo('.hero-sect .container .countdown-sect');
  }
  if (/Android|iPhone|iPad|/i.test(navigator.userAgent)) {
    countdown.toggleClass("hide", (scroll > 600));
  } else {
    countdown.toggleClass("hide", (scroll > 250));
  }

});

// FAQ page function
$('.questions li').each(function () {
  var target = $(this).attr("rel");
  var scrollPos = $('#' + target).position().top;
  $(this).click(function () {
    $('.answers').animate({
      scrollTop: scrollPos
    }, 400);
  });
});


// Email Validation/Interaction
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

  $(".subscribe-updates .form-group span").on('click touch', function () {
    var emailBox = $('.subscribe-updates .form-group input')
    if (isEmail(emailBox.val())) {
      $('.form-group').addClass('valid').removeClass('invalid');
      setTimeout(function() {
        $('.form-group').removeClass('valid');
        emailBox.val('');
      }, 3500);
    } else {
      if (emailBox.val() == "") {
        $('.form-group').removeClass('invalid');
      } else {
        $('.form-group').removeClass('valid').addClass('invalid');
      }
    }
  });
  $('.subscribe-updates .form-group input').on('focus', function () {
    $('.form-group').removeClass('invalid');
  })


// Scroll to video section
$("#videos").click(function () {
  var offset = -100; //Offset of 20px

  $('html, body').animate({
    scrollTop: $("#videos-sect").offset().top + offset
  }, 500);
});

//Techstack Scroll Animation
// $(window).scroll(function () {
//   if ($('.techstack').length > 0 && $('.techstack-section').hasClass('finish') == false ) {
//     var doc = document.documentElement;
//     var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
//     var itms = $('.techstack').find('.level');

//     var contVertiicalScroll = 2200;
//     var elemScroll = 400;
//     var heightContainer = 2600;
//     if (/iPhone/i.test(navigator.userAgent)) {
//       contVertiicalScroll = 3400;
//       elemScroll = 400;
//       heightContainer = 2600;
//     }

//     if (top > contVertiicalScroll &&
//         top < contVertiicalScroll + heightContainer) {

//         $('.techstack-section').addClass('fixed');
//         $('.techstack-section').removeClass('absolute');
//         var scrollElem = top - contVertiicalScroll;
//         var index = parseInt((scrollElem) / elemScroll);

//         var scrollCurrentElem = scrollElem - index * elemScroll;
//         var percentScroll = scrollCurrentElem / elemScroll ;
//         for (var i=0; i<index; i++){
//           $(itms[i]).find('svg').css('opacity', 1);
//           $(itms[i]).find('.icon-group').css('opacity', 1);
//         }

//         if(percentScroll<0.3){
//           percentScroll=0.3;
//         }
//         $(itms[index]).find('svg').css('opacity', percentScroll);
//         $(itms[index]).find('.icon-group').css('opacity', 0);

//         //console.log('elemIndex: '+index+' opacity percent: '+ percentScroll)
//     }
//     else if (top < contVertiicalScroll){
//       $('.techstack-section').removeClass('fixed');
//       $('.techstack-section').removeClass('absolute');
//     }
//     else{
//         $('.techstack-section').removeClass('fixed');
//         $('.techstack-section').addClass('absolute');
//         $('.techstack-section').addClass('finish');

//         var currentHeight =  $('.techstack-section').height();

//         var newHeight  = $('.thechstack-wrapper').height();
//         console.log('difference' + (currentHeight-newHeight))
//         var difference = currentHeight-newHeight;
//         contTimelineVertiicalScroll -= difference;

//         var y = $(window).scrollTop();  //your current y position on the page
//         $(window).scrollTop(y - difference);

//         $('.techstack-section').height(newHeight);
//     }
//   }
// })


var contTimelineVertiicalScroll = 5520;
var elemTimelineScroll = 400;
var heightTimelineContainer = 2600;

//Roadmap Scroll Animation
// $(window).scroll(function () {
//   window.mobilecheck = function () {
//     var check = false;
//     (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|iPhone|iPad|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
//     return check;
//   };

//   if (window.mobilecheck() === false &&
//       $('.key-dates').length > 0 &&
//       $('.key-dates').hasClass('finish') == false) {
//     var doc = document.documentElement;
//     var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
//     var itms = $('.key-dates').find('.date-point');

//     if (/iPhone/i.test(navigator.userAgent)) {
//       // contTimelineVertiicalScroll = 3400;
//       // elemTimelineScroll = 400;
//       // heightTimelineContainer = 2600;
//     }
//     // else if( window.innerHeight == 768){
//     //   contTimelineVertiicalScroll = 3400;
//     //   elemTimelineScroll = 400;
//     //   heightTimelineContainer = 2600;
//     // }

//     // else if( window.innerHeight == 1080){
//     //   contTimelineVertiicalScroll = 3400;
//     //   elemTimelineScroll = 400;
//     //   heightTimelineContainer = 2600;
//     // }

//     var scrollElem = top - contTimelineVertiicalScroll;
//     var index = parseInt((scrollElem) / elemTimelineScroll);

//     var scrollCurrentElem = scrollElem - index * elemTimelineScroll;
//     var percentScroll = scrollCurrentElem / elemTimelineScroll;

//     var translateX = -2000 + 2000 * percentScroll;
//     translateX = 'translateX(' + translateX + 'px)'

//     for (var i = 0; i < index; i++) {

//       $(itms[i]).find('span').css('transform', 'translateX(0)');
//       $(itms[i]).addClass('active');

//       if (i > 0)
//         $(itms[i - 1]).find('i').css('width', '100%');
//     }

//     for (var i = index; i < itms.length; i++) {
//       $(itms[i]).removeClass('active');

//       $(itms[i]).find('i').css('width', '0%');
//     }

//     if (index > 0)
//       $(itms[index - 1]).find('i').css('width', (percentScroll * 100) + '%');


//     $(itms[index]).find('span').css('transform', translateX);


//     if (top > contTimelineVertiicalScroll &&
//       top < contTimelineVertiicalScroll + heightTimelineContainer) {

//       $('.key-dates').addClass('fixed');
//       $('.key-dates').removeClass('absolute');

//       //console.log('elemIndex: '+index+' translate: '+ translateX)
//     }
//     else if (top < contTimelineVertiicalScroll) {
//       $('.key-dates').removeClass('fixed');
//       $('.key-dates').removeClass('absolute');
//     }
//     else {
//       $('.key-dates').removeClass('fixed');
//       $('.key-dates').addClass('absolute');


//       $('.key-dates').addClass('finish');

//       var currentHeight =  $('.key-dates').height();
//       var newHeight  = $('.key-dates-wrapper').height();

//       var difference = currentHeight-newHeight;
//       contTimelineVertiicalScroll -= difference;

//       var y = $(window).scrollTop();  //your current y position on the page
//       $(window).scrollTop(y - difference);

//       $('.key-dates').height(newHeight);
//     }
//   }


// });


//Typewriting Effect

var aText = new Array(
  "BUILD THE EXPERIENTIAL ECONOMY OF THE FUTURE AND UNLOCK NEW REVENUE WITH BLOCKCHAIN AND SMART DIGITAL OBJECTS."
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
  sContents = ' ';
  iRow = Math.max(0, iIndex - iScrollAt);
  var destination = document.querySelector(".typewriter");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + '<br />';
  }
  destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "<span class='blink-cursor'></span>";
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", 500);
    }
  } else {
    setTimeout("typewriter()", iSpeed);
  }
}

typewriter();

// Developer Section Transitions
$(document).on('click', '.mobile-container', function(){
  $(this).addClass('rotate no-cursor');
  $('.developer-sect .sect-content').addClass('hide');
  $("#video")[0].src += "&autoplay=1";
  // ev.preventDefault();
  setTimeout(function() {
    $('.video-placeholder').addClass('hide');
  }, 1000);
});
$(document).on('click', '.mobile-container .btn-close', function(event){
  event.stopPropagation();
  $('.mobile-container').removeClass('rotate no-cursor');
  $('.developer-sect .sect-content').removeClass('hide');

  $('.video-placeholder').removeClass('hide');
  $('#video').attr('src', function(index, attr) {
    return attr.replace('&autoplay=1', '');
  });
});

// Steps App Preview
var step = $(".steps li");
step.click(function () {
  var slide = $(".views .img-wrap"),
  activeSlide = $(this).attr("rel");
  slide.removeClass('active');
  $("#" + activeSlide).addClass('active');

  step.removeClass("active");
  $(this).addClass("active");
});

// Roadmap
// make to roadmap loops
// in every 3 seconds
var year = $(".years li");
// check how may child we have
var length = $('.years li').length;
var itemCounter = 1;
var tab = $(".y-content div");
setInterval(function () {
  let elem = $('.years li:nth-child(' + itemCounter + ')');
  var activeTab = $(elem).attr('rel');
  tab.removeClass('active');
  $('#' + activeTab).addClass('active');

  year.removeClass('active');
  $(elem).addClass('active');

  itemCounter++;
  if (itemCounter > length) {
    itemCounter = 1;
  }
}, 3000);

year.click(function () {
  var tab = $(".y-content div"),
    activeTab = $(this).attr("rel");
    tab.removeClass('active');
  $("#" + activeTab).addClass('active');

  year.removeClass("active");
  $(this).addClass("active");
});

// Modal
var modal = $('.modal'),
modalClose = $('.modal-close');

$(".modal-btn").click(function() {
  modalBtn = $(this).attr("rel");
    $("#"+modalBtn).addClass('show');
    $('.blur-modal').blurjs({
      customClass: 'blurjs',
      radius: 5,
      persist: false
    });
});
modalClose.click(function() {
  modal.removeClass('show');
  $.blurjs('reset');
});


