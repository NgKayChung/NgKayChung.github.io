var fullname = "";
var icnumber = "";
var emailAddress = "";
var phoneNumber = "";

function validateInputs()
{
    fullname = document.getElementById('fullname').value;
    icnumber = document.getElementById('icnumber').value;
    emailAddress = document.getElementById('emailAddress').value;
    phoneNumber = document.getElementById('phoneNumber').value;
    
    if(!fullname.match('/[A-Za-z]+$/')) {
        alert('Name should consists of only alphabetic characters(A - Z)');
        return false;
    }
}
