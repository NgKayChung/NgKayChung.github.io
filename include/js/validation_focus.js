function load()
{
	document.getElementById('fullname').addEventListener('focusout', function() {
        this.style.borderColor = "red";
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
