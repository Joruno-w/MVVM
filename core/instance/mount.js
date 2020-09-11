import VNode from "../Vdom/vnode.js";

export function initMount(Due) {
    Due.prototype.$mount = function (el) {
        let vm = this;
        let rootDom = document.getElementById(el);
        mount(vm,rootDom);
    }
}
export function mount(vm,elm) {
    //进行挂载
    vm._vnode = constructVNode(vm,elm,null);
    //进行预备渲染(建立渲染索引，通过模板找vnode,通过vnode找模板)

}
function constructVNode(vm,elm,parent) {//深度优先搜索
    let vnode = null;
    let children = [];
    let text = getNodeText(elm);
    let data = null;
    let nodeType = elm.nodeType;
    let tag = elm.nodeName;
    vnode = new VNode(tag,elm,children,text,data,parent,nodeType);
    let childs = vnode.elm.childNodes;
    for (let i = 0;i < childs.length; i++){
        let childNodes = constructVNode(vm,childs[i],vnode);
        if(childNodes instanceof VNode){
            vnode.children.push(childNodes);
        }else{
            vnode.children = [...vnode.children,...childNodes];
        }
    }
    return vnode;
}

function getNodeText(elm) {
    if (elm.nodeType === 3){
        return elm.nodeValue;
    }else{
        return '';
    }
}
