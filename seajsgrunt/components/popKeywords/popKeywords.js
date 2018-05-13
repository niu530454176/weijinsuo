/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/popKeywords/popKeywords', function (require, exports, module) {
	var $ = require('jquery');
	require('MOD_ROOT/trimpath/trimpath');
	var temPlate = '\
         {for item in items}\
         {if item_index == 0}\
         <div class="pure-u-1-2 first-group">\
         <ol class="plain">\
         {/if}\
		{if item_index == (items.length/2)}\
         </ol>\
         </div>\
         <div class="pure-u-1-2 second-group">\
         <ol class="plain">\
         {/if}\
           <li>\
           		<span class="num">${parseInt(item_index) + 1}</span>\
           		<a href="/search/?via=home&amp;keyword=encodeURIComponent(${item.words})&amp;cat=1001">\
           			<span class="ellipsis">${item.words}</span>\
           		</a>\
           		<i class="icon icon-keyword-${item.direction}"></i>\
           </li>\
		 {if item_index == items.length -1}\
         </ol>\
         </div>\
         {/if}\
	     {/for}';
	var popKeywords = function () {
		this.init();
	};
	popKeywords.prototype = {
		init: function () {
			var _this = this;
			_this.get();
		},
		get: function () {
			var _this = this;
			$.ajax({
				url: "https://www.easy-mock.com/mock/59350bc491470c0ac1011ba2/xiachufang/hotsearch?jsonp_param_name=callback",//ajax调用的接口地址
				dataType: 'jsonp',
				jsonpCallback: 'hotsearchCallBack',
				success: function (date) {
					_this.set(date);
				}
			})
		},
		set: function (date) {
			// var htmlStr = temPlate.process({items: date});
			// console.log(htmlStr);
			// $('.pop-keywords').find('.plain').html('');
			// console.log(htmlStr);
			// console.log(htmlStr);
			var datehotsearch = date.hotsearch;
			var obj = {items: datehotsearch};
			var str = temPlate.process(obj);
			$('#pure-g').append(str);
		}
	};

	function init() {
		new popKeywords();
	}
	module.exports.__id = 'popKeywords';
	module.exports.init = init;
});