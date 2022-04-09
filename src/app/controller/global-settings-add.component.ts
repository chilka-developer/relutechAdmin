import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-global-settings-add',
  templateUrl: '../view/global-settings-add.component.html',
  // styleUrls: ['./global-settings-add.component.css']
})
export class GlobalSettingsAddComponent implements OnInit {
 
  selectedGlobalSettingsType: string;
  selectedGlobalSettingsKey : string;
  selectedGlobalSettingsValue: string;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";
  isActive: boolean ;
  
  


  ngOnInit(): void {
    this.isActive = true;
    $("#global_settings_add_failed").hide();
    $("#global_settings_add_success").hide();
    $("#valid_global_settings_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-global-settings");
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
    this.router.navigateByUrl('/global-settings-list');
    
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
      this.http.post(CommonService.api_url + '/global-settings-add',
        {configuration_type: this.selectedGlobalSettingsType, 
          configuration_name: this.selectedGlobalSettingsKey,
          configuration_value : this.selectedGlobalSettingsValue, 
        
          is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
          // console.log(responseData);
          if (responseData["is_successful"] == "1") {
            localStorage.setItem("success_message", responseData["success_message"]);
            this.display_success_msg = responseData["success_message"];
            $("#global_settings_add_success").show();
            $("#global_settings_add_failed").hide();
            $("#valid_global_settings_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/global-settings-list');
            },2000);
           
          }
          else {
            $("#global_settings_add_failed").show();
            $("#global_settings_add_success").hide();
            $("#valid_global_settings_form").hide();
            this.display_success_msg = responseData["errors"];
            // Display Error message.
          }
        });
    }
  }
  isValidForm(){
    this.errorMessage = "";
    let GlobalSettingsType = $("#txtGlobalSettingsType").val();  
    let GlobalSettingsKey = $("#txtGlobalSettingsKey").val();  
    let GlobalSettingsValue = $("#txtGlobalSettingsValue").val();  
    if(GlobalSettingsType == ""){
      this.errorMessage += "Please enter Global Settings Type <br/>";
    }
    if(GlobalSettingsKey == ""){
      this.errorMessage += "Please enter Global Settings Key <br/>";
    }
    if(GlobalSettingsValue == ""){
      this.errorMessage += "Please enter Global Settings Value";
    }
    if(this.errorMessage != "") {
      $("#valid_global_settings_form").show();
      $("#valid_global_settings_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }

}
