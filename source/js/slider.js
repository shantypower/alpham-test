$(document).ready(function(){
  $(".slider__slides").slick({
    infinite: true,
    speed: 400,
    fade: true,
    prevArrow: ".slider__btn--left",
    nextArrow: ".slider__btn--right",
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    });
  });