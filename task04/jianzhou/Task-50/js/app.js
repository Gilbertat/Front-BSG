/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;
//var selectQuestionType = 'single';
$(function () {
	'use strict';

	// kick things off by creating the `App`
	app.appMainView = new app.AppMainView();
    app.appBodyView = new app.AppBodyView();

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

});
