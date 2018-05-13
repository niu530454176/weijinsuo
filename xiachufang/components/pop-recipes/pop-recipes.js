
/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/pop-recipes/pop-recipes', function (require, exports, module) {
    console.log('##');
    var $=require('jquery');
    require('MOD_ROOT/trimPath/trimPath');
    var template='\
            {for item in items}\
             <li>\
                  <a href="${item.href}" title="${item.title}" class="recipe image-link align-center has-border display-block" data-click-tracking-url=""> \
                      <div class="cover">\
                           <img src="${item.imgSrc}" alt="${item.title}" width="235" height="138">\
                      </div>\
                      <div class="name font18">\
                           <span class="ellipsis">${item.title}</span>\
                      </div>\
                      <div class="stats">\
                          <span class="ellipsis">${item.author}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>${item.count}&nbsp;做过</span>\
                      </div>\
                 </a>\
            </li>\
            {/for}';

    var PopRecipes = function ($target) {
        this.$target=$target;
        this.init($target);
    }
    PopRecipes.prototype={
        init:function ($target) {
            var _this=this;
            _this.get();
        },
        get:function () {
            var _this=this;
            $.ajax({
                url:'https://www.easy-mock.com/mock/59350bc491470c0ac1011ba2/xiachufang/popular?jsonp_param_name=callback',
                dataType:'jsonp',
                jsonpCallback:'popularCallBack',
                success:function (data) {
                    _this.set(data);
                    console.log(data);
                }
            })
        },
        set:function (data) {
            var _this=this;
            var htmlStr=template.process({items:data});
            _this.$target.find('.plain').html(htmlStr);
        }
    }
    function init($target) {
        new PopRecipes($target);
        console.log('@');
    }


    module.exports.__id = 'pop-recipes';
    module.exports.init = init;
});
