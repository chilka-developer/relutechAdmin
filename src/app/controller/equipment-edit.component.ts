import { Component, OnInit } from '@angular/core';
import { EquipmentDetails} from '../model/equipment-api.model';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: '../view/equipment-edit.component.html',
  // styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {

  popup:boolean = false;
  equipmentAddForm! : any;
  isActive:boolean;//= { options: true };
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
  display_failed_msg:string;
  display_success_msg:string;
  errorMessage :string ="";
  selectedInfrastructureType : any;
  kwh_40_per_load_amount: any;
  spec_score_40_per_amount : any;
  kwh_40_per_load_per: any;
  spec_score_40_per_per: any;

  equipmentDetails:EquipmentDetails;
  equipment_id: string = "";
  // oem_id  : string;
 

  ngOnInit(): void {
    $("#equipment_add_failed").hide();
    $("#equipment_add_success").hide();
    $("#valid_equipment_form").hide();
    $("#amountSectionEdit").hide();
    this.commonService.IsUserLogIn();
    this.equipmentDetails = new EquipmentDetails();
    CommonService.ActiveClass("nav-equipment");

    // this.http.post(CommonService.api_url + '/oem-data',
    //   { oauth_key: CommonService.oauth_key }).subscribe(responseData => {
    //   this.getOem = responseData["data"]["ArrOEM"];
    //   this.selectedOem = responseData["data"]["ArrOEM"][0]["equipment_id"];
    // });
    this.equipment_id = localStorage.getItem("equipment_id");
    this.http.post(CommonService.api_url + '/equipments-edit', {
      equipment_id: this.equipment_id,
      oauth_key: CommonService.oauth_key
    }).subscribe(responseData => {
      // console.log(responseData);
      if (responseData != null && responseData["is_successful"] == 1) {
        if (responseData["data"] != null) {
          let equipmentListData = responseData["data"];
          
          this.getOem = [
            {
              "id": equipmentListData["oem_id"],
              "name": equipmentListData["oem"]
            }
          ];
          this.selectedOem = equipmentListData["oem_id"];
          
          this.getProductLine = [
            {
              "id": equipmentListData["product_line_id"],
              "name": equipmentListData["product_line"]
            }
          ];
          this.selectedProductLine = equipmentListData["product_line_id"];

          this.getType = [
            {
              "id": equipmentListData["type_id"],
              "name": equipmentListData["type"]
            }
          ];
          this.selectedType = equipmentListData["type_id"];
          this.selectedInfrastructureType = equipmentListData["infrastructure_type"];
          this.originalCostName = equipmentListData["original_cost"];
          this.manufactureDate = equipmentListData["manufacture_date"];
          this.rMaintenanceCost = equipmentListData["rel_maintenance_price_per"];
          this.oemMaintenanceCost = equipmentListData["oem_maintenance_price_per"];
          this.buyPrice = equipmentListData["buy_price_per"];
          this.fmv = equipmentListData["fmv_per"];
          this.monthlyReductioninFMV = equipmentListData["monthly_reduction_fmv_per"];
          this.agingBucket1year = equipmentListData["age0_per"];
          this.twoYears = equipmentListData["age1_per"];
          this.threeYears = equipmentListData["age2_per"];
          this.fourYears = equipmentListData["age3_per"];
          this.fiveYears = equipmentListData["age4_per"];
          this.overFiveYearsOld = equipmentListData["age5_per"];
          this.kwh_40_per_load_per = equipmentListData["kwh_40_per_load_per"];
          this.spec_score_40_per_per = equipmentListData["spec_score_40_per_per"];
         

          
          this.rMaintenanceCostDollar = equipmentListData["rel_maintenance_price_amount"];
          this.oemMaintenanceCostDollar = equipmentListData["oem_maintenance_price_amount"];
          this.buyPriceDollar = equipmentListData["buy_price_amount"];
          this.fmvDollar = equipmentListData["fmv_amount"];
          this.monthlyReductioninFMVDollar = equipmentListData["monthly_reduction_fmv_amount"];
          this.agingBucket1yearDollar = equipmentListData["age0_amount"];
          this.twoYearsDollar = equipmentListData["age1_amount"];
          this.threeYearsDollar = equipmentListData["age2_amount"];
          this.fourYearsDollar = equipmentListData["age3_amount"];
          this.fiveYearsDollar = equipmentListData["age4_amount"];
          this.overFiveYearsOldDollar = equipmentListData["age5_amount"];
          this.kwh_40_per_load_amount = equipmentListData["kwh_40_per_load_amount"];
          this.spec_score_40_per_amount = equipmentListData["spec_score_40_per_amount"];
        
          if (equipmentListData["is_active"] == "N") {
            $("#chkisactive").click();
            this.isActive = false;
          }
          else{
            this.isActive = true;
          }

          if(equipmentListData["type"] == "Generic") {
            $("#genericSectionEdit").show();
            $("#amountSectionEdit").hide();
            $("#originalCostName").show();
            $("#originalCostNameLbl").show();
          } else {
            $("#genericSectionEdit").hide();
            $("#amountSectionEdit").show();
            $("#originalCostName").hide();
            $("#originalCostNameLbl").hide();
      
          }

          // if (equipmentListData["is_active"] == "Y") {
          //   this.isActive.options = true;
          // }
          // else {
          //   this.isActive.options = false;
            
          // }

        }
        
      }
      
    });
  }

  constructor(private router: Router, private http: HttpClient, private commonService: CommonService ) { }

   navigateToEquipmentList = function(){
     this.router.navigateByUrl('/equipment-list');
   }
   navigateToDelete(){
    this.http.post(CommonService.api_url + '/equipments-delete' , {equipment_id : this.equipment_id , oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"] == "1"){
        this.errorMessage= responseData["success_message"];
        $("#record_delete_success").show();
        $("#record_delete_success").html(this.errorMessage);
       

        setTimeout(()=>{
          this.router.navigateByUrl('/equipment-list');
        },2000);

       
      }else{
        this.errorMessage= responseData["errors"];
        $("#record_delete_fail").show();
        $("#record_delete_fail").html(this.errorMessage);
      }
    });
  }
    navigateToEquipmentAddList = function(){
      if(!this.isValidForm()) {
        return;
      }
      else{
    
        this.equipmentDetails.equipment_id = localStorage.getItem("equipment_id");
        this.equipmentDetails.oem_id = this.selectedOem;
        this.equipmentDetails.type_id = this.selectedType;
        this.equipmentDetails.infrastructure_type = this.selectedInfrastructureType ;
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
        if(this.isActive == true) {
          this.equipmentDetails.is_active = "Y";
        } else {
          this.equipmentDetails.is_active = "N";
        }
        
        this.equipmentDetails.oauth_key= CommonService.oauth_key;

        this.http.post(CommonService.api_url+'/equipments-update', this.equipmentDetails).subscribe(responseData=>{
          // console.log(responseData);
          if(responseData["is_successful"]=="1"){
            this.display_success_msg = responseData["success_message"];
            $("#equipment_add_success").show();
            $("#equipment_add_failed").hide();
            $("#valid_equipment_form").hide();
            $(".data-scrollable").scrollTop;
            setTimeout(()=>{
              this.router.navigateByUrl('/equipment-list');
            },2000);
          }
          else{
            this.display_failed_msg = responseData["errors"];
            $("#equipment_add_failed").show();
            $("#equipment_add_success").hide();
            $("#valid_equipment_form").hide();
            $(".data-scrollable").scrollTop;
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
        this.selectedProductLine = responseData["data"]["ArrOEMProductLine"][0]["id"];
        //console.log(this.getProductLine);

      });

  }

  onProductLineChange = function (selectedProductLine: string) {
    // console.log(selectedProductLine);

    this.http.post(CommonService.api_url+'/product-line-type-data', 
    {oauth_key:CommonService.oauth_key ,oem_id: this.selectedOem }).subscribe(responseData =>{
     // console.log(responseData["data"]);

      this.getType = responseData["data"]["ArrOEMProductLineType"];
      
      //console.log( this.getType);

    });
  }

  onTypeChanged = function(selectedType:string) {
    if($("#drpType option:selected" ).text() == "Generic") {
      $("#genericSectionEdit").show();
      $("#amountSectionEdit").hide();
      $("#originalCostName").show();
      $("#originalCostNameLbl").show();

    } else {
      $("#genericSectionEdit").hide();
      $("#amountSectionEdit").show();
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
    let infrastructureType = this.selectedInfrastructureType; 
    // this.selectedOem;
    // this.selectedProductLine;
    // this.selectedType;
    let rMaintenanceCost = this.rMaintenanceCost;  
    let oemMaintenanceCost = this.oemMaintenanceCost;  
    let buyPrice =this.buyPrice; 
    let fmv = this.fmv; 
    let monthlyReductioninFMV =this.monthlyReductioninFMV; 
    let agingBucket1year =this.agingBucket1year; 
    let twoYears =this.twoYears; 
    let threeYears = this.threeYears; 
    let fourYears =this.fourYears; 
    let fiveYears =this.fiveYears; 
    let overFiveYearsOld = this.overFiveYearsOld; 
    let date = this.manufactureDate;
    let kwh_40_per_load_per = this.kwh_40_per_load_per;
    let spec_score_40_per_per =  this.spec_score_40_per_per;
   
   

    let rMaintenanceCostDollar =this.rMaintenanceCostDollar;  
    let oemMaintenanceCostDollar = this.oemMaintenanceCostDollar;  
    let buyPriceDollar = this.buyPriceDollar; 
    let fmvDollar =this.fmvDollar; 
    let monthlyReductioninFMVDollar =this.monthlyReductioninFMVDollar; 
    let agingBucket1yearDollar =this.agingBucket1yearDollar; 
    let twoYearsDollar = this.twoYearsDollar; 
    let threeYearsDollar = this.threeYearsDollar; 
    let fourYearsDollar =this.fourYearsDollar; 
    let fiveYearsDollar = this.fiveYearsDollar; 
    let overFiveYearsOldDollar = this.overFiveYearsOldDollar; 
    let kwh_40_per_load_amount =this.kwh_40_per_load_amount;
    let spec_score_40_per_amount =this.spec_score_40_per_amount;
    
    if(getOem == "" || getOem === undefined){
      this.errorMessage += "Please select OEM <br/>";
    }
  if(getProductLine == "" || getProductLine === undefined){
    this.errorMessage += "Please select Product Line <br/>";
  }
  if(getType == "" || getType === undefined){
    this.errorMessage += "Please select Type <br/>";

    if(date == "" || date === undefined || date == null){
      this.errorMessage += "Please select Date <br/>";
      
    }
      
    }
   
    if(this.selectedType != ''){
      if($("#drpType option:selected" ).text() == "Generic"){ 
        if(rMaintenanceCost == ""||rMaintenanceCost == null || oemMaintenanceCost == "" || oemMaintenanceCost == null || buyPrice == "" ||  buyPrice == null || fmv == "" ||fmv == null || monthlyReductioninFMV =="" ||monthlyReductioninFMV == null || agingBucket1year == "" ||agingBucket1year == null || twoYears == "" ||twoYears == null ||
        threeYears =="" || fourYears == "" || fiveYears == "" || overFiveYearsOld == "" ||
        infrastructureType == null ||   infrastructureType == "" ||
        threeYears ==null || fourYears == null || fiveYears == null || overFiveYearsOld == null ||
        kwh_40_per_load_per == null ||   kwh_40_per_load_per == "" ||
        spec_score_40_per_per == null ||   spec_score_40_per_per == "" ) {
          this.errorMessage += "Please enter all required field(s) <br/>";
        }
       
        if(this.errorMessage != "") {
          $("#valid_equipment_form").show();
          $("#valid_equipment_form").html(this.errorMessage);
          $(".data-scrollable").scrollTop;
      
          return false;
        }
        else {
          return true;
        }
      }
      else{
        if(rMaintenanceCostDollar == null || rMaintenanceCostDollar == "" || 
          oemMaintenanceCostDollar == null ||  oemMaintenanceCostDollar == "" || 
          buyPriceDollar == null ||  buyPriceDollar == "" || 
          fmvDollar == null ||    fmvDollar == "" || 
          monthlyReductioninFMVDollar ==null ||  monthlyReductioninFMVDollar =="" || 
          agingBucket1yearDollar == null ||  agingBucket1yearDollar == "" || 
          twoYearsDollar == null||  twoYearsDollar == "" ||
          threeYearsDollar ==null ||  threeYearsDollar =="" || 
          fourYearsDollar == null ||  fourYearsDollar == "" || 
          fiveYearsDollar == null ||    fiveYearsDollar == "" || 
          infrastructureType == null ||   infrastructureType == "" || 
          kwh_40_per_load_amount == null ||   kwh_40_per_load_amount == "" || 
          spec_score_40_per_amount == null ||   spec_score_40_per_amount == "" || 
          overFiveYearsOldDollar == null|| overFiveYearsOldDollar == "") 
          {
          this.errorMessage += "Please enter all required field(s)<br/>";
        }
        if(this.errorMessage != "") {
          $("#valid_equipment_form").show();
          $("#valid_equipment_form").html(this.errorMessage);
          $(".data-scrollable").scrollTop;
      
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
      $(".data-scrollable").scrollTop;

      return false;
    }
    else {
      return true;
    }
  }
}
