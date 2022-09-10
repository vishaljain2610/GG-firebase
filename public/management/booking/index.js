var data;
var data1;
var data2;
var allotedData;
var allotedData1;
var selected;

$(document).ready(function () {
  $.ajax({
      url : 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllBookings',
      type : 'POST',
      dataType : 'json',
      success : function(data) {
          assignToEventsColumns(data);
      }
  }); 

  function assignToEventsColumns(data) {
      var table = $('#partner_table').dataTable({
          "bAutoWidth" : false,
          "aaData" : data,
          "columns" : [ {
              "data" : "user.name"
          }, {
              "data" : "user.number"
          }, {
              "data" : "pickup_date"
          }, {
              "data" : "pickup_time"
          },   {
                "data": "pickup"
           }, {
                "data":"selected_plan.selected_vehicle_plan.selected_vehicle"
           }, {
                "data":"selected_plan.selected_vehicle_plan.no_of_seats"        
           }, {
                "data":"selected_plan.selected_vehicle_plan.plan_alloted_kms"        
           }, {
                "data":"selected_plan.selected_vehicle_plan.plan_charged_kms"        
          }, {
                "data":"selected_plan.selected_vehicle_plan.price_per_km"        
          },  {
            "data":"total_amount"        
          }, {
                "data":"status"        
          },

      ]})
    
      $('#partner_table').on('click', 'tr', function () {
        $(this).toggleClass('selected');
      });

      $('#edit_button').click(function () {
        var row = table.api().rows('.selected').data();
        selected = row[0];
        console.log(selected);
        editbooking(selected);
      });
    
      $('#allotment_button').click(function () {
        var row = table.api().rows('.selected').data();
        data1 = row[0];
        console.log(data1);
    });
  }
});

function editbooking(selected) {
    $("#edit_booking_form #status").val(selected.status);
    $('#save_edit_button').click(function () {
      edit_booking(selected);
      console.log(selected); 
      alert("data sent") 
  });
  }

  function edit_booking(selected){
    var new_data = $('#edit_booking_form').serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
    var newdata = new_data;
    newdata.id = selected.id;
    console.log(newdata)
    $.ajax({
      url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateBooking",
      type: "post",
      data: newdata,
      success: function (response) {
        console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateBooking", response);
        location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
      }
    });
  }
function update_partner_table() {
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPartners",
    type: "post",
    success: function (response) {
      alert("Loaded " + response.length);
      console.log(response);
      var table = $('#partner_table').DataTable();
   
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
    }
  });
}


function allot_partner_with_booking(){
  $.ajax({
    url : 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPartners',
    type : 'POST',
    dataType : 'json',
    success : function(data) {
        assignToEventsColumns_partners(data);
    }
});
}
function assignToEventsColumns_partners(data) {
    var table = $('#driver_table').dataTable({
        "bAutoWidth" : false,
        "aaData" : data,
        "columns" : [ {
            "data" : "car_owner"
        }, {
            "data" : "cars_under_management"
        }, {
            "data" : "contact_number"
        }, {
            "data" : "vehicle_number"
        } ]
    })

    $('#driver_table').on('click', 'tr', function () {
      $(this).toggleClass('selected');
    });
  
    $('#allotment').click(function () {
      var row = table.api().rows('.selected').data();
      data2 = row[0];
      //console.log(data2);

      allotedData = {
        ...data1,
        ...data2
    };
      console.log(allotedData);
      alert("this will allot booking to a partner");
      $.ajax({
        url: " https://us-central1-gadigoda-dfc26.cloudfunctions.net/createAllotedData",
        method: "POST",
        data: allotedData,
        success: function (response) {
          alert("success");
          console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/createAllotedData", response);
          $('#allot_partner_modal').modal('hide');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
        }
      });

    });
  }

  
