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
class Dep {
    constructor () {
        // 用来存放watcher对象的数组 
        this.subs = [];
    }

    // 在subs中添加一个watcher对象
    addSub (sub) {
        this.subs.push(sub);
    }

    // 通知所有watcher对象更新视图
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}

class Watcher {
    constructor () {
        Dep.tartget = this;
    }

    update () {
        console.log('update');
    }
}

Dep.tartget = null;
