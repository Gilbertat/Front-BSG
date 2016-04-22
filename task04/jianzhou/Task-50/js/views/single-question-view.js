/**
 * Created by jinjianzhou on 16/4/22.
 */
var app = app || {};
(function(){
    app.SingleQuestionView = Backbone.View.extend({
        tagName:'div',
        className:'question-single-div',
        template:_.template($('#single-question-template').html()),
        events:{
            //当题目的delete按钮按下时
            'click .delete': 'clearThisViewAndModel',
            'click .up':'up',
            'click .down':'down',
            'click .copy':'copy'
        },
        up:function(){
            $upBtns = $('.up');
            for(var i =0;i<$upBtns.length;i++){
                if($upBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($upBtns[i]).attr('num',i);
                }
            }
        },
        down:function(){
            $downBtns = $('.down');
            for(var i =0;i<$downBtns.length;i++){
                if($downBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($downBtns[i]).attr('num',i);
                }
            }
        },
        copy:function(){
            $copyBtns = $('.copy');
            for(var i =0;i<$copyBtns.length;i++){
                if($copyBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($copyBtns[i]).attr('num',i);
                }
            }
        },
        render:function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板,
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        clearThisViewAndModel:function(event){
            $deleteBtns = $('.delete');
            for(var i =0;i<$deleteBtns.length;i++){
                if($deleteBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($deleteBtns[i]).attr('num',i);
                }
            }
            this.model.destroy();
        }
    });
//    ==============================================
    app.MultiQuestionView = Backbone.View.extend({
        tagName:'div',
        className:'question-multi-div',
        template:_.template($('#multi-question-template').html()),
        events:{
            //当题目的delete按钮按下时
            'click .delete': 'clearThisViewAndModel',
            'click .up':'up',
            'click .down':'down',
            'click .copy':'copy'
        },
        up:function(){
            $upBtns = $('.up');
            for(var i =0;i<$upBtns.length;i++){
                if($upBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($upBtns[i]).attr('num',i);
                }
            }
        },
        down:function(){
            $downBtns = $('.down');
            for(var i =0;i<$downBtns.length;i++){
                if($downBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($downBtns[i]).attr('num',i);
                }
            }
        },
        copy:function(){
            $copyBtns = $('.copy');
            for(var i =0;i<$copyBtns.length;i++){
                if($copyBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($copyBtns[i]).attr('num',i);
                }
            }
        },
        render:function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板,
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        clearThisViewAndModel:function(event){
            $deleteBtns = $('.delete');
            for(var i =0;i<$deleteBtns.length;i++){
                if($deleteBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($deleteBtns[i]).attr('num',i);
                }
            }
            this.model.destroy();
        }
    });
//    ==============================================
    app.TextQuestionView = Backbone.View.extend({
        tagName:'div',
        className:'question-text-div',
        template:_.template($('#text-question-template').html()),
        events:{
            'click .delete': 'clearThisViewAndModel',
            'click .up':'up',
            'click .down':'down',
            'click .copy':'copy'
        },
        up:function(){
            $upBtns = $('.up');
            for(var i =0;i<$upBtns.length;i++){
                if($upBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($upBtns[i]).attr('num',i);
                }
            }
        },
        down:function(){
            $downBtns = $('.down');
            for(var i =0;i<$downBtns.length;i++){
                if($downBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($downBtns[i]).attr('num',i);
                }
            }
        },
        copy:function(){
            $copyBtns = $('.copy');
            for(var i =0;i<$copyBtns.length;i++){
                if($copyBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($copyBtns[i]).attr('num',i);
                }
            }
        },
        render:function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板,
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        clearThisViewAndModel:function(event){
            $deleteBtns = $('.delete');
            for(var i =0;i<$deleteBtns.length;i++){
                if($deleteBtns[i] === event.target){
                    //将点击的第几题传给btn的num属性
                    $($deleteBtns[i]).attr('num',i);
                }
            }
            this.model.destroy();
        }
    });
})(jQuery);