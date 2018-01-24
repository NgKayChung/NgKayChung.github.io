var v=null;
var labels = [];
var ids = [];
var vidhtml = '<video id="v" autoplay playsinline></video>';
var fliphtml = '<button id = "flipbtn">Change Camera</button>';
var screenhtml = '<button id = "screenbtn"><img src = "include\images\fullscreen_214px_215px.png" title = "Fullscreen"/></button>';
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
	ids = [];
	labels = [];
	
	if(!load()) {
		//change to upload image
		return;
	}
	
	//ids = [];
	//labels = [];
	
	document.getElementById('scannerbtn').style.display = 'none';
	
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
			//create flip button
			document.getElementById("flipp").innerHTML = fliphtml;
			document.getElementById("flipbtn").addEventListener('click', flipCamera);
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
	document.getElementById("outdiv").innerHTML = vidhtml;
    v = document.getElementById("v");
	
	if(vidMed)
		v.classList.add('med');
	else
		v.classList.add('full');
	
    window.stream = stream;
	
    v.srcObject = stream;
	var scanElem = document.getElementById("result");
	scanElem.innerHTML="- scanning -";
	scanElem.style.color = "red";
	document.getElementById('screening').innerHTML = screenhtml;
	document.getElementById('screenbtn').addEventListener('click', function() {
		var vidClass = v.classList;
		
		if(vidClass.contains('med')) {
			vidClass.remove('med');
			vidClass.add('full');
			this.innerHTML = 'Normal screen';
		}
		else if(vidClass.contains('full')) {
			vidClass.remove('full');
			vidClass.add('med');
			this.innerHTML = 'Fullscreen';
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
			document.getElementById('scannerbtn').remove();
			document.getElementById('flipp').remove();
			var resElem = document.getElementById('result');
			resElem.innerHTML = "Scanned successfully!";
			resElem.style.color = "green";
			document.getElementById('screening').remove();
			document.getElementById('form-page').innerHTML = '<iframe class = "frame-page" src = "testf.html" width = "100%" height = "100%"></iframe>';
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
