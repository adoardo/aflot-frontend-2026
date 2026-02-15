document.addEventListener('DOMContentLoaded', function(e){
    'use strict';
    var list = document.querySelectorAll('#vakNav a');
    list = Array.prototype.slice.call(list, 0); // convert nodeList to Array
    list.forEach(function(el, i, ar) {
        el.addEventListener('click', function(event){
            e.preventDefault();
            var tab = document.querySelector(el.getAttribute('id'));

            // remove "tarif-active" class
            document.querySelector('#vakNav .vak-active')
                .classList.remove('vak-active');
            document.querySelector('#vaksWrap .vak-active')
                .classList.remove('vak-active');

            // set "tarif-active"
            el.classList.add('vak-active');
            tab.classList.add('vak-active');
        })
    })
})


document.addEventListener('DOMContentLoaded', function(e){
    'use strict';
    var list1 = document.querySelectorAll('#vakNav1 a');
    list1 = Array.prototype.slice.call(list1, 0); // convert nodeList to Array
    list1.forEach(function(el, i, ar) {
        el.addEventListener('click', function(event){
            e.preventDefault();
            var tab1 = document.querySelector(el.getAttribute('id'));

            // remove "tarif-active" class
            document.querySelector('#vakNav1 .vak-active')
                .classList.remove('vak-active');
            document.querySelector('#vaksWrap1 .vak-active')
                .classList.remove('vak-active');

            // set "tarif-active"
            el.classList.add('vak-active');
            tab1.classList.add('vak-active');
        })
    })
})

/* Скрипты для аккордиона */

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


function show_hide_password(target){
	var input = document.getElementById('reg-pass');
	if (input.getAttribute('type') == 'password') {
		target.classList.add('view');
		input.setAttribute('type', 'text');
	} else {
		target.classList.remove('view');
		input.setAttribute('type', 'password');
	}
	return false;
}


$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop() > 100) {
			$('#scroll_top').show();
		} else {
			$('#scroll_top').hide();
		}
	});
 
	$('#scroll_top').click(function(){
		$('html, body').animate({scrollTop: 0}, 600);
		return false;
	});
});

new AirDatepicker('.datepicker-air', {
    range: true,
    multipleDatesSeparator: ' - ',
    buttons: ['today', 'clear']
});