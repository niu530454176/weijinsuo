/**
 * Created by guoxiaona on 16/8/18.
 */
;(function ($, window, document, undefined) {
    var loan =function(){};
    loan.prototype = {
        getItemLabel:function(itemLabel){
            var itemArr = [];
            if(itemLabel.length > 0){
                $.each(itemLabel,function(i,item){
                    var temp = '<span class="labelTag" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="'+item.name+'">'+item.shortName+'</span>';
                    itemArr.push(temp);
                });
                return itemArr.join('');
            }else{
                return '';
            }
        },
        getProvinceName:function(item){
            var arr = [];
            if(item.provinceName && item.provinceShortName){
                arr.push('<span class="labelTag" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="'+item.provinceName+'">'+item.provinceShortName+'</span>');
            }
            if(item.applyType == 4){
                arr.unshift('<span class="labelTag" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="可复投">复</span>');
                arr.unshift('<span class="labelTag" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="微小宝">宝</span>');
            }else if(item.applyType == 12){
                arr.unshift('<span class="labelTag" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="微金宝">宝</span>');
            }else if(item.applyType == 6){
                arr.push('<span class="labelTag" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="转让">转</span>');
            }
            return arr.join('');
        },
        getRepaymentUnit:function(repayment){
            if(repayment == '1'){
                return '个月';
            }else if(repayment == '2'){
                return '天';
            }
        },
        showVIPName:function(vipLevel){
            if(vipLevel !='0'){
                var name = '';
                vipLevel = vipLevel - 0;
                switch (vipLevel){
                    case 1: name = '专享';
                        break;
                    case 2: name = '优享';
                        break;
                    case 3: name = '尊享';
                        break;
                }
                return '<div class="vipTag" style="background-color:#dd3137">'+
                    '<span class="leftRed"></span>'+
                    '<span class="rightRed"></span>'+
                    name+
                    '</div>';
            }else{
                return "";
            }
        },
        getAdditionalRate:function(item){
            if(item.applyType == '6'){
                return '<span>原<del>'+item.oldInterestRate+'%</del></span>';
            }else{
                if((item.addRate-0) > 0 ){
                    return '+'+item.addRate+'%';
                }else{
                    return '';
                }
            }
        },
        creditToolTip : function (level){
            var tipContent = "";
            switch (level) {
                //case '1022': labelArray.push(aType == '!vip' ? '' : '<span class="lable red" data-toggle="tooltip" data-placement="top" title="VIP专享">V</span>'); break ;
                case '极低风险': tipContent = "极低风险--最终偿付人违约概率极低";break ;
                case '很低风险': tipContent = "很低风险--最终偿付人违约概率低";break ;
                case '中低风险': tipContent = "中低风险--最终偿付人违约概率中等偏低";break ;
                case '中等风险': tipContent = "中等风险--最终偿付人违约概率一般";break ;
                case '高风险': tipContent = "";break ;
            }
            return tipContent;
        },
        getAdventureTips : function(){
            var res = "尊敬的微金所平台出借人:<br/>"+
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为确保您在出借资金前充分知悉网络借贷的多种风险，请仔细阅读以下重要内容：<br/>"+
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.政策风险：因网络借贷是基于当前的国家宏观政策及相关法律法规所设计。若相关宏观政策（如财政政策、货币政策、行业政策、地区发展政策）以及行业法律法规发生变化，可能会导致网络借贷面临损失。<br/>"+
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.流动性风险：在借贷关系存续期间，出借人只能通过转让债权（收益权）收回资金，不得提前终止出借。<br/>"+
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.信用风险：当借款方及担保方短期或者长期丧失还款能力（包括但不限于借款方收入情况、财产状况发生变化，人身出现意外，发生疾病、死亡等情况），或者借款方的还款意愿发生变化时，出借人本金和预期收益将有可能遭受损失。<br/>"+
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.交易风险：网络借贷平台均设定自身的交易规则，如投标、提现、转让债权（收益权）等，请您确保对本平台交易规则充分知晓，否则可能存在交易风险。<br/>"+
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.不可抗力风险：不可抗力、不可预见的意外事件可能导致网络借贷面临损失。<br/>"+
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.平台免责声明：微金所作为交易服务平台进行信息发布，不对任何投资人及/或任何交易提供任何形式的担保。微金所平台提供的各种信息及资料来自于借款人，借款人对其提供的原始信息的可靠性和准确性负责，微金所尽最大的可能保证所获得的原始信息以及披露信息的真实性、准确性和完整性，但不能排除人力以外的无法穷尽信息的情况。投资人应依其独立判断，据此进行投资交易所产生的投资风险由投资人自行承担。<br/><br/>"+
                "请您认真阅读本风险提示书，并认真阅读网站内各项协议以及公布的各项规则的全部内容，了解出借项目的基本情况和出借风险与收益状况（收益请参照合同约定），确保您在完全知悉借贷风险再决定是否出借。希望您充分认识投资风险，以小额分散的方式参与网络借贷，谨慎投资，不要将资金集中于某一项目，避免风险集中。如有任何疑问，用户应向微金所客服咨询。";
            return res;
        },
        showLoanGradeNew : function(aGrade,status){
            var act = ((aGrade/6)*100).toFixed(2);
            var gray = 100-act;
            var starArray = ["一","二","三","四","五","六"];
            aGrade += "";
            var head = "";
            var tail = "星级";
            if(aGrade.indexOf(".")==-1){
                head = starArray[parseInt(aGrade)-1];
            }else{
                var index = parseInt(aGrade.split(".")[0])-1;
                head = starArray[index];
                if(aGrade.split(".")[1]=="5"){
                    tail = "星半";
                }
            }
            var str = '<div class="starbg" data-toggle="tooltip" data-placement="bottom" title="'+head+tail+'"><div class="star-gray"></div><div class="star-active" style="width:'+act+'%"></div></div>';
            return str;
        },
        getRate:function(item){
            if(item.addRate){
                return (Number(item.interestRate).sub(item.addRate));
            }else{
                return Math.floor(item.interestRate*100)/100;
            }
        },
        //判断是否输入100的整数倍
        checkinvest:function(aMoney){
            return (/\d+00$/).test(aMoney);
        },
        //人民币大写方式
         upperInvestm:function(aVal){
            if(aVal.length && this.checkinvest(aVal)){
                var uperNUm = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
                var uperUnit = ["整","元","拾","佰","仟","万","拾","佰","仟","亿"];
                var result = [];
                for(var i=aVal.length-1; i>=0;i--){
                    var num = aVal.substr(i,1);
                    var index = aVal.length-i ;
                    var up = "";
                    if(num=="0"){
                        if(index == 5){
                            up = uperUnit[index];
                        }else if(index>5){
                            up = result[0] == "零" ? "" : "零" ;
                        }
                    }else{
                        up = uperNUm[parseInt(num)] + (uperUnit[index] ? uperUnit[index] : "");
                    }
                    result.unshift(up);
                }
                return result.join("").replace("零万","万");
            }else{
                return "";
            }
        },
        vipName:function(){
            $.each($('.vipTag'),function(i,item){
                var vipLevel = $(this).attr('tar');
                var name = '';
                switch (vipLevel){
                    case '1': name = '专享';
                        break;
                    case '2': name = '优享';
                        break;
                    case '3': name = '畅享';
                        break;
                    case '4': name = '尊享';
                        break;
                }
                $(this).html('<span class="leftRed"></span><span class="rightRed"></span>'+name);
                $(this).css('background-color','#dd3137');
            })
        },
        getInvestMentLog:function(aData){
            if(aData.data.dataCount > 0){
                var arr = [];
                arr.push('<tr><th>用户级别</th><th>投标人</th><th>投标金额</th><th>投标时间</th><th>总利息</th></tr>');
                $.each(aData.data.data,function(i,item){
                    var unit = '<tr>'+
                    '<td><img src="/resource/web/img/vip/vip_'+item.vipLevelId+'.png" style="width:25px" title="">'+item.levelName+'</td>'+
                    '<td>'+ item.realName +'</td>'+
                    '<td>'+ (item.originalAmount==0?"已转让":item.originalAmount) +loan.prototype.showYuYue(item.reservationFlag)+'</td>'+
                    '<td>'+ item.investTime +'</td>'+
                    '<td class="red">￥'+ (item.paymentInterest != null ? item.paymentInterest:0) +'</td>'+
                    '</tr>';
                    arr.push(unit);
                });
                $('.investmentBody').html(arr.join(''));
            }else{
                $('.investmentBody').html('<p>目前没有投资记录</p>');
            }
            
        },
        getWJBInvestMentLog:function(aData){
            if(aData.data.dataCount > 0){
                var arr = [];
                arr.push('<tr><th>用户级别</th><th>投标人</th><th>投标金额</th><th>投标时间</th><th>总利息</th></tr>');
                $.each(aData.data.data,function(i,item){
                    var unit = '<tr>'+
                        '<td><img src="/resource/web/img/vip/vip_'+item.vipLevelId+'.png" style="width:30px" title="'+item.vipLevelName+'"></td>'+
                        '<td>'+ item.realName +'</td>'+
                        '<td>'+ item.originalAmount +loan.prototype.showYuYue(item.reservationFlag)+'</td>'+
                        '<td>'+ item.investTime +'</td>'+
                        '<td class="red">￥'+ (item.paymentInterest != null ? item.paymentInterest:0) +'</td>'+
                        '</tr>';
                    arr.push(unit);
                });
                $('.investmentBody').html(arr.join(''));
            }else{
                $('.investmentBody').html('<p>目前没有投资记录</p>');
            }

        },
        showYuYue: function(reservation){
            if(reservation=='1'){
                return "<span class='yu-yue'>预</span>";
            }else{
                return "";
            }
        },
        getLoanUrl:function(applyType){
            var loan_url='';
            switch(applyType){
                case 'invest' :
                case 1:  //微投资普标
                case 3:  //债权包
                    loan_url = '/loan/common/';
                    break;
                case 'persistent' :
                case 4:   //微小宝
                    loan_url = '/loan/small/';
                    break;
                case 'resale' :
                case 6:  //微转让
                    loan_url = '/loan/resale/';
                    break;
                case 'consume' :
                case 9:  //微转让
                    loan_url = '/loan/consume/';
                    break;
                case 10://新手标
                    loan_url = '/loan/novice/';
                    break;
                case 11://微金宝
                case 12:
                    loan_url = '/loan/gold/';
                    break;
                case 15://海航
                case 16:
                    loan_url = '/loan/org/';
                    break;
                case 17:
                    loan_url = '/loan/month';
                    break;
                case 18://稳赢保
                case 19:
                case 20:
                case 21:
                    loan_url = '/loan/stable/';
                    break;
            }
            return loan_url;
        }
    }
    window.loan = loan;
    return loan;
})(jQuery, window, document);