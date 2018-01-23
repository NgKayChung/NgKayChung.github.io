function load()
{
	document.getElementById('fullname').addEventListener('focusin', function() {
		this.classList.add("norm_input");
	});
	
	document.getElementById('fullname').addEventListener('focusout', function() {
        var fullname = this.value;
		alert(fullname === "");
		if(fullname === "")
		{
			document.getElementById("name-err").innerHTML = 'Name is required';
			this.classList.add('err_input');
			return;
		}

		if(!fullname.match(/^[A-Za-z \/\,\.\-]+$/))
		{
			document.getElementById("name-err").innerHTML = 'Invalid Name value';
			this.classList.add('err_input');
			return;
		}
		
		this.classList.add('succ_input');
    });
	
	document.getElementById('icnumber').addEventListener('focusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementById('emailAddress').addEventListener('focusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementById('phoneNumber').addEventListener('focusout', function() {
        this.style.borderColor = "red";
    });
}
