import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-oem-edit',
  templateUrl: '../view/oem-edit.component.html'
})
export class OemEditComponent implements OnInit {
  popup : boolean = false;
  getOem: any[] = [];
  selectedOem: string;
  oem_id : string;
 

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
    $("#oem_edit_failed").hide();
    $("#oem_edit_success").hide();
    $("#valid_oem_edit_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-oem");
    this.oem_id = localStorage.getItem("oem_id");
    this.http.post(CommonService.api_url +'/oem-edit', {oem_id:this.oem_id ,  oauth_key: CommonService.oauth_key} ).subscribe(responseData=>{
      // console.log(responseData);
      if(responseData["is_successful"]=="1"){
        let oem_detail = responseData["data"][0];
        this.selectedOem = oem_detail["oem"];
       
        
        if (oem_detail["is_active"] == "Y") {
          this.isActive.options = true;
          // console.log(this.isActive.options);
        }
        else {
          this.isActive.options = false;
          // console.log(this.isActive.options);
          
        }
        
      }
    });
  }

  constructor(private router: Router, private commonService: CommonService, private http: HttpClient) { }
  navigateToEquipmentMapping = function(){
    this.router.navigateByUrl('/oem-list')
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/oem-delete' , {oem_id : this.oem_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/oem-list');
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
    if(!this.isValidForm()) {
      return;
    }
    else{
      this.oem_id = localStorage.getItem("oem_id");

      if (this.isActive.options == true) {
        this.is_active = "Y";
      }
      else {
        this.is_active = "N";
      }
      this.http.post(CommonService.api_url + '/oem-update',
        {oem_id : this.oem_id, oem: this.selectedOem, is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key}).subscribe(responseData => {
          // console.log(responseData);
          if(responseData["is_successful"]=="1"){
            this.display_success_msg = responseData["success_message"];
            $("#oem_edit_success").show();
            $("#oem_edit_failed").hide();
            $("#valid_oem_edit_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/oem-list');
            },2000);
            
          }
          else{
            this.display_failed_msg = responseData["errors"];
            $("#oem_edit_failed").show();
            $("#oem_edit_success").hide();
            $("#valid_oem_edit_form").hide();
          }
      });

    }
  }
  isValidForm(){
    this.errorMessage = "";
    let oemName = $("#txtOemEdit").val();  
    if(oemName == ""){
      this.errorMessage += "Please enter OEM Name";
    }
    if(this.errorMessage != "") {
      $("#valid_oem_edit_form").show();
      $("#valid_oem_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
}
