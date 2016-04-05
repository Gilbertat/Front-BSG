/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.getElementById('aqi-city-input').value;
  var value = document.getElementById('aqi-value-input').value;
  if(city && value){
    aqiData[city] = value;
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var tb = document.getElementById('aqi-table');
  if(aqiData.length==0)return;

  //add table head
  tb.innerHTML = "";
  var tr = document.createElement('tr');
  tr.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
  tb.appendChild(tr);

  //table body
  var trs = tb.getElementsByTagName('tr');
  for(var i in aqiData){
    var td1 = document.createElement('td');
    td1.innerHTML = i;
    var td2 = document.createElement('td');
    td2.innerHTML = aqiData[i];
    var td3 = document.createElement('td');
    var btn = document.createElement('button');
    btn.bid = i; //btn unique id;
    btn.innerHTML = "删除";
    btn.onclick = delBtnHandle;
    td3.appendChild(btn);
    var tr = document.createElement('tr');
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tb.appendChild(tr);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  for(var i in aqiData){
    if(i===this.bid){
      delete aqiData[i];
    }
  }
  console.log()
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById('add-btn').onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var btns =  document.getElementById('aqi-table').getElementsByTagName('button');
    if(!btns || btns.length === 0)return;
    for(var i=0;i<btns.length;i++){
      if(!btns[i].onclick)
        btns[i].onclick = delBtnHandle1();
    }

}

window.onload = function(){
  init();
}
