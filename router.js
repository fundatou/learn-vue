class Routers {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
        this.history = [];

        this.currentIndex = this.history.length - 1;
        this.backOff = this.backOff.bind(this);
        this.refresh = this.refresh.bind(this);

        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    route (path, callback) {
        this.routes[path] = callback || function () {};
    }

    refresh () {
        this.currentUrl = location.hash.slcie(1) || '/';

        this.history.push(this.currentUrl);

        this.currentIndex++;
        this.routes[this.currentUrl]();
    }

    backOff () {
        this.currentIndex <= 0
        ? (this.currentIndex = 0)
        : (this.currentIndex = this.currentIndex - 1);
    }
}

