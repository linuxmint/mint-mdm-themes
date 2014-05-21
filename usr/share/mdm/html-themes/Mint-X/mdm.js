var selected_user = -1;
var num_users = 0;

// Called by MDM to disable user input
function mdm_disable() {
    $('#entry').prop("disabled", true);
    $('#ok_button').prop("disabled", true);
    $('#login-box').css('cursor', 'progress');
    $('#entry').css('cursor', 'progress');
    $('#ok_button').css('cursor', 'progress');
}

// Called by MDM to enable user input
function mdm_enable() {
    $('#entry').prop("disabled", false);
    $('#ok_button').prop("disabled", false);
    $('#login-box').css('cursor', 'default');
    $('#entry').css('cursor', 'text');
    $('#ok_button').css('cursor', 'default');
}

// Called by MDM to set the welcome message
function set_welcome_message(message) {         
    //document.getElementById("welcome_message").innerHTML = message;
}

// Called by MDM to update the clock
function set_clock(message) {           
    document.getElementById("clock").innerHTML = message;
}

// Called by MDM to allow the user to input a username      
function mdm_prompt(message) {  
    mdm_enable();
    document.getElementById("current_username").innerHTML = login_label;
    document.getElementById("selected_status").innerHTML = enter_your_username_label;
    document.getElementById("selected_avatar").src = "img/default_user.svg";

    for (var i=0;i<num_users;i++) {
        $('#user' + i).appendTo('#top_users');
        $('#user' + i).show();
    }
    document.getElementById("entry").value = "";
    document.getElementById("entry").type = "text";
    document.getElementById("entry").focus();
    selected_user = -1;         
}

// Called by MDM to allow the user to input a password
function mdm_noecho(message) {  
    mdm_enable();
    document.getElementById("entry").value = "";
    document.getElementById("entry").type = "password";
    document.getElementById("entry").focus();
}

// Called by MDM to show a message (usually "Please enter your username")
function mdm_msg(message) {         
    //document.getElementById("message").innerHTML = message;           
}

// Called by MDM to show a timed login countdown
function mdm_timed(message) {
    if (message != "") {
        document.getElementById("timed").style.display = 'block';
    }
    else {
        document.getElementById("timed").style.display = 'none';
    }           
    document.getElementById("timed").innerHTML = message;           
}

// Called by MDM to show an error       
function mdm_error(message) {                       
    if (message != "") {
        document.getElementById("error").style.display = 'block';
    }
    else {
        document.getElementById("error").style.display = 'none';
    }
    document.getElementById("error").innerHTML = message;
}   

// Called by MDM to add a user to the list of users
function mdm_add_user(username, gecos, status) {

    var top_users = document.getElementById("top_users");
            
    var link = document.createElement('a');
        link.setAttribute('href', "javascript:alert('USER###"+username+"')");
        link.username = username;
        link.gecos = gecos;
        link.current_status = status;
        link.setAttribute('id', "user" + num_users);

    var div = document.createElement('div');                
        div.setAttribute('class', "user_box");


    var font_username = document.createElement('font');
        font_username.setAttribute('class', "font_username");
        font_username.innerHTML = username;

    var font_gecos = document.createElement('font');
        font_gecos.setAttribute('class', "font_gecos");
        font_gecos.innerHTML = " " + gecos;

    div.appendChild(font_username);
    div.appendChild(font_gecos);
    link.appendChild(div);
    top_users.appendChild(link);

    num_users = num_users + 1;             
}   

// Called by MDM to add a session to the list of sessions
function mdm_add_session(session_name, session_file) {
    
    session_name = session_name.replace("Ubuntu", "Unity");
    
    var filename = session_file.toLowerCase();
    filename = filename.replace(/ /g, "-");
    filename = filename.replace(/\(/g, "");
    filename = filename.replace(/\)/g, "");
    filename = filename.replace(/\)/g, "");
    filename = filename.replace(/.desktop/g, "");
                                            
    var link1 = document.createElement('a');    
        link1.setAttribute('href', "javascript:alert('SESSION###"+session_name+"###"+session_file+"');mdm_set_current_session('"+session_name+"','"+session_file+"');");

    var link2 = document.createElement('a');    
        link2.setAttribute('href', "javascript:alert('SESSION###"+session_name+"###"+session_file+"');mdm_set_current_session('"+session_name+"','"+session_file+"');");
        
    var picture = document.createElement('img');
        picture.setAttribute('class', "session-picture");
        picture.setAttribute('src', "../common/img/sessions/"+filename+".svg");
        picture.setAttribute('onerror', "this.src='../common/img/sessions/default.svg';");
                    
    var name_div = document.createTextNode(session_name);               
                                                                                                                                    
    link1.appendChild(picture);
    link2.appendChild(name_div);
        
    var table = document.getElementById("sessions");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0); 
    cell1.width = "28px";          
    cell1.appendChild(link1);
  
    var cell2 = row.insertCell(1);           
    cell2.appendChild(link2);
}       

// Called by MDM to add a language to the list of languages
function mdm_add_language(language_name, language_code) {

    var filename = language_code.toLowerCase();
    filename = filename.replace(".utf-8", "");
    bits = filename.split("_");
    if (bits.length == 2) {
        filename = bits[1];
    }

    var link1 = document.createElement('a');    
        link1.setAttribute('href', "javascript:alert('LANGUAGE###"+language_code+"');mdm_set_current_language('"+language_name+"','"+language_code+"');");

    var link2 = document.createElement('a');    
        link2.setAttribute('href', "javascript:alert('LANGUAGE###"+language_code+"');mdm_set_current_language('"+language_name+"','"+language_code+"');");

    var picture = document.createElement('img');
        picture.setAttribute('class', "language-picture");
        picture.setAttribute('src', "../common/img/languages/"+filename+".png");
        picture.setAttribute('onerror', "this.src='../common/img/languages/generic.png';");
        picture.setAttribute('title', language_name);               
                                    
    var name_div = document.createTextNode(language_name);              
                                                                                                                                    
    link1.appendChild(picture);
    link2.appendChild(name_div);

    var table = document.getElementById("languages");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    var cell1 = row.insertCell(0);
    cell1.width = "25px";
    cell1.appendChild(link1);
    
    var cell2 = row.insertCell(1);
    cell2.appendChild(link2);
}

function mdm_set_current_language(language_name, language_code) {
    var filename = language_code.toLowerCase();
    filename = filename.replace(".utf-8", "");
    bits = filename.split("_");
    if (bits.length == 2) {
        filename = bits[1];
    }
    document.getElementById("current_language_flag").src = "../common/img/languages/"+filename+".png";
    document.getElementById("current_language_flag").title = language_name;
    document.getElementById("current_language_flag").width = 16;
    $('#current_language_flag').popover('hide');
}

function mdm_set_current_session(session_name, session_file)    {
    var filename = session_file.toLowerCase();
    filename = filename.replace(/ /g, "-");
    filename = filename.replace(/\(/g, "");
    filename = filename.replace(/\)/g, "");
    filename = filename.replace(/.desktop/g, "");
    document.getElementById("current_session_picture").src = "../common/img/sessions/"+filename+".svg";
    document.getElementById("current_session_picture").title = session_name;
    document.getElementById("current_session_picture").width = 16;
    $('#current_session_picture').popover('hide');
}

function mdm_set_current_user(username) {
    document.getElementById("current_username").innerHTML = "";
    document.getElementById("selected_status").innerHTML = "";
    var user_found = false;
    for (var i=0;i<num_users;i++) {
        var user = document.getElementById("user" + i);
        if (user.username == username) {
            select_user_at_index(i, false);
            user_found = true;
        }
    }
    if (! user_found) {
        document.getElementById("current_username").innerHTML = username;
        document.getElementById("selected_status").innerHTML = enter_your_password_label;
    }
}

function select_user_at_index(index, alert_mdm) {                   

    var index_to_select = index;
    if (index_to_select < 0) {
        index_to_select = num_users - 1;
    }
    if (index_to_select >= num_users) {
        index_to_select = 0;
    }
    
    var username = null;

    for (var i=0;i<num_users;i++) {
        if (i < index_to_select) {
            $('#user' + i).appendTo('#top_users');
        }
        else if  (i == index_to_select) {
            var user = document.getElementById("user" + i);
            var selected_status = document.getElementById("selected_status");                   
            username = user.username;
            if (user.current_status != "") {
                selected_status.innerHTML = user.current_status;
            }
            else {
                selected_status.innerHTML = enter_your_password_label;
            }
            var picture = document.getElementById('selected_avatar');               
            picture.setAttribute('src', "file:///home/"+username+"/.face");
            $('#user' + i).appendTo('#selected_user');
        }
        else {
            $('#user' + i).appendTo('#bottom_users');
        }   
        selected_user = index_to_select;
    }           

    if (alert_mdm) {
        alert('USER###'+ username);
    }
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
