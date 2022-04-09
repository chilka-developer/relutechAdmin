import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-type-edit',
  templateUrl: '../view/type-edit.component.html',
  // styleUrls: ['./type-edit.component.css']
})
export class TypeEditComponent implements OnInit {

  popup : boolean = false;
  getOem: any[] = [];
  selectedOem: string;
  type_id : string;
 

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
    $("#type_edit_failed").hide();
    $("#type_edit_success").hide();
    $("#valid_type_edit_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-type");
    this.type_id = localStorage.getItem("type_id");
    this.http.post(CommonService.api_url +'/type-edit', {type_id:this.type_id ,  oauth_key: CommonService.oauth_key} ).subscribe(responseData=>{
      // console.log(responseData);
      if(responseData["is_successful"]=="1"){
        let type_detail = responseData["data"][0];
        this.selectedOem = type_detail["oem"];
        this.selectedProductLine = type_detail["product_line"];
        this.selectedType = type_detail["type"];

        this.getOem = [
                {
                  "id": type_detail["oem_id"],
                  "name": type_detail["oem"]
                }
              ];
        this.selectedOem = type_detail["oem_id"];

        this.getProductLine = [
          {
            "id": type_detail["product_line_id"],
            "name": type_detail["product_line"]
          }
        ];
        this.selectedProductLine = type_detail["product_line_id"];

       
        if (type_detail["is_active"] == "Y") {
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
    this.router.navigateByUrl('/type-list')
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/type-delete' , {type_id : this.type_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/type-list');
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
    this.type_id = localStorage.getItem("type_id");
    if (this.isActive.options == true) {
      this.is_active = "Y";
    }
    else {
      this.is_active = "N";
    }
    this.http.post(CommonService.api_url + '/type-update',
      {oem_id : this.selectedOem, product_line_id: this.selectedProductLine, type : this.selectedType ,type_id :this.type_id , is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key}).subscribe(responseData => {
        // console.log(responseData);
        if(responseData["is_successful"]=="1"){
          this.display_success_msg = responseData["success_message"];
          $("#type_edit_success").show();
          $("#type_edit_failed").hide();
          $("#valid_type_edit_form").hide();
          setTimeout(()=>{
            this.router.navigateByUrl('/type-list');
          },2000);
         
        }
        else{
          this.display_failed_msg = responseData["errors"];
          $("#type_edit_failed").show();
          $("#type_edit_success").hide();
          $("#valid_type_edit_form").hide();
        }
        
    });
  }
  }
  isValidForm(){
    this.errorMessage = "";
    let typeName = $("#txtTypeEdit").val();  
    if(typeName == ""){
      this.errorMessage += "Please enter Type Name";
    }
    if(this.errorMessage != "") {
      $("#valid_type_edit_form").show();
      $("#valid_type_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
}
