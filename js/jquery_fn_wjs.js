(function(b){var a={};b.ajaxPrefilter(function(e,h,g){var f=e.url;if(!a[f]){a[f]=g}else{a[f].abort()}var d=e.complete;e.complete=function(i,j){a[f]=null;if(b.isFunction(d)){d.apply(this,arguments)}}});var c=function(d){this.opt=b.extend({url:"/",type:"POST",async:true,dataType:"json",login:false},(typeof d=="object"?d:{}))};c.prototype={option:function(d,e){if(typeof e=="undefined"){return this.opt[d]}this.opt[d]=e;return true},formatData:function(e){var d=function(k){var i=[];for(var h in k){var j=k[h];var g="'"+h+"':"+(typeof(j)=="object"?d(j):"'"+j+"'");i.push(g)}return"{"+i.join(",")+"}"};var f=typeof(e)=="string"?e:d(e);return{info:f}},get:function(h,f,j){var k=this,g=(typeof(j)=="function"),i=g?j:function(l){return l};if(k.opt.loading){var e=b?b.loading():null}h=k.opt.url+h;var d=b.ajax({url:h,type:k.opt.type,dataType:k.opt.dataType,async:k.opt.async,data:k.formatData(f),success:i,complete:function(l){}})},upload:function(f,h,g,e){var i=this;if(i.opt.loading){var d=b.loading()}f=location.origin+"/"+f;b.ajaxFileUpload({url:f,secureuri:false,fileElementId:h,data:i.formatData(e?e:"{}"),dataType:i.opt.dataType,success:g,complete:function(j){d&&b.loading(d)},error:function(k,j,l){d&&b.loading(d)}})},check:function(d){var e={title:"温馨提示",content:d.message};if(d.statusCode==-1||d.statusCode==-2){e.type="fail";b.alert(e,function(f){b("#"+f).on("hide.bs.modal",function(){b.goUrl("/login")})});return false}else{if(d.statusCode>700){e.type="fail";b.alert(e,function(f){b("#"+f).on("hide.bs.modal",function(){if(d.statusCode==701){b.goUrl("/user/userInfo")}else{b.goUrl("/user/getLoginInfo")}})});return false}else{if(d.statusCode==-3){b.cookie("u","");b.goUrl("/login")}else{if(d.statusCode==200){return true}else{if(d.statusCode==1||d.statusCode==416||d.statusCode==500||d.statusCode==999){toastr.error(d.message);return false}else{e.type="fail";b.alert(e);return false}}}}}},syncCheck:function(g){var e=g.statusCode;var f=g.message;var d={content:f};if(e==-1||e==-2){d.type="fail";b.alert(d,function(h){b("#"+h).on("hide.bs.modal",function(){b.goUrl("/login")})});return false}else{if(e>700){d.type="fail";b.alert(d,function(h){b("#"+h).on("hide.bs.modal",function(){if(e==701){b.goUrl("/user/userInfo")}else{if(e==702||e==704){b.goUrl("/user/getLoginInfo")}else{if(e==703){b.goUrl("/user/toMyBankCard")}}}})});return false}else{if(e==200){return true}else{d.type="fail";b.alert(d);return false}}}}};window.wjsApi=c;b.cookie=function(e,m,q){if(typeof m!="undefined"){q=q||{};if(m===null){m="";q.expires=-1}var h="";if(q.expires&&(typeof q.expires=="number"||q.expires.toUTCString)){var j;if(typeof q.expires=="number"){j=new Date();j.setTime(j.getTime()+(q.expires*24*60*60*1000))}else{j=q.expires}h="; expires="+j.toUTCString()}var p=q.path?"; path="+q.path:"; path=/";var k=q.domain?"; domain="+q.domain:"";var d=q.secure?"; secure":"";if(typeof m=="object"){m=JSON.stringify(m)}document.cookie=[e,"=",encodeURIComponent(m),h,p,k,d].join("")}else{var g=null;if(document.cookie&&document.cookie!=""){var o=document.cookie.split(";");for(var l=0;l<o.length;l++){var f=jQuery.trim(o[l]);if(f.substring(0,e.length+1)==(e+"=")){g=decodeURIComponent(f.substring(e.length+1));break}}}return g}};b.luhnCheck=function(l){var A=l.substr(l.length-1,1);var e=l.substr(0,l.length-1);var E=new Array();for(var z=e.length-1;z>-1;z--){E.push(e.substr(z,1))}var v=new Array();var d=new Array();var q=new Array();for(var y=0;y<E.length;y++){if((y+1)%2==1){if(parseInt(E[y])*2<9){v.push(parseInt(E[y])*2)}else{d.push(parseInt(E[y])*2)}}else{q.push(E[y])}}var g=new Array();var f=new Array();for(var B=0;B<d.length;B++){g.push(parseInt(d[B])%10);f.push(parseInt(d[B])/10)}var C=0;var x=0;var r=0;var o=0;var F=0;for(var u=0;u<v.length;u++){C=C+parseInt(v[u])}for(var t=0;t<q.length;t++){x=x+parseInt(q[t])}for(var s=0;s<g.length;s++){r=r+parseInt(g[s]);o=o+parseInt(f[s])}F=parseInt(C)+parseInt(x)+parseInt(r)+parseInt(o);var w=parseInt(F)%10==0?10:parseInt(F)%10;var D=10-w;if(A==D){return true}else{return false}};b.bankMsg=function(){b("#investm").keyup(function(){var e=b("#investm").val().match(/^[0-9]*\.?[0-9]{0,2}$/);b("#bank_msg").html(e).show();e=b.trim(e);var d=e.substring(0);if(!!d){b("#bank_msg").html(e).show()}else{b("#bank_msg").hide()}});b("#investm").blur(function(){b("#bank_msg").hide()})};b.fn.countDown=function(h,g){var i=b(this);var e=h?h:90;d();var f=setInterval(d,1000);function d(){i.html(--e+"秒后重新获取");if(e<=0){i.html("重新获取");clearInterval(f);g()}}};b.phone=function(d){return/^1\d{10}$/.test(d)};b.fn.imgCode=function(e,g){var d=new Date().getTime(),f="";if(g){f+="&account="+g}b(this).attr("src","/generatorImageCode?businesType="+e+f+"&v="+d)};b.logCookie=function(f){var d={};d.userId=f.userId;d.userName=f.username;d.email=f.email;d.phone=f.phone;d.headPic=f.headPic;d.realName=f.realName;d.vipLevel=f.vipLevel;b.cookie("ul",d,{expires:5});b.cookie("u",f.userSession);b.cookie("uType",f.orgType);b.cookie("isPermission",f.isPermission);localStorage.setItem("orgType",f.orgType);localStorage.setItem("isHaveInsideLetter",f.unReadInsideLetterCount);var e="7";if(navigator.userAgent.match(/MFExchange\/Android/g)){e="5"}if(navigator.userAgent.match(/MFExchange\/iOS/g)){e="4"}b.cookie("source",e)};b.base64=function(g){var e="";var p,m,k="";var o,l,j,h="";var f=0;var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";do{p=g.charCodeAt(f++);m=g.charCodeAt(f++);k=g.charCodeAt(f++);o=p>>2;l=((p&3)<<4)|(m>>4);j=((m&15)<<2)|(k>>6);h=k&63;if(isNaN(m)){j=h=64}else{if(isNaN(k)){h=64}}e=e+d.charAt(o)+d.charAt(l)+d.charAt(j)+d.charAt(h);p=m=k="";o=l=j=h=""}while(f<g.length);return e};b.Math_sub=function(i,h){var g,f,d,k;try{g=i.toString().split(".")[1].length}catch(j){g=0}try{f=h.toString().split(".")[1].length}catch(j){f=0}k=Math.max(g,f);d=Math.pow(10,k);return((i*d-h*d)/d).toFixed(k)};Number.prototype.sub=function(d){return b.Math_sub(this,d)};b.moneyFormat=function(g,h){if(h=="w"||h=="ws"){var e=g/10000;return h=="ws"?e+("<sub>万</sub>"):e+"万"}var j=String(g),l=j.split("."),d=l[0],k=l[1]?(l[1]).substr(0,2):"00",k=k.length==1?k+"0":k;intArr=[];for(var f=d.length-1;f>=0;f--){intArr.push(d.substr(f,1));!!f&&((d.length-f)%3==0)&&intArr.push(",")}intArr.reverse();if(h=="o"){return intArr.join("")+"."+k}else{if(h=="rmb"){return intArr.join("")}else{return"￥<strong>"+intArr.join("")+"</strong>.<small>"+k+"</small>"}}};b.goBack=function(){window.history.back()};b.goUrl=function(d){window.location.href=d};b.fn.serializeJson=function(){var d={};var f=this.serializeArray();var e=this.serialize();b(f).each(function(){if(d[this.name]){if(b.isArray(d[this.name])){d[this.name].push(this.value)}else{d[this.name]=[d[this.name],this.value]}}else{d[this.name]=this.value}});return d};b.handleTime=function(){var d=(new Date()).getTime();return d.toString(36)};b.loading=function(d){};b.alert=function(e,f,d){e=e?e:{};var k=e.title?e.title:"提示",h=e.content?e.content:"",j=e.type?e.type:"",m='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',g=e.btns?e.btns:'<button type="button" class="btn btn-default" data-dismiss="modal">确定</button>';if(e.close=="none"){m=""}var i="",l="dialog-"+b.handleTime();i='<div class="modal alertModal" tabindex="-1" role="dialog"id="'+l+'"><div class="modal-dialog"><div class="modal-content"><div class="modal-header type-'+j+'">'+m+'<h4 class="modal-title">'+k+'</h4></div><div class="modal-body"><div class="box">'+h+'</div></div><div class="modal-footer">'+g+"</div></div></div></div>";b("body").append(i);b("#"+l).modal({backdrop:"static"});if(f){f(l)}b("#"+l).on("hidden.bs.modal",function(){b(this).remove();if(d){d(l)}});return l};b.mobileCheck=function(){var f=new Array("iphone","android","ipod","ipad","mobile","blackberry","webos","incognito","webmate","bada","nokia","lg","ucweb","skyfire");var e=navigator.userAgent.toLowerCase();var d=false;for(var g=0;g<f.length;g++){if(e.indexOf(f[g])!=-1){d=true;break}}return d};b.getQueryString=function(d){var e=new RegExp("(^|&)"+d+"=([^&]*)(&|$)");var f=window.location.search.substr(1).match(e);if(f!=null){return decodeURIComponent(f[2])}return null};b.toolTip=function(){var d=["一","二","三","四","五","六"];b.each(b(".star-active"),function(f,g){var h=b(this).attr("tar").split(".");var j="";var e=(h[0]-0)-1;if(h.length>1&&h[1]==5){j=d[e]+"星半"}else{if(h.length>1&&h[1]==0){j=d[e]+"星级"}else{if(h.length==1){j=d[e]+"星级"}}}b(this).parent().attr("data-original-title",j)});b("[data-toggle='tooltip']").tooltip()};b.initPage=function(p,d,i,l,q,k){if(l==0){q.html(" ");return false}var v=l,t=10,j=i?Number(i):1,g=Math.ceil(v/d);j=j>g?g:j;j=j<1?1:j;var o=Math.floor((j)/t-1e-7)*t,r=o+t-1;var e=q;var f=['<div style="clear:both;"></div><ul class="pagination">'];f.push('<li p="'+(j-1)+'" class="pagprev"><a href="javascript:void(0);"><i class="icon-previous"></i></a></li>');var s="<li><span>...</span></li>";var h='<li p="1" class="'+(1==j?"active":"")+'"><a href="javascript:void(0);">'+1+"</a></li>";var u='<li p="'+(g)+'" class="'+((g)==j?"active":"")+'"><a href="javascript:void(0);">'+g+"</a></li>";if(g<=7){for(var w=1;w<=l;w++){if(w>g){break}f.push('<li p="'+w+'" class="'+(w==j?"active":"")+'"><a href="javascript:void(0);">'+(w)+"</a></li>")}}else{if(g>7){if(j<=4){for(var w=1;w<=5;w++){if(w>g){break}f.push('<li p="'+w+'" class="'+(w==j?"active":"")+'"><a href="javascript:void(0);">'+(w)+"</a></li>")}f.push(s);f.push(u)}else{if(j>=g-3){f.push(h);f.push(s);for(var w=(j-2);w<=(j+3);w++){if(w>g){break}f.push('<li p="'+w+'" class="'+(w==j?"active":"")+'"><a href="javascript:void(0);">'+(w)+"</a></li>")}}else{f.push(h);f.push(s);for(var w=(j-2);w<=(j+2);w++){if(w>g){break}f.push('<li p="'+w+'" class="'+(w==j?"active":"")+'"><a href="javascript:void(0);">'+(w)+"</a></li>")}f.push(s);f.push(u)}}}}f.push('<li p="'+(j+1)+'" class="pagnext"><a href="javascript:void(0);"><i class="icon-next"></i></a></li>');f.push('<li class="paginfo">跳转到：<input class="search_input" type="text" size="4"> </li><li><a class="search_but"><i class="icon-rightArrow"></i></a></li>');f.push("</ul>");e.html(f.join(""));e.find("li").unbind().click(function(){j=b(this).attr("p");j=j>g?g:j;j=j<1?1:j;if(typeof(k)!="undefined"){b(this).attr("p")&&p(k,j)}else{b(this).attr("p")&&p(j)}});function m(){var x=e.find(".search_input").val();x=x;x=x>g?g:x;x=x<0?0:x;if(!x||isNaN(x)){return}if(typeof(k)!="undefined"){p(k,x)}else{p(x)}}e.find(".search_but").unbind().click(m);e.find(".search_input").unbind().keydown(function(x){if(x.keyCode=="13"){m()}})};b.date=function(m){var p=window.navigator.userAgent.toLowerCase();if(p.indexOf("firefox")!=-1||p.indexOf("trident")!=-1||p.indexOf("safari")!=-1){var k=m.split(" ");var o="";var l="";var g="";var j="";var h="";var e="";var f=k[0].split("-");o=f[0];l=f[1]-1;g=f[2];if(k.length>1){var i=k[1].split(":");j=i[0];h=i[1];e=i[2];return new Date(o,l,g,j,h,e)}return new Date(o,l,g)}else{return new Date(m)}};b.diffDate=function(e,d){var i,f;i=new Date(e.replace(/-/g,"/"));f=new Date(d.replace(/-/g,"/"));var h=i.getTime()-f.getTime();var g=parseInt(h/(1000*60*60*24));return g};b.login=function(d){if(!b.cookie("u")){d&&b.cookie("g",d);b.goUrl("/login");return false}return !!b.cookie("u")};b.formatTimestamp=function(i){var l=new Date(i);var h=l.getFullYear();var j=l.getMonth()+1<10?"0"+(l.getMonth()+1):(l.getMonth()+1);var g=l.getDate()<10?"0"+l.getDate():l.getDate();var e=l.getHours()<10?"0"+l.getHours():l.getHours();var k=l.getMinutes()<10?"0"+l.getMinutes():l.getMinutes();var f=l.getSeconds()<10?"0"+l.getSeconds():l.getSeconds();return h+"-"+j+"-"+g+" "+e+":"+k+":"+f};b.checkResult=function(e){var d=e.statusCode;if(d==200){return true}else{if(d==-1||d==-2||d==700){b.alert({content:e.message,type:"fail"},"",function(){b.cookie("g",window.location.href);b.cookie("u","");b.goUrl("/login")});return false}else{if(d==-3){b.cookie("u","");b.goUrl("/login")}else{if(d==1||d==416||d==500||d==999){toastr.error(e.message);return false}else{b.alert({content:e.message,type:"fail"});return false}}}}};b.getNowFormatDate=function(i){var f=new Date();var e="-";var d=":";var j=f.getMonth()+1;var h=f.getDate();if(j>=1&&j<=9){j="0"+j}if(h>=0&&h<=9){h="0"+h}var g=f.getFullYear()+e+j+e+h;if(i){g+=" "+f.getHours()+d+f.getMinutes()+d+f.getSeconds()}return g};b.floatAdd=function(j,h){var g,f,d;try{g=j.toString().split(".")[1].length}catch(i){g=0}try{f=h.toString().split(".")[1].length}catch(i){f=0}d=Math.pow(10,Math.max(g,f));return Math.round(j*d+h*d)/d};b.floatSub=function(j,h){var g,f,d;try{g=j.toString().split(".")[1].length}catch(i){g=0}try{f=h.toString().split(".")[1].length}catch(i){f=0}d=Math.pow(10,Math.max(g,f));n=(g>=f)?g:f;return(Math.round(j*d-h*d)/d).toFixed(n)};b.floatDiv=function(k,i){var h,g,f,d;try{h=k.toString().split(".")[1].length}catch(j){h=0}try{g=i.toString().split(".")[1].length}catch(j){g=0}f=Number(k.toString().replace(".",""));d=Number(i.toString().replace(".",""));return(f/d)*Math.pow(10,g-h)};b.floatMul=function(j,h){var d=0,g=j.toString(),f=h.toString();try{d+=g.split(".")[1].length}catch(i){}try{d+=f.split(".")[1].length}catch(i){}return Number(g.replace(".",""))*Number(f.replace(".",""))/Math.pow(10,d)};Date.prototype.dateDiff=function(e,d){var g;var f=this.getTime()-e.getTime();switch(d){case"ms":g=1;break;case"s":g=1000;break;case"m":g=60*1000;break;case"h":g=60*60*1000;break;case"d":g=24*60*60*1000;break;case"M":g=24*60*60*1000*30;break;case"y":g=24*60*60*1000*30*12;break}return Math.floor(f/g)};Date.prototype.dateFullDiff=function(g){var o=this.getFullYear();var p=g.getFullYear();var l=this.getMonth();var i=g.getMonth();var q=this.getDate();var d=g.getDate();var e=new Date(o,l,0).getDate();var j=this.getHours();var r=g.getHours();var h=this.getMinutes();var k=g.getMinutes();var f=this.getSeconds();var s=g.getSeconds();var m={};if(f<s){if(h==0){if(j==0){if(q==1){if(l==0){o-=1;l=11;q=31;j=23;h=59}else{h=59;j=23;q=e;l-=1}}else{h=59;j=23;q-=1}}else{h=59;j-=1}}else{h-=1}f=f+60}m.second=f-s;if(h<k){if(j==0){if(q==1){if(l==0){o-=1;l=11;q=31;j=23}else{j=23;q=e;l-=1}}else{j=23;q-=1}}else{j-=1}h+=60}m.minute=h-k;if(j<r){if(q==1){if(l==0){o-=1;l=11;q=31}else{q=e;l-=1}}else{q-=1}j+=24}m.hour=j-r;if(q<d){if(l==0){o-=1;l=11}else{l-=1}q+=e}m.day=q-d;if(l<i){o-=1;l+=12}m.month=l-i;m.year=o-p;return m}})(jQuery);