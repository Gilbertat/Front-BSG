/**
 * Created by jinjianzhou on 16/4/5.
 */

function Airship(number){
    this.airShipId = null;
    this.isFlying = false;
    this.energyRatio = 100;
    this.timeID = null;
}

Airship.prototype = {

    constructor: Airship,

    receiveSystem: function(signal){

        if(signal.id == this.airShipId){
            switch (signal.command){
                case 'destroy':
                    this.destroySystem();
                    break;
                case 'start':
//                    changeFlyingBtnStatus(oBtn, status);
                    window.clearInterval(this.timeID);
                    this.flying();
                    break;
                case 'stop':
//                    changeFlyingBtnStatus(oBtn, status);
                    window.clearInterval(this.timeID);
                    this.stopAndCharging();
                    break;
            }

        }
    },

    destroySystem: function (){
        oOutput.innerHTML += getNowFormatDate() + ': 飞船'+ this.airShipId + '号' + '成功销毁' + '\r\n';
    },

    flying : function(){
        oAirshipDiv = document.getElementById('ship'+this.airShipId);
        oAirshipDiv.style.animationPlayState = 'running';
        oOutput.innerHTML += getNowFormatDate() + ': 飞船'+ this.airShipId + '号' + '起飞' + '\r\n';
        var That = this;
        this.setEnergyReduceFunc(That);
    },

    stopAndCharging : function(){
        oAirshipDiv = document.getElementById('ship'+this.airShipId);
        oAirshipDiv.style.animationPlayState = 'paused';
        oOutput.innerHTML += getNowFormatDate() + ': 飞船'+ this.airShipId + '号' + '开始充电' + '\r\n';
        var That = this;
        this.setEnergyChargingFunc(That);
    },

    setEnergyReduceFunc :function(That){
        this.timeID = setInterval(function(){(function (That){That.delay(That);})(That)}, 1000);

    },

    delay : function(that){
            console.log('正在耗能');
            console.log(that);
            if(that.energyRatio > 0){
                that.energyRatio = that.energyRatio - 20;
                document.getElementById('ship'+that.airShipId).innerHTML = that.energyRatio;
            }else{
                window.clearInterval(that.timeID);
                that.stopAndCharging();

                var btn = 'btn'+'0'+(parseInt(that.airShipId)+1)*2;
                var oBtn =  document.getElementById(btn);
                oBtn.setAttribute('data-status','stop');
                oBtn.innerHTML = '起飞';
            }
    },

    setEnergyChargingFunc :function(That){

        this.timeID = setInterval(function(){(function (That){That.delay2(That);})(That)}, 1000);

    },

    delay2 : function(that){
        console.log('正在充电');
        console.log(that);

        if(that.energyRatio < 100){
            that.energyRatio = that.energyRatio + 10;
            document.getElementById('ship'+that.airShipId).innerHTML = that.energyRatio;
        }else{
            window.clearInterval(that.timeID);

            var btn = 'btn'+'0'+(parseInt(that.airShipId)+1)*2;
            var oBtn =  document.getElementById(btn);
            oBtn.setAttribute('data-status','stop');
            oBtn.innerHTML = '起飞';

        }
    }
}