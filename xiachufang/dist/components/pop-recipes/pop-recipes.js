/*! spmseajs 2017-06-07 */
define("MOD_ROOT/pop-recipes/pop-recipes",["jquery","MOD_ROOT/trimPath/trimPath"],function(a,b,c){function d(a){new f(a),console.log("@")}console.log("##");var e=a("jquery");a("MOD_ROOT/trimPath/trimPath");var f=function(a){this.$target=a,this.init(a)};f.prototype={init:function(a){this.get()},get:function(){var a=this;e.ajax({url:"https://www.easy-mock.com/mock/59350bc491470c0ac1011ba2/xiachufang/popular?jsonp_param_name=callback",dataType:"jsonp",jsonpCallback:"popularCallBack",success:function(b){a.set(b),console.log(b)}})},set:function(a){var b=this,c='            {for item in items}             <li>                  <a href="${item.href}" title="${item.title}" class="recipe image-link align-center has-border display-block" data-click-tracking-url="">                       <div class="cover">                           <img src="${item.imgSrc}" alt="${item.title}" width="235" height="138">                      </div>                      <div class="name font18">                           <span class="ellipsis">${item.title}</span>                      </div>                      <div class="stats">                          <span class="ellipsis">${item.author}</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>${item.count}&nbsp;做过</span>                      </div>                 </a>            </li>            {/for}'.process({items:a});b.$target.find(".plain").html(c)}},c.exports.__id="pop-recipes",c.exports.init=d});