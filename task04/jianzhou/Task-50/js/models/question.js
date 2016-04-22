/**
 * Created by jinjianzhou on 16/4/21.
 */
var app = app || {};
(function($){
    app.Question = Backbone.Model.extend({
        defaults:{
            serial:'',
            questionTitle:"",
            type:"",
            alternativeAnswer:[],
            answer:''
        }
    });

})(jQuery);