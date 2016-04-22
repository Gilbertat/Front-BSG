var app = app || {};

(function($){
    app.AppMainView = Backbone.View.extend({
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
        //测试用函数,完成后无用
        deleteAll:function(questionnaire){
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
        //点击"新建问卷"
        createOneQuestionnaire : function(){
            var questions = new app.Questions;
            var oneQuestionnaireDemo = {
                title: '这里修改标题',
                deadline :'',
                state: '编辑中',
                data: questions
            }
            app.questionnaires.create(oneQuestionnaireDemo);
//            this.$el.css("display",'none');

        },
        //这个函数,好像没用了.
        oneQuesDemo:function(){
            return {
                title: '这里修改标题',
                deadline :'',
                state: '编辑中'
            };
        }

    });

})(jQuery);

