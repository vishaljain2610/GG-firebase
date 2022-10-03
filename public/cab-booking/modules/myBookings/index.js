var userData = {}
var data_alloted=[];
var data_booked=[];
$(document).ready(function () {
     var number = JSON.parse(localStorage.getItem("user"));
    userData.number = number;
    if(userData==null){
        alert('Please Login!Redirecting to Home Page');
        location.href="../../index.html"
    }
  
    console.log("userData", userData);
    mybookings_open();
    $("#menuitem_myBookings").click(function () {
      $("#new_account_layout").fadeOut("slow");
      $("#account_details_layout").fadeOut("slow");
      $("#main_menu").fadeOut("slow");
      ("slow");
      $("#time_selection_list_layout").fadeOut();
      $("#account_type_layout").fadeOut();
      $("#car_details_layout").fadeOut();
      $("#account_details_layout").fadeOut();
      $("#header").fadeOut();
      $("#new_account_layout").fadeOut();
      $(".modal-backdrop").fadeOut();
      $(".fade").fadeOut();
      $(".show").fadeOut();
      $("#booking_summary").fadeOut();
      $("#plan_summary_modal").fadeOut();
      $("#footer").fadeOut();
      $("#content_holder").fadeOut();
      $("#height").fadeOut();
      $("#design_footer").fadeOut();
      $("#booking_successfully_completed").fadeOut("slow");
      $("#mybookings").fadeIn("slow");
      $("#account_details_layout").fadeOut("slow");
      $("#station_selection").fadeOut("slow");
    });
  });
$(".unallotedmodals").modal("hide"); 
$("#cabBookingViewMoreAllotedModal").modal("hide");
$("#couponOffers").modal("hide");
function couponOffers(){
    $.ajax({
      url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getActiveCoupon",
      method: "POST",
      success: function (response) {
        console.log(
          "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getActiveCoupon",
          response
        );
        received_coupons = response;
        populateCoupons(received_coupons)
         
      },
      error: function () {
        $("#loader_layout").modal("hide");
        alert("error");
      },
    });
  }
  
  function populateCoupons(received_coupons) {
    for (var i = 0; i < received_coupons.length; i++) {
      if(received_coupons[i].isActive== "true"){
        if(received_coupons[i].selected_coupon_type=="Percentage"){
      $("#couponHolder").append(
       ' <div class="card-coupon">'+
              '<div class="main">'+
                '<div class="co-img">'+
                  '<img src="../../assets/sports-car.png"'+'alt="logo"'+'/>'+
                '</div>'+
                '<div class="vertical"></div>'+
                '<div class="card-content">'+
                  '<h1>'+received_coupons[i].amount+'% <span>Off Coupon</span></h1>'+
                  '<p>'+received_coupons[i].description+'</p>'+
                  '<p>Valid till '+received_coupons[i].validity_date+' , '+received_coupons[i].validity_time+'</p>'+  
                '</div>'+
              '</div>'+
             ' <div class="copy-button">'+
                '<input id="copyvalue'+i+'" type="text" readonly value="'+received_coupons[i].code+'" />'+
                '<button onclick="copyIt('+i+')" id="copybtn'+i+'" >COPY</button>'+
              '</div>'+
            '</div>'
            );
      }
      else if(received_coupons[i].selected_coupon_type=="Price"){
        $("#couponHolder").append(
          ' <div class="card-coupon">'+
                 '<div class="main">'+
                   '<div class="co-img">'+
                     '<img src="../../assets/sports-car.png"'+'alt="logo"'+'/>'+
                   '</div>'+
                   '<div class="vertical"></div>'+
                   '<div class="card-content">'+
                     '<h1>'+'₹'+received_coupons[i].amount+' <span>Off Coupon</span></h1>'+
                     '<p>'+received_coupons[i].description+'</p>'+
                     '<p>Valid till '+received_coupons[i].validity_date+' , '+received_coupons[i].validity_time+'</p>'+  
                   '</div>'+
                 '</div>'+
                ' <div class="copy-button">'+
                   '<input id="copyvalue'+i+'" type="text" readonly value="'+received_coupons[i].code+'" />'+
                   '<button onclick="copyIt('+i+')" id="copybtn'+i+'" >COPY</button>'+
                 '</div>'+
               '</div>'
               );
      }
  }
  }
  }
  
  function mybookings_open() {
    console.log(userData);
    $.ajax({
      url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getBookings",
      type: "post",
      data: userData,
      success: function (response) 
      {
        console.log(
          "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getBookings",
          response
        );

        $("#booking_successfully_completed").fadeOut("slow");
        $("#mybookings").fadeIn("slow");
        document.body.style.backgroundColor = "#f5f4f4";
        populate_rides_seggregate_data(response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
      },
    });
  }
  
  function populate_rides_seggregate_data(response){
    for(i=0;i<response.length;i++){
      if(response[i].status=="Alloted" &&  response[i].isDeleted !="true"){
        console.log("alloted");
        data_alloted.push(response[i]);
    }
    else if(response[i].status=="Booked" &&  response[i].isDeleted !="true"){
      data_booked.push(response[i]);
    }
    }
    populate_rides(data_alloted,data_booked);
  }


  //to show the modal of alloted drivers
  function viewMoreAllotedModal() {
    $("#cabBookingViewMoreAllotedModal").modal("show");
  }
  function viewMoreUnAllotedModal(i) {
    $("#cabBookingViewMoreUnAllotedModal" + i).modal("show");
  }
  
  //for scrolling to the fair price
  function closeModal() {
    $("#cabBookingViewMoreAllotedModal").modal("hide");
  }
  function scroll_to_fair_price_modalview() {
    const element = $("#cost_breakup_list");
    element.scrollIntoView();
  }
  
  function populate_rides(data_resp, booked_data) {
    console.log(data_resp)
    for (var i = 0; i < data_resp.length; i++) {
      $("#populate_rides").append(
       
          '<div class="container2">' +
          '<div class="container02">' +
          '<div class="container2_1">' +
          '<img class="car" src="../../assets/' +
          get_car_image(
            data_resp[i].selected_plan.selected_vehicle_plan.selected_vehicle
          ) +
          '">' +
          "</div>" +
          '<div class="container2_2">' +
          '<div class="route"><b>' +
          data_resp[i].station +
          "</b></div>" +
          '<div class="date_time">' +
          data_resp[i].pickup_date +
          " | " +
          data_resp[i].pickup_time +
          "</div>" +
          '<div class="km">' +
          data_resp[i].selected_plan.selected_vehicle_plan.selected_vehicle +
          "</div>" +
          " </div>" +
          "</div>" +
          //view more button
          '<div class="more"><span class="badge badge-pill badge-viewmore" onclick="viewMoreAllotedModal('+i+')">View Details</span></a></div>' +
          //View More MODAL
          '<div class="modal" id="cabBookingViewMoreAllotedModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">' +
          '<div id="booking_summary" class="modal-content" style="height: 85vh;margin-top: 15vh;">' +
          '<div id="summary_holder" style="padding:30px;">' +
          '<div class="modal-header">' +
          "<span style='margin-left:0' ><h5><b>Allotment Details</b></h5></span>" +
          "<span>" +
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
          "</span>" +
          '<span aria-hidden="true" onclick="closeModal()">&times;</span>' +
          "</button>" +
          "</div>" +
          // '<div style="margin-bottom: 4vh;font-size: larger;font-weight: bold;">' +
          // "Booking Details / बुकिंग डिटेल्स" +
          // "</div>" +
  
          //Car Block
          '<div class="car-block" style="margin-top:1vh">' +
          '<div id="summarypage_img">' +
          '<img class="car" src="../../assets/' +
          get_car_image(
            data_resp[i].selected_plan.selected_vehicle_plan.selected_vehicle
          ) +
          '">' +
          "</div>" +
          '<div class="" style="margin-left: 20px;">' +
          '<div class="" style="padding-right: 15px;font-size: larger;font-weight: bold;" id="summary_seat_label">' +
          data_resp[i].selected_plan.selected_vehicle_plan.no_of_seats +
          " Seater" +
          "</div>" +
          ' <div class="car-sub-name" style="width:55vw!important;padding-right:20px!important;" id="summary_plan_overview">' +
          data_resp[i].selected_plan.selected_vehicle_plan.selected_vehicle +
          "," +
          data_resp[i].selected_plan.name +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div id="seperator"></div>' +
          //Driver Contact
          "<div>" +
          '<div style=" margin-bottom: 0px;font-size: large;color: darkgray;">' +
          "चालक संपर्क / Driver Contact" +
          "</div>" +
          '<div class="card" style="margin-top: 5px;">' +
          '<div class="card-body" id="driver-contact-card" style="padding:0">' +
          '<div id="driver-details">' +
          ' <div id="driverContact">' +
          '<div id="driverName" class="blocks">' +
          '<div class="driver-icon"><img src="../../assets/driver_icon.png" alt="driver-icon"/></div>' +
          '<div class="content-modal">' +
          data_resp[i].car_owner +
          "</div>" +
          "</div>" +
          "<a href="+"tel:"+data_resp[i].contact_number+""+">"+
          '<div id="driverPhoneNo" class="blocks">' +
          '<div class="contact-icon"><img src="../../assets/contact_icon.png" alt="contact-icon"/></div>' +
          '<div class="content-modal">' +
          data_resp[i].contact_number +
          "</div>" +
          "</div>" +
          "</div>" +
          "</a>"+
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div id="seperator"></div>' +
          //Booking date time station and price
          '<div class="card" style="margin-top: 5px;">' +
          '<div class="card-body" style="padding:0" >' +
          '<div id="booking-details">' +
          '<div id="booking-Date-Time">' +
          '<div id="bookingDate" class="blocks">' +
          '<div class="title-modal">PickUp Date</div>' +
          '<div class="content-modal">' +
          data_resp[i].pickup_date +
          "</div>" +
          "</div>" +
          '<div id="bookingTime" class="blocks">' +
          '<div class="title-modal">PickUp Time</div>' +
          '<div class="content-modal">' +
          data_resp[i].pickup_time +
          "</div>" +
          "</div>" +
          "</div>" +
          "<br>" +
          '<div id="booking-PickUp-BasePrice">' +
          '<div id="pickUp" class="blocks">' +
          '<div class="title-modal">PickUp Station</div>' +
          '<div class="content-modal" style="overflow-wrap: break-word">' +
          data_resp[i].station +
          "</div>" +
          "</div>" +
          '<div id="basePrice" class="blocks">' +
          '<div class="title-modal">Base Fare</div>' +
          '<div class="content-modal"> ₹ ' +
          data_resp[i].total_amount +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div id="seperator"></div>' +
          //Booking Plan Block
          "<div>" +
          '<div style=" margin-bottom: 0px;font-size: large;color: darkgray;">' +
          "बुकिंग प्लान / Booking Plan" +
          "</div>" +
          '<div class="card" style="margin-top: 5px;">' +
          '<div class="card-body">' +
          '<h5 class="card-title" id="summary_plan_name"><b>' +
          data_resp[i].selected_plan.name +
          "</b></h5>" +
          '<p class="card-text" id="summary_plan_description">' +
          data_resp[i].selected_plan.package_description +
          "</p>" +
          "</div>" +
          '<p style="font-weight: bold;margin-bottom: 0px;font-size: large;padding-left: 1.25rem;">Terms</p>' +
          '<ul class="list-group list-group-flush" id="package_terms">' +
          "</ul>" +
          "</div>" +
          '<div style="font-size: 1.3rem;">' +
          "</div>" +
          '<div style="font-size: medium;line-height: 1.1;color: #888888;">' +
          "</div>" +
          "</div>" +
          "<div>" +
          '<div id="seperator"></div>' +
          //Vehicle Number Block
          '<div style=" margin-bottom: 0px;font-size: large;color: darkgray;">' +
          "गाडी नंबर / Vehicle Number" +
          "</div>" +
          '<div class="card" style="margin-top: 5px;">' +
          '<div class="card-body">' +
          '<div class="car-number" style="font-weight:bolder;text-align:center"><h5>' +
          data_resp[i].vehicle_number +
          "</h5></div>" +
          "</div>" +
          "</div>" +
          '<div id="seperator"></div>' +
          //Fair BreakUp
          '<div style="margin-bottom: 0px;font-size: large;color: darkgray;margin-top:25px;">' +
          "किराया ब्रेकअप / Fare Breakup" +
          "</div>" +
          '<ul class="list-group list-group-flush" id="cost_breakup_list">' +
          '<li class="list-group-item">' +
          "<div>Base Fare</div>" +
          '<div id="breakup_base_fare">₹ ' +
          data_resp[i].selected_plan.selected_vehicle_plan.base_amount +
          "</div>" +
          "</li>" +
          '<li class="list-group-item" id="discount_li">' +
          "<div>Discount</div>" +
          '<div id="breakup_discount">' +
          "₹ " +
          data_resp[i].selected_plan.selected_vehicle_plan.discount +
          "</div>" +
          "</li>" +
          '<li class="list-group-item">' +
          "<div>Allowance</div>" +
          '<div id="breakup_allowance">₹ ' +
          data_resp[i].selected_plan.selected_vehicle_plan.allowance_amount +
          "</div>" +
          "</li>" +
          '<li class="list-group-item">' +
          "<div>Total Fare Amount</div>" +
          '<div id="breakup_pd_payable_fare">₹ ' +
          data_resp[i].total_amount +
          "</div>" +
          "</li>" +
          '<li class="list-group-item">' +
          "<div>Advanced Paid</div>" +
          '<div id="breakup_booking_payable_amount" style="font-weight:bold">₹ ' +
          data_resp[i].selected_plan.selected_vehicle_plan
            .payable_post_discount_booking_amount +
          "</div>" +
          "</li>" +
          ' <li class="list-group-item" id="booking_amount_note_label" style="text-align: center!important;color: #e1b109;font-size: small;">' +
          "</li>" +
          "</ul>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div> "
      );
    }
    for (var i = 0; i < booked_data.length; i++) {
      if (booked_data[i].status == "Booked") {
        // console.log(booked_data);
        console.log("if is true");
        console.log(booked_data)
        $("#populate_rides_booked").append(
           
            '<div class="container2">' +
            '<div class="container02">' +
            '<div class="container2_1">' +
            '<img class="car" src="../../assets/' +
            get_car_image(
              booked_data[i].selected_plan.selected_vehicle_plan.selected_vehicle
            ) +
            '">' +
            "</div>" +
            '<div class="container2_2">' +
            '<div class="route"><b>' +
            booked_data[i].station +
            "</b></div>" +
            '<div class="date_time">' +
            booked_data[i].pickup_date +
            " | " +
            booked_data[i].pickup_time +
            "</div>" +
            '<div class="km">' +
            booked_data[i].selected_plan.selected_vehicle_plan.selected_vehicle +
            "</div>" +
            " </div>" +
            "</div>" +
            //view more button
            '<div class="more"><span class="badge badge-pill badge-viewmore" onclick="viewMoreUnAllotedModal('+i+')">View Details</span></div>' +
            "</div>" +
            //View More MODAL
            '<div class="modal unallotedmodals" id="cabBookingViewMoreUnAllotedModal' +
            i +
            '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">' +
            '<div id="booking_summary" class="modal-content" style="height: 85vh;margin-top: 15vh;">' +
            '<div id="summary_holder" style="padding:30px;">' +
            '<div class="modal-header">' +
            "<span style='margin-left:0' ><h5><b>Booking Details</b></h5></span>" +
            "<span>" +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            "</span>" +
            '<span aria-hidden="true" onclick="closeModal()">&times;</span>' +
            "</button>" +
            "</div>" +
            // '<div style="margin-bottom: 4vh;font-size: larger;font-weight: bold;">' +
            // "Booking Details / बुकिंग डिटेल्स" +
            // "</div>" +
  
            //Car Block
            '<div class="car-block" style="margin-top:1vh">' +
            '<div id="summarypage_img">' +
            '<img class="car" src="../../assets/' +
            get_car_image(
              booked_data[i].selected_plan.selected_vehicle_plan.selected_vehicle
            ) +
            '">' +
            "</div>" +
            '<div class="" style="margin-left: 20px;">' +
            '<div class="" style="padding-right: 15px;font-size: larger;font-weight: bold;" id="summary_seat_label">' +
            booked_data[i].selected_plan.selected_vehicle_plan.no_of_seats +
            " Seater" +
            "</div>" +
            ' <div class="car-sub-name" style="width:55vw!important;padding-right:20px!important;" id="summary_plan_overview">' +
            booked_data[i].selected_plan.selected_vehicle_plan.selected_vehicle +
            "," +
            booked_data[i].selected_plan.name +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div id="seperator"></div>' +
            //Booking date time station and price
            '<div class="card" style="margin-top: 5px;">' +
            '<div class="card-body" style="padding:0" >' +
            '<div id="booking-details">' +
            '<div id="booking-Date-Time">' +
            '<div id="bookingDate" class="blocks">' +
            '<div class="title-modal">PickUp Date</div>' +
            '<div class="content-modal">' +
            booked_data[i].pickup_date +
            "</div>" +
            "</div>" +
            '<div id="bookingTime" class="blocks">' +
            '<div class="title-modal">PickUp Time</div>' +
            '<div class="content-modal">' +
            booked_data[i].pickup_time +
            "</div>" +
            "</div>" +
            "</div>" +
            "<br>" +
            '<div id="booking-PickUp-BasePrice">' +
            '<div id="pickUp" class="blocks">' +
            '<div class="title-modal">PickUp Station</div>' +
            '<div class="content-modal" style="overflow-wrap: break-word">' +
            booked_data[i].station +
            "</div>" +
            "</div>" +
            '<div id="basePrice" class="blocks">' +
            '<div class="title-modal">Base Fare</div>' +
            '<div class="content-modal"> ₹ ' +
            booked_data[i].total_amount +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div id="seperator"></div>' +
            //Booking Plan Block
            "<div>" +
            '<div style=" margin-bottom: 0px;font-size: large;color: darkgray;">' +
            "बुकिंग प्लान / Booking Plan" +
            "</div>" +
            '<div class="card" style="margin-top: 5px;">' +
            '<div class="card-body">' +
            '<h5 class="card-title" id="summary_plan_name"><b>' +
            booked_data[i].selected_plan.name +
            "</b></h5>" +
            '<p class="card-text" id="summary_plan_description">' +
            booked_data[i].selected_plan.package_description +
            "</p>" +
            "</div>" +
            '<p style="font-weight: bold;margin-bottom: 0px;font-size: large;padding-left: 1.25rem;">Terms</p>' +
            '<ul class="list-group list-group-flush" id="package_terms">' +
            "</ul>" +
            "</div>" +
            '<div style="font-size: 1.3rem;">' +
            "</div>" +
            '<div style="font-size: medium;line-height: 1.1;color: #888888;">' +
            "</div>" +
            "</div>" +
            "<div>" +
            '<div id="seperator"></div>' +
            //Fair BreakUp
            '<div style="margin-bottom: 0px;font-size: large;color: darkgray;margin-top:25px;">' +
            "किराया ब्रेकअप / Fare Breakup" +
            "</div>" +
            '<ul class="list-group list-group-flush" id="cost_breakup_list">' +
            '<li class="list-group-item">' +
            "<div>Base Fare</div>" +
            '<div id="breakup_base_fare">₹ ' +
            booked_data[i].selected_plan.selected_vehicle_plan.base_amount +
            "</div>" +
            "</li>" +
            '<li class="list-group-item" id="discount_li">' +
            "<div>Discount</div>" +
            '<div id="breakup_discount">' +
            "₹ " +
            booked_data[i].selected_plan.selected_vehicle_plan.discount +
            "</div>" +
            "</li>" +
            '<li class="list-group-item">' +
            "<div>Allowance</div>" +
            '<div id="breakup_allowance">₹ ' +
            booked_data[i].selected_plan.selected_vehicle_plan.allowance_amount +
            "</div>" +
            "</li>" +
            '<li class="list-group-item">' +
            "<div>Total Fare Amount</div>" +
            '<div id="breakup_pd_payable_fare">₹ ' +
            booked_data[i].total_amount +
            "</div>" +
            "</li>" +
            '<li class="list-group-item">' +
            "<div>Advanced Paid</div>" +
            '<div id="breakup_booking_payable_amount" style="font-weight:bold">₹ ' +
            booked_data[i].selected_plan.selected_vehicle_plan
              .payable_post_discount_booking_amount +
            "</div>" +
            "</li>" +
            ' <li class="list-group-item" id="booking_amount_note_label" style="text-align: center!important;color: #e1b109;font-size: small;">' +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div> "
        );
      }
    }
  }
  
  function display_data_of_booking(data_res) {
    $("#day").val(data_res.pickup_date);
    document.getElementById("day").innerHTML = data_res.pickup_date;
    $("#pm").val(data_res.pickup_time);
    document.getElementById("pm").innerHTML = data_res.pickup_time;
    $("#station").val(data_res.pickup);
    document.getElementById("station").innerHTML = data_res.pickup;
    $("#amt").val(payable_total_amount);
    document.getElementById("amt").innerHTML = payable_total_amount;
    // $("#planned").val(data_res.vehicle_plan_selected.parent-plan-name);
    // document.getElementById("planned").innerHTML = data_res.vehicle_plan_selected.parent-plan-name;
    $("#seat").val(data_res.selected_plan.selected_vehicle_plan.no_of_seats);
    document.getElementById("seat").innerHTML =
      data_res.selected_plan.selected_vehicle_plan.no_of_seats + " seats";
    $("#km").val(data_res.selected_plan.selected_vehicle_plan.selected_vehicle);
    document.getElementById("km").innerHTML =
      data_res.selected_plan.selected_vehicle_plan.selected_vehicle;
    $("#cost").val(data_res.total_amount);
    document.getElementById("cost").innerHTML = data_res.total_amount;
    $("#booked_car").attr(
      "src",
      "../../assets/" +
        get_car_image(
          data_res.selected_plan.selected_vehicle_plan.selected_vehicle
        )
    );
  }

  var vehicles_received;
function vehicle_plan_selected(index) {
  booking.selected_plan.selected_vehicle_plan = vehicles_received[index];
  booking.selected_plan.selected_vehicle_plan.discount = 0;
  booking.selected_plan.selected_vehicle_plan.payable_post_discount =
    booking.selected_plan.selected_vehicle_plan.plan_baseprice;

  if (booking.selected_plan.selected_vehicle_plan.plan_baseprice > 2500) {
    $("#booking_amount_note_label").text("20% Payment of Total Booking Amount to be paid to confirm the booking.");
    booking.selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount =
      booking.selected_plan.selected_vehicle_plan.plan_baseprice * 0.2;
  } else {
    $("#booking_amount_note_label").text("₹ 500 to be paid to confirm the booking.");
    booking.selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount = 500;
  }

  console.log("Vehicle Plan Selected", booking);
  if (!isLoggedIn()) {
    //$("#login_modal").modal();
    populate_cities();
  } else {
    booking.customer = user;
    booking.customer_id = user.id;
    populate_summary_view();
    $("#plan_summary_modal").modal("show");
  }
}

function populate_summary_view() {
  $("#summary_holder").scrollTop(0);
  $("#summary_car_image").attr(
    "src",
    "../../assets/" +
      get_car_image(
        booking.selected_plan.selected_vehicle_plan.selected_vehicle
      )
  );
  $("#summary_seat_label").text(
    booking.selected_plan.selected_vehicle_plan.no_of_seats + " Seater"
  );
  var ac = "AC Cab";
  if (booking.selected_plan.selected_vehicle_plan.isNONAC) {
    ac = "Non AC Cab";
  }

  $("#summary_plan_overview").text(
    booking.selected_plan.selected_vehicle_plan.selected_vehicle +
      ", " +
      ac +
      ", " +
      booking.selected_plan.name
  );
  $("#pickup").text(booking.pickup);
  $("#pickup_date").text(booking.pickup_date);
  $("#pickup_time").text(booking.pickup_time);
  $("#summary_payable_booking_amount").text(
    "₹ " + booking.selected_plan.selected_vehicle_plan.plan_baseprice
  );

  $("#summary_plan_name").text(booking.selected_plan.name);
  $("#summary_plan_description").text(
    booking.selected_plan.package_description
  );

  var package_notes =
    booking.selected_plan.selected_vehicle_plan.description.split(";");
  var ul = document.getElementById("package_terms");
  document.getElementById("package_terms").innerHTML = "";
  for (var i = 0; i < package_notes.length; i++) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(package_notes[i]));
    ul.appendChild(li);
  }

  $("#breakup_base_fare").text(
    "₹ " + booking.selected_plan.selected_vehicle_plan.base_amount
  );
  $("#breakup_discount").text(
    "₹ " + booking.selected_plan.selected_vehicle_plan.discount
  );
  $("#breakup_allowance").text(
    "₹ " + booking.selected_plan.selected_vehicle_plan.allowance_amount
  );
  $("#breakup_pd_payable_fare").text(
    "₹ " + booking.selected_plan.selected_vehicle_plan.payable_post_discount
  );
  $("#breakup_booking_payable_amount").text(
    "₹ " +
      booking.selected_plan.selected_vehicle_plan
        .payable_post_discount_booking_amount
  );
  total_amount =
    booking.selected_plan.selected_vehicle_plan
      .payable_post_discount_booking_amount;
  payable_total_amount = total_amount;
  base_amt = booking.selected_plan.selected_vehicle_plan.payable_post_discount;
  if (booking.selected_plan.selected_vehicle_plan.discount == 0) {
    $("#discount_li").hide();
  }
}

function scroll_to_bottom_of_summary() {
  var objDiv = document.getElementById("summary_holder");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function get_car_image(car) {
  var car_image = "dzire.jpg";
  switch (car) {
    case "Maruti Suzuki Dzire": {
      break;
    }

    case "Maruti Suzuki Ertiga": {
      car_image = "ertiga.jpg";
      break;
    }

    case "Toyota Innova": {
      car_image = "innova.jpg";
      break;
    }

    case "Chevrolet Tavera": {
      car_image = "travera.jpeg";
      break;
    }

    case "Force Traveller [17 Seater]": {
      car_image = "force_traveller.png";
      break;
    }

    case "Force Traveller [12 Seater]": {
      car_image = "force_traveller.png";
      break;
    }

    case "Force Toofan": {
      car_image = "toofan.webp";
      break;
    }

    case "Toyota Innova Crysta": {
      car_image = "toyota-innova-crysta.jpeg";
      break;
    }

    case "Maruti Suzuki Omni": {
      car_image = "omni.jpeg";
      break;
    }
  }
  return car_image;
}



function getBookings(userData)
{

    var bookings=[];
    $.ajax({
        url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllotedDataByNumber",
        type: "post",
        data: userData,
        success: function (response) 
        {
          console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllotedDataByNumber",response);

          $.ajax({
            url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getBookings",
            type: "POST",
            data: userData.number,
            success: function (data) 
            {
              console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getBookings",data);
              booked_data = data;
            },
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("ERROR ON NETWORK CALL", textStatus, errorThrown);
        },
      });

}

function populate_bookings(bookings)
{

}

function open_details(i)
{

}