/**
 * Created by jinjianzhou on 16/4/5.
 */

function Commander() {
    //这个数组用于保存指挥官自己知道的飞船的情况，但是实际情况可能不是这样。
    this.airships = [null,null,null,null];
    this.airshipsNumbers = 0;
}

Commander.prototype = {
    constructor: Commander,

    createAirship : function(target){
        var num = target.getAttribute('btn-value');
        this.airships[num] = new Airship();
        this.airships[num].airShipId = num;
        oOutput.innerHTML += getNowFormatDate() + ': 成功创建飞船' + num + '号' + '\r\n';
        var tempShip = document.createElement('div');
        tempShip.id = 'ship'+num;
        tempShip.appendChild(document.createTextNode(this.airships[num].energyRatio));
        oShips.appendChild(tempShip);
    },

    //这个是以指挥官自己的视角看待的飞船的摧毁情况
    destroyAirship : function(target){
        var num = target.getAttribute('btn-value');
        this.airships[num] = null;
        var message = {
            id:target.getAttribute('btn-value'),
             command: 'destroy'
         };
        mediator.sendMessage(message);

    },

    //开始飞行
    startFlying : function(target){
        var message = {
            id:target.getAttribute('btn-value'),
            command: 'start'
        };
        mediator.sendMessage(message);
    },

    //停止飞行
    stopFlying : function(target){
        var message = {
            id:target.getAttribute('btn-value'),
            command: 'stop'
        };
        mediator.sendMessage(message);
    }
};
