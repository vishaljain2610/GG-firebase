var data;
var data1;
var data2;
var allotedData;
var allotedData1;
var selected;

$(document).ready(function () {
  $.ajax({
    url: 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllBookings',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      assignToEventsColumns(data);
    }
  });

  function assignToEventsColumns(data) {
    var table = $('#partner_table').dataTable({
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
      }, {
        "data": "selected_plan.selected_vehicle_plan.no_of_seats"
      }, {
        "data": "selected_plan.selected_vehicle_plan.plan_alloted_kms"
      }, {
        "data": "selected_plan.selected_vehicle_plan.plan_charged_kms"
      }, {
        "data": "selected_plan.selected_vehicle_plan.price_per_km"
      }, {
        "data": "total_amount"
      }, {
        "data": "status"
      },

      ]
    })

    $('#partner_table').on('click', 'tr', function () {
      $(this).toggleClass('selected');
    });


    $('#allotment_button').click(function () {
      var row = table.api().rows('.selected').data();
      data1 = row[0];
      console.log(data1);
    });

    $('#edit_button').click(function () {
      var row = table.api().rows('.selected').data();
      selected = row[0];
      console.log(selected);
      editbooking(selected);
    });
  }
});

function editbooking(selected) {
  $("#edit_booking_form #exampleFormControlInput1").val(selected.user.name);
  $("#edit_booking_form #exampleFormControlInput2").val(selected.user.number);
  $("#edit_booking_form #exampleFormControlInput3").val(selected.pickup_date);
  $("#edit_booking_form #exampleFormControlInput4").val(selected.pickup_time);
  $("#edit_booking_form #exampleFormControlInput5").val(selected.pickup);
  $("#edit_booking_form #exampleFormControlInput6").val(selected.selected_plan.selected_vehicle_plan.selected_vehicle);
  $("#edit_booking_form #exampleFormControlInput7").val(selected.selected_plan.selected_vehicle_plan.no_of_seats);
  $("#edit_booking_form #exampleFormControlInput8").val(selected.selected_plan.selected_vehicle_plan.plan_alloted_kms);
  $("#edit_booking_form #exampleFormControlInput9").val(selected.selected_plan.selected_vehicle_plan.plan_charged_kms);
  $("#edit_booking_form #exampleFormControlInput10").val(selected.selected_plan.selected_vehicle_plan.price_per_km);
  $("#edit_booking_form #exampleFormControlInput11").val(selected.total_amount);
  $("#edit_booking_form #exampleFormControlInput12").val(selected.status);
  //console.log(selected.status)
  $('#save_edit_button').click(function () {
    edit_booking(selected);
    console.log(selected);
  });


}

function edit_booking(selected) {
  var new_data = selected;
  new_data.user.name = $('#edit_booking_form #exampleFormControlInput1').val();
  new_data.user.number = $('#edit_booking_form #exampleFormControlInput2').val();
  new_data.pickup_date = $('#edit_booking_form #exampleFormControlInput3').val();
  new_data.pickup_time = $('#edit_booking_form #exampleFormControlInput4').val();
  new_data.pickup = $('#edit_booking_form #exampleFormControlInput5').val();
  new_data.selected_plan.selected_vehicle_plan.selected_vehicle = $('#edit_booking_form #exampleFormControlInput6').val();
  new_data.selected_plan.selected_vehicle_plan.no_of_seats = $('#edit_booking_form #exampleFormControlInput7').val();
  new_data.selected_plan.selected_vehicle_plan.plan_alloted_kms = $('#edit_booking_form #exampleFormControlInput8').val();
  new_data.selected_plan.selected_vehicle_plan.plan_charged_kms = $('#edit_booking_form #exampleFormControlInput9').val();
  new_data.selected_plan.selected_vehicle_plan.price_per_km = $('#edit_booking_form #exampleFormControlInput10').val();
  new_data.total_amount = $('#edit_booking_form #exampleFormControlInput11').val();
  new_data.status = $('#edit_booking_form #exampleFormControlInput12').val();

  console.log(new_data)
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/updateBooking",
    type: "post",
    data: new_data,
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
    console.log(allotedData.status);
    alert(allotedData.status)
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


