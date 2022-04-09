import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-equipment-mapping-edit',
  templateUrl: '../view/equipment-mapping-edit.component.html',
  // styleUrls: ['./equipment-mapping-edit.component.css']
})
export class EquipmentMappingEditComponent implements OnInit {
  popup:boolean = false;
  getOem: any[] = [];
  selectedOem: string;

  getProductLine: any[] = [];
  getType: any;

  selectedProductLine: string;
  isActive = { options: true };
  selectedType: string;
  isResponseSuccess: string;
  oem_mapping_id: string = "";
  errorMessage :string ="";
  display_success_msg: string;
  display_failed_msg : string;
 

  ngOnInit(): void {
    $("#equipment_map_add_failed").hide();
    $("#equipment_map_add_success").hide();
    $("#valid_equipment_map_form").hide();
    CommonService.ActiveClass("nav-equipment-mapping");
    this.http.post(CommonService.api_url + '/oem-data',
      { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
        this.getOem = responseData["data"]["ArrOEM"];

        this.oem_mapping_id = localStorage.getItem("oem_mapping_id");

        this.http.post(CommonService.api_url + '/equipment-mapping-edit', {
          oem_mapping_id: this.oem_mapping_id,
          oauth_key: CommonService.oauth_key
        }).subscribe(responseData => {
          if (responseData != null && responseData["is_successful"] == 1) {
            if (responseData["data"] != null) {
              let mappingData = responseData["data"][0];

              this.selectedOem = mappingData["oem_id"];
              
              this.getProductLine = [
                {
                  "id": mappingData["product_line_id"],
                  "name": mappingData["product_line_name"]
                }
              ];
              this.selectedProductLine = mappingData["product_line_id"];

              this.getType = [
                {
                  "id": mappingData["type_id"],
                  "name": mappingData["type_name"]
                }
              ];
              this.selectedType = mappingData["type_id"];

              if (mappingData["is_active"] == "Y") {
                this.isActive.options = true;
              }
              else {
                this.isActive.options = false;
                $("#chkisactive").click();
              }

            }
          }
        });

      });



  }

  constructor(private router: Router, private commonService: CommonService, private http: HttpClient) { };

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/equipment-mapping-list');
  }
  navigateToDelete(){
    this.http.post(CommonService.api_url + '/equipment-mapping-delete' , {oem_mapping_id : this.oem_mapping_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/equipment-mapping-list');
        },2000);

        
      }
      else{
        this.errorMessage= responseData["errors"];
        $("#record_delete_fail").show();
        $("#record_delete_fail").html(this.errorMessage);
      }
    });
  }
  

    // this.http.post(CommonService.api_url + '/equipment-mapping-delete',{oem_mapping_id :this.oem_mapping_id}).subscribe(responseData=>{

    // });

 
 

  navigateToEquipmentMappingList = function () {
    if(!this.isValidForm()) {
      return;
    }
    else{
    if (this.isActive == true){
      this.is_active = "Y" ;
    }
    else {
      this.is_active = "N" ;
    }
    this.http.post(CommonService.api_url + '/equipment-mapping-update' , 
    {
      oem_mapping_id: this.oem_mapping_id,
      oem_id : this.selectedOem , product_line_id : this.selectedProductLine, is_active: this.is_active , type_id: this.selectedType , user_id: "1", oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
       
      // console.log(responseData);
      if (responseData["is_successful"] == "1"){
        localStorage.setItem("success_message", responseData["success_message"]);
        this.display_success_msg = responseData["success_message"];
        // console.log(this.display_success_msg);
        $("#equipment_map_add_success").show();
        $("#equipment_map_add_failed").hide();
        $("#valid_equipment_map_form").hide();
        setTimeout(()=>{
          this.router.navigateByUrl('/equipment-mapping-list');
        },2000);
       
      }
      else {
        this.display_failed_msg = responseData["errors"];
        $("#equipment_map_add_failed").show();
        $("#equipment_map_add_success").hide();
        $("#valid_equipment_map_form").hide();
        // Display error.
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

      });
  }
  onProductLineChange = function (selectedProductLine: string) {
    // console.log(selectedProductLine);

    this.http.post(CommonService.api_url + '/product-line-type-data',
      { oauth_key: CommonService.oauth_key, oem_id: this.selectedOem }).subscribe(responseData => {
        // console.log(responseData["data"]);

        this.getType = responseData["data"]["ArrOEMProductLineType"];
        //console.log( this.getType);

      });
  }

  isValidForm(){
    this.errorMessage = "";
    //let companyName = $("#txtEquipmentMapName").val();  
    let companyName = this.getOem[0];
    let pcompanyName = this.getProductLine[0];
    let tcompanyName = this.getType[0]; 
    // console.log(tcompanyName);
    // console.log(pcompanyName);
    // console.log(companyName);

    if(companyName == "" || companyName === undefined){
      this.errorMessage += "Please select Oem Name <br/>";
    } 
    if(pcompanyName == "" || pcompanyName === undefined){
      this.errorMessage += "Please select ProductLine Name  <br/>";
    } 
    if(tcompanyName == "" || tcompanyName === undefined){
      this.errorMessage += "Please select Type Name  <br/>";
    }
    if(this.errorMessage != "") {
      $("#valid_equipment_map_form").show();
      $("#valid_equipment_map_form").html(this.errorMessage);
   
      return false;
    }
    else {
      return true;
    }
  }


}
