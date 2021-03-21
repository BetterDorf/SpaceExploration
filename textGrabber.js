txt = 'non';

function readFile (file) {
    var client = new XMLHttpRequest();
    client.open('GET', file);
    client.onreadystatechange = function()
    {
        if( client.responseText != '' )
        {
            txt = client.responseText.split("\n");
        }
    };
    client.send();
    return txt;
}

/*Cookie functions slightly modified from https://www.w3schools.com/js/js_cookies.asp*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function changeModal(location){
    //change title
    document.getElementById('ModalLabel').textContent = location;
    //change the content
    //go to the location's text
    let i = 0;
    let curTxt = txt[i];
    while (curTxt != location)
    {
        i++;
        if (i == txt.length)
        {
            return 1;
        }
        curTxt = txt[i];
    }
    //change location to be mac-friendly in the cookies
    location = location.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    //check if the location was never visited before
    if (getCookie(location) == '')
    {
        setCookie(location, 'visited', 30);
        //set i to the description of the place
        i += 1;
    }
    else
    {
         //go to first element of that location
        i += 2;
        //samble time
        let today = new Date();
        let curTime = new Date();
        let hours = txt[i].split(":");
        curTime.setHours(hours[0], hours[1]);

        //go to the latest event
        while (txt != 'END' && curTime <= today)
        {
            i += 2;
            hours = txt[i].split(":");
            curTime.setHours(hours[0], hours[1]);
        }
        //go to the text
        i--;
    }
    document.getElementById('locationText').innerHTML = txt[i];
}