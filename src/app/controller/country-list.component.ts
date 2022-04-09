import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-country-list',
  templateUrl: '../view/country-list.component.html',
  // styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  datatable: any;

  ngOnInit() {
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-country");
    let tblElement: any = $('#empTable');
    this.datatable = tblElement.DataTable({
      'ajax': {
          'url': CommonService.api_url+"/country-list",
          'type': "POST",
      },
      'columns': [
          { data: 'country_master_id'},
          { data: 'country_name' },
          { data: 'is_serving' },
          { data: 'is_active' },
         
          
      ],
      'processing': 'true',
      'serverSide': 'true',
      'serverMethod': 'post',
      "iDisplayLength": 10,
      "bPaginate": true,
      // "dom": 'rtip', // the "r" is for the "processing" message
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
            localStorage.setItem("country_master_id" , data["country_master_id"]);
            window.location.href ='#/country-edit';
           
           
          // }
          
      } );
    });
     
  }
 
  constructor(private http: HttpClient , private router:Router , private commonService : CommonService) { };

  navigateToEquipmentMappingAdd = function () {
    this.router.navigateByUrl('/country-add');
  };

}
