function load()
{
	document.getElementbyId('fullname').addEventListener('onfocusout', function() {
        this.style.border-color = "red";
    });
	
	document.getElementbyId('icnumber').addEventListener('onfocusout', function() {
        this.style.border-color = "red";
    });
	
	document.getElementbyId('emailAddress').addEventListener('onfocusout', function() {
        this.style.border-color = "red";
    });
	
	document.getElementbyId('phoneNumber').addEventListener('onfocusout', function() {
        this.style.border-color = "red";
    });
}
