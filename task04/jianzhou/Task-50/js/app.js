/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	// kick things off by creating the `App`
	app.appview = new app.AppView();

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
        tempQuestionnaire.destroy();
//        app.questionnaires.remove(tempQuestionnaire);

    });

});
