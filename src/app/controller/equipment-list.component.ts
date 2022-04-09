import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-equipment',
  templateUrl: '../view/equipment-list.component.html',
  styleUrls: ['../../assets/css/common-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  datatable: any

  ngOnInit() {
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-equipment");
    let tblElement: any = $('#empTable');
    this.datatable = tblElement.DataTable({
      'ajax': {
          'url': CommonService.api_url+"/equipments-list",
          'type': "POST",
      },
      'columns': [
          { data: 'equipment_id'},
          { data: 'oem' },
          { data: 'product_line' },
          { data: 'type' },
          { data: 'is_active' }
      ],
      

      'processing': 'true',
      'serverSide': 'true',
      'serverMethod': 'post',
      "iDisplayLength": 10,
      "bPaginate": true,
      //"dom": 'rtip', // the "r" is for the "processing" message
      "language": {
        "processing": "<span class=''><img src='assets/image/loader.gif' /></span>"
      },
      "order": [[ 0, 'desc' ]]
    });

    $(document).ready(function() {
      var table = $('#empTable').DataTable();
       
      $('#empTable tbody').on('click', 'tr', function () {
          var data = table.row( this ).data();

          // if(data["oem_mapping_id"] == undefined && data["oem_mapping_id"] == ""){
          //   //show error ;
          // }
          // else{
            localStorage.setItem("equipment_id" , data["equipment_id"]);
            window.location.href ='#/equipment-edit';
           
           
          // }
          
      } );
    });
     
  }
 
  constructor(private http: HttpClient , private router:Router , private commonService : CommonService) { };

  navigateToEquipmentMappingAdd = function () {
    this.router.navigateByUrl('/equipment-mapping-add');
  };
  navigateToEquipmentMappingEdit= function () {
    this.router.navigateByUrl('/equipment-mapping-edit');
  };
  navigateToEquipmentAdd = function(){
    this.router.navigateByUrl('/equipment-add');
  }
  exportToCsv= function(){
   
    window.open(CommonService.api_url +'/equipments-export?oauth_key=F1CEC5YC4rrNhTzkP4aNR4Td3XAzCcHAWM4Eh1iDoofbl6xT', "_blank");
            
  }
        
 
}
