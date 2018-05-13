/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/homepage/homepage', function (require, exports, module) {

	var $ = require('jquery');

	function init() {
		addEvent();
		// console.log('2');
	}
	function addEvent() {
		$('.left-panel').on('mouseenter', '.homepage-cat-has-submenu' ,function () {
			var $this = $(this);
			$this.find('.homepage-cat-name').addClass('hovered');
			$this.find('.homepage-cat-submenu').show();
		});
		$('.left-panel').on('mouseleave','.homepage-cat-has-submenu', function () {
			var $this = $(this);
			$this.find('.homepage-cat-name').removeClass('hovered');
			$this.find('.homepage-cat-submenu').hide();
		})
	}
	module.exports.__id = 'homepage';
	module.exports.init = init;
});