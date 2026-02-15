
   /* Когда пользователь нажимает на кнопку,
   переключение между скрытием и отображением раскрывающегося содержимого */
   var menu = document.querySelector ("#menu");
   var mobile = document.querySelector ("#mobile");
   var overlay = document.querySelector (".header-overlay");
   var link_active = document.querySelectorAll (".header-menu__link-active");
   
   

   var close = document.querySelector (".header-close");
var menu_reg = document.querySelector ("#menu-reg");
var header_lk = document.querySelector (".header-lk");

var reg_notif = document.querySelector ("#reg-notif");
var header_notif = document.querySelector (".header-notif");
var close_notif = document.querySelector (".close-notif");

var reg_close = document.querySelector (".menu-close-reg");
var reg_blue = document.querySelector (".reg-end-blue");
var reg_red = document.querySelector (".reg-end-red");
var reg_sailor = document.querySelector ("#reg-sailor");
var reg_about = document.querySelector ("#reg-about");
var close_about = document.querySelector (".close-reg-about");
var menu_close_reg = document.querySelector (".close-reg-sailor");
var header_menu_button = document.querySelector (".header-menu__button");

var about_button_blue = document.querySelector (".about-button-blue");
var sailor_button_blue = document.querySelector (".sailor-button-blue");
var reg_about_lk = document.querySelector ("#reg-about-lk");
var reg_sailor_lk = document.querySelector ("#reg-sailor-lk");
var close_lk_about = document.querySelector (".close-lk-about");
var close_lk_sailor = document.querySelector (".close-lk-sailor");


var mor_nav_work = document.querySelector (".mor-nav-work>.select");
   var mor_nav_drop = document.querySelector (".mor-nav-drop");
   var body = document.querySelector (".hero");


   
   $(".mor-nav-work>.select").click(function() {
      $('.mor-nav-work>.mor-nav-drop').toggle();
    });
    $(document).on('click', function(e) {
      if (!$(e.target).closest(".mor-nav-work").length) {
        $('.mor-nav-work>.mor-nav-drop').hide();
      }
      e.stopPropagation();
    });

    $(".mor-nav-period>.select").click(function() {
      $('.mor-nav-period>.mor-nav-drop').toggle();
    });
    $(document).on('click', function(d) {
      if (!$(d.target).closest(".mor-nav-period").length) {
        $('.mor-nav-period>.mor-nav-drop').hide();
      }
      d.stopPropagation();
    });
    $(".mor-nav-sudno>.select").click(function() {
      $('.mor-nav-sudno>.mor-nav-drop').toggle();
    });
    $(document).on('click', function(d) {
      if (!$(d.target).closest(".mor-nav-sudno").length) {
        $('.mor-nav-sudno>.mor-nav-drop').hide();
      }
      d.stopPropagation();
    });

    $(".send-response").click(function() {
      $('.mor-notif').toggle();
    });
    $(document).on('click', function(d) {
      if (!$(d.target).closest(".send-response").length) {
        $('.mor-notif').hide();
      }
      d.stopPropagation();
    });

    $(".mor-nav-zarp>.select").click(function() {
      $('.mor-nav-zarp>.mor-nav-drop').toggle();
    });
    $(document).on('click', function(e) {
      if (!$(e.target).closest(".mor-nav-zarp").length) {
        $('.mor-nav-zarp>.mor-nav-drop').hide();
      }
      e.stopPropagation();
    });




about_button_blue.addEventListener ("click", function() {
   reg_about.classList.remove("menu-show");
   reg_about_lk.classList.toggle("menu-show");
});
sailor_button_blue.addEventListener ("click", function() {
   reg_sailor.classList.remove("menu-show");
   reg_sailor_lk.classList.toggle("menu-show");
});


reg_blue.addEventListener ("click", function() {
   menu_reg.classList.remove("menu-show");
   reg_sailor.classList.toggle("menu-show");
});
reg_red.addEventListener ("click", function() {
   menu_reg.classList.remove("menu-show");
   reg_about.classList.toggle("menu-show");
});

header_lk.addEventListener ("click", function() {
   menu_reg.classList.toggle("menu-show");
   overlay.classList.toggle("header-overlay__active");
});




    mobile.addEventListener ("click", function() {
       menu.classList.toggle("show");
       mobile.classList.toggle("mobile-active");
       overlay.classList.toggle("header-overlay__active");
    });
   

    overlay.addEventListener ("click", function() {
      menu.classList.remove("show");
      mobile.classList.remove("mobile-active");
      overlay.classList.remove("header-overlay__active");
      menu_reg.classList.remove("menu-show");
      reg_sailor.classList.remove("menu-show");
      reg_about.classList.remove("menu-show");
      reg_about_lk.classList.remove("menu-show");
      reg_sailor_lk.classList.remove("menu-show");
      reg_notif.classList.remove("menu-show");
      header_notif.classList.remove("header-notif__active");
   });
   close.addEventListener ("click", function() {
      menu.classList.remove("show");
      mobile.classList.remove("mobile-active");
      overlay.classList.remove("header-overlay__active");
      menu_reg.classList.remove("menu-show");
   });
   
   header_menu_button.addEventListener ("click", function() {
      menu.classList.remove("show");
      mobile.classList.remove("mobile-active");
      overlay.classList.remove("header-overlay__active");
      menu_reg.classList.remove("menu-show");
   });
   reg_close.addEventListener ("click", function() {
      overlay.classList.remove("header-overlay__active");
      menu_reg.classList.remove("menu-show");
   });

   close_notif.addEventListener ("click", function() {
      overlay.classList.remove("header-overlay__active");
      reg_notif.classList.remove("menu-show");
      header_notif.classList.remove("header-notif__active");
   });
   menu_close_reg.addEventListener ("click", function() {
      overlay.classList.remove("header-overlay__active");
      reg_sailor.classList.remove("menu-show");
   });
   close_lk_sailor.addEventListener ("click", function() {
      overlay.classList.remove("header-overlay__active");
      reg_sailor_lk.classList.remove("menu-show");
   });
   close_lk_about.addEventListener ("click", function() {
      overlay.classList.remove("header-overlay__active");
      reg_about_lk.classList.remove("menu-show");
   });
   close_about.addEventListener ("click", function() {
      overlay.classList.remove("header-overlay__active");
      reg_about.classList.remove("menu-show");
   });
   for (var i = 0; i < link_active.length; ++i) {
   link_active[i].addEventListener ("click", function() {
      menu.classList.remove("show");
      mobile.classList.remove("mobile-active");
      overlay.classList.remove("header-overlay__active");

   });



}
  
header_notif.addEventListener ("click", function() {
   reg_notif.classList.toggle("menu-show");
   overlay.classList.toggle("header-overlay__active");
   header_notif.classList.toggle("header-notif__active");
});