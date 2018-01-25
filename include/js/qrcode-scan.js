var v = null;
var upImageElem = null;
var labels = [];
var ids = [];
var vidske = '<div id = "_vid"></div><div><div><div id = "flipp"></div></div><div><div id = "screening"></div></div></div>';
var vidhtml = '<video id="v" autoplay playsinline></video>';
var imghtml='<div id="qrfile">' +
            '<div id="imgupcon"><p>Select an image file</p>' +
	    	'<input type="file" accept = "image/*" onchange = "handleFile(this.files)"/>' +
	   		'</div>' +
			'</div>';
var imgsubhtml = '<img id = "output" src = ""/><div><button onclick = "submitImage()">Submit Image</button><img id = "decimg" src = ""/></div>';
var fliphtml = '<div id = "flipbtn"><img src = "include/images/flip-cam-512.png" alt = "Change Camera"/></div>';
var screenhtml = '<div id = "screenbtn"><img id = "size-img" src = "include/images/fullscreen_224px_224px.png"/></div>';
var vidMed = true;
var front = false;

function load()
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
	document.getElementById('outdiv').innerHTML = vidske;
	done = false;
	ids = [];
	labels = [];
	
	if(!load()) {
		//change to upload image
		return;
	}
	
	//ids = [];
	//labels = [];
	
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
			document.getElementById('outdiv').innerHTML = '<div id = "form-page"><iframe class = "frame-page" src = "testf.html" width = "100%" height = "100%"></iframe></div>';
		}
    }, true);
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
