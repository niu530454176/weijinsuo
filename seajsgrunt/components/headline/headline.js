/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/headline/headline', function (require, exports, module) {

	var $ = require('jquery');
	var Slider = require('MOD_ROOT/slider/slider');
	function init() {
		var slider = new Slider({
			$target: $('.headline-slider')
		})
		// console.log(slider);
	}
/*	function addEvent() {
		var slide1 = new Slide({
			$target: $('#slide1'),
			autoPlay: false
		});
	}*/

	module.exports.__id = 'headline';
	module.exports.init = init;
});