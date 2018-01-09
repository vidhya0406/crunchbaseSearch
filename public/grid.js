$(document).ready(function(){
var grid = $("#grid").kendoGrid({
  //Added a template to the toolbar
       toolbar: [
         { template: kendo.template($("#template").html()) }
       ],
    dataSource: {
      dataType: "json",
      data:  data,
      pageSize: 40,
    },
    groupable: true,
    sortable: true,
    height: 550,
    scrollable: {
        endless: true
    },
    resizable: true,
    pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
    },
    columns: [
      {
        field:"name",
        title:"Name",
        width:"100px"
      },

      {
        field:"category_list",
        title:"Category",
        width:"100px"
      },
      {
        field:"country_code",
        title:"Country",
        width:"100px"
      },

      {
        field:"status",
        title:"Status",
        width:"100px"
      },
      {
        field:"technology",
        title:"Technology",
        width:"100px"
      },
      {
        field:"patents_granted",
        title:"Patents Granted",
        width:"100px"
      },
      {
        field:"patents_pending",
        title:"Patents Pending",
        width:"100px"
      },
      {
        field:"other_ip",
        title:"Other Intellectual Property",
        width:"100px"
      },
      {
      command: {
              text: "Homepage",
              click: function(e) {
                  // prevent page scroll position change
                  e.preventDefault();
                  // e.target is the DOM element representing the button
                  var tr = $(e.target).closest("tr"); // get the current table row (tr)
                  // get the data bound to the current table row
                  var data = this.dataItem(tr);
                  window.open(data.homepage_url);
              }
            },
             title: " ",
             width: "150px"
    }
    ]
  }).data("kendoGrid");

  //Searching the Grid by the value of the textbox
        $("#btnSearch").click(function () {
          var searchValue = $('#searchBox').val();

          //Setting the filter of the Grid
          $("#grid").data("kendoGrid").dataSource.filter({
            logic  : "or",
            filters: [
              {
                field   : "technology",
                operator: "contains",
                value   : searchValue
              },
              {
                field   : "category_list",
                operator: "contains",
                value   : searchValue
              },
              {
                field   : "name",
                operator: "contains",
                value   : searchValue
              },
              {
                field   : "Country",
                operator: "contains",
                value   : searchValue
              }
            ]
          });
        });

        //Clearing the filter
        $("#btnReset").click(function () {
          $("#grid").data("kendoGrid").dataSource.filter({});
        });
});

