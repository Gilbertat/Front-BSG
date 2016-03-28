/**
 * Created by jinjianzhou on 16/3/28.
 */
var arr = new Array();
var searchArr = new Array();
var oText = document.getElementById('inputText');
var oBoxs = document.getElementById('boxS');
var oSearchText = document.getElementById('search');
var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            //DOM2级方法
            //下列三个参数，1.要处理的事件名 2.作为事件处理程序的函数 3.一个布尔值
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            //IE方法
            element.attachEvent("on" + type, handler);
        }else {
            //DOM0级方法
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type, handler);
        }else {
            element["on" + type] = null;
        }
    },
    //JS高程抄的，什么意思呀！
    getEvent: function(event){
        return event ? event : window.event;
    },
    //
    getTarget: function(event){
        return event.target || event.srcElement;
    },

    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }  else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        } else{
            event.cancelBubble = true;
        }
    }

}
//
function addLeft(){

    if(oText.value == ''){
        alert("请输入点东西");
    }else{
        var tempArr = [];
        tempArr = oText.value.split(/[\,\，\、\s]+/);
        for(var o in tempArr){
            arr.unshift(tempArr[o]);
        }

    }
}
function addRight(){
    if(oText.value == ''){
        alert("请输入点东西");
    }else{
//        arr.push(oText[0].value);
        var tempArr = [];
        tempArr = oText.value.split(/[\,\，\、\s]+/);
        for(var o in tempArr){
            arr.push(tempArr[o]);
        }
    }

}
//当数据发生变化，重绘队列！
function redraw(){
    oBoxs.innerHTML = "";
    for(var i=0; i<arr.length; i++){
        oBoxs.innerHTML += '<div>' + arr[i] + '</div>';
    }
}

function init(){
    var oDiv = document.getElementById('btnS');
    EventUtil.addHandler(oDiv, "click", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        switch(target.id){
            case "btn1":
                addLeft();
                break;
            case "btn2":
                addRight();
                break;
            case "btn3":
                arr.shift();
                break;
            case "btn4":
                arr.pop();
                break;
            case "clearAll":
                arr = [];
                break;
            case "searchBtn":
                searchText(oSearchText.value);
                break;
        }
        if(target.id == "searchBtn"){

        }else{
            redraw();
        }

    });
}
function searchText(textNeedToSearch){
    searchArr = [];
    var pattern = eval('/' + textNeedToSearch + '/');
    var divs = oBoxs.getElementsByTagName('div');
    for(var o in arr){
        divs[o].setAttribute('style','background-color:none;');
    }
    for(var o in arr){
        var pattern = eval('/' + textNeedToSearch + '/');

        if(pattern.test(arr[o])){
            searchArr.push(o);
//            var matches = pattern.exec(arr[o]);
//            while(matches.lastIndex <= arr[o].length()){
//
//            }

            divs[o].setAttribute('style','background-color:red;');
        }
    }
    if(searchArr.length == 0){
        alert("没找到符合的");
    }else{
//        alert("找到了"+searchArr.length + "项");
    }

}
init();