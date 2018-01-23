function load()
{
	document.getElementbyId('fullname').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementbyId('icnumber').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementbyId('emailAddress').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
	
	document.getElementbyId('phoneNumber').addEventListener('onfocusout', function() {
        this.style.borderColor = "red";
    });
}
