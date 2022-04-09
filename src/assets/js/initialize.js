
var spinnerVisible = false;

var DirectionAttribute = Quill.import('attributors/attribute/direction');
Quill.register(DirectionAttribute, true);
var AlignClass = Quill.import('attributors/class/align');
Quill.register(AlignClass, true);
var BackgroundClass = Quill.import('attributors/class/background');
Quill.register(BackgroundClass, true);
var ColorClass = Quill.import('attributors/class/color');
Quill.register(ColorClass, true);
var DirectionClass = Quill.import('attributors/class/direction');
Quill.register(DirectionClass, true);
var FontClass = Quill.import('attributors/class/font');
Quill.register(FontClass, true);
var SizeClass = Quill.import('attributors/class/size');
Quill.register(SizeClass, true);
var AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true);
var BackgroundStyle = Quill.import('attributors/style/background');
Quill.register(BackgroundStyle, true);
var ColorStyle = Quill.import('attributors/style/color');
Quill.register(ColorStyle, true);
var DirectionStyle = Quill.import('attributors/style/direction');
Quill.register(DirectionStyle, true);
var FontStyle = Quill.import('attributors/style/font');
Quill.register(FontStyle, true);
var SizeStyle = Quill.import('attributors/style/size');
Quill.register(SizeStyle, true);

var toolbarOptions = [
    [{ 'font': [] }], 
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }], 
    [{ 'size': ['small', false, 'large', 'huge'] }], 
    

    ['bold', 'italic', 'underline', 'strike'],   
    [{ 'script': 'sub'}, { 'script': 'super' }],  
    [{ 'color': [] }, { 'background': [] }],   


    [{ 'header': 1 }, { 'header': 2 }],  
    ['blockquote', 'code-block'],


    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],   


    [{ 'direction': 'rtl' }],          
    [{ 'align': [] }],             


    ['link', 'image'],

    
    ['clean']                                      
];

var toolbarOptions_without_image = [
    [{ 'font': [] }], 
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }], 
    [{ 'size': ['small', false, 'large', 'huge'] }], 
    

    ['bold', 'italic', 'underline', 'strike'],   
    [{ 'script': 'sub'}, { 'script': 'super' }],  
    [{ 'color': [] }, { 'background': [] }],   


    [{ 'header': 1 }, { 'header': 2 }],  
    ['blockquote', 'code-block'],


    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],   


    [{ 'direction': 'rtl' }],          
    [{ 'align': [] }],             


    ['link'],

    
    ['clean']                                      
];

var quill_editor_options = {
    debug: 'info',
    modules: {
        toolbar: {
            container :	toolbarOptions,
            handlers: {
                // handlers object will be merged with default handlers object
                'link': function(value) {
                    if (value) {
                        var href = prompt('Enter the URL');
                        this.quill.format('link', href);
                    } else {
                        this.quill.format('link', false);
                    }
                }
            }
        }
    },
    placeholder: '',
    readOnly: false,
    theme: 'snow'
};

var quill_editor_options_without_image = {
    debug: 'info',
    modules: {
        toolbar: {
            container :	toolbarOptions_without_image,
            handlers: {
                // handlers object will be merged with default handlers object
                'link': function(value) {
                    if (value) {
                        var href = prompt('Enter the URL');
                        this.quill.format('link', href);
                    } else {
                        this.quill.format('link', false);
                    }
                }
            }
        }
    },
    placeholder: '',
    readOnly: false,
    theme: 'snow'
};

    
var datetimepicker_icons =  {
    time: "fa fa-clock",
    date: "fa fa-calendar-alt",
    previous: "fa fa-angle-left",
    next: "fa fa-angle-right"
};

function showProgress()
{ 
    if (!spinnerVisible) {
        $("div#spinner").fadeIn("fast");
        spinnerVisible = true;
    }
};
function hideProgress()
{
    if (spinnerVisible) {
        var spinner = $("div#spinner");
        spinner.stop();
        spinner.fadeOut("fast");
        spinnerVisible = false;
    }
};


function gotoHome(){
    window.location.href = 'home';
}

function gotoLogin(){
    window.location.href = 'login';
}

function gotoResetPassword(token,mode){
    window.location.href = 'reset-password?token='+token+'&mode='+mode;
}

function gotoDashboard(){
    window.location.href = '../modules/dashboard/'; //?node=1&child=0&subchild=0
}

function gotoLogout(){
    window.location.href = '../common/logout.php';
}

var dt_dom = "<'row'<'col-sm-12 col-md-6 button-controls'B><'col-sm-12 col-md-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5 d-none d-md-block'i><'col-sm-12 col-md-7 pt-1'p>>";
var dt_dom_without_filter_buttons = "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5 d-none d-md-block'i><'col-sm-12 col-md-7 pt-1'p>>";	
var dt_buttons = {
    dom: {
    button: {
        className: ''
    }
    },
    buttons: [
        {   
            extend: 'copyHtml5', 
            footer: true,
            text:   '<i class="far fa-copy"></i>',
            titleAttr: 'Copy',
            className: 'btn btn-outline-info',
            exportOptions : {
                columns: ':visible',
                /*columns: function(idx, data, node) {
                    if ($(node).hasClass('noVis')) {
                        return false;
                    }
                    tableID = $(node).closest('table').attr('id');
                    return tableID === undefined? false : $(tableID).DataTable().column(idx).visible();
                },*/
                modifier : {
                    order : 'applied', // index', 'original'
                    page : 'all', // 'all', 'current'
                    search : 'applied' // 'none', 'applied', 'removed'
                } 
            }
        },
        { 
            extend: 'excelHtml5', 
            footer: true,
            text:   '<i class="far fa-file-excel"></i>',
            titleAttr: 'Excel',
            className: 'btn btn-outline-success',
            exportOptions : {
                columns: ':visible',
                modifier : {
                    order : 'applied', // index', 'original'
                    page : 'all', // 'all', 'current'
                    search : 'applied' // 'none', 'applied', 'removed'
                } 
            }
        },
        { 
            extend: 'csvHtml5',
            footer: true, 
            text:   '<i class="fas fa-file-csv"></i>',
            titleAttr: 'CSV',
            className: 'btn btn-outline-primary',
            exportOptions : {
                columns: ':visible',
                modifier : {
                    order : 'applied', // index', 'original'
                    page : 'all', // 'all', 'current'
                    search : 'applied' // 'none', 'applied', 'removed'
                } 
            } 
        },
        { 
            extend: 'pdfHtml5', 
            footer: true,
            text:   '<i class="far fa-file-pdf"></i>',
            titleAttr: 'PDF',
            className: 'btn btn-outline-danger', 
            orientation: 'landscape', 
            pageSize: 'LEGAL',
            exportOptions : {
                columns: ':visible',
                modifier : {
                    order : 'applied', // index', 'original'
                    page : 'all', // 'all', 'current'
                    search : 'applied' // 'none', 'applied', 'removed'
                } 
            } 
        },
        { 
            extend: 'print', 
            footer: true,
            text:   '<i class="fas fa-print"></i>',
            titleAttr: 'PDF',
            className: 'btn btn-outline-warning', 
            orientation: 'landscape', 
            pageSize: 'LEGAL',
            exportOptions : {
                columns: ':visible',
                modifier : {
                    order : 'applied', // index', 'original'
                    page : 'all', // 'all', 'current'
                    search : 'applied' // 'none', 'applied', 'removed'
                } 
            } 
        },
    ]
};
var dt_search_lang = {
    search: "_INPUT_",
    searchPlaceholder: "Search..."
};
var dt_initComplete = function (settings, json) {
};

var loadCSS = [
    assets_path+"css/app.min.css",
    assets_path+"plugins/bootstrap-4.5.3-dist/css/bootstrap.min.css",
    assets_path+"plugins/datatable/DataTables-1.10.22/css/dataTables.bootstrap4.min.css",
    assets_path+"css/skins/skin-black.css",
    assets_path+"css/form.css",
    assets_path+"css/adminpanel.css"
    ];
    
function AddReadMore() {
    //This limit you can set after how much characters you want to show Read More.
    var carLmt = 80;
    // Text to show when text is collapsed
    var readMoreTxt = " Read More";
    // Text to show when text is expanded
    var readLessTxt = " Read Less";


    //Traverse all selectors with this class and manupulate HTML part to show Read More
    $(".addReadMore").each(function() {
        if ($(this).find(".firstSec").length)
            return;

        var allstr = $(this).text();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='dots'>...</span><span class='SecSec'>" + secdHalf + "</span><div class='readMore'>" + readMoreTxt + "</div><span class='readLess'>" + readLessTxt + "</span>";
            $(this).html(strtoadd);
        }

    });
    //Read More and Read Less Click Event binding
    $(document).on("click", ".readMore,.readLess", function() {
        $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent");
    });
}

$(function(){
    
    $(".select2").select2({
        placeholder: "Select an option",
        allowClear: false
    });

    $('form').on("change", ".custom-file-input", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        $(this).removeClass("invalid");
    });

    $('.datepicker').datetimepicker({
        format: 'MM-DD-YYYY',
        icons: datetimepicker_icons,
        widgetPositioning : {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });

    $('.monthpicker').datetimepicker({
        format: 'MM-YYYY',
        icons: datetimepicker_icons,
        viewMode : 'months',
        widgetPositioning : {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });

    $('.yearpicker').datetimepicker({
        format: 'YYYY',
        icons: datetimepicker_icons,
        viewMode : 'years',
        widgetPositioning : {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });
    

    $('.datepicker_inline').datetimepicker({
        format: 'MM-DD-YYYY',
        icons: datetimepicker_icons,
        inline : true
    });

    $('.timepicker').datetimepicker({
        format: 'hh:mm A',
        icons: datetimepicker_icons,
        widgetPositioning : {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });

    $('.datetimepicker').datetimepicker({
        format: 'MM-DD-YYYY hh:mm A',
        icons: datetimepicker_icons,
        widgetPositioning : {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });
    

    $('#daterangepicker_start').datetimepicker({
        format: 'MM-DD-YYYY',
        icons: datetimepicker_icons,
        widgetPositioning : {
            horizontal: 'right',
            vertical: 'bottom'
        }
    });
    $('#daterangepicker_end').datetimepicker({
        format: 'MM-DD-YYYY',
        icons: datetimepicker_icons,
        widgetPositioning : {
            horizontal: 'right',
            vertical: 'bottom'
        },
        useCurrent: false //Important! 
    });

    $("#daterangepicker_start").on("dp.change", function (e) {
        $('#daterangepicker_end').data("DateTimePicker").minDate(e.date);
    });

    $("#daterangepicker_end").on("dp.change", function (e) {
        $('#daterangepicker_start').data("DateTimePicker").maxDate(e.date);
    });

    $("form").on('keyup change','.invalid',function(){
		$(this).removeClass('invalid');
    });
    
    $(".tagsinput").tagsinput({
        confirmKeys: [13, 32, 188], //enter, space, comma
        trimValue: true,
        tagClass: 'bg-light text-dark border position-relative'
    });
})

