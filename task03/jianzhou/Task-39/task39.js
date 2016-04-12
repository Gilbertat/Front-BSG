/**
 * Created by jinjianzhou on 16/4/12.
 */
$(function () {
    $("tbody>tr:odd").addClass("odd");
    $("tbody>tr:even").addClass("even");

    $("table").each(function(){
        if($(this).find("thead").length > 0 && $(this).find("th").length >0){
            var $w = $(window),
                $t = $(this),
                $thead = $t.find('thead').clone();

            $t.wrap('<div class="sticky-wrap"/>')
            $t.after('<table class="sticky-thead" />');

            var $stickyHeadTable = $(this).siblings('.sticky-thead');
            var $stickyWrapDiv = $(this).parent('.sticky-wrap');

            $stickyHeadTable.append($thead);

            var setWidths = function(){
                $t.find('thead th').each(function(i){
                    //设置浮动的表格头和原先的宽度一样
                    $stickyHeadTable.find('th').eq(i).width($(this).width);
                });

                $stickyHeadTable.width($t.width())
                    .css({left:$t.offset().left});
            }
            //浮动的头部
            var repositionStickyHead = function(){
                var flag = ($w.scrollTop() > $t.offset().top)
                    && ($w.scrollTop() < ($t.offset().top + $t.outerHeight() -90));
                if(flag){
                    //需要这个浮动标题时
                    $stickyHeadTable.css({
                        opacity:1,
                        top:$w.scrollTop() - $t.offset().top
                    });
                }else{
                    $stickyHeadTable.css({
                        opacity:0,
                        top:0
                    });
                }
            }
            setWidths();

            $w.load(setWidths)
                .scroll($.throttle(250,repositionStickyHead))
                .resize($.debounce(250,function () {
                    setWidths();
                    repositionStickyHead();
                }));


        }
    });

});