import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-permaintained-edit',
  templateUrl: '../view/permaintained-edit.component.html',
  // styleUrls: ['./permaintained-edit.component.css']
})
export class PermaintainedEditComponent implements OnInit {

  popup :boolean = false;
  getOem: any[] = [];
  getProductLine: any[] = [];
  getType: any;
  selectedOem: string;
  selectedTerms: string ="";
  selected0Year : string;
  selected1Year : string;
  selected2Year: string;
  selected3Year: string;
  selected4Year: string;
  selected5Year:string;
  maintained_id: any;
  selectedProductLine: string;
  isActive : boolean;
  selectedType: string;
  isResponseSuccess: string;
  errorMessage :string ="";
  display_success_msg: string;
  display_failed_msg : string;

  ngOnInit(): void {
    $("#permaintained_add_failed").hide();
    $("#permaintained_add_success").hide();
    $("#valid_permaintained_form").hide();
    CommonService.ActiveClass("nav-permaintained");
    this.commonService.IsUserLogIn();
    this.maintained_id = localStorage.getItem("maintained_id");
    this.http.post(CommonService.api_url + '/permaintained-edit',
    {maintained_id : this.maintained_id, terms : this.selectedTerms,oauth_key: CommonService.oauth_key}).subscribe(responseData => {
    let permaintainedData = responseData["data"][0];
    this.selectedTerms =  permaintainedData["migration_term"];
    this.selected0Year = permaintainedData["year_0_1"];
    this.selected1Year = permaintainedData["year_1_2"];
    this.selected2Year = permaintainedData["year_2_3"];
    this.selected3Year = permaintainedData["year_3_4"];
    this.selected4Year = permaintainedData["year_4_5"];
    this.selected5Year = permaintainedData["over_5_years"];
    if(permaintainedData["is_active"] == "Y"){
      this.isActive = true;
    }
    else{
      this.isActive = false;
    }
    // console.log(( permaintainedData));
    });
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/permaintained-list');
    
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/permaintained-delete' , {maintained_id : this.maintained_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/permaintained-list');
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
    this.maintained_id = localStorage.getItem("maintained_id");
    this.http.post(CommonService.api_url + '/permaintained-update',
      {maintained_id : this.maintained_id , terms : this.selectedTerms , age0_year : this.selected0Year , 
        age1_years : this.selected1Year ,age2_years : this.selected2Year , age3_years: this.selected3Year , age4_years : this.selected4Year, age5_years : this.selected5Year, user_id: "1", is_active : this.is_active ,oauth_key: CommonService.oauth_key
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
