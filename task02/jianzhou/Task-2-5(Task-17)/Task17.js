/**
 * Created by jinjianzhou on 16/3/24.
 */

/**这个参数是aqiSourceData的字符串*/
var oShowDiv = document.getElementsByClassName('aqi-chart-wrap');
/**生成随机色函数*/
function randomColor(){
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
}


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
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
// 以上两个函数用于随机模拟生成测试数据

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

// 用于渲染图表的数据   记录当前页面的表单选项
var currentCity = '北京';
var currentGraTime = 'day';
var currentCityAndData = new Array();
var currentCityDataMonthFormat = new Array();
var currentCityDataWeekFormat = new Array();

/**
 * 渲染图表
 */
function renderChart() {
    if(currentGraTime === 'day'){
        oShowDiv[0].innerHTML = "";
        for(var i=0; i < currentCityAndData.length; i++){
            oShowDiv[0].innerHTML += '<div '+'style="height:' + currentCityAndData[i][1] + ';'+'background-color:'+randomColor()+';'+'"' + 'title='+'"'+ currentCityAndData[i][0]+':'+ 'AQI '+ currentCityAndData[i][1] +'"'+ '>' + '</div>';
        }
    }else if(currentGraTime === 'week'){
        oShowDiv[0].innerHTML = "";
        for(var i=0; i < currentCityDataWeekFormat.length; i++){
            oShowDiv[0].innerHTML += '<div '+'style="height:' + currentCityDataWeekFormat[i] + ';'+'width:'+'50px'+';'+'background-color:'+randomColor()+';'+'"' + 'title='+'"'+ '2016年'+ (i+1) +'周' +':'+ '平均AQI '+ currentCityDataWeekFormat[i] +'"'+ '>' + '</div>';
        }
    }else{
        oShowDiv[0].innerHTML = "";
        for(var i=0; i < currentCityDataMonthFormat.length; i++){
            oShowDiv[0].innerHTML += '<div '+'style="height:' + currentCityDataMonthFormat[i] + ';'+'width:'+'150px'+';'+'background-color:'+randomColor()+';'+'"' + 'title='+'"'+ '2016年'+ (i+1) +'月' +':'+ '平均AQI '+ currentCityDataMonthFormat[i] +'"'+ '>' + '</div>';
        }
    }

}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
    if(currentGraTime === this.value){
        return;
    }else{
        // 设置对应数据
        currentGraTime = this.value;
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
//    alert(this.value);
    // 确定是否选项发生了变化
    if(currentCity === this.value){
        return;
    }else{
        // 设置对应数据
        initAqiChartData(this.value);
        // 调用图表渲染函数
        oShowDiv[0].innerHTML = "";
        renderChart();
    }

}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 * 当点击时，调用函数citySelectChange
 */
function initGraTimeForm() {

    var oGraTime = document.getElementsByName('gra-time');
    oGraTime[0].onchange = graTimeChange;
    oGraTime[1].onchange = graTimeChange;
    oGraTime[2].onchange = graTimeChange;

    var oSelectedCity = document.getElementById('city-select');
    oSelectedCity.onchange = citySelectChange;
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var aqiSourceDataString = JSON.stringify(aqiSourceData);
    var oAqiCities = document.getElementById('city-select');
    var patternCity = /[\u4e00-\u9fa5]{2,5}(?=")/g;
    var matchesCities = aqiSourceDataString.match(patternCity);
    for(var o in matchesCities){
        oAqiCities.innerHTML += '<option>' + matchesCities[o] + '</option>';
    }

}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(cityName) {
    currentCity = cityName;

    var singleCityDataString = JSON.stringify(aqiSourceData[cityName]);
    var pattern1 = /\d{4}-\d{2}-\d{2}/g;
    var matches = singleCityDataString.match(pattern1);

    for(var i=0;i < matches.length; i++ ){
        var tempArr = new Array();
        tempArr[0] = matches[i];
        tempArr[1] = aqiSourceData[cityName][matches[i]];
        currentCityAndData[i] = tempArr;
    }
    //计算一月份的平均数据
    var tempMonthTotal = 0;
    for(var i=0;i < 31; i++){
        tempMonthTotal += currentCityAndData[i][1];
    }
    currentCityDataMonthFormat[0] =  parseInt(tempMonthTotal/31.0);

    //计算二月份的平均数据
    tempMonthTotal = 0;
    for(var i=31;i < 60; i++){
        tempMonthTotal += currentCityAndData[i][1];
    }
    currentCityDataMonthFormat[1] = parseInt(tempMonthTotal/29.0);
    //计算三月份的平均数据
    tempMonthTotal = 0;
    for(var i=60;i < 91; i++){
        tempMonthTotal += currentCityAndData[i][1];
    }
    currentCityDataMonthFormat[2] = parseInt(tempMonthTotal/31.0);

    //以周计算数据
    var tempWeekTotal = 0;
    currentCityDataWeekFormat[0] = parseInt((currentCityAndData[0][1] + currentCityAndData[1][1])/2);
    var flag = 0;
    var weekFlag = 1;
    for(var i=2; i < currentCityAndData.length-5; i++){
        flag++;  //2:1  3:2  4:3 5:4  6:5 7:6 8:7
        tempWeekTotal += currentCityAndData[i][1];
        if(flag >= 7){
            flag=0;
            currentCityDataWeekFormat[weekFlag] = parseInt(tempWeekTotal/7);
            tempWeekTotal = 0;
            weekFlag++;
        }
    }
    tempWeekTotal = 0;
    for(var i=86;i < currentCityAndData.length; i++){
        tempWeekTotal += currentCityAndData[i][1];
    }
    currentCityDataWeekFormat[13] = parseInt(tempWeekTotal/5);
//    alert(currentCityDataWeekFormat[0]);
}


function init(){
    initGraTimeForm();
    initCitySelector();
    initAqiChartData(currentCity);
    renderChart();
}
init();