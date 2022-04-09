export class DataCenter{
    srno:string;
    country_id:string;
    country_name:string;
    oem:string;
    product_line:string;
    type:string;
    dc_order :number;
    oem_name:string;
    product_line_name:string;
    type_name:string;

    year_0_1:string;
    year_1_2:string;
    year_2_3:string;
    year_3_4:string;
    year_4_5:string;
    over_5_years:string;
    total_servers:string;

    pue : string;
    per_energy_usage : string;

    constructor(srno:string = "0") {
        this.srno = srno;
    }    
}