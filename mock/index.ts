import Mock from 'mockjs';
import { MockParams } from './typing';
import { pathToRegexp } from 'path-to-regexp';

Mock.XHR.prototype.__send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function () {
    //console.log("-------------XHR------------",this.custom);

    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false;
        if (this.responseType) {
            this.custom.xhr.responseType = this.responseType;
        }
    }
    if (this.custom.requestHeaders) {
        const headers = {};
        for (let k in this.custom.requestHeaders) {
            headers[k.toString().toLowerCase()] = this.custom.requestHeaders[k];
        }
        this.custom.options = Object.assign({}, this.custom.options, { headers });
    }
    this.__send.apply(this, arguments);
};
Mock.XHR.prototype.proxy_open = Mock.XHR.prototype.open;
Mock.XHR.prototype.open = function () {
    let responseType = this.responseType;
    this.proxy_open(...arguments);
    if (this.custom.xhr) {
        if (responseType) {
            this.custom.xhr.responseType = responseType;
        }
    }
};

function __param2Obj__(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse('{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
        '"}');
}
function __XHR2ExpressReqWrapper__(handle) {
    return function (options) {
        let result = null;
        if (typeof handle === 'function') {
            const { body, type, url, headers } = options;
            let b = body;
            try {
                b = JSON.parse(body);
            }
            catch { }
            result = handle({
                method: type,
                body: b,
                query: __param2Obj__(url),
                headers,
            });
        }
        else {
            result = handle;
        }
        return Mock.mock(result);
    };
}


// 自动加载 Modules 下的所有 Mock 文件 , _开头的文件不会被加载
const files = require.context("./modules", false, /\.ts$/);
const modules: any = [];
files.keys().forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});


const mocks: any[] = []; 
Object.keys(modules).forEach((key) => {
    if (key.includes('/_')) {
        return;
    }
    // console.log("-------modulesKey-------",modules[key])
    mocks.push(...modules[key]);
});


// 设置延时时间, 指定被拦截的 ajax 请求的响应时间，单位是毫秒。
Mock.setup({
    timeout: '300-600',
});


export function mockXHR() {
    let i: MockParams;
    for (i of mocks) {
        //console.log("------------i--mocks--------",i.response);
        Mock.mock(new RegExp(i.url), i.type || 'get', __XHR2ExpressReqWrapper__(i.response));
    }
}

