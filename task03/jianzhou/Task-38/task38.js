/**
 * Created by jinjianzhou on 16/4/12.
 */
$(function () {
    $("tbody>tr:odd").addClass("odd");
    $("tbody>tr:even").addClass("even");
    $("thead th:gt(0)").click(function(event){
        var rowNum = this.getAttribute("value");
        var $students = $("tbody");
        var studentNum = $students.children().length;
        var dataArr = [];
        //将tbody数据取出,变成存储在二维数组里
        for(var i=0;i < studentNum; i++){
            var tempArr = [];
            var onePerson = $students.children().get(i);

            for(var j=0;j<5;j++){
                if(j==0){
                    tempArr[j] = onePerson.children[j].innerText;
                }else{
                    tempArr[j] = parseInt(onePerson.children[j].innerText);
                }

            }
            dataArr[i] = tempArr;
        }

        //重新排序
        if($('#change-btn').attr("order") == "descending"){
            sortData(dataArr,rowNum);
            console.log("降序来了");
        }else{
            console.log("升序来了");
            sortAscendingData(dataArr,rowNum);
        }

        $('tbody').html("");
        var tempHtml = "";
        for(var i=0;i<dataArr.length;i++){
            tempHtml += "<tr>"+ "<td>"+ dataArr[i][0]+"</td>" + "<td>"+ dataArr[i][1]+"</td>"+ "<td>"+ dataArr[i][2]+"</td>"+ "<td>"+ dataArr[i][3]+"</td>"+ "<td>"+ dataArr[i][4]+"</td>"+"</tr>"
        }
        $('tbody').html(tempHtml);
        $("tbody>tr:odd").addClass("odd");
        $("tbody>tr:even").addClass("even");

    });
    //根据数组,进行降序
    function sortData(data,tag) {
        data.sort(function(x,y){
            //降序
            if(x[tag] < y[tag]){
                return 1;
            }else if(x[tag] > y[tag]){
                return -1;
            }else {
                return 0;
            }
        });
        return data;
    }
    //根据数组,进行升序
    function sortAscendingData(data,tag) {
        data.sort(function(x,y){
            //升序
            if(x[tag] < y[tag]){
                return -1;
            }else if(x[tag] > y[tag]){
                return 1;
            }else {
                return 0;
            }
        });
        return data;
    }
    //升序还是降序的btn函数
    $('#change-btn').click(function(){
        if($(this).attr('order') == "ascending"){
            $(this).attr('order',"descending");
            $(this).html("change to ascending");
        }else{
            $(this).attr('order',"ascending");
            $(this).html("change to descending");
        }
    });
});