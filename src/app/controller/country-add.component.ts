import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-country-add',
  templateUrl: '../view/country-add.component.html',
  // styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  selectedCountryName: string;
  selectedOperationCharge : string;
  selectedLocationMultiplier: string;
  isServing : boolean;
  isActive: boolean ;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";
  
  


  ngOnInit(): void {
    this.isActive = true;
    this.isServing = true;
    $("#country_add_failed").hide();
    $("#country_add_success").hide();
    $("#valid_country_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-country");
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
    this.router.navigateByUrl('/country-list');
    
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

      if(this.isServing == true){
        this.is_serving = "Yes";
      }
      else {
        this.is_serving = "No";
      }

      this.http.post(CommonService.api_url + '/country-add',
        {country_name: this.selectedCountryName, 
          operational_charge: this.selectedOperationCharge,
          location_multiplier : this.selectedLocationMultiplier, 
          is_serving : this.isServing, 
          is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
          // console.log(responseData);
          if (responseData["is_successful"] == "1") {
            localStorage.setItem("success_message", responseData["success_message"]);
            this.display_success_msg = responseData["success_message"];
            $("#country_add_success").show();
            $("#country_add_failed").hide();
            $("#valid_country_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/country-list');
            },2000);
            
          }
          else {
            this.display_failed_msg = responseData["errors"];
            $("#country_add_failed").show();
            $("#country_add_success").hide();
            $("#valid_country_form").hide();
            // Display Error message.
          }
        });
      }
  }
  isValidForm(){
    this.errorMessage = "";
    let countryName = $("#txtCountryName").val();  
    let operationCharge = $("#txtOperationCharge").val();  
    let locationMultiplier = $("#txtLocationMultiplier").val();  
    if(countryName == ""){
      this.errorMessage += "Please enter Country Name <br/>";
    }
    if(operationCharge == ""){
      this.errorMessage += "Please enter Operation Charge <br/>";
    }
    if(locationMultiplier == ""){
      this.errorMessage += "Please enter Location Multiplier";
    }
    if(this.errorMessage != "") {
      $("#valid_country_form").show();
      $("#valid_country_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }

}
