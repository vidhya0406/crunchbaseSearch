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
      },

      {
        field:"category_list",
        title:"Category",
      },
      {
        field:"country_code",
        title:"Country",
      },

      {
        field:"status",
        title:"Status",
      },
      {
        field:"technology",
        title:"Technology",
      },
      {
        field:"patents_granted",
        title:"Patents Granted",
      },
      {
        field:"patents_pending",
        title:"Patents Pending",
      },
      {
        field:"other_ip",
        title:"Other Intellectual Property",
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

