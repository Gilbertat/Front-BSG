/**
 * Created by jinjianzhou on 16/4/22.
 */
var app = app || {};
(function(){
    app.SingleQuestionView = Backbone.View.extend({
        tagName:'div',
        template:_.template($('#single-question-template').html()),

        render:function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板,
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    app.MultiQuestionView = Backbone.View.extend({
        tagName:'div',
        template:_.template($('#multi-question-template').html()),

        render:function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板,
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    app.TextQuestionView = Backbone.View.extend({
        tagName:'div',
        template:_.template($('#text-question-template').html()),

        render:function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板,
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(jQuery);