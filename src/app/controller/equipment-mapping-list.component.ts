import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-equipment-mapping',
  templateUrl: '../view/equipment-mapping-list.component.html',
  styleUrls: ['../../assets/css/common-list.component.css']
})
export class EquipmentMappingListComponent implements OnInit {

  datatable: any

  ngOnInit() {
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-equipment-mapping");

    let tblElement: any = $('#empTable');
    this.datatable = tblElement.DataTable({
      'ajax': {
          'url': CommonService.api_url+"/equipment-mapping-list",
          'type': "POST",
      },
      'columns': [
          { data: 'oem_mapping_id'},
          { data: 'oem_name' },
          { data: 'product_line_name' },
          { data: 'type' },
          { data: 'is_active' }
      ],
      // "mRender": function(data, type, full) {
      //   return '<a class="btn btn-info btn-sm" href=#/' + full[0] + '>' + 'Edit' + '</a>';
      // },

      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //   const self = this;
      //   // Unbind first in order to avoid any duplicate handler
      //   // (see https://github.com/l-lin/angular-datatables/issues/87)
      //   $('td', row).unbind('click');
      //   $('td', row).bind('click', () => {
      //     //self.someClickHandler(data);
      //   });
      //   return row;
      // },

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
            localStorage.setItem("oem_mapping_id" , data["oem_mapping_id"]);
            window.location.href ='#/equipment-mapping-edit';
           
           
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
}
