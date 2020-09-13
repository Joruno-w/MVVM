import {constructorProxy} from "./proxy.js";
import {mount} from "./mount.js";
let uid = 0;
export function initMixin(Due) {
    Due.prototype._init = function (options) {
        const vm = this;
        vm.uid = uid ++;
        vm.isDue = true;
        //初始化data
        if (options && options.data){
            vm._data = constructorProxy(vm,options.data,'');
        }
        //初始化created方法
        if (options && options.created){
            vm._created = options.created;
        }
        //初始化methods
        if (options && options.methods){
            vm._methods = options.methods;
            for (const temp in options.methods) {
                vm[temp] = options.methods[temp];
            }
        }
        //初始化computed
        if (options && options.computed){
            vm._computed = options.computed;
        }
        //初始化el并挂载
        if (options && options.el){
            const rootDom = document.getElementById(options.el);
            mount(vm,rootDom);
        }
    }
}

