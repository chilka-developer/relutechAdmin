import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-global-settings-edit',
  templateUrl: '../view/global-settings-edit.component.html',
  // styleUrls: ['./global-settings-edit.component.css']
})
export class GlobalSettingsEditComponent implements OnInit {

  popup : boolean = false;
  selectedGlobalSettingsType: string;
  selectedGlobalSettingsKey : string;
  selectedGlobalSettingsValue: string;
  configuration_id : any;
  isActive: boolean ;
  display_failed_msg:string;
  display_success_msg:string;
  errorMessage :string ="";
  
  


  ngOnInit(): void {
    $("#global_edit_failed").hide();
    $("#global_edit_success").hide();
    $("#valid_global_edit_form").hide();
    CommonService.ActiveClass("nav-global-settings");
    this.configuration_id = localStorage.getItem("configuration_id");
    this.http.post(CommonService.api_url + '/global-settings-edit',{configuration_id :this.configuration_id ,oauth_key : CommonService.oauth_key}).subscribe(responseData => {
      let globalSettingsData = responseData["data"][0];
      this.selectedGlobalSettingsType =  globalSettingsData["configuration_type"];
      this.selectedGlobalSettingsKey = globalSettingsData["configuration_name"];
      this.selectedGlobalSettingsValue = globalSettingsData["configuration_value"];
      if(globalSettingsData["is_active"] == "Y"){
        this.isActive = true;
      }
      else{
        this.isActive = false;
      }
      // console.log(globalSettingsData);
    });
   
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/global-settings-list');
    
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/global-settings-delete' , {configuration_id : this.configuration_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/global-settings-list');
        },2000);
        
      }
      else{
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
      this.configuration_id = localStorage.getItem("configuration_id");
      this.http.post(CommonService.api_url + '/global-settings-update',
        {configuration_id: this.configuration_id, 
          configuration_type: this.selectedGlobalSettingsType,
          configuration_name : this.selectedGlobalSettingsKey, 
          configuration_value : this.selectedGlobalSettingsValue, 
          is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
          // console.log(responseData);
          if (responseData["is_successful"] == "1") {
            localStorage.setItem("success_message", responseData["success_message"]);
            this.display_success_msg = responseData["success_message"];
            $("#global_edit_success").show();
            $("#global_edit_failed").hide();
            $("#valid_global_edit_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/global-settings-list');
            },2000);
            
          }
          else {
            $("#global_edit_failed").show();
            $("#global_edit_success").hide();
            $("#valid_global_edit_form").hide();
            this.display_failed_msg = responseData["errors"];
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
      $("#valid_global_edit_form").show();
      $("#valid_global_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
}
