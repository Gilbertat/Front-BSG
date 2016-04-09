/**
 * Created by jinjianzhou on 16/4/8.
 */

//存储广度优先遍历的临时数组
var arr = [];
// 遍历后排序过的数组
var traversalArr = [];
var oBtns = document.getElementsByTagName('button');
var oBreadthBtn = ADS.$('breadth-first');
var oDeepBtn = ADS.$('deep-first');
var rootDiv = document.getElementById('a1');
var rootNode = new Node(rootDiv);

ADS.addEvent(oBreadthBtn,'click',function(){
    breadthFirstTraversal(rootNode);
    display();
});
ADS.addEvent(oDeepBtn,'click',function(){
    deepFirstTraversal(rootNode);
    display();
});

var oText = ADS.$('input-text');
var oSearchBreadthBtn = ADS.$('search-breadth-first');
var oSearchDeepBtn = ADS.$('search-deep-first');

var searchResult = [];

ADS.addEvent(oSearchBreadthBtn,'click',function(){
    for(var i=0;i<oBtns.length;i++){
        oBtns[i].disabled = 'disabled';
    }
    searchResult = [];
    deepFirstTraversal(rootNode);
    var arrLength = traversalArr.length;

    for(var i=0;i<arrLength;i++){
        var node = traversalArr[i];
        var oDiv = node.data;
        var mValue = oDiv.getAttribute('mvalue');
        if( mValue == oText.value){
            searchResult[searchResult.length] = oDiv.id;
        }
    }
    display();
    for(var i=0;i<oBtns.length;i++){
        oBtns[i].disabled = '';
    }
});

ADS.addEvent(oSearchDeepBtn,'click',function(){
    for(var i=0;i<oBtns.length;i++){
        oBtns[i].disabled = 'disabled';
    }
    searchResult = [];
    breadthFirstTraversal(rootNode);
    var arrLength = traversalArr.length;

    for(var i=0;i<arrLength;i++){
        var node = traversalArr[i];
        var oDiv = node.data;
        var mValue = oDiv.getAttribute('mvalue');
        if( mValue == oText.value){
            searchResult[searchResult.length] = oDiv.id;
        }
    }
    display();
    for(var i=0;i<oBtns.length;i++){
        oBtns[i].disabled = '';
    }
});

function Node(data){
    this.data = data;
    this.branches = new Array();
}

/**将html的嵌套div整成nodeTree;*/
function prepareNodeTree(node){
    var nodeChildren = node.data.children;
    for(var i=0;i<nodeChildren.length;i++){
        (function(num){
            node.branches[num] = new Node(nodeChildren[i]);
            prepareNodeTree(node.branches[num]);
        })(i);
    }
}

// 深度优先遍历
function deepFirstTraversal(node){
    traversalArr.unshift(node);
    for(var i=0;i<node.branches.length;i++){
        deepFirstTraversal(node.branches[i]);
    }
}

//广度优先遍历
function breadthFirstTraversal(rootNode){
    arr.unshift(rootNode);
    traversalArr.unshift(rootNode);
    while(arr.length > 0){
        var tempNode = arr.pop();
        for(var i=0;i<tempNode.branches.length;i++){
            arr.unshift(tempNode.branches[i]);
            traversalArr.unshift(tempNode.branches[i]);
        }
    }
}

/**显示函数*/
var count = 0;
var timeID = null;
function display(){
    for(var i=0;i<oBtns.length;i++){
        oBtns[i].disabled = 'disabled';
    }
    timeID = window.setInterval("delay()",200);
}
var oDivs = document.getElementsByTagName('div');
function delay(){
    if(count < oDivs.length){
        for(var i=0;i< oDivs.length;i++) {
            oDivs[i].setAttribute('style', 'background-color:white');
        }
        var node = traversalArr.pop();
        var oDiv = node.data;
        oDiv.setAttribute('style','background-color:red');

        if(count == (oDivs.length-1)){
            setTimeout('clearAllColor();',200);
        }
        count++;
    }else{
        window.clearInterval(timeID);
        count = 0;
        timeID = null;
        for(var i=0;i<oBtns.length;i++){
            oBtns[i].disabled = '';
        }


    }
}
/**显示函数结束*/

/** 清除所有div的背景色*/
function clearAllColor(){
    for(var i=0;i< oDivs.length;i++) {
        oDivs[i].setAttribute('style', 'background-color:white');
    }
    if(searchResult.length > 0){
        execFinal();
    }else{
        alert('没有符合的结果');
    }
}

function execFinal(){
    for(var i=0;i< searchResult.length;i++){
        var onDiv = ADS.$(searchResult[i]);
        onDiv.setAttribute('style','background-color:red');
    }
}
prepareNodeTree(rootNode);

