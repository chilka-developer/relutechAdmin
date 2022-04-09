import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-country-edit',
  templateUrl: '../view/country-edit.component.html',
  // styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {
  popup:boolean = false;
  selectedCountryName: string;
  selectedOperationCharge : string;
  selectedLocationMultiplier: string;
  isServing : boolean;
  country_master_id : any;
  isActive: boolean ;
  errorMessage :string ="";
  display_failed_msg :string;
  display_success_msg : string;
  
  


  ngOnInit(): void {
    $("#country_edit_failed").hide();
    $("#country_edit_success").hide();
    $("#valid_country_edit_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-country");
    this.country_master_id = localStorage.getItem("country_master_id");
    this.http.post(CommonService.api_url + '/country-edit',{country_master_id :this.country_master_id ,oauth_key : CommonService.oauth_key}).subscribe(responseData => {
      let countryData = responseData["data"][0];
      this.selectedCountryName =  countryData["country_name"];
      this.selectedOperationCharge = countryData["operational_charge"];
      this.selectedLocationMultiplier = countryData["location_multiplier"];
      if(countryData["is_active"] == "Y"){
        this.isActive = true;
      }
      else{
        this.isActive = false;
      }
      
      if(countryData["is_serving"] == "Yes"){
        this.isServing = true;
      }
      else{
        this.isServing = false
      }
      // console.log(responseData);
    });
   
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/country-list');
    
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/country-delete' , {country_master_id : this.country_master_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/country-list');
        },2000);
       
      }else{
        this.errorMessage= responseData["errors"];
        $("#record_delete_fail").show();
        $("#record_delete_fail").html(this.errorMessage);
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
      if (this.isServing == true) {
        this.is_serving = "Yes";
      }
      else {
        this.is_serving = "No";
      }
      this.country_master_id = localStorage.getItem("country_master_id");
      this.http.post(CommonService.api_url + '/country-update',
        {country_master_id: this.country_master_id, 
          country_name: this.selectedCountryName,
          operational_charge : this.selectedOperationCharge, 
          location_multiplier : this.selectedLocationMultiplier, 
          is_serving : this.is_serving,
          is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
          // console.log(responseData);
          
          if (responseData["is_successful"] == "1") {
            localStorage.setItem("success_message", responseData["success_message"]);
            this.display_success_msg = responseData["success_message"];
            $("#country_edit_success").show();
            $("#country_edit_failed").hide();
            $("#valid_country_edit_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/country-list');
              },2000);
              
            }
          else {
            this.display_failed_msg = responseData["errors"];
            $("#country_add_failed").show();
            $("#country_edit_success").hide();
            $("#valid_country_edit_form").hide();
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
      $("#valid_country_edit_form").show();
      $("#valid_country_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }

}
