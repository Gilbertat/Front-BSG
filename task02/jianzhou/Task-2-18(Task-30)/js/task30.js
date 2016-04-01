/**
 * Created by jinjianzhou on 16/3/31.
 */
var regName = /[^\x00-\xff]/;
var regPassport = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,12}$/;
var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var regPhone = /^1\d{10}$/;
var passwordflag = false;
var passwordcopy = null;
var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            //DOM2级方法
            //下列三个参数，1.要处理的事件名 2.作为事件处理程序的函数 3.一个布尔值
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            //IE方法
            element.attachEvent("on" + type, handler);
        }else {
            //DOM0级方法
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type, handler);
        }else {
            element["on" + type] = null;
        }
    },
    //JS高程抄的，什么意思呀！
    getEvent: function(event){
        return event ? event : window.event;
    },
    //
    getTarget: function(event){
        return event.target || event.srcElement;
    },

    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }  else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        } else{
            event.cancelBubble = true;
        }
    }
}
var descript = {'note1':'必填,长度为4～16个字符','note2':'必填,请输入数字、大写字母、小写字母、非字母4样中的三样长度6～12位',
               'note3':'请再次输入密码','note4':'请输入您的邮箱','note5':'请输入您的电话号码'};
function init(){
    var oForm = document.body;

    EventUtil.addHandler(oForm,"focusin",function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        switch(target.id){
            case "your-name":
                setupInput('your-name','note1');
                break;
            case "passport":
                setupInput('passport','note2');
                break;
            case "confirm-passport":
                setupInput('confirm-passport','note3');
                break;
            case "mail":
                setupInput('mail','note4');
                break;
            case "phone":
                setupInput('phone','note5');
                break;
        }
    });
    EventUtil.addHandler(oForm,"focusout",function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        switch(target.id){
            case "your-name":
                validatateName('note1');
                break;
            case "passport":
                passwordflag = validatePassword('note2');
                break;
            case "confirm-passport":
                validatePasswordCopy('note3');
                break;
            case "mail":
                validateEmail('note4');
                break;
            case "phone":
                validatePhone('note5');
                break;
        }
    });

}

function setupInput(inputID,spanID){
    var oInput = document.getElementById(inputID);
    var oSpan = document.getElementById(spanID);
    oInput.setAttribute('style','border-color:blue');
    oSpan.innerHTML = descript[spanID];
}

function validatateName(spanID){
    var oInput = document.getElementById('your-name');
    var oSpan = document.getElementById(spanID);
    var characterLength = 0;
    var str = oInput.value;
    str = trim(str);
    for(var i=0;i < str.length;i++){
        if(regName.test(str[i])){
            characterLength += 2;
        }else{
            characterLength += 1;
        }
    }
    if(characterLength > 3 && characterLength < 17){
        oSpan.innerHTML = '用户名可用';
        oInput.setAttribute('style','border-color:green');
        return true;
    }else{
        oSpan.innerHTML = '用户名不可用';
        oInput.setAttribute('style','border-color:red');
        return false;
    }
}
/*用于截取input－name的字符串*/
function trim(strs){
    strs = strs.replace(/^(\s|\u00A0)+/,'');
    for(var i=strs.length-1; i>= 0;i--){
        if(/\S/.test(strs.charAt(i))){
            strs = strs.substring(0, i+1);
            break;
        }
    }
    return strs;
}
init();
/*验证密码可用性*/
function validatePassword(spanID){
    var oInput = document.getElementById('passport');
    var oSpan = document.getElementById(spanID);
    var str = oInput.value;
    passwordcopy = null;
    if(regPassport.test(str)){
        oSpan.innerHTML = '密码可用';
        oInput.setAttribute('style','border-color:green');
        passwordcopy = str;
        return true;
    }else{
        oSpan.innerHTML = '密码不可用,请重新输入';
        oInput.setAttribute('style','border-color:red');
        return false;
    }
}
function validatePasswordCopy(spanID){
    var oInput = document.getElementById('confirm-passport');
    var oSpan = document.getElementById(spanID);
    var str = oInput.value;
//    if(passwordflag == false){
//
//    }
    if(str == passwordcopy){
        oSpan.innerHTML = '密码一致';
        oInput.setAttribute('style','border-color:green');
        return true;
    }else{
        oSpan.innerHTML = '密码不一致,请重新输入';
        oInput.setAttribute('style','border-color:red');
        return false;
    }
}
/*
*验证邮箱可用性*/
function validateEmail(spanID){
    var oInput = document.getElementById('mail');
    var oSpan = document.getElementById(spanID);
    var str = oInput.value;
    if(regEmail.test(str)){
        oSpan.innerHTML = '邮箱可用';
        oInput.setAttribute('style','border-color:green');
        return true;
    }else{
        oSpan.innerHTML = '邮箱不可用,请重新输入';
        oInput.setAttribute('style','border-color:red');
        return false;
    }
}
/*验证手机号码是否可用*/
function validatePhone(spanID){
    var oInput = document.getElementById('phone');
    var oSpan = document.getElementById(spanID);
    var str = oInput.value;
    if(regPhone.test(str)){
        oSpan.innerHTML = '手机号码可用';
        oInput.setAttribute('style','border-color:green');
        return true;
    }else{
        oSpan.innerHTML = '手机号码不可用,请重新输入';
        oInput.setAttribute('style','border-color:red');
        return false;
    }
}

var oBtn = document.getElementById('btn');
oBtn.onclick = function(){
    var flag1 = validatateName('note1');
    var flag2 = validatePassword('note2');
    var flag3 = validatePasswordCopy('note3');
    var flag4 = validateEmail('note4');
    var flag5 = validatePhone('note5');
    if(flag1 && flag2 && flag3 && flag4 && flag5 ){
        alert('提交通过');
    }else{
        alert('提交失败，请重新填写');
    }
};