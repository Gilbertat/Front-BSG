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
            'click #release-confirm-btn':'finalRelease',
            'click #release-cancel-btn':'cancelRelease'
        },
        initialize : function(){
            app.appMainView = new app.AppMainView();
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
            view.initCalendar();
            this.$main.css("display",'none');
            this.$outerEditQuestionnaireView.css("display","block");

        },
        //保存按钮,返回那个列表页面
        save :function(){
            this.$main.css("display",'block');
            this.$outerEditQuestionnaireView.css("display","none");
        },
        finalRelease:function(event){
            $("#cover").css("display","none");
            $(".pop-tip").css("display","none");
            $("body").css("overflow","visible");
            var tempQuestionnaire = app.questionnaires.get(event.target.getAttribute("cid"));
            tempQuestionnaire.set('deadline',$('#deadline').val());
            tempQuestionnaire.set('state','发布中');
            tempQuestionnaire.save();
            this.save();
        },
        cancelRelease:function(){
            $("#cover").css("display","none");
            $(".pop-tip").css("display","none");
//            $("body").css("overflow","visible");
        }
    });

})(jQuery);

