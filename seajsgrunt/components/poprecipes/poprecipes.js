/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/poprecipes/poprecipes', function (require, exports, module) {

	var $ = require('jquery');
	require('MOD_ROOT/trimpath/trimpath');
	var template = '\
         {for item in items}\
          <li>\
                <a href="/recipe/102260514/" title="${item.title}" class="recipe image-link align-center has-border display-block" data-ga-event="首页/流行菜谱/第0个" data-click-tracking-url="">\
                    <div class="cover">\
                        <img src="${item.imgSrc}" alt="${items.title}" width="235" height="138">\
                    </div>\
                    <div class="name font18">\
                                  <span class="ellipsis">${item.title}</span>\
                    </div>\
                    <div class="stats">\
                        <span class="ellipsis">${item.author}</span><span>${item.count}做过</span>\
                    </div>\
                </a>\
           </li>\
          {/for}';
	var Poprecipes = function () {
		this.init();
	};
	Poprecipes.prototype = {
		init: function () {
			var _this = this;
			_this.get();
		},
		get: function () {
			var _this = this;
			$.ajax({
				url: "https://www.easy-mock.com/mock/59350bc491470c0ac1011ba2/xiachufang/popular?jsonp_param_name=callback",//ajax调用的接口地址
				dataType: 'jsonp',
				jsonpCallback: 'popularCallBack',
				success: function (date) {
					_this.set(date)
				}
			})
		},
		set: function (date) {
			var _this = this;
			var htmlStr = template.process({items: date});
			// console.log(htmlStr);
			$('.pop-recipes').find('.plain').html(' ');
			$('.pop-recipes').find('.plain').append(htmlStr);
		}
	};

	function init() {
		new Poprecipes();
	}
	module.exports.__id = 'poprecipes';
	module.exports.init = init;
});