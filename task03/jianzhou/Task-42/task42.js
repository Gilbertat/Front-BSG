/**
 * Created by jinjianzhou on 16/4/14.
 */
$(function () {
    //_select_2006年到2016年设置
    var $yearSelect = $('#data-select-head select[name="year"]');
    var firstYear = 2006;
    var selectOneDayOrTimeInterval = "single-day";
    var test = 0;
    var firstDay ;
    var secondDay ;
    for (var i = 0; i < 20; i++) {
        $yearSelect.append('<option value="' + (firstYear + i) + '">' + (firstYear + i) + '</option>');
    }
    $('#select-btn').click(function () {
        if ($(this).html() == "选择区间") {
            $(this).html("选择一天").attr('value', 'time-interval');
            selectOneDayOrTimeInterval = "time-interval";

        } else {
            $(this).html("选择区间").attr('value', 'single-day');
            selectOneDayOrTimeInterval = "single-day";
        }
        setEveryDay($('#year').val(), $('#month').val());
    });

    //初始化表格
    $tbody = $('tbody');
    for (var i = 0; i < 6; i++) {
        var tempTr = document.createElement('tr');
        for (var j = 0; j < 7; j++) {
            var tempTd = document.createElement('td');
            tempTr.appendChild(tempTd);
        }
        $tbody.append(tempTr);
    }
    //将日与月,解析成两位数的,公共函数
    function parseTwo(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }
    //设置当月日历数据
    var nowTime = new Date();
    $('#year').val(nowTime.getFullYear());
    $('#month').val(nowTime.getMonth());
    setEveryDay(nowTime.getFullYear(), nowTime.getMonth());

    //设置每个月的天数
    function setEveryDay(year, month) {

        var $tds = $('tbody td');
        //当月第一天
        var firstDayOfMonth = new Date(year, month, 1);
        //本月第一天是星期几
        var whatDayOfWeek = firstDayOfMonth.getDay();
        //月份天数
        var numOfDay = getNumOfDayOfOneMonth(parseInt(year),parseInt(month)+1);
        console.log(year,parseInt(month)+1,numOfDay);
        $tds.each(function () {
            $(this).css({"background-color":"white","color":"black"});
        });

        for (var i = 0; i < numOfDay; i++) {

            $tds.eq(whatDayOfWeek + i).html(i + 1)
            .unbind('click');
            if(secondDay == null){
                $tds.eq(whatDayOfWeek + i)
                    .click(function (event) {

                        if(selectOneDayOrTimeInterval == 'single-day'){
                            console.log('single-day');
                            //设置输入框的时间,同时把日历控件清除
                            $('#day').val($('#year').val() + '-' + parseTwo((parseInt($('#month').val()) + 1)) + '-' + parseTwo(parseInt($(this).html())));
                            $('#data-select').css("display", "none");
                        }else{
                            var clickDate = new Date($('#year').val(),$('#month').val(),$(this).html());

                            if(firstDay == null && secondDay == null){
                                firstDay = clickDate;
                                $(this).css({"background-color":"darkturquoise"});
                            }else if(secondDay == null && firstDay != null){
                                secondDay = clickDate;
                                //将两个时间,根据先后顺序进行调换
                                swatTwoTime(firstDay,secondDay);
                                $(this).css({"background-color":"darkturquoise"});
                                //将获得的数据写入时间框中.
                                $('#day').val(firstDay.getFullYear() + '-' + parseTwo((parseInt(firstDay.getMonth()) + 1)) + '-' + parseTwo(parseInt(firstDay.getDate()))
                                +' ~ '+secondDay.getFullYear() + '-' + parseTwo((parseInt(secondDay.getMonth()) + 1)) + '-' + parseTwo(parseInt(secondDay.getDate())) );
                                setEveryDay($('#year').val(), $('#month').val());
                            }else{

                            }

                        }
                    });
            }
        }

        //设置当月背景色
        if(firstDay != null && secondDay != null){
            $tds.each(function () {
                var tempDate = new Date(year,month,$(this).html());
                if(tempDate.getTime() == firstDay.getTime() || tempDate.getTime() == secondDay.getTime()){

                    $(this).css("background-color", "darkturquoise");
                }else if(tempDate.getTime() > firstDay.getTime() && tempDate.getTime() < secondDay.getTime()){
                    $(this).css("background-color", "rgb(237,244,249)");
                }else{

                }
            });

        }else if(firstDay != null){
            $tds.each(function(){
                var tempDate = new Date(year,month,$(this).html());

                if(tempDate.getTime() == firstDay.getTime()){
                    console.log(tempDate);
                    $(this).css("background-color", "darkturquoise");
                }
            });
        }else{

        }
        //设置上月信息
        if (whatDayOfWeek > 0) {
            var lastDayOfPrevMonth = new Date(year, month, 0).getDate();
            for (var i = whatDayOfWeek - 1; i >= 0; i--) {
                $tds.eq(i).html(lastDayOfPrevMonth--)
                    .css({"color":"darkgray","background-color":"white"});
            }
        }
        //设置下个月信息
        var j = 1;
        for (var i = whatDayOfWeek + numOfDay; i < 42; i++) {
            $tds.eq(i).html(j++)
                .css({"color":"darkgray","background-color":"white"});
        }
    }

    $("#month,#year").change(function () {
        setEveryDay($('#year').val(), $('#month').val());
    });

    $('#left').click(function () {
        var month = parseInt($('#month').val());
        var year = parseInt($('#year').val());
        if (month == 0) {
            $('#year').val(year - 1);
            $('#month').val(11);
        } else {
            $('#month').val(month - 1);
        }
        console.log($('#year').val(), $('#month').val());
        setEveryDay($('#year').val(), $('#month').val());
    });

    $('#right').click(function () {
        var month = parseInt($('#month').val());
        var year = parseInt($('#year').val());
        if (month == 11) {
            $('#year').val(year + 1);
            $('#month').val(0);
        } else {
            $('#month').val(month + 1);
        }
        console.log($('#year').val(), $('#month').val());
        setEveryDay($('#year').val(), $('#month').val());
    });

    //输入框触发事件
    $('#day').focus(function () {
        $(this).val("");
        firstDay = secondDay = null;
        setEveryDay($('#year').val(), $('#month').val());
        $('#data-select').css("display", "block");
    });

    function swatTwoTime(one,two){
        if(one.getTime() > two.getTime()){
            var temp = firstDay;
            firstDay = secondDay;
            secondDay = temp;
        }
    }
    function getNumOfDayOfOneMonth(year,month){
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
            return 31;
        }else if(month == 4 || month == 6 || month == 9 || month == 11){
            return 30;
        }else if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
            return 29;
        }else{
            return 28;
        }
    }
    $('#confirm-btn').click(function(){
        $('#data-select').css("display", "none");
    });

});