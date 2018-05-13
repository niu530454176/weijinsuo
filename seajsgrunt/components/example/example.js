define('MOD_ROOT/example/example', function (require, exports, module) {
    
    function Example($target) {
        this.init($target);
    }

    Example.prototype = {
        init: function ($target) {
            this.$target = $target;
            alert("I'm Example instance init !");
        },
        append: function () {
            this.$target.html("I'm Example DOM !");
        }
    }

    function init($target) {
        var example = new Example($target);
        example.append();
    }

    module.exports.__id = 'example';
    module.exports.init = init;
});