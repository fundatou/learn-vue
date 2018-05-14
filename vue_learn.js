function cb (val) {
    console.log('test');
}

class Vue {
    constructor(options) {
        this._data = options.data;
        this.observer(this._data);
    }
}

Vue.prototype.observer = function (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }

    Object.keys(value).forEach((key) => {
        this.definneReactive(value, key, value[key]);
    });
}

Vue.prototype.definneReactive = function (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            return val;
        },
        set: function reactiveSetter (newVal) {
            console.log(newVal, val);
            if (newVal === val) return;
            // 每次赋值之后更新 
            val = newVal;
            cb(newVal);
        }
    })
}

var test = new Vue({
    data: {
        test: '123'
    }
});
