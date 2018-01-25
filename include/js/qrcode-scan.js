var v = null;
var upImageElem = null;
var labels = [];
var ids = [];
var vidske = '<div class = "video-contents"><div class = "empty"></div><div id = "_vid" class = "vid-div></div><div class = "empty"></div></div><div>' +
			 '<div id = "flipp"></div><div id = "screening"></div></div>';
var vidhtml = '<video id="v" autoplay playsinline></video>';
var imghtml='<div id="qrfile">' +
            '<div id="imgupcon"><p>Select an image file</p>' +
	    	'<input type="file" accept = "image/*" onchange = "handleFile(this.files)"/>' +
	   		'</div>' +
			'</div>';
var imgsubhtml = '<img id = "output" src = ""/><div><button onclick = "submitImage()">Submit Image</button><img id = "decimg" src = ""/></div>';
var fliphtml = '<div id = "flipbtn"><img src = "include/images/flip-cam-512.png" alt = "Change Camera"/></div>';
var screenhtml = '<div id = "screenbtn"><img id = "size-img" src = "include/images/fullscreen_224px_224px.png"/></div>';
var formhtml = '<div class = "contents">' +
'	<div class = "wrap no-w"></div>' +
'	<div class = "wrap form-wrapper">' +
		'<!--div class="lds-css ng-scope">' +
		'	<div style="width: 100%; height: 100%" class="lds-eclipse">' +
		'		<div></div>' +
		'	</div>' +
		'</div-->' +
		//'<form>'
		'	<div class = "form-row">' +
		'		<p><span class = "req_ind">*</span> indicates required field</p>' +
		'	</div>' +
		'	<div class = "form-row">' +
		'		<div class = "name-wrapper">' +
		'			<label>Name <span class = "req_ind">*</span></label>' +
		'		</div>' +
		'		<div class = "input-wrapper">' +
		'			<input type = "text" class = "for-input" id = "fullname" name = "fullname"/>' +
		'		</div>' +
		'		<div id = "name-err" class = "err"></div>' +
		'	</div>' +
		'	<div class = "form-row">' +
		'		<div class = "name-wrapper">' +
		'			<label>Identity Card Number <span class = "req_ind">*</span></label>' +
		'		</div>' +
		'		<div class = "input-wrapper">' +
		'			<input type = "text" class = "for-input" id = "icnumber" name = "icnumber"/><!--input type = "text" id = "icnumber_2" name = "icnumber_2" required/> - <input type = "text" id = "icnumber_3" name = "icnumber_3" required/-->' +
		'		</div>' +
		'		<div id = "ic-err" class = "err"></div>' +
		'	</div>' +
		'	<div class = "form-row">' +
		'		<div class = "name-wrapper">' +
		'			<label>Email Address <span class = "req_ind">*</span></label>' +
		'		</div>' +
		'		<div class = "input-wrapper">' +
		'			<input type = "text" class = "for-input" id = "emailAddress" name = "emailAddress"/><!--input type = "text" id = "email_domain" name = "email_domain" required/-->' +
		'		</div>' +
		'		<div id = "email-err" class = "err"></div>' +
		'	</div>' +
		'	<div class = "form-row">' +
			'	<div class = "name-wrapper">' +
			'		<label>Phone Number <span class = "req_ind">*</span></label>' +
			'	</div>' +
			'	<div class = "input-wrapper">' +
			'		<input type = "text" class = "for-input" id = "phoneNumber" name = "phoneNumber"/><!--input type = "text" id = "phone_2" name = "phone_2" required/-->' +
			'	</div>' +
			'	<div id = "phone-err" class = "err"></div>' +
		'	</div>' +
		'	<div class = "form-row">' +
		'		<div class = "input-wrapper">' +
		'			<input type = "checkbox" id = "tnc" name = "tnc" required/> I have read and agreed to the <a href = "#">Terms &amp; Conditions</a>&nbsp;<span class = "req_ind">*</span>' +
			'	</div>' +
			'</div>' +
			'<div class = "form-row">' +
			'	<div class = "input-wrapper">' +
			'		<button id = "form-submit" title = "Please fill in the above fields correctly before submit" disabled/>Submit</button>' +
			'	</div>' +
			'</div>' +
	'</div>' +
    	//'</form>'
	'<div class = "wrap no-w"></div>' +
'</div>';
var vidMed = true;
var front = false;

function searchDevices()
{
	if(!navigator.mediaDevices) {
		alert('No media device detected, please proceed to upload image to complete the registration');
		return false;
	}
	
	if(!navigator.mediaDevices.enumerateDevices) {
		alert("Media devices are not enumerable, please proceed to upload image to complete the registration");
		return false;
	}
	
	return true;
}

function successRes(st)
{
	window.stream = st;
	stopMedia();
}

function error(err)
{
    console.log(err);
    return;
}

function stopMedia()
{
	var videoTracks = window.stream.getVideoTracks();
	if(videoTracks.length > 0) {
		videoTracks[0].stop();
		window.stream.removeTrack(videoTracks[0]);
	}
}

function setwebcam()
{
	document.getElementById('result').innerHTML = "";
	document.getElementById('outdiv').innerHTML = vidske;
	done = false;
	ids = [];
	
	if(!searchDevices()) {
		return;
	}
	
	var options = null;
	
	navigator.mediaDevices.enumerateDevices().then(function(devices) {
		devices.forEach(function(device) {
			if(device.kind === 'videoinput') {
				ids.push(device.deviceId);
			}
		});
		
		if(!(ids.length > 0)) {
			alert("No video input device detected, please proceed to upload image to complete the registration");
			return;
		}
		
		var tempId = ids.pop();
		ids.unshift(tempId);
		
		options = {deviceId: tempId};
		
		if(ids.length > 1) {
			options = {deviceId: tempId, facingMode: 'environment'};
		}
	
		setwebcam2(options);
	});
}
	
function setwebcam2(options)
{
	navigator.mediaDevices.getUserMedia({audio: false, video: options}).then(success).catch(error);
}

function success(stream) {
	document.getElementById("_vid").innerHTML = vidhtml;
    v = document.getElementById("v");
	
	if(vidMed)
		v.classList.add('med');
	else
		v.classList.add('full');
	
    window.stream = stream;
	
    v.srcObject = stream;
	if(ids.length > 1) {
		//create flip button
		document.getElementById("flipp").innerHTML = fliphtml;
		document.getElementById("flipbtn").addEventListener('click', flipCamera);	
	}
	
	var scanElem = document.getElementById("result");
	scanElem.innerHTML="- scanning -";
	scanElem.style.color = "red";
	
	document.getElementById('screening').innerHTML = screenhtml;
	document.getElementById('screenbtn').addEventListener('click', function() {
		var vidClass = v.classList;
		
		if(vidClass.contains('med')) {
			vidClass.remove('med');
			vidClass.add('full');
			document.getElementById('size-img').src = "include/images/normalscreen_223px_224px.png";
		}
		else if(vidClass.contains('full')) {
			vidClass.remove('full');
			vidClass.add('med');
			document.getElementById('size-img').src = "include/images/fullscreen_224px_224px.png";
		}
	});
	
    startDecode();
}

var done = false;

function startDecode() {
    'use strict';
    
    var qr = QCodeDecoder();

    qr.decodeFromVideo(v, function(er,res) {
		if(er) {
			console.log(er);
		}

		if(res && !done) {
			done = true;
			alert(res);
			v.srcObject = null;
			stopMedia();
			var resElem = document.getElementById('result');
			resElem.innerHTML = "QR code successfully read and submitted !";
			resElem.style.color = "green";
			setTimeout(function() {
			document.getElementById('outdiv').innerHTML = formhtml;
			load();
			}, 2000);
		}
    });
}

function flipCamera()
{
	var scanElem = document.getElementById("result");
	scanElem.innerHTML="- changing -";
	scanElem.style.color = "yellow";
	vidMed = v.classList.contains('med');
	v.srcObject = null;
	stopMedia();
	
	var tempId = ids.pop();
	ids.unshift(tempId);
	
	front = !front;
	
	var options = {deviceId: tempId, facingMode: (front ? 'user' : 'environment')};
	
	setwebcam2(options);
}

function handleFile(f)
{
	if(f.length > 1) {
		alert("Please upload only one image file");
		return;
	}
	var imageContents = document.getElementById('imgupcon');
	imageContents.innerHTML = imgsubhtml;
	
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(f[0]);

	upImageElem = document.getElementById('decimg');
    upImageElem.src = URL.createObjectURL(f[0]);
}

function decodeImage()
{
	'use strict';
    
    var qr = QCodeDecoder();
	 
    qr.decodeFromImage(upImageElem, function(err, res){
		if(err) {
			alert("Cannot read QR code from the image, please upload again");
			setimg();
		}

		if(res && !done) {
			done=true;
			alert(res);
			var resElem = document.getElementById('result');
			resElem.innerHTML = "QR code successfully read and submitted !";
			resElem.style.color = "green";
			setTimeout(function() {
			document.getElementById('outdiv').innerHTML = formhtml;
			load();
			}, 2000);
		}
	}, true);
}

function submitImage()
{
	decodeImage();
}

function setimg()
{
	if(window.stream) {
		stopMedia();
	}
	done = false;
	document.getElementById("result").innerHTML="";
    document.getElementById("outdiv").innerHTML = imghtml;
}
