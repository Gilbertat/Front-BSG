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
    case "buble-sort":
      randomSort();
      break;
    case "random-gen":
      randomGen(60);
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
  if(num<10 || num >100){
    alert('10~100');
    return;
  }
  if(ary.length>=60){
    alert('array 最多 60个');
    return;
  }
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

// gen num counts of random int between 10 and 100
function randomGen(num){
  ary = [];
  for(var i=0;i<num;i++){
    ary.push(getRandomInt(10,100));
  }
  renderDiv();
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function renderDiv(pos){
  var div = document.getElementById('array');
  div.innerHTML = "";
  for(var i=0;i<ary.length;i++){
    if(pos && pos === i){
      div.innerHTML += '<div '+'style="background-color: #880;height:' + ary[i] +'px'+ ';'+'"' + '>' + ary[i] +'</div>';
    }
    else {
      div.innerHTML += '<div '+'style="background-color: #f00;height:' + ary[i] +'px'+ ';'+'"' + '>' + ary[i] +'</div>';
    }
  }
}

var isSorting = false;

function randomSort(){
  var timer = null;
  var i=0,j=0;
  var len = ary.length;
  if(isSorting)
    return;
  timer = setInterval(animate,30);

  function animate(){
    isSorting = true;
    var head = 0;
    if(i<len){
      if(j<len){
        if(ary[i]>ary[j]){
          head = ary[i];
          ary[i] = ary[j];
          ary[j] = head;
          renderDiv(j);
        }
        j++;
      }
      else{
        i++;
        j=i+1;
      }
    }
    else{
      isSorting = false;
      clearInterval(timer);
      return;
    }

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
