var news = {
    init: function () {
        var _this = this;
        var address = window.location.href;
        addresslist = address.split('?')[1].split('&');
        var glid = addresslist[0].split("=")[1];
        var sid = addresslist[1].split("=")[1];
        _this.getInfoDetails(glid, sid);
        _this.DropdownRefresh();
        $(function () {
            FastClick.attach(document.body);
        });
    },
    getInfoDetails: function (glid, sid) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: "http://www.cctvjy.cn/sinfo/newhfsinfo.do?typeID=" + sid + "&articleID=" + glid,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
                var data = JSON.parse(result).data;
                if (data == null) {
                    return
                }
                data = JSON.parse(data);
                var createtime = data.a.createtime,
                    title = data.a.title,
                    content = data.ac.content;
                content = content.replace(/style="[^"]+"/ig, "");
                content = content.replace(/&nbsp;/g, '');
                content = content.replace(/#000000/ig, "");
                content = content.replace(/target="_blank"/ig, "");
                content = content.replace(/\/"/ig, "");
                content = content.replace(/loged="true"/ig, "");
                content = content.replace(/href/ig, "data-abc");
                var time = createtime.substring(0, createtime.length - 4);
                _this.renderGP(content);
                $('.tit h1').html(title);
                $('.tit .createtime').html('更新时间：&nbsp;&nbsp;&nbsp;' + time);
            }
        })
    },
    renderGP: function (content) {
        var re = /\d{6,}/ig;
        var reStock = /^[036]\d{5}$/g;
        var rs = '';
        var contentRep = content;
        var stockIds = '';
        while (rs = re.exec(content)) {
            reStock = /^[036]\d{5}$/g;
            var bbb;
            var ccc = rs[0]
            var aaa = ccc.substring(0, 2);
            if (aaa == "60") {
                bbb = "sh" + ccc
            } else if (aaa == "30" || aaa == "00") {
                bbb = "sz" + ccc
            }
            var strCode = '"' + bbb + '"'
            //show_quote(strCode,"stock111")
            if (stockIds.indexOf(rs[0]) == -1 && reStock.test(rs[0])) {
                stockIds = stockIds + rs[0] + ",";

                // contentRep = contentRep.replace(rs[0], '<a style="COLOR:red;" href="http://www.treeid/CODE_'+ rs[0] + '"'+'>'
                contentRep = contentRep.replace(rs[0], '<a class="stockOpe-U" id="SecurityCode_' + rs[0] + '_0">'
                    + rs[0] + '[行情]' + '</a>' + '&nbsp;' + '<span class="stockOpe-U"  id="price_' + rs[0] + '_0">' + '</span><span class="stockOpe-U" " id="ceil_' + rs[0] + '_0">' + '</span>'
                );
                var qqq = String(rs[0]);
                //xn
                AutoGetQuote0826(qqq, 1, 1);
                now = new Date();
                if (now.getHours() >= 9 && now.getHours() < 15) {
                    //xn
                    setInterval('AutoGetQuote0826(' + '"' + qqq + '"' + ',0,0)', 1000);
                }
            }
        }
        if (rs != '' || rs != null) {
            $('.text').html(contentRep);
        }
        content = null;
        contentRep = null;
        re = null;
        reStock = null;
        rs = null;
        stockIds = null;
        $('.load').hide();
        $('.wrap').show();
        $('.table-out').css('borderBottom', '.01rem solid #000');
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
        var $backTop = $('.back-top');
        window.onscroll = function () {
            if (getScrollTop() > 500) {
                $backTop.fadeIn();
            } else {
                $backTop.fadeOut();
            }
        };
        $backTop.on('click', function () {
            $('html,body').animate({scrollTop: 0}, 500);
        })
    }
};
news.init();