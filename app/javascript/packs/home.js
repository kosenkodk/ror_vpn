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
  $('.modal').insertAfter($('body'));
});