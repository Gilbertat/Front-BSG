/**
 * Created by jinjianzhou on 16/4/1.
 */
var citySchool = {
    'bj':['北京大学','清华大学','北京航空航天大学','北京师范大学'],
    'sh':['复旦大学','上海交通大学','同济大学','华东师范大学'],
    'gz':['中山大学','华南理工大学','暨南大学']
};

var oStudentRadio = document.getElementById('student');
var oNotStudentRadio = document.getElementById('not-student');

var oSchoolDiv =document.getElementById('school-div');
var oWorkDiv = document.getElementById('work-div');

var oSelectCity = document.getElementById('city');
var oSelectSchool = document.getElementById('city-school');

oNotStudentRadio.onclick = function(){
    oSchoolDiv.setAttribute('style', 'display:none');
    oWorkDiv.setAttribute('style', 'display:block');

};

oStudentRadio.onclick = function(){
    oWorkDiv.setAttribute('style', 'display:none');
    oSchoolDiv.setAttribute('style', 'display:block');
};

oSelectCity.onchange = function(){
    oSelectSchool.innerHTML = '';
    var schoolList = '';
    for(var i=0; i < citySchool[this.value].length; i++){
        schoolList += '<option>' + citySchool[this.value][i] +'</option>';
    }
    oSelectSchool.innerHTML = schoolList;
}
