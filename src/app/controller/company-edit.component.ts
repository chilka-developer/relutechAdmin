import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-company-edit',
  templateUrl: '../view/company-edit.component.html',
  // styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  popup:boolean = false;
  selectedCompanyName: string;
  company_id : any;
  isActive: boolean ;
  display_failed_msg:string;
  display_success_msg:string;
  errorMessage :string ="";
  
  


  ngOnInit(): void {
    $("#company_edit_failed").hide();
    $("#company_edit_success").hide();
    $("#valid_company_edit_form").hide();
   
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-company");
    this.company_id = localStorage.getItem("company_id");
    this.http.post(CommonService.api_url + '/company-edit',{company_id :this.company_id ,oauth_key : CommonService.oauth_key}).subscribe(responseData => {
      let companyData = responseData["data"][0];
      this.selectedCompanyName =  companyData["company_name"];
      if(companyData["is_active"] == "Y"){
        this.isActive = true;
      }
      else{
        this.isActive = false;
      }
      
     
      // console.log(responseData);
    });
   
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/company-list');
    
  }
 
    // if(this.popup == true){
    //   $("#record_delete_success").hide();
    //   $("#record_delete_fail").hide();
    // }
  
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/company-delete' , {company_id : this.company_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
       this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
        this.router.navigateByUrl('/company-list');
        },2000);
      }
      else {
        this.errorMessage= responseData["errors"];
        $("#record_delete_fail").show();
        $("#record_delete_fail").html(this.errorMessage);
        // $("#company_edit_success").hide();
        // $("#company_edit_failed").hide();
        // $("#valid_company_edit_form").hide();
      }
    });
  }
  navigateToEquipmentMappingList = function () {
    if(!this.isValidForm()) {
      return;
    }
    else{
      if (this.isActive == true) {
        this.is_active = "Y";
      }
      else {
        this.is_active = "N";
      }
    
      this.company_id = localStorage.getItem("company_id");
      this.http.post(CommonService.api_url + '/company-update',
      {company_id: this.company_id, 
        company_name: this.selectedCompanyName,
        is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
      }).subscribe(responseData => {
        // console.log(responseData);
        if (responseData["is_successful"] == "1") {
          localStorage.setItem("success_message", responseData["success_message"]);
          this.display_success_msg = responseData["success_message"];
          $("#company_edit_success").show();
          $("#company_edit_failed").hide();
          $("#valid_company_edit_form").hide();
          setTimeout(()=>{
            this.router.navigateByUrl('/company-list');
          },2000);
        
        }
        else {
          // Display Error message.
          this.display_failed_msg = responseData["errors"];
          $("#company_add_failed").show();
          $("#company_add_success").hide();
          $("#valid_company_edit_form").hide();
        }
      });
    }
  }
  isValidForm(){
    this.errorMessage = "";
    let companyName = $("#txtCompanyName").val();  
    if(companyName == ""){
      this.errorMessage += "Please enter Company Name";
    }
    if(this.errorMessage != "") {
      $("#valid_company_edit_form").show();
      $("#valid_company_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }

}
