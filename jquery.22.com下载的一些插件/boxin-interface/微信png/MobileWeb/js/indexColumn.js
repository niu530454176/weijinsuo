require.config({
    paths:{
        'common':'../lib/common',
        'timeTool':'timeTool'
    }
});
require(['common','timeTool'],function () {
    var url=baseURL+'/page/sourcesByKey.do';
    var listUrl=baseURL+'/program/kungfuListByType.do';
    // 栏目列表
    var column={
        pageIndex:1,
        pageSize:4,
        init:function () {
            var _this=this;
            this.bindMore();
            this.require(url,{sourceKeys:1},function (result) {
                _this.render(result.data);
            });
            this.require(url,{sourceKeys:2},function (result) {
                _this.render(result.data);
            });
            this.columnVideo();
            this.clickIcon();
        },
        bindMore:function () {
            $('.column').delegate('.column-head','click',function () {
                var columnType=$(this).attr('type');
                window.location.href='columnList.html'+'?type='+columnType;
            })
        },
        render:function (data) {
            for(var i=0;i<data.length;i++){
                var str ='<div class="column-wrap" id="'+data[i].sourceType+'">\n' +
                    '        <div class="head-top-line"></div>\n' +
                    '        <div class="head-line">\n' +
                    '            <div class="column-head" type="'+data[i].sourceType+'">\n' +
                    '                <div class="head-left-w">\n' +
                    '                    <div class="head-left">\n' +
                    '                        <div class="border"></div>\n' +
                    '                        <div class="name">'+data[i].source+'</div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '                <div class="more-btn" >\n' +
                    '                    <img src="./images/more.png" alt="">\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <ul class="column-list">';
                this.renderList(data[i].sourceType,str);
            }
        },
        renderList:function(type,str){
            _this=this;
            this.require(listUrl,{pageIndex:this.pageIndex,pageSize:this.pageSize,type:type},function (data) {
                var dataItem=data.meta.rows;
                var strItem='';
                for(var i=0;i<dataItem.length;i++){
                    strItem+='<li class="item-video" videoID="'+dataItem[i].id+'" type="'+dataItem[i].type+'" pageIndex="'+_this.pageIndex+'" pageSize="'+_this.pageSize+'">\n' +
                        '                <div class="item-image">\n' +
                        '                    <img src="'+baseURL+dataItem[i].kfImg+'" alt="">\n' +
                        '                </div>\n' +
                        '                <div class="item-name">'+dataItem[i].title+'</div>\n' +
                        '                <div class="item-desc"></div>\n' +
                        '            </li>\n'
                }
                var strItemEnd='        </ul>\n' +
                    '    </div>'
                var html=str+strItem+strItemEnd;
                $('.column').append(html);
                $('#10001').css('display','none');
                $('#10002').css('display','none');
                $('.qmenu').find('#20001').click();
                $('.qmenu').find('#'+window.location.href.split('id=')[1]).click();
            })
        },
        require:function(url,data,successCallBack,errorCallBack,type){
            $.ajax({
                type: type||'get',
                url: url,
                data:data,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                    if(typeof(result) == 'string'){
                        result = JSON.parse(result);
                    }
                    if (result.success == true) {
                        successCallBack(result);
                    }else{
                        // console.log(result.message);
                    }
                },
                error: function () {
                    errorCallBack();
                }
            });
        },
        columnVideo:function () {
            $('.column').delegate('.item-video','click',function () {
                var id = this.getAttribute("videoid");
                var type = this.getAttribute("type");
                var pageIndex = this.getAttribute("pageIndex");
                var pageSize = this.getAttribute("pageSize");
                window.location.href='columnVideo.html?id='+id+'&type='+type+'&pageIndex='+pageIndex+'&pageSize='+pageSize;
            })
        },
        clickIcon:function () {
            // $('.qmenu').find('#'+window.location.href.split('id=')[1]).click();//从indexVideo跳转过来.模拟点击

            $('.qmenu').find('li').click(function () {
                var type=$(this).attr('type');
                $('.column').find('.column-wrap').css('display','none');
                $('.column').find('#'+type).css('display','block');
            });
            $('.qmenu').delegate('a', 'click', function () {
                $('.qmenu').find('a').removeClass('a-active');
                $(this).addClass('a-active');
            });
            $('.column').delegate('.item-video','click',function () {
                var id = this.getAttribute("videoid");
                var type = this.getAttribute("type");
                var pageIndex = this.getAttribute("pageIndex");
                var pageSize = this.getAttribute("pageSize");
                window.location.href='videonews.html?id='+id+'&type='+type+'&pageIndex='+pageIndex+'&pageSize='+pageSize;
            })
        },
    };
    column.init();
});