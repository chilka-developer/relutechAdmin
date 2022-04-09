import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-company-add',
  templateUrl: '../view/company-add.component.html',
  // styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {

  selectedCompanyName: string;
  isActive: boolean ;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";
  
  


  ngOnInit(): void {
    $("#company_add_failed").hide();
    $("#company_add_success").hide();
    $("#valid_company_form").hide();
    this.isActive = true;
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-company");
    // this.http.post(CommonService.api_url + '/oem-data',
    // { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
    // this.getOem = responseData["data"]["ArrOEM"];
    // //this.selectedOem = responseData["data"]["ArrOEM"][0]["id"];
    // });

    // this.http.post(CommonService.api_url + '/oem-product-line-data',
    // { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
    // this.getOem = responseData["data"]["ArrOEM"];
    // this.selectedOem = responseData["data"]["ArrOEM"][0]["id"];
    // });
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/company-list');
    
  }
  navigateToCountryList = function () {
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
  
  
      this.http.post(CommonService.api_url + '/company-add',
      {company_name: this.selectedCompanyName, 
        is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
        // console.log(responseData);
        if (responseData["is_successful"] == "1") {
          localStorage.setItem("success_message", responseData["success_message"]);
          this.display_success_msg = responseData["success_message"];
          // console.log(this.display_success_msg);
          $("#company_add_success").show();
          $("#company_add_failed").hide();
          $("#valid_company_form").hide();
          setTimeout(()=>{
            this.router.navigateByUrl('/company-list');
          },2000);
          
        }
        else {
          this.display_failed_msg = responseData["errors"];
          $("#company_add_failed").show();
          $("#company_add_success").hide();
          $("#valid_company_form").hide();
          // Display Error message.
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
      $("#valid_company_form").show();
      $("#valid_company_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
}
