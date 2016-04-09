/**
 * Created by jinjianzhou on 16/4/7.
 */
(function(){
    //ADS命名空间
    if(!window.ADS){ window['ADS'] = {}}

    function isCompatible(other){
        //以下方法必须都存在，否则返回false，能力检测
        if(other === false
            || !Array.prototype.push
            //Object.hasOwnProperty和Object.prototype.hasOwnProperty区别
            || !Object.hasOwnProperty
            || !document.createElement
            || !document.getElementsByTagName){
            return false;
        }
        return true;
    }

    window['ADS']['isCompatible'] = isCompatible;

    function $(){
        var elements = new Array();
        //查找作为参数提供的所有元素
        for(var i=0; i < arguments.length;i++){
            var element = arguments[i];
            //如果该参数是一个字符串，那就假设它是一个id
            if(typeof element == 'string'){
                element = document.getElementById(element);
            }
            if(arguments.length == 1){
                return element;
            }
            elements.push(element);
        }
        return elements;
    }
    window['ADS']['$'] = $;

    function addEvent(node, type, listener){
        if(!isCompatible()){return false}
        if(!(node = $(node))){return false}

        if(node.addEventListener){
            //W3C的方法
            node.addEventListener(type, listener,false);
            return true;
        }else{
            //IE的方法
            node['e'+type+listener] = listener;
            node[type+listener] = function(){
                node['e'+type+listener](window.event);
            }

            node.attachEvent('on'+type, node[type+listener]);
            return true;
        }
        return false;
    }
    window['ADS']['addEvent'] = addEvent;

    function removeEvent(node, type, listener){
        if(!isCompatible()){return false}
        if(!(node = $(node))){return false}

        if(node.removeEventListener){
            //W3C的方法
            node.removeEventListener(type, listener,false);
            return true;
        }else{
            //IE的方法
            node.detachEvent('on'+type, node[type+listener]);
            node[type+listener] = null;

            return true;
        }
        return false;
    }
    window['ADS']['removeEvent'] = removeEvent;

    function getElementsByClassName(className, tag, parent){
        parent = parent || document;
        if(!(parent = $(parent))){return false;}
        //查找所有匹配
        var allTags = (tag == '*' && parent.all)? parent.all : parent.getElementsByTagName(tag);
        var matchingElements = new Array();

        //创建一个正则表达式,来判断className
        className = className.replace(/\-/g, "\\-");
        var regex = new RegExp("(^|\\s)"+className + "(\\s|$)");

        var element;
        //检查每个元素
        for(var i=0; i<allTags.length; i++){
            element = allTags[i];
            if(regex.test(element.className)){
                matchingElements.push(element);
            }
        }
        //返回任何匹配的元素
        return matchingElements;
    }
    window['ADS']['getElementsByClassName'] = getElementsByClassName;

    function toggleDisplay(node, value){
        if(!(node = $(node))){return false;}

        if(node.style.display != 'none'){
            node.style.display = 'none';
        }else{
            node.style.display = value || '';
        }
        return true;
    }
    window['ADS']['toggleDisplay'] = toggleDisplay;

    function insertAfter(node, referenceNode){
        if(!(node = $(node))){return false;}
        if(!(referenceNode = $(referenceNode))){return false;}

        return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
    }
    window['ADS']['insertAfter'] = insertAfter;

    function removeChildren(parent){
        if(!(parent = $(parent))){ return false;}

        //当存在子节点时，删除该子节点
        while(parent.firstChild){
            parent.firstChild.parentNode.removeChild(parent.firstChild);
            //parent.removeChild(parent.firstChild); 这种方法行吗
        }

        return parent;
    }
    window['ADS']['removeChildren'] = removeChildren;

    /**加到父节点的第一个子节点*/
    function prependChild(parent, newChild) {
        if(!(parent = $(parent))){return false;}
        if(!(newChild = $(newChild))){return false;}

        if(parent.firstChild){
            parent.insertBefore(newChild,parent.firstChild);
        }else{
            parent.append(newChild);
        }
    }
    window['ADS']['prependChild'] = prependChild;

    //这个函数什么意思？pdf-37 这个方法是看返回document.getElementById(obj)是否为空，为空返回false；
    function exampleLibraryMethod(obj){
        if(!(obj = $(obj))) return false;
    //        ....
    }
    window['ADS']['exampleLibraryMethod'] = exampleLibraryMethod;

    function bindFunction(obj, func){
        return function(){
            func.apply(obj, arguments);
        }
    }
    window['ADS']['bindFunction'] = bindFunction;
}
)();


