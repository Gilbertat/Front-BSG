/**
 * Created by jinjianzhou on 16/4/5.
 */

//创建指挥官
var commander = new Commander();

var mediator = new Mediator();

var oBtns = document.getElementById('buttons');

var oOutput = document.getElementById('outputs');

var oShips = document.getElementById('ships');
/** 改变创建飞船按钮的状态
 */
function changeCreateBtnStatus(target, status){
//    var status = target.getAttribute('data-status');
    if(status == 'create'){
        target.setAttribute('data-status','destroy');
        target.innerHTML = '销毁飞船';
        document.getElementById(target.id).nextElementSibling.removeAttribute('disabled');
    }else{
        target.setAttribute('data-status','create');
        target.innerHTML = '创建飞船';
        document.getElementById(target.id).nextElementSibling.setAttribute('disabled','disabled');
    }
}
/**
 改变创建飞行按钮的状态
 */
function changeFlyingBtnStatus(target, status) {
//    var status = target.getAttribute('data-status');
    if(status == 'stop'){
        target.setAttribute('data-status','start');
        target.innerHTML = '停止';
    }else{
        target.setAttribute('data-status','stop');
        target.innerHTML = '起飞';
    }
}

EventUtil.addHandler(oBtns,'click',function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var btnInnerHtml = target.innerHTML;
    var status = target.getAttribute('data-status');
    switch (target.id) {
        case 'btn01':
            changeCreateBtnStatus(target,status);
            if(status == 'create'){
                commander.createAirship(target);
            }else{
                commander.destroyAirship(target);
            }
            break;
        case 'btn02':
            changeFlyingBtnStatus(target,status);
            if(status == 'stop'){
                commander.startFlying(target);
            }else{
                commander.stopFlying(target);
            }
            break;

        case 'btn03':
            changeCreateBtnStatus(target,status);
            if(status == 'create'){
                commander.createAirship(target);
            }else{
                commander.destroyAirship(target);
            }
            break;
        case 'btn04':
            changeFlyingBtnStatus(target,status);
            if(status == 'stop'){
                commander.startFlying(target);
            }else{
                commander.stopFlying(target);
            }
            break;
        case 'btn05':
            changeCreateBtnStatus(target,status);
            if(status == 'create'){
                commander.createAirship(target);
            }else{
                commander.destroyAirship(target);
            }
            break;
        case 'btn06':
            changeFlyingBtnStatus(target,status);
            if(status == 'stop'){
                commander.startFlying(target);
            }else{
                commander.stopFlying(target);
            }
            break;
        case 'btn07':
            changeCreateBtnStatus(target,status);
            if(status == 'create'){
                commander.createAirship(target);
            }else{
                commander.destroyAirship(target);
            }
            break;
        case 'btn08':
            changeFlyingBtnStatus(target,status);
            if(status == 'stop'){
                commander.startFlying(target);
            }else{
                commander.stopFlying(target);
            }
            break;
    }

});


