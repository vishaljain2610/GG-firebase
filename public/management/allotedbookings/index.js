$(document).ready(function () {
    $.ajax({
        url : 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllotedData',
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
             }, 
            //  {
            //       "data":"selected_plan.selected_vehicle_plan.no_of_seats"        
            //   },
            //  {
            //       "data":"selected_plan.selected_vehicle_plan.plan_alloted_kms"        
            //  }, 
            {
                  "data":"selected_plan.selected_vehicle_plan.plan_charged_kms"        
            }, {
                  "data":"selected_plan.selected_vehicle_plan.price_per_km"        
            },  {
              "data":"total_amount"        
            }, {
                  "data":"status"        
            }, {
                "data" : "car_owner"
            }, {
                "data" : "cars_under_management"
            }, {
                "data" : "contact_number"
            }, {
                "data" : "vehicle_number"
            }, {
              "data" : "region"
          }, {
              "data" : "seater"
          }, {
              "data" : "carrier_available"
          }, {
              "data" : "t_permit"
          }
             
        ]})
      
        $('#partner_table').on('click', 'tr', function () {
          $(this).toggleClass('selected');
        });
        $('#del_button').click(function () {
            var row = table.api().rows('.selected').data();
            data = row[0];
            delBooking(data);
        });
    }
  });

// Function to delete a booking
function delBooking(data) {
    data.isDeleted = true;
    $.ajax({
        url : 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/udpateAllotedData',
        type : 'POST',
        dataType : 'json',
        data : data,
        success : function(data) {
            alert("Booking deleted successfully");
            window.location.reload();
        }
    });
}