import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sales-rep-add',
  templateUrl: '../view/sales-rep-add.component.html',
  // styleUrls: ['./sales-rep-add.component.css']
})
export class SalesRepAddComponent implements OnInit {

  selectedSalesAgentName: string;
  selectedSalesAgentEmail : string;
  selectedSalesAgentPassword: string;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";
  isActive: boolean ;
 
  
  


  ngOnInit(): void {
    this.isActive = true;
    $("#sales_add_failed").hide();
    $("#sales_add_success").hide();
    $("#valid_sales_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-sales-rep");
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
    this.router.navigateByUrl('/sales-rep-list');
    
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
      this.http.post(CommonService.api_url + '/agent-add',
        {user_name: this.selectedSalesAgentName, 
          email: this.selectedSalesAgentEmail,
          password : this.selectedSalesAgentPassword, 
        
          is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
          // console.log(responseData);
          if (responseData["is_successful"] == "1") {
            localStorage.setItem("success_message", responseData["success_message"]);
            this.display_success_msg = responseData["success_message"];
            $("#sales_add_success").show();
            $("#sales_add_failed").hide();
            $("#valid_sales_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/sales-rep-list');
            },2000);
            
          }
          else {
            this.display_failed_msg = responseData["errors"];
            $("#sales_add_failed").show();
            $("#sales_add_success").hide();
            $("#valid_sales_form").hide();
            // Display Error message.
          }
        });
      }
  }
  isValidForm(){
    this.errorMessage = "";
    let salesAgentName = $("#txtSalesAgentName").val();  
    let salesAgentEmail = $("#txtSalesAgentEmail").val();  
    let salesAgentPassword = $("#txtSalesAgentPassword").val();  
    if(salesAgentName == ""){
      this.errorMessage += "Please enter Sales Rep. Name <br/>";
    }
    if(salesAgentEmail == ""){
      this.errorMessage += "Please enter Sales Rep. Email <br/>";
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test( salesAgentEmail.toString() )) {
      this.errorMessage += "Please enter valid Email Id <br/>";
    }
    if(salesAgentPassword == ""){
      this.errorMessage += "Please enter Sales Rep. Password";
    }
    if(this.errorMessage != "") {
      $("#valid_sales_form").show();
      $("#valid_sales_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }

}
