define('MOD_ROOT/list/list', function (require, exports, module) {

    var login = require('MOD_ROOT/login/login');

    function init() {
        console.log("I'm list");
        console.log(login);
    }


    module.exports.__id = 'list';
    module.exports.init = init;
});