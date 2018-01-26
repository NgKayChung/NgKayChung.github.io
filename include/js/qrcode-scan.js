var v = null;
var upImageElem = null;
var labels = [];
var ids = [];
var vidske = '<div class = "video-contents"><div class = "empty"></div><div id = "_vid" class = "vid-div"></div><div class = "empty"></div></div><div id = "sc-grp" class = "screenbtn-group screennorm">' +
			 '<div id = "flipp"></div><div id = "screening"></div></div>';
var vidhtml = '<video id="v" autoplay playsinline></video>';
var imghtml='<div id="qrfile">' +
            '<div id="imgupcon"><p>Select an image file</p>' +
	    	'<input type="file" accept = "image/*" onchange = "handleFile(this.files)"/>' +
	   		'</div>' +
			'</div>';
var imgsubhtml = '<img id = "output" src = ""/><div><button onclick = "submitImage()">Submit Image</button><img id = "decimg" src = ""/></div>';
var fliphtml = '<div id = "flipbtn"><img src = "include/images/flip-cam-512.png" alt = "Change Camera"/></div>';
var screenhtml = '<div id = "screenbtn"><img id = "size-img" src = "include/images/fullscreen_212px_212px.png"/></div>';
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
		'			<label>Full Name As Per IC<span class = "req_ind">*</span></label>' +
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
var instructionhtml = '<div id="id01" class="w3-modal">' +
		    	'<div class="w3-modal-content w3-card-4 w3-animate-zoom" >' +
		      		'<div class="w3-center"><br>' +
						'<span onclick="document.getElementById("id01").style.display="none"" class="w3-button w3-xlarge w3-transparent w3-display-topright" title="Close Modal">×</span>' +
						'<h3>Instruction : </h3>' +
						'<ul>' +
							'<li> IOS 11 is supported for video scanning ONLY with Safari browser</li>' +
							'<li> IOS version below 11 should proceed to image upload</li>' +
							'<li> In case if your device does not support video scanning, please proceed to image upload</li>' +
							'<li> Click / Tap the above icons for QR code reading method</li>' +
							'<li> Please be reminded that you should allow this page to access to camera / photo gallery when prompted</li>' +
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>';
var vidMed = true;
var front = false;
var qrData = [];
var found;
var currentScanned = "";

var QR = {
	"ID": "",
	"registered": false
};

function insertQRData()
{
	if(localStorage.length === 0) {
    		localStorage.setItem("QR1", JSON.stringify('3409532'));
		localStorage.setItem("QR2", JSON.stringify('0195248'));
		localStorage.setItem("QR3", JSON.stringify('8362941'));
	}
}

function getQRData()
{
	for(var i = 0;i < localStorage.length;i++) {
		if(localStorage.getItem("QR" + (i + 1)))
			qrData.push(JSON.parse(localStorage.getItem("QR" + (i + 1))));
	}
}

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
	document.getElementById('temp').innerHTML = instructionhtml;
	document.getElementById('inst_btn').style.display = "block";
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
		
		getQRData();
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
		var screenClasses = document.getElementById('sc-grp').classList;
		
		if(vidClass.contains('med')) {
			vidClass.remove('med');
			vidClass.add('full');
			screenClasses.remove('screennorm');
			screenClasses.add('screenfull');
			document.getElementById('size-img').src = "include/images/normalscreen_223px_223px.png";
		}
		else if(vidClass.contains('full')) {
			vidClass.remove('full');
			vidClass.add('med');
			screenClasses.remove('screenfull');
			screenClasses.add('screennorm');
			document.getElementById('size-img').src = "include/images/fullscreen_212px_212px.png";
		}
	});
	
    startDecode();
}

var done = false;

function searchInStorage()
{
	for(var i = 0;i < qrData.length;i++) {
		if(qrData[i] == currentScanned) {
			found = true;
		}
	}
}

function startDecode() {
    'use strict';
    found = false;
    var qr = QCodeDecoder();

    qr.decodeFromVideo(v, function(er,res) {
		if(er && !done) {
			console.log(er);
		}

		if(res && !done) {
			done = true;
			currentScanned = res;
			searchInStorage();
			setTimeout(function(){
			if(found) {
				alert(currentScanned + " is a valid receipt ID");
				var resElem = document.getElementById('result');
				resElem.innerHTML = "QR code successfully read and submitted !";
				resElem.style.color = "green";
				document.getElementById('outdiv').innerHTML = formhtml;
				load();
			}
			else {
				alert(currentScanned + " is not a valid receipt ID");
				v.srcObject = null;
				stopMedia();
				location.reload();
			}
			}, 1000);
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
    found = false;
    var qr = QCodeDecoder();
	 
    qr.decodeFromImage(upImageElem, function(err, res){
		if(err && !done) {
			alert("Cannot read QR code from the image, please upload again");
			setimg();
		}

		if(res && !done) {
			done = true;
			currentScanned = res;
			searchInStorage();
			setTimeout(function(){
			if(found) {
				alert(currentScanned + " is a valid receipt ID");
				var resElem = document.getElementById('result');
				resElem.innerHTML = "QR code successfully read and submitted !";
				resElem.style.color = "green";
				document.getElementById('outdiv').innerHTML = formhtml;
				load();
			}
			else {
				alert(currentScanned + " is not a valid receipt ID");
				setimg();
			}
			}, 1000);
		}
	}, true);
}

function submitImage()
{
	decodeImage();
}

function setimg()
{
	document.getElementById('temp').innerHTML = instructionhtml;
	document.getElementById('inst_btn').style.display = "block";
	if(window.stream) {
		stopMedia();
	}
	done = false;
	document.getElementById("result").innerHTML="";
    document.getElementById("outdiv").innerHTML = imghtml;
	getQRData();
}
