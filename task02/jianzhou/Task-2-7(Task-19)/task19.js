/**
 * Created by jinjianzhou on 16/3/25.
 */
//程序需要的数据
var arr = new Array();

//for中的延时的等效写法开始
var i=1;
var timeID = null;
function insertSortDelay(){
    timeID = window.setInterval("delay()", 300);
}
function delay()
{
    if(i < arr.length)
    {
        if(arr[i] < arr[i-1]){
            var j = i-1;
            var oneDateNeedToPlace = arr[i];
            while(oneDateNeedToPlace < arr[j]){
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = oneDateNeedToPlace;
            redraw(i+1,j+1);
        }
        i++;
    }
    else
    {
        window.clearInterval(timeID);
    }
}
//for中的延时的等效写法结束

//插入排序算法
function insertSort(arr){
    for(var i=1; i < arr.length; i++){
        if(arr[i] < arr[i-1]){
            var j = i-1;
            var oneDateNeedToPlace = arr[i];
            while(oneDateNeedToPlace < arr[j]){
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = oneDateNeedToPlace;
        }
    }

}

//生成一个数字
function generateOneNum(){
    var tempData = parseInt(Math.random()*100);
    if (tempData < 10){
        generateOneNum();
        return;
    }
    arr.push(tempData);
}
//自动生成60个10～100之间的数据，存放在数组中。
function autoGenerateArrayData(arrayLength){
    arr = [];
    for(var i=0; i < arrayLength; i++){
        generateOneNum();
    }
}

var oText = document.getElementsByTagName('input');
var oBoxs = document.getElementById('boxS');

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


function addLeft(){
    if(arr.length >= 60){
        alert("超过60个了，对不起,不能再输入了");
        return;
    }
    if( /^\d+$/.test(oText[0].value)){
        if(oText[0].value < 10 || oText[0].value > 100){
            alert("请输入10~100的整数");
        }else{
            arr.unshift(oText[0].value);
        }

    }else{
        alert("请输入合法的整数");
    }
}
function addRight(){
    if(arr.length >= 60){
        alert("超过60个了，对不起,不能再输入了");
        return;
    }
    if(/^\d+$/.test(oText[0].value)){
        if(oText[0].value < 10 || oText[0].value > 100){
            alert("请输入10~100的整数");
        }else{
            arr.unshift(oText[0].value);

        }
    }else{
        alert("请输入合法的整数");
    }

}
//当数据发生变化，重绘队列！
function redraw(tag1,tag2){
    oBoxs.innerHTML = "";
    for(var i=0; i<arr.length; i++){
        var tripleHeight = 3 * arr[i];
        if((tag1 == i )||(tag2 == i )){
            oBoxs.innerHTML += '<div '+'style="height:' + tripleHeight +'px'+ ';'+'background-color:'+'green'+';'+'"' + '>' + arr[i] +'</div>';
        }else{
            oBoxs.innerHTML += '<div '+'style="height:' + tripleHeight +'px'+ ';'+'"' + '>' + arr[i] +'</div>';
        }
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
            case "btn5":
//                alert(123);
                autoGenerateArrayData(60);
                redraw();
                break;
            case "sort":
                insertSortDelay();
                i=1;
                timeID=null;
                break;

        }
        redraw(null,null);
    });
}
init();
