/**
 * Created by wjs on 16/7/26.
 */
var sysTime = Number($("#sysTime").val()); //系统时间
function init(){

    stopAnimation();
    newForecast();
    dispatchUrl();
    coming();

    nameBlock();
    var API = new wjsApi();
    $.toolTip();
    excerpt();
}

function excerpt(){
    $.each($('.excerpt'),function(i,item){
        if($(item).html().length >= 110){
            var temp = $(item).html().substring(0,110)+'...';
            $(item).html(temp);
        }
    });
    
}

function nameBlock(){
    $.each($('.name'),function(i,item){
        var width = $(item).css('width').replace('px','');
        //coming length:111,labelTag length:24
        var comLength = $(item).find('.coming').length;
        var labelTagLength = $(item).find('.labelTag').length;
        var perfectW = width - comLength*115 - labelTagLength*24-2;
        $(item).find('.nameBlock').css('width',perfectW+'px');
    });
}
function newForecast(){
    if($(".textAnimate")){
        var newLoan = eval($("#newLoan").val());
        var setNotice = function (aLoan){
            var loan = aLoan;
            var time = parseInt(loan.onlineTime) - (new Date()).getTime(),
                perDate = 1000 * 60 * 60 * 24,
                perHour = 1000 * 60 * 60,
                perMinu = 1000 * 60,
                perSecn = 1000;
            var setDate = Math.floor(time/perDate),
                setDate = setDate > 0 ? '<span class="orange">' + setDate + "</span>天 " : "";
            var setHour = Math.floor((time%perDate)/perHour),
                setHour = setHour > 0 ? '<span class="orange">' + setHour + "</span>小时 " : "";
            var setMinu = Math.floor((time%perHour)/perMinu),
                setMinu = setMinu > 0 ? '<span class="orange">' + setMinu + "</span>分 " : "";
            var setSecn = Math.floor((time%perMinu)/perSecn),
                setSecn = setSecn > 0 ? '<span class="orange">' + setSecn + "</span>秒" : "";
            $(".newForecast").html("<i class='icon-voice'></i>");
            $(".newForecast").append(loan.contaxt+"。距上线：" + setDate + setHour + setMinu);
        }
        if(newLoan != '' && newLoan != null){
            var total = newLoan.length;
            var scrIndex = 0;
            total && setNotice(newLoan[0]);
            if(total > 1){
                $(".coming-loan sup").html(total);
                setInterval(function(){
                    scrIndex = scrIndex+1 >= total ? 0 : scrIndex+1;
                    setNotice(newLoan[scrIndex]);
                }, 7000);
            }
        }


    }
}
function stopAnimation(){
    $(".textAnimate span").hover(function(){
        $(".textAnimate a,.textAnimate span").css({"animation-play-state":'paused','-webkit-animation-play-state':'paused'});
    },function(){
        $(".textAnimate a,.textAnimate span").css({"animation-play-state":'running','-webkit-animation-play-state':'running'});
    });
}

var backCountArr = [];
var hrefs = [];
function coming(){

    var leftTime = function (obj,count){
        if($(obj).attr("tar") == null ||  $(obj).attr("tar") == ''){
            $(obj).parent().next().find('li:last-child').css('margin-top','17px');
            $(obj).remove();
            return;
        }
        // var time = new Date($(obj).attr("tar")).getTime() - (new Date()).getTime(),
        var time = ($(obj).attr("tar")-0) - sysTime,
            perDate = 1000 * 60 * 60 * 24,
            perHour = 1000 * 60 * 60,
            perMinu = 1000 * 60,
            perSecn = 1000;
        var d = Math.floor(time/perDate);
        var h = d * 24 + Math.floor((time%perDate)/perHour);
        var m = Math.floor((time%perHour)/perMinu);
        var s = Math.floor((time%perMinu)/perSecn);
        if(h < 10){
            $(obj).find(".hours").html("00" + h);
        }else if(h <= 99 && h >= 10){
            $(obj).find(".hours").html('0' + h);
        }else{
            $(obj).find(".hours").html(h);
        }
        if(m < 10){
            $(obj).find(".minutes").html("0"+m);
        }else{
            $(obj).find(".minutes").html(m);
        }
        if(s < 10){
            $(obj).find(".seconds").html("0"+s);
        }else{
            $(obj).find(".seconds").html(s);
        }
        if((d == 0 && h == 0 && m == 0 && s == 0 ) || (s < 0)){
            clearInterval(backCountArr[count]);
            $(obj).parents('.dispatchUrl').removeAttr('title').attr('href',hrefs[count]);
            $(obj).find(".hours").html(00);
            $(obj).find(".minutes").html(00);
            $(obj).find(".seconds").html(00);
            $(obj).parent().next().find('li:last-child').css('margin-top','17px');
            $(obj).remove();
            return ;
        }
        sysTime+=1000;//系统时间加一秒
    };
    $.each($(".coming"),function(i,item){
        (function(i){
            hrefs[i] = $(item).parents('.dispatchUrl').attr('href');

            var time = ($(item).attr("tar")-0) - sysTime;
            if( time > 0){
                var nameObj = $(item).siblings('.nameBlock');
                var width = $(nameObj).css('width').replace('px','');
                var finalWidth = width-115;
                $(nameObj).css('width',finalWidth+'px');
                backCountArr[i] = setInterval(function(){leftTime(item,i)},1000);
                $(item).show();
                //$(item).parent().next().find('li:last-child').css('margin-top','13px');
                console.log($(item).parents('.dispatchUrl'));
                $(item).parents('.dispatchUrl').attr('href','javascriptvoid:(0)').attr('title','预约标倒计时中，敬请关注');
            }else{
                $(item).remove();
                $(item).parents('.dispatchUrl').attr('title','');
            }
        })(i)
    });
}





function dispatchUrl(){
    var LOAN = new loan();
    LOAN.vipName();
    $.each($('.dispatchUrl'),function(i,item){
        var applyType = $(this).attr('tar')-0;
        var loanId = $(this).attr('tari');
        var loanUrl = LOAN.getLoanUrl(applyType);
        if(applyType == 17){
            $(this).attr('href',loanUrl);
        }else{
            $(this).attr('href',loanUrl+loanId);
        }
        
    });
}



init();