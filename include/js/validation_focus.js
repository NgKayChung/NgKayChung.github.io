function load()
{
	document.getElementById('fullname').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementById('icnumber').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementById('emailAddress').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementById('phoneNumber').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
}
