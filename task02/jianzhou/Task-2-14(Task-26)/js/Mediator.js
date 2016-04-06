/**
 * Created by jinjianzhou on 16/4/5.
 */
/**传播介质
 * @signal:介质接收到的信号
 * signal = {
 *      id:1
 *      command: 'stop' }*/
function Mediator(){
}
Mediator.prototype = {
    sendMessage : function(signal){
        //模拟信号丢失
        if(Math.random() > 0.003){
            for(var i=0; i< commander.airships.length; i++){
                if(commander.airships[i] != null){
                    commander.airships[i].receiveSystem(signal);
                }
            }
        }else{
            oOutput.innerHTML += getNowFormatDate() + ": 发送的信号丢失了" + '\r\n';
        }
    }
};