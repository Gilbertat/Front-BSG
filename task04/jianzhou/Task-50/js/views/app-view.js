var app = app || {};
(function($){
    app.AppView = Backbone.View.extend({
        el: '.main',
        events:{
            'click #new-questionnaire' : 'createOneQuestionnaire'
        },

        initialize : function(){
            this.$list = $('.questionnaire-list');
            this.listenTo(app.questionnaires,'add',this.addOne );
            this.listenTo(app.questionnaires,'reset',this.addAll );

//            {reset:true}
            app.questionnaires.fetch();


        },
        deleteAll:function(questionnaire){
            console.log();
            questionnaire.destroy();
        },
        addOne : function(questionnaire){
            var view = new app.QuestionnaireView({model:questionnaire});
            this.$list.append(view.render().el);
        },
        addAll :function(){
            this.$list.html('');
            app.questionnaires.each(this.addOne,this);
        },
        createOneQuestionnaire : function(){
            app.questionnaires.create(this.oneQuesDemo());
        },
        oneQuesDemo:function(){
            return {
                title: '第一个问卷',
                deadline :'2016-10-10',
                state: '编辑中'
            };
        }

    });

})(jQuery);

