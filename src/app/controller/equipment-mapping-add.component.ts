import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as $ from 'jquery';


@Component({
  selector: 'app-equipment-mapping-add',
  templateUrl: '../view/equipment-mapping-add.component.html',
  // styleUrls: ['./equipment-mapping-add.component.css']
})
export class EquipmentMappingAddComponent implements OnInit {

  getOem: any[] = [];
  getProductLine: any[] = [];
  getType: any[] = [];
  selectedOem: string;
  selectedProductLine: string;
  isActive = { options: '1' };
  selectedType : string;
  isResponseSuccess : string;

  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";
  companyName:object;
  
  ngOnInit(): void {
    $("#equipment_map_add_failed").hide();
    $("#equipment_map_add_success").hide();
    $("#valid_equipment_map_form").hide();
    CommonService.ActiveClass("nav-equipment-mapping");
    this.commonService.IsUserLogIn();
    this.http.post(CommonService.api_url + '/oem-data',
      { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
      this.getOem = responseData["data"]["ArrOEM"];
      });
    
    // this.http.post(CommonService.api_url+'/product-line-type-data', 
    // {oauth_key:CommonService.oauth_key ,oem_id: '' , product_line_id : ''}).subscribe(responseData =>{
    //   //console.log(responseData["data"]["ArrOEM"]);

    //   //this.getOem = responseData["data"]["ArrOEM"];

    // });

  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/equipment-mapping-list');
  }
  navigateToEquipmentMappingList = function () {
    if(!this.isValidForm()) {
      return;
    }
    else{
    if (this.isActive.options == true){
      this.is_active = "Y" ;
    }
    else {
      this.is_active = "N" ;
    }
    this.http.post(CommonService.api_url + '/equipment-mapping-add' , 
    {

      oem_id : this.selectedOem , product_line_id : this.selectedProductLine, is_active: this.is_active , type_id: this.selectedType , user_id: "1",oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
       
      console.log(responseData);
      if (responseData["is_successful"] == "1"){
        // console.log( responseData["success_message"]);
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

    this.http.post(CommonService.api_url+'/product-line-type-data', 
    {oauth_key:CommonService.oauth_key ,oem_id: this.selectedOem, product_line_id: this.selectedProductLine }).subscribe(responseData =>{
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
