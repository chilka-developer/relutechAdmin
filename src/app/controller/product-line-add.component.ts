import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-product-line-add',
  templateUrl: '../view/product-line-add.component.html',
  // styleUrls: ['./product-line-add.component.css']
})
export class ProductLineAddComponent implements OnInit {

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
    $("#product_line_add_failed").hide();
    $("#product_line_add_success").hide();
    $("#valid_product_line_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-product-line");
    this.http.post(CommonService.api_url + '/oem-data',
    { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
    this.getOem = responseData["data"]["ArrOEM"];
    // this.selectedOem = responseData["data"]["ArrOEM"][0]["id"];
    });
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/product-line-list');
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
      this.http.post(CommonService.api_url + '/product-line-add',
        {oem_id: this.selectedOem, product_line: this.selectedProductLine, is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
          // console.log(responseData);
          if (responseData["is_successful"] == "1") {
            localStorage.setItem("success_message", responseData["success_message"]);
            this.display_success_msg = responseData["success_message"];
          $("#product_line_add_success").show();
          $("#product_line_add_failed").hide();
          $("#valid_product_line_form").hide();
          setTimeout(()=>{
            this.router.navigateByUrl('/product-line-list');
          },2000);
            
          }
          else {
            this.display_failed_msg = responseData["errors"];
            $("#product_line_add_failed").show();
            $("#product_line_add_success").hide();
            $("#valid_product_line_form").hide();
            // Display Error message.
          }
        });

    }
  }
  isValidForm(){
    this.errorMessage = "";
    let productLineName = $("#txtProductLine").val();  
    if(productLineName == ""){
      this.errorMessage += "Please enter Product Line Name";
    }
  
    if(this.errorMessage != "") {
      $("#valid_product_line_form").show();
      $("#valid_product_line_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }



}
