import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-type-add',
  templateUrl: '../view/type-add.component.html',
  // styleUrls: ['./type-add.component.css']
})
export class TypeAddComponent implements OnInit {

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
  depProductName : object;


  ngOnInit(): void {
    $("#type_add_failed").hide();
    $("#type_add_success").hide();
    $("#valid_type_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-type");
    this.http.post(CommonService.api_url + '/oem-data',
    { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
    this.getOem = responseData["data"]["ArrOEM"];
   // this.selectedOem = responseData["data"]["ArrOEM"][0]["id"];
    });

    // this.http.post(CommonService.api_url + '/oem-product-line-data',
    // { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
    // this.getOem = responseData["data"]["ArrOEM"];
    // this.selectedOem = responseData["data"]["ArrOEM"][0]["id"];
    // });
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/type-list');
    
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
    this.http.post(CommonService.api_url + '/type-add',
      {oem_id: this.selectedOem, product_line_id: this.selectedProductLine,type : this.selectedType, is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
      }).subscribe(responseData => {
        // console.log(responseData);
        if (responseData["is_successful"] == "1") {
          localStorage.setItem("success_message", responseData["success_message"]);
          this.display_success_msg = responseData["success_message"];
          $("#type_add_success").show();
          $("#type_add_failed").hide();
          $("#valid_type_form").hide();
          setTimeout(()=>{
            this.router.navigateByUrl('/type-list');
          },2000);
        
        }
        else {
          this.display_failed_msg = responseData["errors"];
          $("#type_add_failed").show();
          $("#type_add_success").hide();
          $("#valid_type_form").hide();
          // Display Error message.
        }
      });
    }
  }
  onOemChange = function (selectedOem: string) {
    this.http.post(CommonService.api_url + '/oem-product-line-data',
      { oauth_key: CommonService.oauth_key, oem_id: selectedOem }).subscribe(responseData => {
        //console.log(responseData["data"]["ArrOEMProductLine"]);
        this.getProductLine = responseData["data"]["ArrOEMProductLine"];
        //console.log(this.getProductLine);
        this.selectedProductLine = responseData["data"]["ArrOEMProductLine"][0]["id"];

      });
  }
  isValidForm(){
    this.errorMessage = "";
    let typeName = $("#txtType").val();  
    let depProductName = this.getProductLine[0];
    //let rdepProductName = this.getProductLine[0];
    // console.log(depProductName);
   
    if(depProductName == "" || depProductName === undefined){
      this.errorMessage += "Please select Product Line Name <br/>";
    }
    if(typeName == ""){
      this.errorMessage += "Please enter Type Name";
    }
    if(this.errorMessage != "") {
      $("#valid_type_form").show();
      $("#valid_type_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
  

}
