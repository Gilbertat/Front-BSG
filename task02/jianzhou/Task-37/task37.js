/**
 * Created by jinjianzhou on 16/4/12.
 */
$("#show-btn").click(function() {
    $("#cover").css("display","block");
    $(".pop-tip").css("display","block");
    $("body").css("overflow","hidden");
});

$(function(){
//        $("body").css("overflow","hidden");

    $("#confirm-btn,#cancel-btn,#cover").click(function(){
        $("#cover").css("display","none");
        $(".pop-tip").css("display","none");
        $("body").css("overflow","visible");
    });

    $(document).mousedown(function(event){
        var $div = $(".pop-tip");
        var distanceX = event.pageX - $div.position().left;
        var distanceY = event.pageY - $div.position().top;
        var halfDivWidth = $div.innerWidth()/2;
        var halDivHeight = $div.innerHeight()/2;
        $(document).mousemove(function(event){
            $div.offset({"left":event.pageX-distanceX-halfDivWidth,"top":event.pageY-distanceY-halDivHeight});
        });
        $(document).mouseup(function(){
            $(document).unbind("mousemove");
        });
    });

    $(".pop-tip").mousedown(function(event){
        var $div = $(".pop-tip");
        var divWidth = $div.innerWidth();
        var divHeight = $div.innerHeight();
        var divLeftDis = $div.position().left-(divWidth/2);
        var divTopDis = $div.position().top-(divHeight/2);
        var divWidth = $div.innerWidth();
        var divHeight = $div.innerHeight();
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        var tag = 0x0;
        if(mouseX < (divLeftDis+10)){
            tag += 0x8;
        }
        if(mouseX > (divLeftDis+divWidth-10)){
            tag += 0x4;
        }
        if(mouseY < (divTopDis+10)){
            tag += 0x2;
        }
        if(mouseY > (divTopDis+divHeight-10)){
            tag += 0x1;
        }
        if(tag){
            event.stopPropagation();
        }
        $(document).mousemove(function(event){
            if(tag){

                switch (tag) {
                    case 0x8://选中左边
                        $div[0].style.width = divWidth - (event.pageX - mouseX) + 'px';
                        $div[0].style.left = divLeftDis + (event.pageX - mouseX) +150 + 'px';
                        break;
                    case 0x4: //选中右边
                        $div[0].style.width = divWidth + (event.pageX - mouseX) + 'px';
                        break;
                    case 0x2://选中上边
                        $div[0].style.height = divHeight - (event.pageY - mouseY) + 'px';
                        $div[0].style.top = divTopDis + (event.pageY - mouseY) +100 + 'px';
                        break;
                    case 0x1://选中下边
                        $div[0].style.height = divHeight + (event.pageY - mouseY) + 'px';
                        break;
                    case 0xa://选中上边和左边
                        console.log("选中上边和左边");
                        $div[0].style.width = divWidth - (event.pageX - mouseX) + 'px';
                        $div[0].style.left = divLeftDis + (event.pageX - mouseX) +150 + 'px';

                        $div[0].style.height = divHeight - (event.pageY - mouseY) + 'px';
                        $div[0].style.top = divTopDis + (event.pageY - mouseY) +100 + 'px';
                        break;
                    case 0x6://选中上边和右边
                        console.log("选中上边和右边");
                        $div[0].style.height = divHeight - (event.pageY - mouseY) + 'px';
                        $div[0].style.top = divTopDis + (event.pageY - mouseY) +100 + 'px';
                        $div[0].style.width = divWidth + (event.pageX - mouseX) + 'px';
                        break;
                    case 0x9://选中下边和左边
                        console.log("选中下边和左边");
                        $div[0].style.height = divHeight + (event.pageY - mouseY) + 'px';
                        $div[0].style.width = divWidth - (event.pageX - mouseX) + 'px';
                        $div[0].style.left = divLeftDis + (event.pageX - mouseX) +150 + 'px';
                        break;
                    case 0x5://选中下边和右边
                        console.log("选中下边和右边");
                        $div[0].style.width = divWidth + (event.pageX - mouseX) + 'px';
                        $div[0].style.height = divHeight + (event.pageY - mouseY) + 'px';
                        break;
                }

                console.log("不能动了");
            }else{

                console.log('可以动啊');
            }
        });
        $(document).mouseup(function(){
            $(document).unbind("mousemove");
        });

//            return false;

    });
});