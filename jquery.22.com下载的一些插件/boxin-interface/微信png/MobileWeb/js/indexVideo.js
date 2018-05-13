/**
 * Created by hjy on 2017/11/24.
 * 公众号liveCourse.html
 * 引用videoController.js
 */
require.config(
    {
        paths: {
            'common': '../lib/common',
            'timeTool': '../js/timeTool',
            'TcPlayer': '../lib/TcPlayer',
            'videoController': '../js/videoController'
        }
    }
);
require(['TcPlayer', 'videoController', 'common', 'timeTool'], function (TcPlayer) {
    var liveTool = {
        init: function () {
            this.getData();//ajax
            this.clickIcon();
        },
        render:function (data) {
            var str='';
            for(var i=0;i<data.length;i++){
                str+=' <div class="gener-row-con right-arrow pad0 active-on"><a class="href ldot" href="indexVideo_openclass.html"><i\n' +
                    '                    class="hot">HOT</i>'+data[i].teacherName+'&nbsp'+data[i].name+' <span>'+timeFormat(data[i].startTime, 'yyyy-MM-dd')+'</span></a></div>';
            }
            $('#newslist').html(str);
        },
        clickIcon:function () {
            $('.qmenu').find('li').click(function () {
                window.location.href='indexColumn.html?id='+$(this).attr('type');
            });
            $('.qmenu').delegate('a', 'click', function () {
                $('.qmenu').find('a').removeClass('a-active');
                $(this).addClass('a-active');
            });
        },
        getData: function () {
            var _this = this;
            $.ajax({
                type: "get",
                async: true,
                cache: false,
                url: baseURL + "/program/liveList.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) {
                    var obj = JSON.parse(result);
                    var data = obj.data;
                    if (obj.success == true) {
                        _this.render(data);
                    }
                }
            });
        },
    };
    liveTool.init();
});