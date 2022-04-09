import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';
import { UserDetails } from '../model/sign-in-api.model';


@Component({
  selector: 'app-change-password',
  templateUrl: '../view/change-password.component.html',
  // styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  selectedUserName: string;
  user_id : object;
  isActive: boolean ;
  selectedCurrentPassword: string;
  selectedNewPassword: string;
  user_details: any;
  errorMessage :string = "";
  display_success_msg : string;
  display_failed_msg: string;
 



  ngOnInit(): void {
    $("#admin_profile_top").css("display", "block");
    $("#password_edit_failed").hide();
    $("#password_edit_success").hide();
    $("#valid_password_edit_form").hide();
    let user_details = JSON.parse(localStorage.getItem("user_details"));
    this.commonService.IsUserLogIn();
    // console.log(user_details);
    let login_user_details = JSON.parse(localStorage.getItem("login_user_details"));
   this.user_id =login_user_details["data"];
    // console.log( this.user_id["user_id"]);
  
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  // navigateToEquipmentMapping = function () {
  //   this.router.navigateByUrl('/company-list');
    
  // }
  navigateToEquipmentMappingList = function () {
    // let user_details = JSON.parse(localStorage.getItem("user_details"));
    // let login_user_details = JSON.parse(localStorage.getItem("user_details"));
    // this.selectedUserName = user_details.;
   
    if(!this.isValidForm()) {
      return;
    }
    else{
      $("#valid_password_edit_form").hide();
     
    this.http.post(CommonService.api_url + '/change-password-update',{user_id :  this.user_id["user_id"], current_password: this.selectedCurrentPassword , new_password : this.selectedNewPassword, oauth_key : CommonService.oauth_key}).subscribe(responseData => {
    
      if(responseData["is_successful"]=="1"){
        this.display_success_msg = responseData["success_message"];
        $("#password_edit_success").show();
        $("#password_edit_failed").hide();
        $("#valid_password_edit_form").hide();
        // setTimeout(()=>{
        //   this.router.navigateByUrl('/dashboard');
        // },2000);
      }else {
        this.display_failed_msg = responseData["errors"];
        $("#password_edit_failed").show();
        $("#password_edit_success").hide();
        $("#valid_password_edit_form").hide();
        // Display Error message.
      }
     
      // console.log(responseData);
    });
    
  }
    
 

   }
   isValidForm(){
    
    this.errorMessage = "";
    let currentPassword = $("#currentpassword").val();  
    let newPassword = $("#newpassword").val();  
    let reEnternewPassword = $("#reenternewpassword").val();  
   
    if(currentPassword == ""){
      this.errorMessage += "Please enter Current Password <br/>";
    }
    if(newPassword == ""){
      this.errorMessage += "Please enter New Password <br/>";
    }
    if(reEnternewPassword == ""){
      this.errorMessage += "Please enter Confirm Password <br/>";
    }
    if(newPassword !== ''){
      var lowerCaseLetters = /[a-z]/g;
      // var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;
      var specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if(!lowerCaseLetters.test(newPassword.toString()) || !numbers.test(newPassword.toString()) || !numbers.test(newPassword.toString()) || !specialCharacter.test(newPassword.toString()) || newPassword.toString().length < 8) {  
        this.errorMessage += "<br/>Password should be atleast 8 characters & should contain one character, one number & one special character.";
      }
    }
    if(newPassword !== reEnternewPassword ){
      this.errorMessage += "New Password & Confirm Password does not match";
    }
    
    if(this.errorMessage != "") {
      $("#valid_password_edit_form").show();
      $("#valid_password_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }

}
