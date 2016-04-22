/**
 * Created by jinjianzhou on 16/4/21.
 */
var app = app || {};

(function($){
    app.EditQuestionnaireView = Backbone.View.extend({
        tagName:'div',
        template: _.template($('#edit-questionnaire-template').html()),

        events:{
            'blur .questionnaire-title':'saveTitleToServer',
            'click .release' : 'release',
            'click .add-question':"addQuestion",
            'click .summit':"summitOneQuestion",
            'click #single':"chooseQuestionType",
            'click #multi':"chooseQuestionType",
            'click #text':"chooseQuestionType",
            //底下question界面冒泡上来的事件处理机制
            'click .delete':'deleteOneQuestion',
            'click .up':'up',
            'click .down':'down',
            'click .copy':'copy'
        },
        up:function(){
            var tempNum = parseInt(event.target.getAttribute('num'));
            //获取存储题目的数组
            var data = this.model.get('data');
            console.log(typeof tempNum);
            var tempQuestion = data[tempNum-1];
            data[tempNum-1] = data[tempNum];
            data[tempNum] = tempQuestion;
            console.log(data);
            var questions = new app.Questions(data);
            this.model.set('data',questions,{silent:true});
            this.model.save();
        },
        down:function(){
            var tempNum = parseInt(event.target.getAttribute('num'));
            //获取存储题目的数组
            var data = this.model.get('data');
            console.log(typeof tempNum);
            var tempQuestion = data[tempNum+1];
            data[tempNum+1] = data[tempNum];
            data[tempNum] = tempQuestion;
            console.log(data);
            var questions = new app.Questions(data);
            this.model.set('data',questions,{silent:true});
            this.model.save();
        },
        copy:function(){
            var tempNum = event.target.getAttribute('num');
            console.log('tempNum',tempNum);
            //获取存储题目的数组
            var data = this.model.get('data');
            var tempQuestion = data[tempNum];
            data.splice(tempNum ,0,tempQuestion);
            console.log(data);
            var questions = new app.Questions(data);
            this.model.set('data',questions,{silent:true});
            this.model.save();
        },
        initialize : function(){
            //用于存储三种不同类型的题目
            this.selectQuestionType = 'single';
            this.$addQuestionBtn = $('.add-question');
            //每添加一个问题,这个都会触发两次,一次由set触发,一次由save触发
            this.listenTo(this.model,'change:data',this.resetQuestion);

        },
        render:function(){
            if(this.model.changed.id !== undefined){
                return;
            }
            //将这个view节点的html设为模板
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        //标题一改,马上存储入远端
        saveTitleToServer:function(){
            this.$title = $(".questionnaire-title");
            var newTitle = this.$title.val();
            this.model.set('title',newTitle);
            this.model.save();
            console.log(newTitle);
        },
        //发布按钮的点击事件
        release:function(){
            this.model.set("state",'发布中');
            this.model.save();
        },
        //是增加题目区域可见
        addQuestion:function(){
            $('.question-select-type').css('display','block');
        },
        summitOneQuestion:function(){
            var type = this.selectQuestionType;

            //单项,多选,文本题的处理方式不同

            if(this.selectQuestionType != 'text'){
                var serial = $('#serial').val();
                var title = $('#title').val();
                var answer1 = $('#answer1').val();
                var answer2 = $('#answer2').val();
                var answer3 = $('#answer3').val();
                var answer4 = $('#answer4').val();
                var arr = [answer1,answer2,answer3,answer4];
                var oneQuestion = {
                    serial:serial,
                    questionTitle:title,
                    type:type,
                    alternativeAnswer:arr
                };
            }else{
                var serial = $('#text-serial').val();
                var title = $('#text-title').val();

                var oneQuestion = {
                    serial:serial,
                    questionTitle:title,
                    type:type,
                    alternativeAnswer:[]
                };
            }


            //由于存储的Questions-Collection在存储到远端时自动变成Array,所以只能重新再申明,赋值
            var data = this.model.get('data');
            var length = data.length;
            data[length] = oneQuestion;
            var questions = new app.Questions(data);
            this.model.set('data',questions,{silent:true});
            this.model.save();

//            console.log('--------存储到服务器前----------')
//            console.log(this.model.get('data'));
//            console.log(this.model.get('data'));
//            console.log('--------存储到服务器后----------')
        },
        chooseQuestionType:function(event){
            this.selectQuestionType = event.target.name;
            console.log(this.selectQuestionType);
            if(this.selectQuestionType != 'text'){

                $('#question-single-multi').css('display','block');
                $('#text-div').css('display','none');
            }else{
                $('#question-single-multi').css('display','none');
                $('#text-div').css('display','block');
            }
        },
        //每添加一道题目,就会调用这个方法
        resetQuestion:function(){
            //将题目列表清空
            $('#questions-list').html('');
//            console.dir(this.model.get('data'));

            var questionArr = this.model.get('data');
            if(questionArr.length < 1){
                return;
            }
            for(var i=0;i<questionArr.length;i++){
                this.addOneQuestion(questionArr[i]);
            }

        },
        addOneQuestion:function(question){

            if(question['type'] == 'single'){
                var oneQuestion = new app.Question({
                    serial:question['serial'],
                    questionTitle:question['questionTitle'],
                    type:question['type'],
                    alternativeAnswer:question['alternativeAnswer']
                });
                var view = new app.SingleQuestionView({model:oneQuestion});

                $('#questions-list').append(view.render().el);

            }else if(question['type'] == 'multi'){
                var oneQuestion = new app.Question({
                    serial:question['serial'],
                    questionTitle:question['questionTitle'],
                    type:question['type'],
                    alternativeAnswer:question['alternativeAnswer']
                });

                var view = new app.MultiQuestionView({model:oneQuestion});

                $('#questions-list').append(view.render().el);
            }else{
                var oneQuestion = new app.Question({
                    serial:question['serial'],
                    questionTitle:question['questionTitle'],
                    type:question['type']
                });

                var view = new app.TextQuestionView({model:oneQuestion});

                $('#questions-list').append(view.render().el);
            }
        },
        deleteOneQuestion:function(event){
            var deleteNum = event.target.getAttribute('num');
            //获取存储题目的数组
            var data = this.model.get('data');
            data.splice(deleteNum,1);
            var questions = new app.Questions(data);
            this.model.set('data',questions,{silent:true});
            this.model.save();
        }

    });

})(jQuery);
