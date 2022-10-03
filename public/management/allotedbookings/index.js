var table;
var data_alloted=[];
//disabling datatable warning alerts and using console instead of it 
$.fn.dataTable.ext.errMode = 'none';
$('#table').on('error.dt', function (e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
});

$(document).ready(function () {
    $("#loader_layout").modal();
    console.log('in allotedbookings')
    $.ajax({
        url: 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllBookings',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllBookings", data);
            $("#loader_layout").modal("hide");
            for(i=0;i<data.length;i++){
                if(data[i].status=="Alloted" &&  data[i].isDeleted !="true"){
                    console.log("alloted")
                    data_alloted.push(data[i]);
                }
            }
            assignToEventsColumns(data_alloted);
        }
    });


    function assignToEventsColumns(data) {
        table = $('#partner_table').dataTable({
            "bAutoWidth": false,
            "aaData": data,
            "columns": [{
                "data": "user.name"
            }, {
                "data": "user.number"
            }, {
                "data": "pickup_date"
            }, {
                "data": "pickup_time"
            }, {
                "data": "pickup"
            }, {
                "data": "selected_plan.selected_vehicle_plan.selected_vehicle"
            },
            //  {
            //       "data":"selected_plan.selected_vehicle_plan.no_of_seats"        
            //   },
            //  {
            //       "data":"selected_plan.selected_vehicle_plan.plan_alloted_kms"        
            //  }, 
            {
                "data": "selected_plan.selected_vehicle_plan.plan_charged_kms"
            }, {
                "data": "selected_plan.selected_vehicle_plan.price_per_km"
            }, {
                "data": "total_amount"
            }, {
                "data": "status"
            }, {
                "data": "car_owner"
            }, {
                "data": "cars_under_management"
            }, {
                "data": "contact_number"
            }, {
                "data": "vehicle_number"
            }, {
                "data": "region"
            }, {
                "data": "seater"
            }, {
                "data": "carrier_available"
            }, {
                "data": "t_permit"
            }

            ]
        })

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
        url: 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateBooking',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            alert("Booking deleted successfully");
            window.location.reload();
        }
    });
}
$('#edit_button').click(function () {

    var row = table.api().rows('.selected').data();
    data1 = row[0];
    console.log(data1);

});



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


function allot_partner_with_booking() {
    $.ajax({
        url: 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPartners',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            assignToEventsColumns_partners(data);
        }
    });
}
function assignToEventsColumns_partners(data) {
    var table = $('#driver_table').dataTable({
        "bAutoWidth": false,
        "aaData": data,
        "columns": [{
            "data": "car_owner"
        }, {
            "data": "cars_under_management"
        }, {
            "data": "contact_number"
        }, {
            "data": "vehicle_number"
        }, {
            "data": "region"
        }, {
            "data": "seater"
        }, {
            "data": "carrier_available"
        }, {
            "data": "t_permit"
        }]
    })

    $('#driver_table').on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });

    $('#allotment').click(function () {
        var row = table.api().rows('.selected').data();
        data2 = row[0];
        allotedData = {
            ...data1,
            ...data2
        };
        allotedData.status = "Alloted";
        data1.status = "Alloted";
        $.ajax({
            url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateBooking",
            type: "post",
            data: allotedData,
            success: function (response) {
                console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateBooking", response);
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
            }
        });
        console.log(allotedData);
        // alert(allotedData.status)
        console.log(allotedData);
        // alert("this will allot booking to a partner");
        // $.ajax({
        //     url: " https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateAllotedData",
        //     method: "POST",
        //     data: allotedData,
        //     success: function (response) {
        //         alert("success");
        //         console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateAllotedData", response);
        //         $('#allot_partner_modal').modal('hide');
        //         location.reload();
        //     },
        //     error: function (jqXHR, textStatus, errorThrown) {
        //         console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
        //     }
        // });

    });
}