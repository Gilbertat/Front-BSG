// number array
var ary = [];

/* btn click event */
function onClickAction () {
  var btnId = this.name;
  switch (btnId) {
    case "lf-in":
      aryChange(0, 0);
      break;
    case "lf-out":
      aryChange(1 , 0);
      break;
    case "rf-in":
      aryChange(0,1);
      break;
    case "rf-out":
      aryChange(1,1);
      break;
  }
}
/*
 btn click ,ary have different action
 inout: 0:in,1:out;
 direction: 0:left,1:right
 */
function aryChange(inout,direction) {
  var value = getInputValue();
  var isNum =  RegExp(/^[0-9]*$/);
  if(!value) return;
  if(!isNum.exec(value)){
    alert('only numbers!');
    return;
  }
  var num = Number(value);
  if(inout === 0){
    if(direction === 0){  // left
      ary.unshift(num);
      alert("从左侧进入"+num);
    }
    else{  //right
      ary.push(num);
      alert("从右侧进入"+num);
    }
  }
  else{
    if(direction === 0){
      var tmp = ary.shift();
      if(tmp == undefined){
        alert('队列已空');
      }
      else{
        alert('从左侧出去'+tmp);
      }
    }
    else{
      var tmp = ary.pop();
      if(tmp == undefined){
        alert('队列已空');
      }
      else{
        alert('从右侧出去'+tmp);
      }
    }
  }
  renderDiv();
}

// get input value
function getInputValue () {
  var textInput = document.getElementById('numberInput');
  return textInput.value==undefined?"":textInput.value;
}

function renderDiv(){
  var div = document.getElementById('array');
  div.innerHTML = "";
  for(var i=0;i<ary.length;i++){
    div.innerHTML += '<div>'+ary[i]+"</div>";
  }
}

function init () {
  var oInputs = document.getElementsByTagName('input');
  for(var i=0;i<oInputs.length;i++){
    if(oInputs[i].type == 'button'){
      oInputs[i].onclick = onClickAction;
    }
  }
}

window.onload = function(){
  init();
}
