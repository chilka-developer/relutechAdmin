import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-sales-rep-edit',
  templateUrl: '../view/sales-rep-edit.component.html',
  // styleUrls: ['./sales-rep-edit.component.css']
})
export class SalesRepEditComponent implements OnInit {

  popup : boolean = false;
  selectedSalesAgentName: string;
  selectedSalesAgentEmail : string;
  selectedSalesAgentPassword: string;
  sales_agent_id : any;
  isActive: boolean ;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";
  


  ngOnInit(): void {
    $("#sales_edit_failed").hide();
    $("#sales_edit_success").hide();
    $("#valid_sales_edit_form").hide();
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-sales-rep");
    this.sales_agent_id = localStorage.getItem("sales_agent_id");
    this.http.post(CommonService.api_url + '/agent-edit',{sales_agent_id :this.sales_agent_id ,oauth_key : CommonService.oauth_key}).subscribe(responseData => {
      let salesRepData = responseData["data"][0];
      this.selectedSalesAgentName =  salesRepData["user_name"];
      this.selectedSalesAgentEmail = salesRepData["email"];
      // console.log(this.selectedSalesAgentEmail);
      this.selectedSalesAgentPassword = salesRepData["password"];
      if(salesRepData["is_active"] == "Y"){
        this.isActive = true;
      }
      else{
        this.isActive = false;
      }
      // console.log(salesRepData);
    });
   
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/sales-rep-list');
    
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/agent-delete' , {sales_agent_id : this.sales_agent_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/sales-rep-list');
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
    this.sales_agent_id = localStorage.getItem("sales_agent_id");
    this.http.post(CommonService.api_url + '/agent-update',
      {sales_agent_id: this.sales_agent_id, 
        user_name: this.selectedSalesAgentName,
        email : this.selectedSalesAgentEmail, 
        password : this.selectedSalesAgentPassword, 
        is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
      }).subscribe(responseData => {
        // console.log(responseData);
        if (responseData["is_successful"] == "1") {
          localStorage.setItem("success_message", responseData["success_message"]);
          this.display_success_msg = responseData["success_message"];
            $("#sales_edit_success").show();
            $("#sales_edit_failed").hide();
            $("#valid_sales_edit_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/sales-rep-list');
            },2000);
            
          
        }
        else {
          this.display_failed_msg = responseData["errors"];
            $("#sales_edit_failed").show();
            $("#sales_edit_success").hide();
            $("#valid_sales_edit_form").hide();
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
      $("#valid_sales_edit_form").show();
      $("#valid_sales_edit_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
}
