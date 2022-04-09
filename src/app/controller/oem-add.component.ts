import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-oem-add',
  templateUrl: '../view/oem-add.component.html'
})

export class OemAddComponent implements OnInit {

  getOem: any[] = [];
  getProductLine: any[] = [];
  getType: any;
  selectedOem: string;
  selectedProductLine: string;
  isActive = { options: '1' };
  selectedType: string;
  isResponseSuccess: string;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";

  ngOnInit(): void {
    $("#oem_add_failed").hide();
    $("#oem_add_success").hide();
    $("#valid_oem_form").hide();
    CommonService.ActiveClass("nav-oem");
    this.commonService.IsUserLogIn();
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/oem-list');
  }
  navigateToEquipmentMappingList = function () {
    if(!this.isValidForm()) {
      return;
    }
    else{
      if (this.isActive.options == true) {
        this.is_active = "Y";
      }
      else {
        this.is_active = "N";
      }
      this.http.post(CommonService.api_url + '/oem-add',
        {

        oem: this.selectedOem, is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
      })
      .subscribe(responseData => {
        // console.log(responseData);
        if (responseData["is_successful"] == "1") {
          localStorage.setItem("success_message", responseData["success_message"]);
          this.display_success_msg = responseData["success_message"];
          $("#oem_add_success").show();
          $("#oem_add_failed").hide();
          $("#valid_oem_form").hide();
          setTimeout(()=>{
            this.router.navigateByUrl('/oem-list');
          },2000);
          
        }
        else {
          this.display_failed_msg = responseData["errors"];
          $("#oem_add_failed").show();
          $("#oem_add_success").hide();
          $("#valid_oem_form").hide();
          // Display Error message.
        }
      });
    }
  }
  isValidForm(){
    this.errorMessage = "";
    let oemName = $("#txtOem").val();  
    if(oemName == ""){
      this.errorMessage += "Please enter OEM Name";
    }
    if(this.errorMessage != "") {
      $("#valid_oem_form").show();
      $("#valid_oem_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }

}
