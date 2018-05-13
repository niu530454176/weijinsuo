define('MOD_ROOT/login/login', function (require, exports, module) {

    var $ = require('jquery');

    function init() {
        console.log("I'm login");
        console.log($('body'));
        console.log($);
    }


    module.exports.__id = 'login';
    module.exports.init = init;
});