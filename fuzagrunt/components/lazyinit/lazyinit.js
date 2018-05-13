define('MOD_ROOT/lazyinit/lazyinit', function (require, exports, module) {

    var $ = require('jquery');

    function LazyInit(opts) {
        this.init(opts);
    }

    LazyInit.prototype = {
        init: function (opts) {
            var _this = this;
            _this.threshold = 100;
            _this.opts = opts;
            _this.mapArr = [];
            _this.supportRect = _this.supportClientRect();

            _this.$w = $(window);

            _this.bindEvent();
        },
        bindEvent: function () {
            var _this = this;
            _this.$w.bind('scroll.lazyload', function () {
                for(var i = 0; i < _this.mapArr.length; i++) {
                    var n = _this.mapArr[i];
                    if(n && n.$el && n.$el.length) {
                        if (_this.inWindow(n.$el)) {
                            if(n.callback && typeof n.callback == 'function') {
                                n.callback();
                                _this.mapArr.splice(i--, 1);
                            }
                        }
                    }
                }
            });
        },
        bindFun: function ($el, callback) {
            var _this = this;
            var obj = {
                $el: $el,
                callback: callback
            }
            _this.mapArr.push(obj);
        },
        supportClientRect: function () {
            if (typeof this.isSupportClientRect !== 'undefined') {
                return this.isSupportClientRect;
            }

            var div = document.createElement('div');
            var support = 'getBoundingClientRect' in div;

            div = null;
            this.isSupportClientRect = support;
            return support;
        },
        inWindow: function ($ele) {
            var wHeight = this.$w.height();
            var scrollTop = $('body').scrollTop() || $('html').scrollTop();

            if (this.supportRect) {
                var coords = $ele.get(0).getBoundingClientRect();
                var eleTop = coords.top;
                var eleLeft = coords.left;
                var eleBottom = coords.top + coords.height;

                return (
                        eleTop >= 0
                        && eleLeft >= 0
                        && eleTop <= wHeight + this.threshold
                    ) || ( eleTop < 0 ) || (
                        eleBottom >= 0
                        && eleLeft >= 0
                        && eleBottom <= wHeight
                    );
            } else {
                var eleTop = $ele.offset().top;
                var eleHeight = $ele.height();
                var eleBottom = eleTop + eleHeight;

                return (
                        eleTop < wHeight + scrollTop + this.threshold
                        && eleTop > scrollTop
                    ) || (
                        eleBottom < wHeight + scrollTop
                        && eleBottom > scrollTop
                    );
            }
        }
    }

    function init() {
        var lazyinit = new LazyInit();

        lazyinit.bindFun($('#example'), function () {
            alert("example load ready");

            require.async(['MOD_ROOT/example/example', 'MOD_ROOT/example/example.css'], function (example) {
                example.init($('#example'));
            });
        });
    }

    module.exports.__id = 'lazyinit';
    module.exports.init = init;
});