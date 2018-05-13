
/**
 * Created by Administrator on 2017/6/5.
 */
define('MOD_ROOT/pop-keywords/pop-keywords', function (require, exports, module) {
    console.log('##');
    var $=require('jquery');
    require('MOD_ROOT/trimPath/trimPath');
    var template='\
                        <div class="title-bar">\
                            <div class="title">流行搜索</div>\
                        </div>\
                        <div class="pure-g">\
                        {for item in items}\
                        {if item_index==0||item_index==5}\
                            <div class="pure-u-1-2 {if item_index==0} first-group {elseif item_index==5} second-group {/if}">\
                                <ol class="plain">\
                        {/if}\
                                    <li><span class="num">${parseInt(item_index)+1}</span><a href="/search/?via=home&amp;keyword=%E8%8C%84%E5%AD%90&amp;cat=1001"><span class="ellipsis">${item.words}</span></a><i class="icon icon-keyword-${item.direction}"></i></li>\
                        {if item_index==4||item_index==9}\
                                </ol>\
                            </div>\
                        {/if}\
                        {/for}\
                    </div>';

    var PopRecipes = function ($target) {
        this.init($target);
    }
    PopRecipes.prototype={
        init:function ($target) {
            this.$target=$target;
            _this.get();
        },
        get:function () {
            var _this=this;
            $.ajax({
                url:'https://www.easy-mock.com/mock/59350bc491470c0ac1011ba2/xiachufang/hotsearch?jsonp_param_name=callback',
                dataType:'jsonp',
                jsonpCallback:'popCallBack',
                success:function (data) {
                    _this.set(data);
                    console.log(data);
                }
            })
        },
        set:function (data) {
            var _this=this;
            var data1=data.hotsearch;
            var htmlStr=template.process({items:data1});
            _this.$target.find('.block').html(htmlStr);
        }
    }
    function init($target) {
        new PopRecipes($target);
        console.log('@');
    }


    module.exports.__id = 'pop-keywords';
    module.exports.init = init;
});
