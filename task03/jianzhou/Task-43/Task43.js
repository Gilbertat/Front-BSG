/**
 * Created by jinjianzhou on 16/4/15.
 */
$(function () {
    var imgArr = [
        'img/2.jpg',
        'img/1.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg'
    ];
    var imgTag = 1;
    $('#btn-prev').click(function(){
        if(imgTag == 1){
            imgTag = 6;
        }else{
            imgTag -= 1;
        }
        changeView();
    });
    $('#btn-next').click(function(){
        if(imgTag == 6){
            imgTag = 1;
        }else{
            imgTag += 1;
        }
        changeView();
    });

    function changeView(){
        $('#display-div').html('');
        var temptxt = '';
        for(var i=0; i < imgTag; i++){
            temptxt += "<img id='pic"+ (i+1) + "'" + "src=" +"'"+ imgArr[i]+"'"+">";
        }
        var newClass;
        switch (imgTag){
            case 1:
                newClass = 'display-one';
                break;
            case 2:
                newClass = 'display-two';
                break;
            case 3:
                newClass = 'display-three';
                break;
            case 4:
                newClass = 'display-four';
                break;
            case 5:
                newClass = 'display-five';
                break;
            case 6:
                newClass = 'display-six';
                break;
        }
        $('#display-div').html(temptxt);
        $('#display-div').removeClass()
            .addClass('display-div').addClass(newClass);

    }
});
