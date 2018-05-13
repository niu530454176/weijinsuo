
/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/headline/headline', function (require, exports, module) {

    var $=require('jquery');
    require('MOD_ROOT/headline/headline.css');
    var Slider=require('MOD_ROOT/slider/slider');
    function init() {
        console.log(Slider);
        new Slider({
            $target:$('.headline-slider'),
            autoPlay:true
        })
    }
    module.exports.__id = 'headline';
    module.exports.init = init;
});
