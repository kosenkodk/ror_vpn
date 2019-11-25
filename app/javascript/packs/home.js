$(jQuery).on('ready turbolinks:load', function () {

  // $('.plans button.active').show();
  $('.plans button.active').removeClass('d-none');

  $('.payment_methods .card').on('click hover', function () {
    $('.payment_methods .card').removeClass('active');
    $('.payment_methods .card .icon-checkbox').removeClass('active');
    $(this).addClass('active');
    $(this).find('.icon-checkbox').addClass('active');
  }).mouseover(function () {

  }).mouseout(function () {

  })

  $('.plans .card').on('click hover', function () {
    $('.plans .card').removeClass('active');
    $('.plans .card .icon-checkbox').removeClass('active');

    // $('.plans button').hide();
    $('.plans button').addClass('d-none');

    $(this).addClass('active');
    $(this).find('.icon-checkbox').addClass('active');

    // $(this).find('button').show();
    $(this).find('button').removeClass('d-none');
  }).mouseover(function () {

  }).mouseout(function () {

  })

  // fix for modal popup
  $(document).on('show.bs.modal', '.modal', function () {
    $(document.body).append($(this).detach());
  });

  // $('.modal').on('shown.bs.modal', function () {
  // //To relate the z-index make sure backdrop and modal are siblings
  //$(this).before($('.modal-backdrop'));
  // $(this).after($('.modal-backdrop'));
  // console.log('.modal zindex', $('.modal').css('z-index'))
  // console.log('modal backdrop zindex', $('.modal-backdrop').css('z-index'))
  // console.log('footer zindex', $('.footer').css('z-index'))
  // // Now set z-index of modal greater than backdrop
  // $(this).css("z-index", parseInt($('.modal-backdrop').css('z-index')) + 1);
  // $('.footer').css("z-index", parseInt($('.modal-backdrop').css('z-index')) - 1);
  // });

  // close navbar after click on nav link
  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });


  // grabbing the class names from the data attributes
  const navBar = $('.navbar'),
    data = navBar.data();

  // booleans used to tame the scroll event listening a little..
  let scrolling = false,
    scrolledPast = false;

  // transition Into
  function switchInto() {
    // update `scrolledPast` bool
    scrolledPast = true;
    // add/remove CSS classes
    navBar.addClass('bg-color-black');
    navBar.addClass('shadow-vega');
    // navBar.removeClass(data.startcolor);
    // navBar.removeClass(data.startsize);
    // navBar.addClass(data.intocolor);
    // navBar.addClass(data.intosize);
    console.log('into transition triggered!')
  };

  // transition Start
  function switchStart() {
    // update `scrolledPast` bool
    scrolledPast = false;
    // add/remove CSS classes
    navBar.removeClass('bg-color-black');
    navBar.removeClass('shadow-vega');
    // navBar.addClass(data.startcolor);
    // navBar.addClass(data.startsize);
    // navBar.removeClass(data.intocolor);
    // navBar.removeClass(data.intosize);
    console.log('start transition triggered!')
  }

  // set `scrolling` to true when user scrolls
  $(window).scroll(() => scrolling = true);

  setInterval(() => {
    // when `scrolling` becomes true... 
    if (scrolling) {
      // set it back to false
      scrolling = false;
      // check scroll position
      if ($(window).scrollTop() > 50) {
        // user has scrolled > 50px from top since last check
        if (!scrolledPast) {
          switchInto();
        }
      } else {
        // user has scrolled back <= 100px from top since last check
        if (scrolledPast) {
          switchStart();
        }
      }
    }
    // take a breath.. hold event listener from firing for 100ms
  }, 100);


});