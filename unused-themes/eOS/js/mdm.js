var currentlyShownUser = "";
var numUsersShown = 0;

if (maxUsersShown <= 0) maxUsersShown = 4;

set_up_screen();

// Made to (hopefully) line up everything correctly 
function set_up_screen() {
	center_login_box();
	center_date_time();
	center_users_area();

	// I'm afraid this is hacked together...
	//   Basically, if the user interface is off the top of the screen
	//   (as it will probably start out), let's keep trying to force
	//   it down to the middle of the screen until something happens
	if ($('#date_time').offset().top <= 0) {
		setInterval(set_up_screen, 100);
	}
}

// Called by MDM to disable user input
function mdm_disable() {
	document.getElementById("entry").value = "disabled";
	document.getElementById("entry").disabled = "disabled";
	document.getElementById("ok_button").disabled = "disabled";
}

// Called by MDM to enable user input
function mdm_enable() {
	document.getElementById("entry").value = "";
	document.getElementById("entry").disabled = false;
	document.getElementById("ok_button").disabled = false;
}

// Called by MDM to set the welcome message
function set_welcome_message(message) {
	document.getElementById("welcome_message").innerHTML = message;
}

// Called by MDM to allow the user to input a username		
function mdm_prompt(message) {	
	mdm_enable();

	// This is a poorly-designed "replacement" for a text input's placeholder.
	//   I'm using this because the regular placeholders go away when the input has focus
	$('#entry').css('color', '#777');

	$('#entry').bind({
		click : function() {
			$(this).css('color', '#777');
			reset_cursor_position();
		},
		keydown : function() {
			$(this).val('');
			$(this).css('color', '#000');
			$(this).unbind('keydown');
			$(this).unbind('click');
		},
	});

	document.getElementById("entry").type = "text";

	// For now, the message should always be "Username:", but I used split in case the string
	//   gets translated.  (I hope the colon would still be used!)
	document.getElementById("entry").value = message.split(':')[0];
	reset_cursor_position();
}

// Called by MDM to allow the user to input a password
function mdm_noecho(message) {	
	mdm_enable();

	$('#entry').css('color', '#777');

	$('#entry').bind({
		click : function() {
			$(this).css('color', '#777');
			reset_cursor_position();
		},
		keydown : function() {
			$(this).attr('type', 'password');
			$(this).val('');
			$(this).css('color', '#000');
			$(this).unbind('keydown');
			$(this).unbind('click');
		},
	});

	document.getElementById("entry").type = "text";
	document.getElementById("entry").value = message.split(':')[0];
	reset_cursor_position();
}

// Called by MDM to show a message (usually "Please enter your username")
function mdm_msg(message) {			
	document.getElementById("message").innerHTML = message;
}

// Called by MDM to show a timed login countdown
function mdm_timed(message) {
	if (message != "") {
		document.getElementById("timed").style.display = 'block';
		document.getElementById("notify_area_timed").style.display = 'block';
	}
	else {
		document.getElementById("timed").style.display = 'none';
		document.getElementById("notify_area_timed").style.display = 'none';
	}
	
	document.getElementById("timed").innerHTML = message;
}

// Called by MDM to show an error		
function mdm_error(message) {						
	if (message != "") {
		document.getElementById("error").style.display = 'block';
		document.getElementById("notify_area_error").style.display = 'block';
	}
	else {
		document.getElementById("error").style.display = 'none';
		document.getElementById("notify_area_error").style.display = 'none';
	}
	document.getElementById("error").innerHTML = message;
}	
				
// Send user input to MDM
function send_login() {
	// read the value before we disable the field, as it will be changed to "disabled"
	var value = document.getElementById("entry").value;
	mdm_disable(); 
	alert("LOGIN###" + value);
	return false;
}

function center_users_area() {
	$('#users').css('top', (($(window).height() / 2) - ($('#users').height() / 2)));
}

function center_date_time() {
	$('#date_time').css('top', (($(window).height() / 2) - ($('#date_time').height() / 2)));
}

function center_login_box() {
	$('.login_box').css('top', (($(window).height() / 2) - ($('.login_box').height() / 2)));
}

function reset_cursor_position() {
	$("#entry").focus();
	$("#entry")[0].setSelectionRange(0, 0);
}

function show_hidden_users() {
	$('.login_box').removeClass('login_box');
	if (numUsersShown != 0) $('#default_login').html('Other');
	$('.user-info').fadeIn(314);
	$('.user-info-hr').show();
	currentlyShownUser = "";
}

function close_login_box() {
	$('.login_box').hide(150, show_hidden_users);
	$('.extra_controls').remove();
	$('#ok_button').remove();
	$('#entry').remove();
	
	/* FIXME: There MUST be a way of cancelling the last selected user... */
	alert("USER###");
}

function add_extra_controls() {
	$('.login_box').append("<input id='entry' type='text' class='input-level-block'><button type='submit' class='btn' id='ok_button'></button>");
	$('#ok_button').html($("#hidden_ok_label").html());$('.login_box').contents().wrapAll("<form onSubmit='return send_login();' />");

	// FIXME: In the emulator, the controls aren't always in the same position...  Why? (Maybe jQuery's show() is getting in the way?  Maybe just timing issues?)
	$('.login_box').prepend("<div class='extra_controls'><a href='javascript:close_login_box();' class='close pull-left'><i class='icon-arrow-left'></i></a><a href='#settingsModal' data-toggle='modal' class='close pull-right'><i class='icon-cog'></i></a></div>");
	reset_cursor_position();
}

function user_clicked(username, gecos, clickedOther) {

	if (currentlyShownUser == username) return;

	$('.login_box').removeClass('login_box');
	$('.user-info').hide();
	$('.user-info-hr').hide();

	$("."+username).addClass('login_box');
	add_extra_controls();

	if (clickedOther) {
		$('.login_box .user-gecos').html("Login");
		mdm_prompt($('#hidden_uname_label').html());
	}
	else {
		alert('USER###'+username);
	}

	center_login_box();
	$(".login_box").show(150, reset_cursor_position);

	currentlyShownUser = username;
}

// Just makes a horizontal rule to separate the users.
//   It's a function to itself because I was playing with different ways of separating the users from "Other"
function create_separator() {
	var hr = document.createElement('hr');
		hr.style.border = "none";
		hr.style.borderBottom = "1px solid #e5e5e5";

	return hr;
}

// Called by MDM to add a user to the list of users
function mdm_add_user(username, gecos, status) {

	if (numUsersShown + 1 > maxUsersShown) return;

	var box = document.createElement('div');
		box.setAttribute('class', "user-info "+username);
		
	var link = document.createElement('a');	
		link.setAttribute('href', "javascript:user_clicked('"+username+"', '"+gecos+"', false)");
		
	var picture = document.createElement('img');
		picture.setAttribute('class', "img-polaroid user-img");
		picture.setAttribute('align', "left");
		picture.setAttribute('src', "file:///home/"+username+"/.face");
		// Let's scale nicely with larger screens
		picture.setAttribute('onerror', "this.src='img/default-user.svg';");
		
	var realname_div = document.createElement('div');
		realname_div.setAttribute('class', "user-gecos");
		realname_div.innerHTML = gecos;
		
	var username_div = document.createElement('div');
		username_div.setAttribute('class', "username");
		username_div.innerHTML = username;

	if (status != "") {
		var userstatus_div = document.createElement('div');
		userstatus_div.setAttribute('class', "user-status");
		userstatus_div.innerHTML = status;
	}
																														
	box.appendChild(link);
	link.appendChild(picture);														
	link.appendChild(realname_div);			
	link.appendChild(username_div);
	
	if (status != "") {
		link.appendChild(userstatus_div);	
	}
		
	var src = document.getElementById("users");
	var childCount = src.getElementsByClassName('user-info').length;

	if (childCount == 1) {
		document.getElementById("default_login").innerHTML = "Other";
		src.insertBefore(create_separator(), src.children[0]);
	}
	
	src.insertBefore(box, src.children[childCount - 1]);
	$('#users').css('top', (($(window).height() / 2) - ($('#users').height() / 2)));

	numUsersShown++;
}

// Called by MDM to add a session to the list of sessions
function mdm_add_session(session_name, session_file) {
	
	session_name = session_name.replace("Ubuntu", "Unity");
	
	var filename = session_name.toLowerCase();
	filename = filename.replace(/ /g, "-");
	filename = filename.replace(/\(/g, "");
	filename = filename.replace(/\)/g, "");

	var li = document.createElement('li');

	var link = document.createElement('a');
		link.setAttribute('href', "javascript:alert('SESSION###"+session_name+"###"+session_file+"');select_session('"+session_name+"','"+session_file+"');");

	var picture = document.createElement('img');
		picture.setAttribute('class', "session-picture");
		picture.setAttribute('src', "img/sessions/"+filename+".svg");
		picture.setAttribute('onerror', "this.src='img/sessions/default.svg';");

	var name_div = document.createTextNode(session_name);

	li.appendChild(link);
	link.appendChild(picture);
	link.appendChild(name_div);
		
	var src = document.getElementById("sessions");
	src.appendChild(li);
}	

function select_session(session_name, session_file) {
	var filename = session_name.toLowerCase();
	filename = filename.replace(/ /g, "-");
	filename = filename.replace(/\(/g, "");
	filename = filename.replace(/\)/g, "");
	document.getElementById("current_session_picture").src = "img/sessions/"+filename+".svg";
	document.getElementById("current_session_picture").title = session_name;

	$("#selected_session_text").html(session_name);
}

// Called by MDM to add a language to the list of languages
function mdm_add_language(language_name, language_code) {

	var filename = language_code.toLowerCase();
	filename = filename.replace(".utf-8", "");
	bits = filename.split("_");
	if (bits.length == 2) {
		filename = bits[1];																	
	}
	var li = document.createElement('li');			
		
	var link = document.createElement('a');	
		link.setAttribute('href', "javascript:alert('LANGUAGE###"+language_code+"')");

	var picture = document.createElement('img');
		picture.setAttribute('class', "language-picture");
		picture.setAttribute('src', "img/languages/"+filename+".png");
		picture.setAttribute('onerror', "this.src='img/languages/generic.png';");
									
	var name_div = document.createTextNode(language_name);

	li.appendChild(link);	
	link.appendChild(picture);
	link.appendChild(name_div);

	var src = document.getElementById("languages");
	src.appendChild(li);
}	

function mdm_set_current_language(language_name, language_code)	{
	var filename = language_code.toLowerCase();
	filename = filename.replace(".utf-8", "");
	bits = filename.split("_");
	if (bits.length == 2) {
		filename = bits[1];																	
	}
	document.getElementById("current_language_flag").src = "img/languages/"+filename+".png";			
	document.getElementById("current_language_flag").title = language_name;

	$("#selected_language_text").html(language_name);
}

// Called by MDM if the SHUTDOWN command shouldn't appear in the greeter
function mdm_hide_shutdown() {
	document.getElementById("shutdown").style.display = 'none';
}	

// Called by MDM if the SUSPEND command shouldn't appear in the greeter
function mdm_hide_suspend() {
	document.getElementById("suspend").style.display = 'none';
}

// Called by MDM if the RESTART command shouldn't appear in the greeter
function mdm_hide_restart() {
	document.getElementById("restart").style.display = 'none';
}

// Called by MDM if the QUIT command shouldn't appear in the greeter
function mdm_hide_quit() {
	document.getElementById("quit").style.display = 'none';
}

// Called by MDM if the XDMCP command shouldn't appear in the greeter
function mdm_hide_xdmcp() {
	document.getElementById("xdmcp").style.display = 'none';
}