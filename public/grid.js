$(document).ready(function(){
var grid = $("#grid").kendoGrid({
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
    filterable: {
        mode: "row",
        extra: false,
        operators: {
            string: {
                startswith: "Starts with",
                eq: "Is equal to",
                neq: "Is not equal to"
            }
        }
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
});
