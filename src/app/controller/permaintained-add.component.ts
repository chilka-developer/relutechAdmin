import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-permaintained-add',
  templateUrl: '../view/permaintained-add.component.html',
  // styleUrls: ['./permaintained-add.component.css']
})
export class PermaintainedAddComponent implements OnInit {

  getOem: any[] = [];
  getProductLine: any[] = [];
  getType: any;
  selectedTerms: string;
  selected1Year : string;
  selected2Year: string;
  selected3Year: string;
  selected4Year: string;
  selected5Year:string;
  selected6Year: string;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";

  
  isActive = { options: '1' };
  
  


  ngOnInit(): void {
    $("#permaintained_add_failed").hide();
    $("#permaintained_add_success").hide();
    $("#valid_permaintained_form").hide();
    CommonService.ActiveClass("nav-permaintained");
    this.commonService.IsUserLogIn();
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
    this.router.navigateByUrl('/permaintained-list');
    
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
    this.http.post(CommonService.api_url + '/permaintained-add',
      {terms: this.selectedTerms, 
        age0_year: this.selected1Year,
        age1_years : this.selected2Year, 
        age2_years : this.selected3Year, 
        age3_years : this.selected4Year, 
        age4_years : this.selected5Year, 
        age5_years : this.selected6Year, 
        is_active: this.is_active, user_id: "1", oauth_key: CommonService.oauth_key
      }).subscribe(responseData => {
        // console.log(responseData);
        if (responseData["is_successful"] == "1") {
          localStorage.setItem("success_message", responseData["success_message"]);
          this.display_success_msg = responseData["success_message"];
            $("#permaintained_add_success").show();
            $("#permaintained_add_failed").hide();
            $("#valid_permaintained_form").hide();
            setTimeout(()=>{
              this.router.navigateByUrl('/permaintained-list');
            },2000);
         
        }
        else {
          $("#permaintained_add_failed").show();
          $("#permaintained_add_success").hide();
          $("#valid_permaintained_form").hide();
          this.display_failed_msg = responseData["errors"];
          // Display Error message.
        }
      });
    }
  }
  isValidForm(){
    this.errorMessage = "";
    let txtTerms = $("#txtTerms").val();  
    let txt1Year = $("#txt1Year").val();  
    let txt2Year = $("#txt2Year").val();  
    let txt3Year = $("#txt3Year").val();  
    let txt4Year = $("#txt4Year").val();  
    let txt5Year = $("#txt5Year").val();  
    let txt6Year = $("#txt6Year").val();  
    if(txtTerms == ""){
      this.errorMessage += "Please enter Terms <br/>";
    }
    if(txt1Year == ""){
      this.errorMessage += "Please enter 0-1 Year <br/>";
    }
    if(txt2Year == ""){
      this.errorMessage += "Please enter 1-2 Years  <br/>";
    }
    if(txt3Year == ""){
      this.errorMessage += "Please enter 2-3 Years <br/>";
    }
    if(txt4Year == ""){
      this.errorMessage += "Please enter 3-4 Years <br/>";
    }
    if(txt5Year == ""){
      this.errorMessage += "Please enter 4-5 Years  <br/>";
    }
    if(txt6Year == ""){
      this.errorMessage += "Please enter 5+ Years  ";
    }
    if(this.errorMessage != "") {
      $("#valid_permaintained_form").show();
      $("#valid_permaintained_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }
  

}
