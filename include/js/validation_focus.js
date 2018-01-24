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
		});
	});
	
	document.getElementById('fullname').addEventListener('focusout', function() {
        var fullname = this.value;
		var classes = this.classList;
		//settimeout, loading/checking
		
		if(fullname === "")
		{
			document.getElementById("name-err").innerHTML = 'Name is required';
			classes.add('err_input');
			return;//show cross
		}

		if(!fullname.match(/^[A-Za-z \/\,\.\-]+$/))
		{
			document.getElementById("name-err").innerHTML = 'Invalid Name value';
			classes.add('err_input');
			return;
		}
		//show tick
		document.getElementById("name-err").innerHTML = '';
		classes.add('succ_input');
    });
	
	document.getElementById('icnumber').addEventListener('focusout', function() {
        var ic = this.value;
    	var classes = this.classList;
		
		if(ic === "")
		{
			document.getElementById("ic-err").innerHTML = 'IC Number is required';
			classes.add('err_input');
			return;
		}

		if(!ic.match(/\d{6}(?:[\-]|[\s])?\d{2}(?:[\-]|[\s])?\d{4}/))
		{
		  	document.getElementById("ic-err").innerHTML = 'Invalid IC Number';
			classes.add('err_input');
			return;
		}

		ic = ic.replace(/[^\d.]/g, "");

		if(!validDOB(ic.substr(0, 6)) || !validState(ic.substr(6, 2)))
		{
		   	document.getElementById("ic-err").innerHTML = 'Invalid IC Number';
			classes.add('err_input');
			return;
		}
		
		document.getElementById("ic-err").innerHTML = '';
		classes.add('succ_input');
    });
	
	document.getElementById('emailAddress').addEventListener('focusout', function() {
		var emailAddress = this.value;
		var classes = this.classList;
		
		if(emailAddress === "")
		{
			document.getElementById("email-err").innerHTML = 'Email Address is required';
			classes.add('err_input');
			return;
		}

		var emailRegex = /^[A-Za-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(\.[A-Za-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)?@[a-z0-9]+\.[a-z0-9]{2,3}$/;

		if(!emailAddress.match(emailRegex))
		{ 
			document.getElementById("ic-err").innerHTML = 'Invalid Email Address';
			classes.add('err_input');
			return;
		}
		
		document.getElementById("email-err").innerHTML = '';
		classes.add('succ_input');
    });
	
	document.getElementById('phoneNumber').addEventListener('focusout', function() {
        var phoneNumber = this.value;
		var classes = this.classList;
		
		if(phoneNumber === "")
		{
			document.getElementById("phone-err").innerHTML = 'Phone Number is required';
			classes.add('err_input');
			return;
		}

		var pnFormat = /^([0][1][0, 2-9]{1}([\s])?[\-]([\s])?\d{3}([\s])?\d{4})+$/;
		var pnFormat011 = /^([0][1][1]([\s])?[\-]([\s])?\d{4}([\s])?\d{4})+$/;

		if(!phoneNumber.match(pnFormat) && !phoneNumber.match(pnFormat011))
		{
			document.getElementById("phone-err").innerHTML = 'Invalid Phone Number';
			classes.add('err_input');
			return;
		}
		
		document.getElementById("phone-err").innerHTML = '';
		classes.add('succ_input');
    });
}
