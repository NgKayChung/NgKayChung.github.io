function isLeapYear(y)
{
	return ((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0);
}

function validDOB(str)
{
	var year = parseInt(str.substr(0, 2));
	var month = parseInt(str.substr(2, 2));
	var day = parseInt(str.substr(4, 2));
	
	if(year < 0 || month < 1 || day < 1) return false;
	
	switch(month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			if(day > 31)
				return false;
			break;
			
		case 4:
		case 6:
		case 9:
		case 11:
			if(day > 30)
				return false;
			break;
			
		case 2:
			var nowYear = Date.now().getYear() - 100;
	
			if(year > nowYear) year += 1900;
			else year += 2000;
			
			if(isLeapYear(year))
			{
				if(day > 29)
					return false;
			}
			else
            {
				if(day > 28)
					return false;
			}
			break;
			
		default:
			return false;
	}
	
	return true;
}

function validState(str)
{
   switch(str)
   {
       case '14': case '54': case '55': case '56': case '57':
       case '15': case '58': case '16': case '01': case '21':
       case '22': case '23': case '24': case '02': case '25':
       case '26': case '27': case '04': case '30': case '05':
       case '31': case '59': case '06': case '32': case '07':
       case '34': case '35': case '08': case '36': case '37':
       case '38': case '39': case '09': case '40': case '10':
       case '41': case '42': case '43': case '44': case '11':
       case '45': case '46': case '12': case '47': case '48':
       case '49': case '13': case '50': case '51': case '52':
       case '53':
           return true;
       default:
           return false;
   }
}

(function () { 
//The Person Object used to store data in the LocalStorage 
var Person = { 
Id: 0, 
Name: "", 
ICNo: "", 
Email: "", 
MobileNo: "" 
};

//JavaScript object containing methods for LocalStorage management 
var applogic = {
//Clear All Entries, by reading all elements having class as c1 
clearuielements: function () { 
    var inputs = document.getElementsByClassName("c1"); 
    for (i = 0; i < inputs.length; i++) { 
        inputs[i].value = ""; 
    } 
},
//Save Entry in the Localstorage by eading values entered in the 
//UI 
saveitem: function () {
	document.getElementById('temp').innerHTML = '<div id="dvcontainer"></div>';
    var lscount = localStorage.length; //Get the Length of the LocalStorage
    //Read all elements on UI using class name 
    var inputs = document.getElementsByClassName("c1"); 
            Person.Id = inputs[0].value; 
            Person.Name = inputs[1].value; 
            Person.ICNo = inputs[2].value; 
            Person.Email = inputs[3].value; 
            Person.MobileNo = inputs[4].value; 
    
    //Convert the object into JSON ans store it in LocalStorage 
            localStorage.setItem("Person_" + lscount, JSON.stringify(Person)); 
    //Reload the Page 
            location.reload();
	applogic.loaddata(); 
},
//Method to Read Data from the local Storage 
loaddata: function () { 
    var datacount = localStorage.length; 
    if (datacount > 0) 
    { 
        var render = "<table border='1'>"; 
        render += "<tr><th>Id</th><th>Name</th><th>ICNo</th>” + “<th>Email</th><th>MobileNo</th></tr>"; 
        for (i = 0; i < datacount; i++) { 
            var key = localStorage.key(i); //Get  the Key 
            var person = localStorage.getItem(key); //Get Data from Key 
            var data = JSON.parse(person); //Parse the Data back into the object 
            
            render += "<tr><td>" + data.Id + "</td><td>" + data.Name + " </td>"; 
            render += "<td>" + data.ICNo + "</td>"; 
            render += "<td>" + data.Email + "</td>"; 
            render += "<td>" + data.MobileNo + "</td></tr>"; 
        } 
        render+="</table>"; 
        dvcontainer.innerHTML = render; 
    } 
},
}; 
})(); 

/*
function validateInputs()
{
	var fullname = "";
	var icnumber = "";
	var emailAddress = "";
	var phoneNumber = "";
	
    var fullnameElem = document.getElementById('fullname');
    var icnumberElem = document.getElementById('icnumber');
    var emailAddressElem = document.getElementById('emailAddress');
    var phoneNumberElem = document.getElementById('phoneNumber');
    
    fullname = fullnameElem.value;
    
    if(fullname === "")
    {
        alert('Name is required'); // ++change to display beside the input text field
        return false;  //  ++focus to the element
    }
    
    if(!fullname.match(/^[A-Za-z \/\,\.\-]+$/))
    {
        alert('Invalid Name');
        return false;
    }
    
    ic = icnumberElem.value;
    
    if(ic === "")
    {
        alert("IC Number is required");
        return false;
    }
    
    if(!ic.match(/\d{6}(?:[\-]|[\s])?\d{2}(?:[\-]|[\s])?\d{4}/))
    {
	   alert("Invalid IC Number");
	   return false;
    }
    
    ic = ic.replace(/[^\d.]/g, "");
    
    if(!validDOB(ic.substr(0, 6)) || !validState(ic.substr(6, 2)))
    {
       alert("Invalid IC Number");
       return false;
    }
    
    emailAddress = emailAddressElem.value;
    
    if(emailAddress === "")
    {
        alert("Email Address is required");
        return false;
    }

    var emailRegex = /^[A-Za-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(\.[A-Za-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)?@[a-z0-9]+\.[a-z0-9]{2,}$/;
	
    if(!emailAddress.match(emailRegex))
    { 
        alert("Invalid Email Address"); 
        return false; 
    }

    phoneNumber = phoneNumberElem.value;
	
    if(phoneNumber === "")
    {
        alert("Phone Number is required");
        return false;
    }
    
    var pnFormat = /^([0][1][0, 2-9]{1}([\s])?[\-]([\s])?\d{3}([\s])?\d{4})+$/;
    var pnFormat011 = /^([0][1][1]([\s])?[\-]([\s])?\d{4}([\s])?\d{4})+$/;
    
    if(!phoneNumber.match(pnFormat) && !phoneNumber.match(pnFormat011))
    {
        alert("Invalid Phone Number");
        return false;
    }

    alert("Completed");
	document.querySelector("form").action = "complete.html";
    return true;
}
*/
