import {getValue} from "../utils/objectUtil.js";

let template2Vnode = new Map();
let vnode2Template = new Map();
export function renderMixin(Due) {
    Due.prototype._render = function () {
        renderNode(this,this._vnode);
    }
}

export function renderNode(vm,vnode) {
    if (vnode.nodeType === 3){
        let templates = vnode2Template.get(vnode);
        if (templates){
            let result = vnode.text;
            for (let i = 0;i < templates.length;i ++){
                let templateValue = getTemplateValue([vm._data,vnode.env], templates[i]);
                if (templateValue){
                    result = result.replace("{{" + templates[i] + "}}", templateValue);
                }
            }
            vnode.elm.nodeValue = result;
        }
    }else{
        for (let i = 0;i < vnode.children.length;i ++){
            renderNode(vm,vnode.children[i]);
        }
    }
}
export function prepareRender(vm,vnode) {
    if (vnode == null){
        return;
    }
    if (vnode.nodeType === 3){
        analysisTemplateString(vnode);
    }
    if (vnode.nodeType === 1){
        for (let i = 0;i < vnode.children.length;i++){
            prepareRender(vm,vnode.children[i]);
        }
    }
}

function analysisTemplateString(vnode) {
    const templateStrList = vnode.text.match(/{{[a-zA-Z0-9._]+}}/g);
    for (let i = 0;templateStrList && i < templateStrList.length;i++) {
        setTemplate2Vnode(templateStrList[i],vnode);
        setVnode2Template(templateStrList[i],vnode);
    }
}

function setTemplate2Vnode(template,vnode) {
    let templateName = getTemplateName(template);
    let vnodeSet = template2Vnode.get(templateName);
    if (vnodeSet){
        vnodeSet.push(vnode);
    }else{
        template2Vnode.set(templateName,[vnode]);
    }
}

function setVnode2Template(template,vnode) {
    let templateSet = vnode2Template.get(vnode);
    if (templateSet){
        templateSet.push(getTemplateName(template));
    }else{
        vnode2Template.set(vnode,[getTemplateName(template)]);
    }
}

function getTemplateName(template) {
    //判断是否有花括号，如果有就去掉，如果没有就直接返回
    if (template.substring(0,2) === "{{" && template.substring(template.length - 2,template.length) === "}}"){
        return template.substring(2,template.length - 2);
    }else{
        return template;
    }
}

export function getTemplate2VnodeMap() {
    return template2Vnode;
}

export function getVnode2TemplateMap() {
    return vnode2Template;
}

function getTemplateValue(objs,templateName) {
    for (let i = 0;i < objs.length;i ++){
        let temp = getValue(objs[i],templateName);
        if (temp != null){
            return temp;
        }
    }
    return null;
}
