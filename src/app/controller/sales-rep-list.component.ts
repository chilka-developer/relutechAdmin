import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-sales-rep-list',
  templateUrl: '../view/sales-rep-list.component.html',
  // styleUrls: ['./sales-rep-list.component.css']
})
export class SalesRepListComponent implements OnInit {

  datatable: any;

  ngOnInit() {
    CommonService.ActiveClass("nav-sales-rep");
    this.commonService.IsUserLogIn();
    let tblElement: any = $('#empTable');
    this.datatable = tblElement.DataTable({
      'ajax': {
          'url': CommonService.api_url+"/agent-list",
          'type': "POST",
      },
      'columns': [
          { data: 'sales_agent_id'},
          { data: 'user_name' },
          { data: 'email' },
          { data: 'is_active' },
         
          
      ],
      'processing': 'true',
      'serverSide': 'true',
      'serverMethod': 'post',
      "iDisplayLength": 10,
      "bPaginate": true,
   //   "dom": 'rtip', // the "r" is for the "processing" message
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
            localStorage.setItem("sales_agent_id" , data["sales_agent_id"]);
            window.location.href ='#/sales-rep-edit';
           
           
          // }
          
      } );
    });
     
  }
 
  constructor(private http: HttpClient , private router:Router , private commonService : CommonService) { };

  navigateToEquipmentMappingAdd = function () {
    this.router.navigateByUrl('/global-settings-add');
  };



}
