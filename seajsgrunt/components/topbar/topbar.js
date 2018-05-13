/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/topbar/topbar', function (require, exports, module) {

	var $ = require('jquery');

	function init() {
		console.log('@@');
		$('.logo').click(function () {
			alert('欢迎光临');
		})
	}
	module.exports.__id = 'topbar';
	module.exports.init = init;
});