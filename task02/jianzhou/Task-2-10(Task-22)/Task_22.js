/**
 * Created by jinjianzhou on 16/3/30.
 */

var preBtn = document.getElementById('pre');
var inBtn = document.getElementById('in');
var postBtn = document.getElementById('post');
var rootDiv = document.getElementById('a');
var rootNode = new TreeNode();
var oDivs = document.getElementsByTagName('div');
var arr = [];
var oBtns = document.getElementsByTagName('button');

function TreeNode(){
    this.data = null;
    this.left = null;
    this.right = null;
}
TreeNode.prototype.push = function(){

    arr.push(this.data.getAttribute('id'));
};
/*初始化数据，将根div传入根节点，遍历所有得div*/
function init(){
    rootNode.data = rootDiv;
    prepareAbc(rootNode);
}
/*遍历所有的子div*/
function prepareAbc(node){
//    console.dir(node);
    if(node.data.children.length == 2){
        var leftNode = new TreeNode();
        leftNode.data = node.data.firstChild;
        prepareAbc(leftNode);

        var rightNode = new TreeNode();
        rightNode.data = node.data.lastChild;
        prepareAbc(rightNode);

        node.left = leftNode;
        node.right = rightNode;
    }else if(node.data.children.length == 1){
        var leftNode = new TreeNode();
        leftNode.data = node.data.firstChild;
        prepareAbc(leftNode);
        node.left = leftNode;
    }else{
        //TBD
    }
}

function preOrder(node){
    if(node != null){
        node.push();
        preOrder(node.left);
        preOrder(node.right);
    }
}

function inOrder(node){
    if(node != null){
        inOrder(node.left);
        node.push();
        inOrder(node.right);
    }
}
function postOrder(node){
    if(node != null){
        postOrder(node.left);
        postOrder(node.right);
        node.push();
    }
}
/**
 * 这段是用来显示用的。
 * */
var count = 0;
var timeID = null;

function display(){
    timeID = window.setInterval("delay()",500);
}

function delay(){
    if(count < arr.length){

        for(var i=0;i< oDivs.length;i++) {
            oDivs[i].setAttribute('style', 'background-color:white');
        }
        var oDiv = document.getElementById(arr[count]);
        oDiv.setAttribute('style','background-color:red');

        if(count == (arr.length-1)){
            setTimeout('clearAllColor();',500);
        }
        count++;
    }else{
        window.clearInterval(timeID);
        count = 0;
        timeID = null;
        enAbleBtns();
    }
}
/*******************/
/*
* 清除所有div的背景色*/
function clearAllColor(){
    for(var i=0;i< oDivs.length;i++) {
        oDivs[i].setAttribute('style', 'background-color:white');
    }
}
preBtn.onclick = function(){
    arr=[];
    preOrder(rootNode);
    disableBtns();
    display();
};
inBtn.onclick = function(){
    arr=[];
    inOrder(rootNode);
    disableBtns();
    display();
};
postBtn.onclick = function(){
    arr=[];
    postOrder(rootNode);
    disableBtns();
    display();
};
/**
 * 开始遍历后禁用按钮*/
function disableBtns(){
    for(var z=0;z < oBtns.length;z++){
        oBtns[z].setAttribute('disabled',true);
    }
}
/**
 * 开始遍历结束后激活按钮*/
function enAbleBtns(){
    for(var z=0;z < oBtns.length;z++){
        oBtns[z].removeAttribute('disabled');
    }
}
init();

