import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { EquipmentDetails} from '../model/equipment-api.model';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
// import {jqueryui} from '../../assets/js/jquery-ui';
// declare var require: any
// var $ = require('jquery');
// require('jquery-ui');
 import * as $ from 'jquery';
// import 'jqueryui';

@Component({
  selector: 'app-equipment-add',
  templateUrl: '../view/equipment-add.component.html',
  // styleUrls: ['./equipment-add.component.css']
})
export class EquipmentAddComponent implements OnInit {

  equipmentAddForm! : any;
  isActive :boolean;
  getOem: any[] = [];
  getProductLine: any[] = [];
  getType: any;
  selectedOem: string;
  selectedProductLine: string;
  selectedType : string;
  isResponseSuccess : string;
  oemName:any;
  productLineName:any; 
  typeName:any;
  originalCostName:any;
  manufactureDate:any;
  rMaintenanceCost:any;
  oemMaintenanceCost:any;
  buyPrice:any;
  fmv:any;
  monthlyReductioninFMV:any;
  agingBucket1year:any;
  twoYears:any;
  threeYears:any;
  fourYears:any;
  fiveYears:any;
  overFiveYearsOld:any;
  selectedInfrastructureType:any;

  rMaintenanceCostDollar:any;
  oemMaintenanceCostDollar:any;
  buyPriceDollar:any;
  fmvDollar:any;
  monthlyReductioninFMVDollar:any;
  agingBucket1yearDollar:any;
  twoYearsDollar:any;
  threeYearsDollar:any;
  fourYearsDollar:any;
  fiveYearsDollar:any;
  overFiveYearsOldDollar:any;
  display_success_msg: string;
  display_failed_msg : string;
  errorMessage :string ="";
  equipmentDetails:EquipmentDetails;
  kwh_40_per_load_amount: any;
  spec_score_40_per_amount : any;
  kwh_40_per_load_per: any;
  spec_score_40_per_per: any;

  //datepicker : string;
  ngOnInit(): void {
    $("#equipment_add_failed").hide();
    $("#equipment_add_success").hide();
    $("#valid_equipment_form").hide();
   // $("input[type=date]").datepicker({ dateFormat: 'mm-dd-yyyy' }).val();
    this.isActive = true;
    $("#amountSection").hide();
    this.commonService.IsUserLogIn();
    this.equipmentDetails = new EquipmentDetails();
    CommonService.ActiveClass("nav-equipment");
   
    this.AddDefaultValues();
    // this.equipmentAddForm = new FormGroup({
    //   oemName : new FormControl(''),
    //   productLineName : new FormControl(''),
    //   typeName : new FormControl(''),
    //   originalCostName : new FormControl(''),
    //   manufactureDate : new FormControl(''),
    //   rMaintenanceCost : new FormControl(''),
    //   oemMaintenanceCost : new FormControl(''),
    //   buyPrice : new FormControl(''),
    //   FMV : new FormControl(''),
    //   monthlyReductioninFMV : new FormControl(''),
    //   agingBucket1year : new FormControl(''),
    //   twoYears : new FormControl(''),
    //   threeYears : new FormControl(''),
    //   fourYear : new FormControl(''),
    //   fiveYears : new FormControl(''),
    //   overFiveYearsOld : new FormControl(''),
    // });

    this.http.post(CommonService.api_url + '/oem-data',
      { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
      this.getOem = responseData["data"]["ArrOEM"];
      // this.selectedOem = responseData["data"]["ArrOEM"][0]["id"];
      });
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService ) { }

   navigateToEquipmentList = function(){
     this.router.navigateByUrl('/equipment-list')
   }

    navigateToEquipmentAddList = function(){
      if(!this.isValidForm()) {
        return;
      }
      else{
    if (this.isActive == true){
      this.equipmentDetails.is_active = "Y" ;
    }
    else {
      this.equipmentDetails.is_active = "N" ;
    }

    this.equipmentDetails.oem_id = this.selectedOem;
    this.equipmentDetails.type_id = this.selectedType;
    this.equipmentDetails.infrastructure_type = this.selectedInfrastructureType;
    this.equipmentDetails.product_line_id  = this.selectedProductLine;
    this.equipmentDetails.original_cost = this.originalCostName;
    this.equipmentDetails.manufacture_date = this.manufactureDate;
    this.equipmentDetails.rel_maintenance_price_per = this.rMaintenanceCost;
    this.equipmentDetails.oem_maintenance_price_per = this.oemMaintenanceCost;
    this.equipmentDetails.buy_price_per = this.buyPrice;
    this.equipmentDetails.fmv_per = this.fmv;
    this.equipmentDetails.monthly_reduction_fmv_per = this.monthlyReductioninFMV;
    this.equipmentDetails.age0_per = this.agingBucket1year;
    this.equipmentDetails.age1_per = this.twoYears;
    this.equipmentDetails.age2_per = this.threeYears;
    this.equipmentDetails.age3_per = this.fourYears;
    this.equipmentDetails.age4_per = this.fiveYears;
    this.equipmentDetails.age5_per = this.overFiveYearsOld;
    this.equipmentDetails.kwh_40_per_load_per = this.kwh_40_per_load_per;
    this.equipmentDetails.spec_score_40_per_per = this.spec_score_40_per_per;

    this.equipmentDetails.rel_maintenance_price_amount = this.rMaintenanceCostDollar;
    this.equipmentDetails.oem_maintenance_price_amount = this.oemMaintenanceCostDollar;
    this.equipmentDetails.buy_price_amount = this.buyPriceDollar;
    this.equipmentDetails.fmv_amount = this.fmvDollar;
    this.equipmentDetails.monthly_reduction_fmv_amount = this.monthlyReductioninFMVDollar;
    this.equipmentDetails.age0_amount = this.agingBucket1yearDollar;
    this.equipmentDetails.age1_amount = this.twoYearsDollar;
    this.equipmentDetails.age2_amount = this.threeYearsDollar;
    this.equipmentDetails.age3_amount = this.fourYearsDollar;
    this.equipmentDetails.age4_amount = this.fiveYearsDollar;
    this.equipmentDetails.age5_amount = this.overFiveYearsOldDollar;
    this.equipmentDetails.kwh_40_per_load_amount = this.kwh_40_per_load_amount;
    this.equipmentDetails.spec_score_40_per_amount = this.spec_score_40_per_amount;

    this.equipmentDetails.user_id = "1";
    // this.equipmentDetails.is_active = this.isActive;
    this.equipmentDetails.oauth_key= CommonService.oauth_key;

    

    this.http.post(CommonService.api_url+'/equipments-add', this.equipmentDetails).subscribe(responseData=>{
      // console.log(responseData);
      if(responseData["is_successful"]== "1"){
        this.display_success_msg = responseData["success_message"];
        $("#equipment_add_success").show();
        $("#equipment_add_failed").hide();
        $("#valid_equipment_form").hide();
        $("#containt-main").scrollTop;
        setTimeout(()=>{
          this.router.navigateByUrl('/equipment-list');
        },2000);
        
      }
      else{
        this.display_failed_msg = responseData["errors"];
        $("#equipment_add_failed").show();
        $("#equipment_add_success").hide();
        $("#valid_equipment_form").hide();
        $("#containt-main").scrollTop;
      }
    });
   }
  }
  // onSubmit(equipmentData:EquipmentDetails){
  //   localStorage.setItem("equipment_details" , JSON.stringify(equipmentData));
  //   
  // }

  onOemChange = function (selectedOem: string) {
    this.http.post(CommonService.api_url + '/oem-product-line-data',
      { oauth_key: CommonService.oauth_key, oem_id: selectedOem }).subscribe(responseData => {
        //console.log(responseData["data"]["ArrOEMProductLine"]);
        this.getProductLine = responseData["data"]["ArrOEMProductLine"];
        
        // this.selectedProductLine = responseData["data"]["ArrOEMProductLine"][0]["id"];
        //console.log(this.getProductLine);

      });

  }


  onProductLineChange = function (selectedProductLine: string) {
    // console.log(selectedProductLine);

    this.http.post(CommonService.api_url+'/product-line-type-data', 
    {oauth_key:CommonService.oauth_key ,oem_id: this.selectedOem, product_line_id: this.selectedProductLine  }).subscribe(responseData =>{
     // console.log(responseData["data"]);

      this.getType = responseData["data"]["ArrOEMProductLineType"];
      
      //console.log( this.getType);

    });
  }

  onTypeChanged = function(selectedType:string) {
    if($("#drpType option:selected" ).text() == "Generic") {
      $("#genericSection").show();
      $("#amountSection").hide();
      $("#originalCostName").show();
      $("#originalCostNameLbl").show();

    } else {
      $("#genericSection").hide();
      $("#amountSection").show();
      $("#originalCostName").hide();
      $("#originalCostNameLbl").hide();
    }
  }
  isValidForm(){
    this.errorMessage = "";
    let getOem =this.selectedOem;
    // console.log(this.getOem[0]);
    let getProductLine = this.selectedProductLine;
    let getType = this.selectedType; 
    let date = this.manufactureDate;
    // this.selectedOem;
    // this.selectedProductLine;
    // this.selectedType;
    let rMaintenanceCost = $("#rMaintenanceCost").val();  
    let oemMaintenanceCost = $("#oemMaintenanceCost").val();  
    let buyPrice = $("#buyPrice").val(); 
    let fmv = $("#fmv").val(); 
    let monthlyReductioninFMV = $("#monthlyReductioninFMV").val(); 
    let agingBucket1year = $("#agingBucket1year").val(); 
    let twoYears = $("#twoYears").val(); 
    let threeYears = $("#threeYears").val(); 
    let fourYears = $("#fourYears").val(); 
    let fiveYears = $("#fiveYears").val(); 
    let overFiveYearsOld = $("#overFiveYearsOld").val(); 
    let infrastructureType = $("#infrastructure-type").val(); 
    let kwh_40_per_load_per = $("#kwh_40_per_load_per").val(); 
    let spec_score_40_per_per = $("#spec_score_40_per_per").val(); 
   

    let rMaintenanceCostDollar = $("#rMaintenanceCostDollar").val();  
    let oemMaintenanceCostDollar = $("#oemMaintenanceCostDollar").val();  
    let buyPriceDollar = $("#buyPriceDollar").val(); 
    let fmvDollar = $("#fmvDollar").val(); 
    let monthlyReductioninFMVDollar = $("#monthlyReductioninFMVDollar").val(); 
    let agingBucket1yearDollar = $("#agingBucket1yearDollar").val(); 
    let twoYearsDollar = $("#twoYearsDollar").val(); 
    let threeYearsDollar = $("#threeYearsDollar").val(); 
    let fourYearsDollar = $("#fourYearsDollar").val(); 
    let fiveYearsDollar = $("#fiveYearsDollar").val(); 
    let overFiveYearsOldDollar = $("#overFiveYearsOldDollar").val(); 
    let kwh_40_per_load_amount = $("#kwh_40_per_load_amount").val(); 
    let spec_score_40_per_amount = $("#spec_score_40_per_amount").val(); 
    
    if(getOem == "" || getOem === undefined){
        this.errorMessage += "Please select OEM <br/>";
      }
    if(getProductLine == "" || getProductLine === undefined){
      this.errorMessage += "Please select Product Line <br/>";
    }
    if(getType == "" || getType === undefined){
      this.errorMessage += "Please select Type <br/>";
      
    }
    if(date == "" || date === undefined || date == null){
      this.errorMessage += "Please select Date <br/>";
      
    }
   
    if(this.selectedType){
      if($("#drpType option:selected" ).text() == "Generic"){ 
        if(rMaintenanceCost == "" || oemMaintenanceCost == "" || buyPrice == "" || fmv == "" || monthlyReductioninFMV =="" || agingBucket1year == "" || twoYears == "" ||
        threeYears =="" || fourYears == "" || fiveYears == "" || overFiveYearsOld == "" || infrastructureType == "" || kwh_40_per_load_per == "" || spec_score_40_per_per == "" ) {
          this.errorMessage += "Please enter all required field(s)<br/>";
        }
       
        if(this.errorMessage != "") {
          $("#valid_equipment_form").show();
          $("#valid_equipment_form").html(this.errorMessage);
          $("#containt-main").scrollTop;
      
          return false;
        }
        else {
          return true;
        }
      }
      else{
        if(rMaintenanceCostDollar == "" || oemMaintenanceCostDollar == "" || buyPriceDollar == "" || fmvDollar == "" || monthlyReductioninFMVDollar =="" || agingBucket1yearDollar == "" || twoYearsDollar == "" ||
        threeYearsDollar =="" || fourYearsDollar == "" || fiveYearsDollar == "" || overFiveYearsOldDollar == "" || infrastructureType == "" || kwh_40_per_load_amount == "" || spec_score_40_per_amount == "") {
          this.errorMessage += "Please enter all required field(s) <br/>";
        }
        if(this.errorMessage != "") {
          $("#valid_equipment_form").show();
          $("#valid_equipment_form").html(this.errorMessage);
          $("#containt-main").scrollTop;
      
          return false;
        }
        else {
          return true;
        }
      }
    }
    if(this.errorMessage != "") {
      $("#valid_equipment_form").show();
      $("#valid_equipment_form").html(this.errorMessage);
      $("#containt-main").scrollTop;
  
      return false;
    }
    else {
      return true;
    }
  }

  AddDefaultValues = function() {
    this.fmvDollar = 0;
    this.monthlyReductioninFMVDollar = 4.17 ;
    this.monthlyReductioninFMV = 4.17 ;
    this.agingBucket1yearDollar = 0 ;
    this.twoYearsDollar = 0 ;
    this.threeYearsDollar = 0 ;
    this.fourYearsDollar = 0 ;
    this.fiveYearsDollar = 0 ;
    this.overFiveYearsOldDollar = 0 ;
    this.originalCostName = 0 ;
    // this.agingBucket1yearDollar
  }

}