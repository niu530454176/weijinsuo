$(function(){
    //标签位置设置
    var l = parseInt($(".recommend dl").css("width"))/2-20;
    $(".score").css("left",l);
    $(".soon").css("right",l);
    //选选中状态
    $(".select .swiper-slide").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
    });
    //筛选详细
    var swiper1 = new Swiper('.demo1 .swiper-container', {
        pagination: '.demo1 .swiper-pagination',
        paginationClickable: true,
        loop:true
    });
    var swiper2 = new Swiper('.class1 .swiper-container', {
        pagination: '.class1 .swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
    });
    var swiper3 = new Swiper('.class2 .swiper-container', {
        pagination: '.class2 .swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
    });
    var swiper4 = new Swiper('.class3 .swiper-container', {
        pagination: '.class3 .swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
    });
    var swiper5 = new Swiper('.class4 .swiper-container', {
        pagination: '.class4 .swiper-pagination',
        slidesPerView: 6,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
    });
})