require.config({
    paths: {
        'common': '../lib/common',
        'TcPlayer': '../lib/TcPlayer',
        'timeTool': 'timeTool'
    }
});
require(['TcPlayer', 'common', 'timeTool'], function (TcPlayer) {
    var columnVideo = {
        url: baseURL + '/program/kungfuListByType.do',
        init: function () {
            this.clickIcon();
            this.bindEvent();
            this.initHtml();
        },
        initHtml: function () {
            var _this = this;
            var localUrl = getUrlObject();
            var liveID = localUrl.id;
            var type = localUrl.type;
            var pageIndex = localUrl.pageIndex;
            var pageSize = localUrl.pageSize;

            var kfVideoL = localUrl.kfvideo;
            var onoffPwdL = localUrl.onoffpwd;
            var pwdL = localUrl.pwd;
            var kfDescL = localUrl.kfDesc;
            var title = localUrl.title;
            var kfPublishL = localUrl.kfPublish;
            if (kfDescL) {
                this.videoHtml(kfVideoL, onoffPwdL, pwdL, kfDescL, kfPublishL, type, title);
            } else {
                this.require(this.url, {pageIndex: pageIndex, pageSize: pageSize, type: type}, function (data) {
                    var data = data.meta.rows;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == liveID) {
                            _this.renderVideo(data[i]);
                            var dat = data[i];
                            if (dat.type == 10003) {
                                $('.login-mask').css('display', 'none');
                                columnVideo.initPlayer(dat.kfVideo);
                            }
                            if (dat.type == 10004) {
                                $('.login-mask').css('display', 'none');
                                columnVideo.initPlayer(dat.kfVideo);
                            }
                            if (dat.type == '10005') {
                                $('.login-mask').css('display', 'none');
                                columnVideo.initPlayer(dat.kfVideo);
                            }
                            if (dat.type == '10005') {
                                $('.login-mask').css('display', 'none');
                                columnVideo.initPlayer(dat.kfVideo);
                            }
                            if (dat.type == '20001') {
                                $('.login-mask').css('display', 'block');
                                $('#submit').click(function () {
                                    if (dat.onoffPwd && dat.pwd == $('#passw').val()) {
                                        columnVideo.initPlayer(dat.kfVideo);
                                        $('.login-mask').css('display', 'none');
                                    } else {
                                        $('#passw').val('');
                                        $('#pass-list').append('<li style="text-align: center;color: #E42837">您输入的口令不正确</li>');
                                    }
                                })
                            }
                            if (dat.type == '20002') {
                                $('.login-mask').css('display', 'block');
                                $('#submit').click(function () {
                                    $('body').find('.white-error').remove();
                                    if (dat.onoffPwd && dat.pwd == $('#passw').val()) {
                                        columnVideo.initPlayer(dat.kfVideo);
                                        $('.login-mask').css('display', 'none');
                                    } else {
                                        $('#passw').val('');
                                        $('#pass-list').append('<li class="white-error" style="text-align: center;color: #E42837">您输入的口令不正确</li>');
                                    }
                                })
                            }
                        }
                    }
                }, function () {
                    // console.log("数据请求异常！");
                });
            }
        },
        renderVideo: function (data) {
            var html = this.videoHtmlTpl(data);
            $(".course").append(html);
        },
        videoHtmlTpl: function (data) {
            columnTitle = data.title.replace(/\d*(-|_)\d*(-|_)\d*/g, '');
            $('.column-title').html(columnTitle);
            var tpl = '<div class="title">' +
                '<div class="con-des">' +
                '<span>' + columnTitle + '&nbsp&nbsp</span>' +
                '<span>' + timeFormat(data.kfPublish, 'yyyy-MM-dd') + '</span>' +
                '<span></span>' +
                '</div>' +
                '</div>' +
                '<div class="video" id="video-player">' +
                '</div>' +
                '        <div class="cDGray">\n' +
                '            <ul>\n' +
                '                <li>所属分类：' + columnTitle + '</li>\n' +
                '            </ul>\n' +
                '        </div>\n' +
                '        <div class="word">视频介绍：' + data.kfDesc + '<br/><br/></div>'
            return tpl;
        },
        videoHtml: function (kfVideoL, onoffPwdL, pwdL, kfDescL, kfPublishL, type, title) {
            var kfDescL = decodeURI(decodeURI(kfDescL));
            var title = decodeURI(decodeURI(title));
            var titler = title.replace(/\d*(-|_)\d*(-|_)\d*/g, '');//去掉2017-01-02
            $('.column-title').html(titler);
            var tplL = '<div class="title">' +
                '<div class="con-des">' +
                '<span>' + titler + '&nbsp&nbsp</span>' +
                '<span>' + timeFormat(kfPublishL, 'yyyy-MM-dd') + '</span>' +
                '<span></span>' +
                '</div>' +
                '</div>' +
                '<div class="video" id="video-player">' +
                '</div>' +
                '        <div class="cDGray">\n' +
                '            <ul>\n' +
                '                <li>所属分类：' + titler + '</li>\n' +
                '            </ul>\n' +
                '        </div>\n' +
                '        <div class="word">视频介绍：' + kfDescL + '<br/><br/></div>';

            $(".course").append(tplL);
            if (type == '10003') {
                $('.login-mask').css('display', 'none');
                columnVideo.initPlayer(kfVideoL);
            }
            if (type == '10004') {
                $('.login-mask').css('display', 'none');
                columnVideo.initPlayer(kfVideoL);
            }
            if (type == '10005') {
                $('.login-mask').css('display', 'none');
                columnVideo.initPlayer(kfVideoL);
            }
            if (type == '10005') {
                $('.login-mask').css('display', 'none');
                columnVideo.initPlayer(kfVideoL);
            }
            if (type == '20001') {
                $('.login-mask').css('display', 'block');
                $('#submit').click(function () {
                    if (onoffPwdL && pwdL == $('#passw').val()) {
                        columnVideo.initPlayer(kfVideoL);
                        $('.login-mask').css('display', 'none');
                    } else {
                        $('#passw').val('');
                        $('#pass-list').append('<li style="text-align: center;color: #E42837">您输入的口令不正确</li>');
                    }
                })
            }
            if (type == '20002') {
                $('.login-mask').css('display', 'block');
                $('#submit').click(function () {
                    if (onoffPwdL && pwdL == $('#passw').val()) {
                        columnVideo.initPlayer(kfVideoL);
                        $('.login-mask').css('display', 'none');
                    } else {
                        $('#passw').val('');
                        $('#pass-list').html('<li style="text-align: center;color: #E42837">您输入的口令不正确</li>');
                    }
                })
            }
        },
        clickIcon: function () {
            $('.qmenu').find('li').click(function () {
                window.location.href = 'indexColumn.html?id=' + $(this).attr('type');
            });
        },
        bindEvent: function () {

        },
        /**
         * 初始化播放器
         * @param url
         */
        initPlayer: function (url) {
            var height = $(".course").css("height").split('px')[0];
            // console.log(height);
            // var height = 250;
            var width = $(".course").css("width").split('px')[0];

            function getParams(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return decodeURIComponent(r[2]);
                }
                return null;
            }

            var rtmp = getParams('rtmp'),
                flv = getParams('flv'),
                m3u8 = getParams('m3u8'),
                mp4 = getParams('mp4'),
                live = (getParams('live') == 'true' ? true : false),
                coverpic = getParams('coverpic'),
                width = getParams('width'),
                height = getParams('height'),
                autoplay = (getParams('autoplay') == 'true' ? true : false);
            /**
             * 视频类型播放优先级
             * mobile ：m3u8>mp4
             * PC ：RTMP>flv>m3u8>mp4
             */

            /**
             * 属性说明：
             *
             * coverpic  {Object|String} src:图片地址，style：default 居中1:1显示 stretch 拉伸铺满，图片可能会变形 cover 等比横向铺满，图片某些部分可能无法显示在区域内
             *  封面在 ios10 暂时无法生效。
             */
            var options = {
                coverpic: '',
                autoplay: true,
                width: this.width || '',
                height: this.height || '',
                x5_player: true
            };
            var urlobj = {};
            if (url.indexOf("mp4") > 0) {
                urlobj.mp4 = url;
            } else if (url.indexOf("m3u8") > 0) {
                urlobj.m3u8 = url;
            } else if (url.indexOf("flv") > 0) {
                urlobj.flv = url;
            }
            options = $.extend(options, urlobj);
            $('#video-player').html('');
            var player = new TcPlayer.TcPlayer('video-player', options);
            window.qcplayer = player;
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
    }
    columnVideo.init();
})