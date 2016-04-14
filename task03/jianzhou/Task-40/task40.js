/**
 * Created by jinjianzhou on 16/4/14.
 */
$(function () {
    var $yearSelect = $('#data-select-head select[name="year"]');
    var firstYear = 2006;
    for(var i=0;i<20;i++){
        $yearSelect.append('<option value="' + (firstYear+i) + '">' + (firstYear+i) + '</option>');
    }

    //设置当月日历数据
    var nowTime = new Date();
    $('#year').val(nowTime.getFullYear());
    $('#month').val(nowTime.getMonth());

    $tbody =$('tbody');
    for(var i=0;i<6;i++){
        var tempTr = document.createElement('tr');
        for(var j=0;j<7;j++){
            var tempTd = document.createElement('td');
            tempTr.appendChild(tempTd);
        }
        $tbody.append(tempTr);
    }
    setEveryDay(nowTime.getFullYear(),nowTime.getMonth());

    //设置每个月的天数
    function setEveryDay(year,month){
        var $tds = $('tbody td');
        //当月下个月的前一天,就是本月最后一天
        var lastDayOfMonth = new Date(year,month+1,0);
        //当月第一天
        var firstDayOfMonth = new Date(year,month,1);
        //本月第一天是星期几
        var whatDayOfWeek = firstDayOfMonth.getDay();
        //月份天数
        var numOfDay = lastDayOfMonth.getDate();
        //设置当月数据
        $tds.each(function(){
            $(this).css({"color":"black","background-color":"white"});
        });
        for(var i=0;i < numOfDay; i++){
            $tds.eq(whatDayOfWeek+i).html(i+1)
                .click(function(){
                    $tds.each(function(){
                        $(this).css({"color":"black","background-color":"white"});
                    });
                    $('#day').val($('#year').val()+'-'+parseTwo((parseInt($('#month').val())+1))+'-'+parseTwo(parseInt($(this).html())));
                    $(this).css("color","red");
                });
        }
        //设置上月信息
        if(whatDayOfWeek > 0){
            var lastDayOfPrevMonth = new Date(year,month,0).getDate();
            for(var i=whatDayOfWeek-1;i>=0;i--){
                $tds.eq(i).html(lastDayOfPrevMonth--)
                    .css("color","darkgray");
            }
        }
        //设置下个月信息
        var j=1;
        for(var i=whatDayOfWeek+numOfDay;i<42;i++){
            $tds.eq(i).html(j++)
                .css("color","darkgray");
        }


    }
    $("#month,#year").change(function(){
        setEveryDay($('#year').val(),$('#month').val());
    });

    $('#left').click(function(){
        var month = parseInt($('#month').val());
        var year = parseInt($('#year').val());
        if(month == 0){
            $('#year').val(year-1);
            $('#month').val(11);
        }else{
            $('#month').val(month-1);
        }
        setEveryDay($('#year').val(),$('#month').val());
    });

    $('#right').click(function(){
        var month = parseInt($('#month').val());
        var year = parseInt($('#year').val());
        if(month == 11){
            $('#year').val(year+1);
            $('#month').val(0);
        }else{
            $('#month').val(month+1);
        }
        console.log($('#year').val(),$('#month').val());
        setEveryDay($('#year').val(),$('#month').val());
    });
    //将日与月,解析成两位数的
    function parseTwo(num){
        if(num < 10){
            return '0'+num;
        }else{
            return num;
        }
    }
});