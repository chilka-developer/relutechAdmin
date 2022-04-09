import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../model/sign-in-api.model';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-sign-in',
  templateUrl: '../view/sign-in.component.html',
  styleUrls: ['../../assets/css/login.css' ]
})
export class SignInComponent implements OnInit {
  mySignInForm!:any;
  // userData : any;
  submitted = false;
  signInApiError: string;
  constructor(private router : Router , private http: HttpClient , private commonService: CommonService) { }

  ngOnInit(): void {
   
    $('#valid_signIn_form').hide();
    $('#signInErrorMessage').hide();
    this.mySignInForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('')
    });

    
   
  }
  get f() { return this.mySignInForm.controls; }
  onSubmit(userData:UserDetails){
    this.submitted = true;
   
    if(!this.validSignInForm()) {
      return;
    }
    else{
      $('#valid_signIn_form').hide();
      $('#signInErrorMessage').hide();

      localStorage.setItem("user_details" , JSON.stringify(userData));
      this.http.post(CommonService.api_url + '/admin-login' ,
      {email : userData.username ,pas : userData.password , usertype : '1' , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      
      if(responseData["is_successful"] == "1"){
        this.router.navigateByUrl('/dashboard');

        localStorage.setItem("login_user_details" , JSON.stringify(responseData));
       
      }
      else {
        $('#signInErrorMessage').show();
        this.signInApiError = responseData["errors"];
       
      }

    });
    }


    // if(this.mySignInForm.valid == true && this.mySignInForm != null ){
     
      
      
    // }
    // else{
     
    //   return;
    // }
    
  }
  validSignInForm = function(){
    this.errorMessage = "";
    this.errorMessagePassword= "";
    let counter = 0;
    let userSignInUsername = $("#txtUserName").val();  
    let userSignInPassword = $("#txtPassword").val();  
    
    if(userSignInUsername == ""){
      this.errorMessage += "Please enter Username";
      counter++;
    }
    if(userSignInPassword == ""){
      if(counter == 1)
        this.errorMessage += "<br/>";

      this.errorMessage += "Please enter Password";
      counter++;
    }
   // var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      // if(!emailReg.test( userSignInUsername.toString() )) {
      //   if(counter >= 1){
      //     this.errorMessage += "<br/>";
      //   }
      //   this.errorMessage += "Please enter valid Email Id";
      // }
    if(this.errorMessage != "") {
      $("#valid_signIn_form").show();
      $("#valid_signIn_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
 

}
