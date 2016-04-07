/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}
/**生成随机色函数*/
function randomColor(){
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {
  "dayData" : {},
  "weekData" : {},
  "monthData" : {}
};

//city data
var dayData = {};
var weekAvg = {};
var monthAvg = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"//day/week/month;
}



/**
 * 渲染图表
 */
function renderChart() {
  var renderDiv = document.getElementsByClassName('aqi-chart-wrap')[0];
  var buf;
  var width = "";
  var cnt=0;
  if(pageState.nowGraTime==="day"){
    buf =chartData["dayData"];
  }
  else if(pageState.nowGraTime==="week"){
    buf =chartData["weekData"];
    width = "50px;";
  }
  else if(pageState.nowGraTime==="month"){
    buf =chartData["monthData"];
    width = "150px;";
  }
  else{
    return;
  }
  for(var i in buf){
    cnt++;
  }
  width = Math.floor((1/cnt)*100) + "%;";
  renderDiv.innerHTML = "";
  for(var i in buf){
    renderDiv.innerHTML += '<div '+'class="subdiv"'+'style="height:' + buf[i] + ';'+'width:'+width+'background-color:'+randomColor()+';'+'"' + 'title='+'"'+ i+':'+ 'AQI '+ buf[i] +'"'+ '>' + '</div>';
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  if(!this.checked || this.value === pageState.nowGraTime)
    return;
  // 设置对应数据

  //remember the choice
  pageState.nowGraTime = this.value;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var select = document.getElementById('city-select');
  var index = select.selectedIndex;
  if(index === pageState.nowSelectCity)
    return;
  pageState.nowSelectCity = index;
  // 设置对应数据
  // city data change
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm () {
  var radionBtns = document.getElementsByName('gra-time');
  for(var i=0;i<radionBtns.length;i++){
    radionBtns[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var select = document.getElementById('city-select');
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for(var i in aqiSourceData){
    var option = document.createElement('option');
    option.text = i;
    select.options.add(option);
  }
  // 默认第一项初始化选中
  select.options[0].selected = true;
  pageState.nowSelectCity = 0;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.onchange = citySelectChange;
}

function getTheDate(date){
  return new Date(date);
}

/*
生成多个月的week & month数据
dates:date-string
start:0
end:
 */
function getWeekAndMonAvg(dates,start,end){
  var weekDataSum = 0;
  var monthDataSum = 0;
  var weekIndex = 0;
  var monthIndex = 0;
  var isFinished = false;
  var nextDate = getTheDate(dates[start+1]);
  var weekdayCnt = 0;
  var monthdatCnt = 0;
  for(var i=start;i< end;i++){
    var curdate = getTheDate(dates[i]);
    if(i!=end){
      nextDate = getTheDate(dates[i+1]);
    }
    else{
      isFinished = true;
    }

    weekDataSum += dayData[dates[i]];
    monthDataSum += dayData[dates[i]];
    weekdayCnt++;
    monthdatCnt++;
    //get week data avg
    if(curdate.getDay() == 0 || isFinished){
      weekAvg[weekIndex] = weekDataSum/weekdayCnt;
      weekIndex++;
      weekDataSum = 0;
      weekdayCnt = 0;
    }
    //get month Data avg
    if(curdate.getMonth() != nextDate.getMonth() || isFinished){
      monthAvg[monthIndex] = monthDataSum/monthdatCnt;
      monthIndex++;
      monthDataSum = 0;
      monthdatCnt = 0;
    }
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  var index = 0;
  var select = document.getElementById('city-select');
  var radio = document.getElementsBy
  // 将原始的源数据处理成图表需要的数据格式

  // 获取 － city & data
  if(pageState.nowSelectCity != -1)
    index = pageState.nowSelectCity;
  var city = select.options[index].text;
  var cityDataString = JSON.stringify(aqiSourceData[city]);

  var pattern_date = /\d{4}-\d{2}-\d{2}/g;
  var matchs = cityDataString.match(pattern_date);

  // set day data
  for(var i=0;i<matchs.length;i++){
    dayData[matchs[i]] = Number(aqiSourceData[city][matchs[i]]);
  }
  // set week and month data
  getWeekAndMonAvg(matchs,0,matchs.length);
  // 处理好的数据存到 chartData 中
  chartData["dayData"] = dayData;
  chartData["weekData"] = weekAvg;
  chartData["monthData"] = monthAvg;
}



/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}
window.onload = function(){
  init();
}
