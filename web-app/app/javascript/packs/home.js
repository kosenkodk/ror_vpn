$(jQuery).on('ready turbolinks:load', function () {

  // $('.plans button.active').show();
  $('.signup .plans button.active').removeClass('d-none');

  $('.payment_methods .card').on('click hover', function () {
    $('.payment_methods .card').removeClass('active');
    $('.payment_methods .card .icon-checkbox').removeClass('active');
    $(this).addClass('active');
    $(this).find('.icon-checkbox').addClass('active');
  }).mouseover(function () {

  }).mouseout(function () {

  })

  $('.signup .plans .card').on('click hover', function () {
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

  // alert behind modal backdrop
  $(document).on('DOMSubtreeModified', ".alert-admin", function () {
    try {
      $('.modal-backdrop').after($(this));
      $(this).css("z-index", parseInt($('.modal').css('z-index')) + 1);
      const offsetTop = ((document.getElementById('main-content') != null) && document.getElementById('main-content').offsetTop);//|| '115px';

      const height = ((document.getElementById('alert') != null) && document.getElementById('alert').offsetHeight) || '60';
      $(this).css("top", offsetTop - (height / 2));

      // if (document.getElementById('main-content') != null && document.getElementById('alert') != null) {
      //   const offsetTop = document.getElementById('main-content').offsetTop;
      //   const height = document.getElementById('alert').offsetHeight;
      //   const navbarHeight = document.getElementById('adminNavbar').offsetHeight;
      //   let alertTop = offsetTop - (height / 2);
      //   if (navbarHeight < 100) { // mobiles
      //     alertTop += navbarHeight;
      //   }
      //   // alert('main content top' + offsetTop + 'alert height:' + height + 'alert top:' + alertTop);
      //   $(this).css("top", alertTop);
      // }
    } catch (e) { }
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
  $(document).on('show.bs.collapse', '.navbar', function () {
    $('.navbar-nav>li>a').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  });

});