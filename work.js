
const LOGGEDOUT = 0;
const LOGGEDIN = 1;

getCredentials(function (username, password) {
	getUsageData();
	console.log(username, password);
	if (getState() == LOGGEDOUT && username && password) {
		console.log(username, password);
			createSession(username, password);
	}
});

$(document).ready(function () {
	$('.ui.checkbox').checkbox();
	$(".signin").click(function (event) {
		console.log("here");
		event.preventDefault();
		var username = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();
		var submit_success = true;
		if(username == "") {
			$('.err_username').removeClass('hidden');
			submit_success = false;
		}
		if(password == "") {
			$('.err_password').removeClass('hidden');
			submit_success = false;
		}
		if(!submit_success) {
			return;
		}
		showLoader()
		scalePopupHeight();
		var save = $('.ui.checkbox input').is(':checked');
		if(save) {
			saveCredentials(username, password, createSession);
		} else {
			createSession(username, password);
		}
	});

	$('input[name="username"]').keyup(function () {
		var username = $('input[name="username"]').val();
		if(username != "") {
			$('.err_username').addClass('hidden');
		}
		scalePopupHeight();
	});

	$('input[name="password"]').keyup(function () {
		var password = $('input[name="password"]').val();
		if(password != "") {
			$('.err_password').addClass('hidden');
		}
		scalePopupHeight();
	});

	$('.log_out').click(function () {
		showLoader();
		saveCredentials(null, null, getLoginPage(function () {
			hideStats();
			showForm();
			hideLoader();
		}));
	});

});

function createSession(username, password) {
	getLoginPage(function(data) {
		$(".temp").html(data);
		var loginData = {
			__LASTFOCUS: $("#__LASTFOCUS").val(),
			__EVENTTARGET: $("#__EVENTTARGET").val(),
			__EVENTARGUMENT: $("#__EVENTARGUMENT").val(),
			__VIEWSTATE: $("#__VIEWSTATE").val(),
			__EVENTVALIDATION: $("#__EVENTVALIDATION").val(),
			ddlLogin: 1,
			txtUserName: username,
			txtPassword: password,
			ddlTheme: "style5.css",
			DropDownList1: "style.css",
			save: "Log In"
		}
		sendLoginRequest(loginData, getUsageData);
	});
}

function getLoginPage(cb) {
	$.ajax({
		url: "http://user.tripleplay.in/Customer/Default.aspx"
	}).done(cb);
}

function sendLoginRequest(loginData, cb) {
	$.ajax({
		url: "http://user.tripleplay.in/Customer/Login.aspx?h8=1",
		data: loginData,
		type: "POST"
	}).done(cb);
}

function getUsageData() {
	setState(LOGGEDOUT);
	$.ajax({
		url: "http://user.tripleplay.in/Customer/Gauge.aspx"
	}).done(function (data) {
		$(".temp").html(data);
		if ($("#lblCurrentUsage") &&
			$("#lblCurrentUsage").length > 0 &&
			$("#lblPlanSpeed") &&
			$("#lblPlanSpeed").length > 0) {
			setState(LOGGEDIN);
			hideForm();
			var current_usage = $("#lblCurrentUsage").html();
			$(".current_usage").html(current_usage);
			var plan_speed = $("#lblPlanSpeed").html();
			$(".plan_speed").html(plan_speed);
			scalePopupHeight();
			showStats();
		}
		hideLoader();
	});
}

function getCredentials(cb) {
	chrome.storage.sync.get({
		username: null,
		password: null
	}, function (credentials) {
		cb(credentials.username, credentials.password);
	});
}

function saveCredentials(username, password, cb) {
	console.log(username, password);
	chrome.storage.sync.set({
		'username': username,
		'password': password
	}, function() {
		cb(username, password)
	});
}

function setState(state) {
	$(".state").data("state", state);
}

function getState() {
	return $(".state").data("state");
}

function hideForm() {
	$(".ui.form").css("display", "none");
}

function showForm() {
	$(".ui.form").css("display", "block");
}

function showStats() {
	$(".container").css("display", "block");
}

function hideStats() {
	$(".container").css("display", "none");
}

function scalePopupHeight() {
	$('html').height($('.ui.segment').height())
}

function showLoader() {
	$(".ui.dimmer").addClass("active");
}

function hideLoader() {
	$(".ui.dimmer").removeClass("active");
}
