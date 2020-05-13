$(jQuery).on('ready turbolinks:load', function () {
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

    $('.plans button').addClass('d-none');
    $(this).addClass('active');
    $(this).find('.icon-checkbox').addClass('active');

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
    } catch (e) { }
  });

  // close navbar after click on nav link
  $(document).on('show.bs.collapse', '.navbar', function () {
    $('.navbar-nav>li>a').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  });
});