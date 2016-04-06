/**
 * Created by jinjianzhou on 16/4/5.
 */
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

};

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}