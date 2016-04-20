var app = app || {};

(function($){
    app.QuestionnaireView = Backbone.View.extend({
        tagName: 'tr',

        template: _.template($('#item-template').html()),
        events: {
            'click .destroy': 'clearConfirm'
        },
        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy',this.remove);
            this.listenTo(this.model,'remove',this.remove);
        },

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
//            this.model.destroy();
        }

    });
})(jQuery);