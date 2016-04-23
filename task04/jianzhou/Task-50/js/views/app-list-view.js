var app = app || {};

(function($){
    app.AppMainView = Backbone.View.extend({
        el: '.main',
        events:{
            'click #new-questionnaire' : 'createOneQuestionnaire',
            'click #delete-all-questionnaire-checkbox' : 'deleteAllQuestionnaireCheck',
            'click #delete-all-questionnaire' : 'deleteSelectedQuestionnaire'
        },

        initialize : function(){
            this.$list = $('.questionnaire-list');
            this.listenTo(app.questionnaires,'add',this.addOne );
            this.listenTo(app.questionnaires,'reset',this.addAll );
//            {reset:true}
            app.questionnaires.fetch();

            $("#cancel-btn,#cover").click(function(){
                $("#cover").css("display","none");
                $(".pop-tip").css("display","none");
                $("body").css("overflow","visible");
            });

            $("#confirm-btn").click(function(){
                $("#cover").css("display","none");
                $(".pop-tip").css("display","none");
                $("body").css("overflow","visible");
                //通过绑定
                var tempQuestionnaire = app.questionnaires.get(this.getAttribute("cid"));
                //destroy会从服务器端删除这个问卷调查,同时触发事件
                tempQuestionnaire.destroy();
            });
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
                deadline :'2016-00-00',
                state: '编辑中',
                data: questions
            }
            app.questionnaires.create(oneQuestionnaireDemo);

        },
        deleteAllQuestionnaireCheck:function(){
            if($('#delete-all-questionnaire-checkbox').is(':checked') == true){
                console.log('check');
                $('input[name=questionnaire]'). prop("checked",true);
            }else{
                console.log('no-check');
                $('input[name=questionnaire]').prop("checked",false);
            }
        },
        deleteSelectedQuestionnaire:function(){
            console.log('delete-Selected-Questionnaire');
            $checkBox = $('input[name=questionnaire]');

            for(var i=($checkBox.length-1);i >= 0;i--){
//                console.log(app.questionnaires.at(i));
                if($checkBox.eq(i).is(':checked') == true){
                    console.log(i);
                    app.questionnaires.at(i).destroy();
                }
            }
        }
    });

})(jQuery);

