import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-product-line-edit',
  templateUrl: '../view/product-line-edit.component.html',
  // styleUrls: ['./product-line-edit.component.css']
})
export class ProductLineEditComponent implements OnInit {

  popup :boolean = false;
  getOem: any[] = [];
  selectedOem: string;
  product_line_id : string;
 

  getProductLine: any[] = [];
  getType: any;

  selectedProductLine: string;
  isActive = { options: true };
  selectedType: string;
  isResponseSuccess: string;
  oem_mapping_id: string = "";
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";

  ngOnInit(): void {
    $("#product_line_edit_failed").hide();
    $("#product_line_edit_success").hide();
    $("#valid_product_line_edit_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-product-line");
    this.product_line_id = localStorage.getItem("product_line_id");
    this.http.post(CommonService.api_url +'/product-line-edit', {product_line_id:this.product_line_id ,  oauth_key: CommonService.oauth_key} ).subscribe(responseData=>{
      // console.log(responseData);
      if(responseData["is_successful"]=="1"){
        let product_line_detail = responseData["data"][0];
        this.selectedOem = product_line_detail["oem"];
        
        this.selectedProductLine = product_line_detail["product_line"];

        this.getOem = [
                {
                  "id": product_line_detail["oem_id"],
                  "name": product_line_detail["oem"]
                }
              ];
          this.selectedOem = product_line_detail["oem_id"];

       
        if (product_line_detail["is_active"] == "Y") {
          this.isActive.options = true;
          // console.log(this.isActive.options);
        }
        else {
          this.isActive.options = false;
          // console.log(this.isActive.options);
        }
        
      }
      else {
        // Inform user that there is an error while fetching product line data.
      }
    });
  }

  constructor(private router: Router, private commonService: CommonService, private http: HttpClient) { }
  navigateToEquipmentMapping = function(){
    this.router.navigateByUrl('/product-line-list')
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/product-line-delete' , {product_line_id : this.product_line_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/product-line-list');
        },2000);
       
      }
      else{
        this.errorMessage= responseData["errors"];
        $("#record_delete_fail").show();
        $("#record_delete_fail").html(this.errorMessage);
      }
    });
  }
  navigateToEquipmentMappingList = function(){
    // this.product_line_id = localStorage.getItem("product_line_id");
    if(!this.isValidForm()) {
      return;
    }
    else{
      this.product_line_id = localStorage.getItem("product_line_id");
      if (this.isActive.options == true) {
        this.is_active = "Y";
      }
      else {
        this.is_active = "N";
      }
      this.http.post(CommonService.api_url + '/product-line-update',
        {oem_id : this.selectedOem, product_line_id: this.product_line_id, product_line : this.selectedProductLine, is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key}).subscribe(responseData => {
          // console.log(responseData);
          if(responseData["is_successful"]=="1"){
            this.display_success_msg = responseData["success_message"];
            $("#product_line_edit_success").show();
            $("#product_line_edit_failed").hide();
            $("#valid_product_line_edit_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/product-line-list');
            },2000);
            
          }
          else{
            this.display_failed_msg = responseData["errors"];
            $("#product_line_edit_failed").show();
            $("#product_line_edit_success").hide();
            $("#valid_product_line_edit_form").hide();
          }
      });
    }
  }
  isValidForm(){
    this.errorMessage = "";
    let productLineName = $("#txtProductLineEdit").val();  
    if(productLineName == ""){
      this.errorMessage += "Please enter Product Line Name";
    }
  
    if(this.errorMessage != "") {
      $("#valid_product_line_edit_form").show();
      $("#valid_product_line_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }


}
