define('MOD_ROOT/slider/slider', function (require, exports, module) {

	var $ = require('jquery');

	function Slide(opts) {//opts 选项
		this.init(opts);
	}

	Slide.prototype = {
		$slide: null,
		$arrowLeft: null,
		$arrowRight: null,
		$items: null,
		$li: null,
		$dot: null,
		index: 0,//当前图片下标
		timeoutId: 0,//定时器id
		speed: 500,//切换动画速度
		delay: 2000,//切换动画延迟
		autoPlay: true,//是否自动播放
		onchange: $.noop,
		init: function (opts) {
			var _this = this;
			_this.$slide = opts.$target;
			_this.$arrowLeft = _this.$slide.find('.J-arrow-left');
			_this.$arrowRight = _this.$slide.find('.J-arrow-right');
			_this.$items = _this.$slide.find('.J-items');
			_this.$li = _this.$items.find('li');
			_this.$dot = _this.$slide.find('.dots .dot');
//                _this.index = opts.index || _this.index;
//                _this.speed = opts.speed || _this.speed;
//                _this.delay = opts.delay || _this.delay;
//                _this.autoPlay = typeof opts.autoPlay != 'undefined' ? opts.autoPlay : _this.autoPlay;
//                _this.onchange = opts.onchange || _this.onchange;

			$.extend(_this, opts);

			_this.copyLi();
			_this.addEvents();
			_this.change(_this.index, false);
			if (_this.autoPlay) {
				_this.autoMove();
			}
		},
		copyLi: function () {
			var _this = this;
			var $newLi = _this.$li.first().clone();
			_this.$items.append($newLi);
			// console.log(_this.$li);
			_this.$li = _this.$items.find('li');
		},
		addEvents: function () {
			var _this = this;
			_this.$arrowLeft.click(function () {
				_this.move('left');
			});

			_this.$arrowRight.click(function () {
				_this.move('right');
			});

			_this.$dot.click(function () {
				var index = $(this).index();
				_this.change(index, true);
			});
		},
		move: function (direction) {//只负责控制左右移动一次 direction方向: left right
			var _this = this;
			if (direction == 'left') {
				if (_this.index == 0) {
					_this.change(5, false);
				}
				_this.index--;
			} else {
				_this.index++;
			}
			_this.change(_this.index, true);
		},
		change: function (index, needAnimation) {//更新index，更新视图
			var _this = this;
			_this.index = index;
			if (_this.index < 0) {
				_this.index = _this.$li.length - 1;
			}
			if (_this.index > _this.$li.length - 1) {
				_this.index = 0;
			}
			clearTimeout(_this.timeoutId);

			//设置圆点的class
			if (_this.index == 5) {
				_this.$dot.removeClass('active').eq(0).addClass('active');
			} else {
				_this.$dot.removeClass('active').eq(_this.index).addClass('active');
			}

			//切换轮播图片
			if (needAnimation) {
				_this.$items.stop().animate({
					'marginLeft': _this.$li.width() * -_this.index
				}, _this.speed, function () {
					if (_this.index == 5) {
						_this.change(0, false);
					}
					if (_this.autoPlay) {
						_this.autoMove();
					}
				});
			} else {
				_this.$items.stop().css('marginLeft', _this.$li.width() * -_this.index);
				if (_this.autoPlay) {
					_this.autoMove();
				}
			}
			if (_this.index < _this.length) {
				_this.onchange(_this.index);
			}
		},
		autoMove: function () {
			var _this = this;
			_this.timeoutId = setTimeout(function () {
				_this.move('right');
			}, _this.delay);
		}
	};

	return Slide;
});