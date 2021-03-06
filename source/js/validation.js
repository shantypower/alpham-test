$(document).ready(function () {
  jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });

  $(".modal__form").validate({

    rules: {
      name: {
        minlength: 2,
      },
      phone: {
        required: true,
        rangelength: [6, 18],
      },
      email: {
        required: true,
        email: true,
      }
    },
    messages: {
      name: {
        minlength: "Имя должно содержать не менее 2 символов",
      },
      phone: {
        required: "Вы забыли указать номер телефона",
        rangelength: "Проверьте верно ли указан номер телефона",
      },
      email: {
        required: "Вы забыли указать email",
      }
    },
    wrapper: "span"
//    errorPlacement: function (error, element) {
 //     element.attr("placeholder", error[0].outerText);
//  }
  });

  $('.modal__input--phone').mask('+7 (000) 000-00-00');

});
