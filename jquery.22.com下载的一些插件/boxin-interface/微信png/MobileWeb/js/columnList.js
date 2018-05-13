require.config({
        paths: {
            'common': '../lib/common',
            'timeTool': 'timeTool'
        }
    }
)

require(['common', 'timeTool'], function () {
    var localUrl = getUrlObject();
    var url = baseURL + '/program/kungfuListByType.do';
    var columnvideo = {
        pageIndex: 1,
        pageSize: 8,
        type: localUrl.type,
        canRefresh:true,
        init: function () {
            var _this = this;
            this.require(url, {pageIndex: this.pageIndex, pageSize: this.pageSize, type: this.type}, function (data) {
                var data = data.meta.rows;
                _this.render(data);
            });
            this.bindEvent();
            // this.refresh();
            this.DropdownRefresh();
        },
        render: function (data) {
            var str = '';
            for (var i=0;i<data.length;i++) {
                str +=
                    ' <li title="'+data[i].title+'" kfPublish="'+data[i].kfPublish+'" kfVideo="'+data[i].kfVideo+'" onoffPwd="'+data[i].onoffPwd+'" pwd="'+data[i].pwd+'" type="'+data[i].type+'" kfDesc="'+data[i].kfDesc+'">\n' +
                    '            <div class="item-image">\n' +
                    '                <img src="'+baseURL+data[i].kfImg+'" alt="">\n' +
                    '            </div>\n' +
                    '            <div class="item-name">' + data[i].title + '</div>\n' +
                    '        </li>'
            }
            // if(data.length == 0){
            //     this.canRefresh = false;
            //     str += '<div class="end">\n' + '            <div class="line1"></div>\n' + '            <div class="text">已至末尾</div>\n' + '            <div class="line2"></div>\n' + '        </div>';
            // }
            if(str){
                $('.column-list').append(str);
            }
        },
        bindEvent:function () {
            $('.column-list').delegate('li','click',function () {
                window.location.href='./videonews.html?kfPublish='+$(this).attr('kfPublish')+'&type='+$(this).attr('type')+'&kfvideo='+$(this).attr('kfvideo')+'&onoffpwd='+$(this).attr('onoffpwd')+'&pwd='+$(this).attr('pwd')+'&kfDesc='+$(this).attr('kfDesc')+'&title='+$(this).attr('title');
            })
        },
        DropdownRefresh: function () {
            var _this = this;
            //--------------上拉加载更多---------------
            //获取滚动条当前的位置
            function getScrollTop() {
                var scrollTop = 0;
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                } else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                return scrollTop;
            }

            //获取当前可视范围的高度
            function getClientHeight() {
                var clientHeight = 0;
                if (document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                } else {
                    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                }
                return clientHeight;
            }

            //获取文档完整的高度
            function getScrollHeight() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            }

            //滚动事件触发
            window.onscroll = function () {
                if ((getScrollTop() + getClientHeight() + 20) > getScrollHeight()) {
                    _this.pageIndex++;
                        _this.require(url, {pageIndex: _this.pageIndex, pageSize: _this.pageSize, type: _this.type}, function (data) {
                            var data = data.meta.rows;
                            _this.render(data);
                        })
                }
            }
        },
        require: function (url, data, successCallBack, errorCallBack, type) {
            $.ajax({
                type: type || 'get',
                url: url,
                data: data,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                    if (typeof(result) == 'string') {
                        result = JSON.parse(result);
                    }
                    if (result.success == true) {
                        successCallBack(result);
                    } else {
                        // console.log(result.message);
                    }
                },
                error: function () {
                    errorCallBack();
                }
            });
        }
    };
    columnvideo.init();
})