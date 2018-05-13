var indexInfo = {
    page: 1,
    isrefash: null,
    init: function () {
        var _this = this;
        _this.addNewsClick();
        var title = '弘学早知道';
        _this.getInfo(918, title, true);
        _this.DropdownRefresh();
        $(function () {
            FastClick.attach(document.body);
        });
    },
    addNewsClick: function () {
        var _this = this;
        $('.info-news-list').on('click', function () {
            _this.page = 1;
            var sid = $(this).attr('data-id'),
                title = $(this).find('p').html();
            $('.musicList').html('');
            $('.onscroll').attr('data-sid', sid);
            $('.onscroll').attr('data-title', title);
            _this.getInfo(sid, title, true);
        });
        $('.musicList').delegate('li', 'click', function () {
            var sid = $(this).attr('data-sid'),
                glid = $(this).attr('data-glid');
            window.location.href = 'news.html?glid=' + glid + '&sid=' + sid;
        });
        $('.qmenu a').on('click', function () {
            $('.qmenu a').removeClass('a-active');
            $(this).addClass('a-active');
        })
    },
    getInfo: function (sid, h3title, iskong) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: "http://zixun.cctvjy.cn/zixunserver/index.php/news14/dataconcctvnews/" + sid + "/5/" + _this.page,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
                var dataList = JSON.parse(result).list;
                var dataListLength = dataList.length;
                var html = '';
                if (_this.isrefash == dataList[0].createtime && !iskong) {
                    return;
                } else {
                    _this.isrefash = dataList[0].createtime;
                }
                for (var i = 0; i < dataListLength; i++) {
                    var title = dataList[i].title,
                        sid = dataList[i].sid,
                        glid = dataList[i].glid,
                        createtime = dataList[i].createtime,
                        content = dataList[i].content.replace(/<.*?>/ig, "");
                    html += '<li data-glid="' + glid + '" data-sid="' + sid + '">' +
                        '            <a>' +
                        '                <span class="t-i">' +
                        '                    <img src="./images/Finance' + (parseInt(Math.random() * 11) + 1) + '.jpg"/>' +
                        '               </span>' +
                        '            </a>' +
                        '            <a>' +
                        '                <span class="t-t">' +
                        '                    <strong>' + title + '</strong>' +
                        '                    <em>' + content + '</em>' +
                        '                </span>' +
                        '                <span class="t-z">更新时间:&nbsp;&nbsp;' + createtime + '</span>' +
                        '            </a>' +
                        '        </li>'
                }
                $('.toptit h3').html(h3title);
                $('.musicList').append(html);
            }
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
        var $scroll = $('.onscroll');
        window.onscroll = function () {
            if ((getScrollTop() + getClientHeight() + 20) > getScrollHeight()) {
                _this.page++;
                var sid = $scroll.attr('data-sid'),
                    h3title = $scroll.attr('data-title');
                _this.getInfo(sid, h3title, false);
            }
        }
    }
};
indexInfo.init();