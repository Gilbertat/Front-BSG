var app = app || {};
(function(){
    var Questionnaires = Backbone.Collection.extend({

        model : app.Questionnaire,

        localStorage: new Backbone.LocalStorage('questionnaires-backbone')

    });

    app.questionnaires = new Questionnaires;

})();