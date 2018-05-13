define('MOD_ROOT/main/main', function (require, exports, module) {


    function init() {

        //必须加载模块

        var entries = [];
        entries.push('MOD_ROOT/login/login');
        entries.push('MOD_ROOT/list/list');
        entries.push('MOD_ROOT/lazyinit/lazyinit');

        require.async(entries, function () {
            var modules = Array.prototype.slice.call(arguments);
            var len = modules.length;

            for (var i = 0; i < len; i++) {
                var module = modules[i];
                if (module && typeof module.init === 'function') {
                    module.init();
                } else {
                    console.warn('Module[%s] must be exports a init function', entries[i]);
                }
            }
        });
    }

    module.exports.__id = 'main';
    module.exports.init = init;

});