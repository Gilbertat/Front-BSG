/**
 * Created by jinjianzhou on 16/4/20.
 */
var app = app || {};

(function($){
    app.AppBodyView = Backbone.View.extend({
        el: 'body',
        events:{
            'click .edit': 'changeToEditView',
            'click .save': 'save',
            'click .release': 'save'
        },
        initialize : function(){
            this.$main = $('.main');
            this.$outerEditQuestionnaireView = $('.outer-edit-questionnaire');

            this.listenTo(app.questionnaires,'add',this.newToEditView);
        },
        newToEditView : function(questionnaire){
            this.$main.css("display",'none');
            this.$outerEditQuestionnaireView.css("display","block");
            var view = new app.EditQuestionnaireView({model:questionnaire});
            this.$outerEditQuestionnaireView.html(view.render().el);
            app.editQuestionnaireView = view;
        },
        //当点击编辑按钮时的逻辑处理
        changeToEditView : function(event){
            var tempQuestionnaire = app.questionnaires.get(event.target.getAttribute('cid'));
            var view = new app.EditQuestionnaireView({model:tempQuestionnaire});
            this.$outerEditQuestionnaireView.html(view.render().el);
            view.resetQuestion();
            this.$main.css("display",'none');
            this.$outerEditQuestionnaireView.css("display","block");

        },
        //保存按钮,返回那个列表页面
        save :function(){
            this.$main.css("display",'block');
            this.$outerEditQuestionnaireView.css("display","none");
        }


    });

})(jQuery);

