class EventEmeitter {
    constructor () {
        this._events = this._events || new Map();
        this._maxListeners = this._maxListeners || 10; 
    }
}

EventEmeitter.prototype.emit = function (type, ...args) {
    let handler;
    handler = this._events.get(type);
    if (Array.isArray(handler)) {
        // 如果是一个数组说明有多个监听者，需要依次触发里面的函数 
        for (let i = 0; i < handler.length; i++) {
            if (args.length > 0) {
                handler[i].apply(this, args);
            } else {
                handler[i].call(this);
            }
        }
    } else {
        if (args.length > 0) {
            handler.apply(this, args);
        } else {
            handler.call(this);
        }
    }
    return true;
}

EventEmeitter.prototype.addListener = function (type, fn) {
    const handler = this._events.get(type);
    if (!handler) {
        this._events.set(type, fn);
    } else if (handler && typeof handler === 'function') {
        //    多个监听者需要用数组存储 
        this._events.set(type, [handler, fn]);
    } else {
        handler.push(fn);
    }
};

EventEmeitter.prototype.removeListener = function(type, fn) {
    const handler = this._events.get(type);
    if (handler && typeof handler === 'function') {
        this._events.delete(type, fn);
    } else {
        let position;
        for (let i = 0; i < handler.length; i++) {
            if (handler[i] === fn) {
                position = i;
                break;
            } else {
                position = -1;
                break;
            }
        }
        
        if (position !== -1) {
            handler.splice(position, 1);

            if (handler.length === 1) {
                this._events.set(type, handler[0]);
            }
        } else {
            return this;
        }
    }
}

const emitter = new EventEmeitter();

// 匿名函数无法被移除 
emitter.addListener('test', man => {
    console.log(`haha${man}`);
});
emitter.addListener('test', man => {
    console.log(`1${man}`);
});
emitter.addListener('test', man => {
    console.log(`2${man}`);
});

emitter.emit('test', 'lalala');