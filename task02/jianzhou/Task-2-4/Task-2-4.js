/**
 * Created by jinjianzhou on 16/3/23.
 */
var oBtn = document.getElementById('add-btn');
var oTable = document.getElementById('aqi-table');
var oTextCity = document.getElementById('aqi-city-input');
var oTextValue = document.getElementById('aqi-value-input');
var aqiDataArr = new Array();
var tBody = document.createElement("tbody");
oTable.appendChild(tBody);


oBtn.onclick = function (){

    if((oTextCity.value == "")||(oTextValue.value == "")){
        alert("请输入城市名称与空气质量");
    }else{
        var tempArr = [oTextCity.value,oTextValue.value];
        aqiDataArr[aqiDataArr.length] = tempArr;
        renderAqiList();
    }
};

function renderAqiList(){

    var aqiDataArrLength = aqiDataArr.length;
    tBody.innerHTML = "";
    for(var tempRow=0; tempRow < aqiDataArrLength; tempRow++){
        tBody.insertRow(tempRow);
        tBody.rows[tempRow].insertCell(0);
        tBody.rows[tempRow].insertCell(1);
        tBody.rows[tempRow].insertCell(2);
        tBody.rows[tempRow].cells[0].appendChild(document.createTextNode(aqiDataArr[tempRow][0]));
        tBody.rows[tempRow].cells[1].appendChild(document.createTextNode(aqiDataArr[tempRow][1]));
        var tempBtn = document.createElement("button");

        tempBtn.owntag = tempRow;
        tempBtn.onclick = delBtnHandle;
        tempBtn.innerHTML = "删除" + tempRow;
        tBody.rows[tempRow].cells[1].appendChild(tempBtn);
    }

}

function delBtnHandle() {
    aqiDataArr.splice(this.owntag,1);
    renderAqiList();
}