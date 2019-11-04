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
});