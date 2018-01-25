var nameOK = false;
var icOK = false;
var emailOK = false;
var phoneOK = false;

function checkForms()
{
	if(nameOK && icOK && emailOK && phoneOK) {
		document.getElementById("form-submit").disabled = false;
		document.getElementById("form-submit").title = "You can submit now";
	}
	else {
		document.getElementById("form-submit").disabled = true;
		document.getElementById("form-submit").title = "Please fill in the above fields correctly before submit";
	}
}

function load()
{
	var textElems = document.querySelectorAll('input[type="text"]');
	
	textElems.forEach(function(elem) {
		elem.addEventListener('focusin', function() {
			var classes = this.classList;
			
			if(classes.contains("err_input"))
				classes.remove("err_input");

			if(classes.contains("succ_input"))
				classes.remove("succ_input");
			
			this.style.borderColor = "#777777";
		});
	});
	
	document.getElementById('fullname').addEventListener('focusout', function() {
        var fullname = this.value;
		var classes = this.classList;
		
		nameOK = false;
		
		//settimeout, loading/checking
		
		if(fullname === "")
		{
			document.getElementById("name-err").innerHTML = 'Name is required';
			classes.add('err_input');
			checkForms();
			return;//show cross
		}

		if(!fullname.match(/^[A-Za-z][A-Za-z \/\,\.\-]{9,}$/))
		{
			document.getElementById("name-err").innerHTML = 'Invalid Name value';
			classes.add('err_input');
			checkForms();
			return;
		}
		//show tick
		document.getElementById("name-err").innerHTML = '';
		classes.add('succ_input');
		nameOK = true;
		checkForms();
    });
	
	document.getElementById('icnumber').addEventListener('focusout', function() {
        var ic = this.value;
    	var classes = this.classList;
		
		icOK = false;
		
		if(ic === "")
		{
			document.getElementById("ic-err").innerHTML = 'IC Number is required';
			classes.add('err_input');
			checkForms();
			return;
		}

		if(!ic.match(/^(\d{6}([\-])?\d{2}([\-])?\d{4})+$/))
		{
		  	document.getElementById("ic-err").innerHTML = 'Invalid IC Number';
			classes.add('err_input');
			checkForms();
			return;
		}

		ic = ic.replace(/[^\d.]/g, "");

		if(!validDOB(ic.substr(0, 6)) || !validState(ic.substr(6, 2)))
		{
		   	document.getElementById("ic-err").innerHTML = 'Invalid IC Number';
			classes.add('err_input');
			checkForms();
			return;
		}
		
		document.getElementById("ic-err").innerHTML = '';
		classes.add('succ_input');
		icOK = true;
		checkForms();
    });
	
	document.getElementById('emailAddress').addEventListener('focusout', function() {
		var emailAddress = this.value;
		var classes = this.classList;
		
		emailOK = false;
		
		if(emailAddress === "")
		{
			document.getElementById("email-err").innerHTML = 'Email Address is required';
			classes.add('err_input');
			checkForms();
			return;
		}

		var emailRegex = /^[A-Za-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(\.[A-Za-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)?@[a-z0-9]+\.[a-z0-9]{2,}$/;

		if(!emailAddress.match(emailRegex))
		{ 
			document.getElementById("email-err").innerHTML = 'Invalid Email Address';
			classes.add('err_input');
			checkForms();
			return;
		}
		
		document.getElementById("email-err").innerHTML = '';
		classes.add('succ_input');
		emailOK = true;
		checkForms();
    });
	
	document.getElementById('phoneNumber').addEventListener('focusout', function() {
        var phoneNumber = this.value;
		var classes = this.classList;
		
		phoneOK = false;
		
		if(phoneNumber === "")
		{
			document.getElementById("phone-err").innerHTML = 'Phone Number is required';
			classes.add('err_input');
			checkForms();
			return;
		}

		var pnFormat = /^([0][1][0, 2-9]{1}([\s])?[\-]?([\s])?\d{3}([\s])?\d{4})+$/;
		var pnFormat011 = /^([0][1][1]([\s])?[\-]?([\s])?\d{4}([\s])?\d{4})+$/;

		if(!phoneNumber.match(pnFormat) && !phoneNumber.match(pnFormat011))
		{
			document.getElementById("phone-err").innerHTML = 'Invalid Phone Number';
			classes.add('err_input');
			checkForms();
			return;
		}
		
		document.getElementById("phone-err").innerHTML = '';
		classes.add('succ_input');
		phoneOK = true;
		checkForms();
    });
	
	//Save object into the localstorage 
var submit = document.getElementById('form-submit'); 
submit.addEventListener('click', applogic.saveitem, false);
}
