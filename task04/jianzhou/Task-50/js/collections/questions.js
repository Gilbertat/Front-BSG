/**
 * Created by jinjianzhou on 16/4/21.
 */
var app = app || {};

(function(){
    var Questions = Backbone.Collection.extend({

        model : app.Question,

        localStorage: new Backbone.LocalStorage('questions-backbone')

    });
    app.Questions = Questions;
})();