var app = app || {};

(function($){
    app.QuestionnaireView = Backbone.View.extend({
        tagName: 'tr',

        template: _.template($('#item-template').html()),
        events: {
            'click .destroy': 'clearConfirm',
            'click .edit':'edit'
        },
        initialize: function(){

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy',this.remove);
            this.listenTo(this.model,'remove',this.remove);
        },
        //render会在什么时候调用呢???
        render: function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板,
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        clearConfirm :function(){
            $("#cover").css("display","block");
            $(".pop-tip").css("display","block");
            $("body").css("overflow","hidden");
            $('#confirm-btn').attr("cid",this.model.cid);
            //要等待用户反馈,所以删除以下语句
//            this.model.destroy();
        },
        edit:function(){
            $('.edit').attr("cid",this.model.cid);
        }

    });
})(jQuery);