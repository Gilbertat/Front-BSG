
var app = app || {};
(function () {

    app.Questionnaire = Backbone.Model.extend({

        defaults: {
            title: '',
            deadline :'',
            state: '',
            data:null
        }
    });
})();