$(document).ready(function() {
	$("#mon0").click(function(){
		var mon0 = true
		var move = $("#mon0").detach();
		move.appendTo("#chosenChar");
		var rest = $("#mon1,#mon2,#mon3").detach();
		rest.appendTo("#enemies");

	});
	$("#mon1").click(function(){
		var move = $("#mon1").detach();
		move.appendTo("#chosenChar");
		var rest = $("#mon0,#mon2,#mon3").detach();
		rest.appendTo("#enemies");
	});
	$("#mon2").click(function(){
		var move = $("#mon2").detach();
		move.appendTo("#chosenChar");
		var rest = $("#mon0,#mon1,#mon3").detach();
		rest.appendTo("#enemies");
	});
	$("#mon3").click(function(){
		var move = $("#mon3").detach();
		move.appendTo("#chosenChar");
		var rest = $("#mon0,#mon1,#mon2").detach();
		rest.appendTo(".enemies");
		});









}) // end of document.ready function