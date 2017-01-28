'use strict'

window.onload =function updateInfo(){
    var updateBtn = document.getElementById("update")
    var msg = document.getElementById("message")
    //set the update button onclick function
    updateBtn.onclick = function(){

        //get all needed elements
        var newDisplayName = document.getElementById("nameUpdate")
        var displayName = document.getElementById("displayName")
        var email = document.getElementById("email")
        var newEmail = document.getElementById("emailUpdate")
        var phoneNumber = document.getElementById("phoneNumber")
        var newPhoneNumber = document.getElementById("phoneUpdate")
        var zipcode = document.getElementById('zipcode')
        var newZipcode = document.getElementById('zipUpdate')
        var newPassword = document.getElementById("pwUpdate")
        var passwordConf = document.getElementById("confUpdate")

        //password
        if(newPassword.value != ""){
            if(newPassword.value != passwordConf.value){
                msg.innerHTML = "Password confirmation is different from password"
            }
            else{
                newPassword.value = ""
                passwordConf.value = ""
                
            }
        }
        else if (newPassword.value == ""){
            msg.innerHTML = "Please enter your password!"
        }
        //zipcode
        if(newZipcode.value != ''){
            if(/\d{5}/.test(newZipcode.value)){
                zipcode.innerHTML =  newZipcode.value
                newZipcode.value = ""
            }
            else{
                msg.innerHTML = "Zipcode is invalid!"
            }
        }
        else{
            msg.innerHTML = "Please enter your zipcode!"
        }
        //phone number
        if(newPhoneNumber.value != ''){
            if(/\d{10}/.test(newPhoneNumber.value)){
                var tmp = newPhoneNumber.value.substr(0, 3)+"-"+
                newPhoneNumber.value.substr(3, 3)+"-"+
                newPhoneNumber.value.substr(6)
                phoneNumber.innerHTML = tmp
                newPhoneNumber.value = ""
            }
            else{
                msg.innerHTML = "Phone number is invalid!"
            }
        }
        else{
            msg.innerHTML = "Please enter your phone number!"
        }
        //email address
        if(newEmail.value != ''){
            if(/\w*@\w*.\w*\w/.test(newEmail.value)){
                email.innerHTML = newEmail.value
                newEmail.value = ""
            }
            else{
                msg.innerHTML = "Email address is invalid!"
            }
        }
        else{
            msg.innerHTML = "Please enter your email address!"
        }
        //display name
        if(newDisplayName.value != ''){
            displayName.innerHTML = newDisplayName.value
            newDisplayName.value = ""
        }
        else{
            msg.innerHTML = "Please enter your display name!"
        }     
    }
}