var partner_profile = {};
var received_plans;
var data;
var user_data;
var order_data={};
var total_amount;
var selected_plan;
var selected_package_index;
var plans;
var data_res;
var payable_total_amount;
var base_amt;
var usernumber={}
var booked_data;

$(document).ready(function ()
{
    mybookings_open();
    
   
})
function get_car_image(car) {
    var car_image = 'dzire.jpg';
    switch (car) {
      case "Maruti Suzuki Dzire": {
        break;
      }
  
      case "Maruti Suzuki Ertiga": {
        car_image = 'ertiga.jpg';
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
        car_image = 'toyota-innova-crysta.jpeg';
        break;
      }
  
      case "Maruti Suzuki Omni": {
        car_image = 'omni.jpeg';
        break;
      }
    }
    return car_image;
  }
function mybookings_open(){
    console.log("in function");
   // usernumber.number=order_data.user.number;
     usernumber.number="8691860197";
  $("#loader_layout").modal();
    $.ajax({
      url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllotedDataByNumber",
      type: "post",
      data: usernumber,
      success: function (response) {
        console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllotedDataByNumber", response);
        $("#booking_successfully_completed").fadeOut("slow");
        $("#mybookings").fadeIn("slow");
        $("#loader_layout").modal('hide');
        $.ajax({
          url : 'https://us-central1-gadigoda-dfc26.cloudfunctions.net/getBookings',
          type : 'POST',
          data : usernumber,
          success : function(data) {
            console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getBookings", data);
            booked_data=data;
            populate_rides(response,booked_data);
          }
      }); 
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log
        ("ERROR ON NETWORK CALL", textStatus, errorThrown);
      }
    });
  }

//to show the modal of alloted drivers
function viewMoreAllotedModal() {
$("#cabBookingViewMoreAllotedModal").modal("show");
}
function viewMoreUnAllotedModal(i){
$('#cabBookingViewMoreUnAllotedModal'+i).modal("show");

}

//for scrolling to the fair price 
function closeModal() {
$("#cabBookingViewMoreAllotedModal").modal("hide");
}
function scroll_to_fair_price_modalview(){
const element = $("#cost_breakup_list");
element.scrollIntoView();
 
}

function populate_rides(data_resp,booked_data){
for (var i = 0; i < data_resp.length; i++){
$('#populate_rides').append(
  
  '<div class="container2">'+
  '<div class="container5" style="display:none">'+
   ' <div class="time">Driver Alloted '+
    '<img class="clock_img" src="../../assets/tick.png">'+
  '</div></div>'+
    '<div class="container02">'+
      '<div class="container2_1">'+
          '<img class="car" src="../../assets/'+get_car_image(data_resp[i].selected_plan.selected_vehicle_plan.selected_vehicle)+'">'+
      '</div>'+
      '<div class="container2_2">'+
          '<div class="route"><b>'+data_resp[i].pickup+'</b></div>'+
          '<div class="date_time">'+data_resp[i].pickup_date+' | '+data_resp[i].pickup_time+'</div>'+
          '<div class="km">'+data_resp[i].selected_plan.selected_vehicle_plan.selected_vehicle+'</div>'+
     ' </div>'+
    '</div>'+ 
    //view more button 
    '<div class="more">'+
    '<span class="badge badge-pill badge-viewmore" onclick="viewMoreAllotedModal()">View Details</span></div>' +
    //View More MODAL
    '<div class="modal" id="cabBookingViewMoreAllotedModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">' +
    '<div id="booking_summary" class="modal-content" style="height: 85vh;margin-top: 15vh;">' +
    '<div id="summary_holder" style="padding:30px;">' +
    '<div class="modal-header">' +
      "<span style='margin-left:0' ><h5><b>Allotment Details</b></h5></span>"+"<span>"+
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +"</span>"+
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
    data_resp[i].selected_plan.selected_vehicle_plan.no_of_seats + ' Seater' +
    "</div>" +
    ' <div class="car-sub-name" style="width:55vw!important;padding-right:20px!important;" id="summary_plan_overview">' 
    + data_resp[i].selected_plan.selected_vehicle_plan.selected_vehicle +',' +data_resp[i].selected_plan.name +
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
    '<div class="content-modal">'+data_resp[i].car_Owner+'</div>' +
    "</div>" +
    '<div id="driverPhoneNo" class="blocks">' +
    '<div class="contact-icon"><img src="../../assets/contact_icon.png" alt="contact-icon"/></div>' +
    '<div class="content-modal">'+data_resp[i].contact_number+'</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
   '</div>'+
    '<div id="seperator"></div>' +
    
    //Booking date time station and price
    '<div class="card" style="margin-top: 5px;">' +
    '<div class="card-body" style="padding:0" >'+'<div id="booking-details">'+
    '<div id="booking-Date-Time">'+
        '<div id="bookingDate" class="blocks">'+
            '<div class="title-modal">PickUp Date</div>'+
            '<div class="content-modal">'+data_resp[i].pickup_date+'</div>'+
        '</div>'+
        '<div id="bookingTime" class="blocks">'+
            '<div class="title-modal">PickUp Time</div>'+
            '<div class="content-modal">'+data_resp[i].pickup_time+'</div>'+
        '</div>'+'</div>'+
    '<br>'+
    '<div id="booking-PickUp-BasePrice">'+
        '<div id="pickUp" class="blocks">'+
            '<div class="title-modal">PickUp Station</div>'+
            '<div class="content-modal" style="overflow-wrap: break-word">'+data_resp[i].pickup+'</div>'+
        '</div>'+
        '<div id="basePrice" class="blocks">'+
            '<div class="title-modal">Base Fare</div>'+
            '<div class="content-modal"> ₹ '+data_resp[i].total_amount+'</div>'+
        '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+'</div>'+
    '<div id="seperator"></div>' +

    //Booking Plan Block
    '<div>' +
    '<div style=" margin-bottom: 0px;font-size: large;color: darkgray;">' +
    "बुकिंग प्लान / Booking Plan" +
    "</div>" +
    '<div class="card" style="margin-top: 5px;">' +
    '<div class="card-body">' +
    '<h5 class="card-title" id="summary_plan_name"><b>'+ data_resp[i].selected_plan.name+ '</b></h5>' +
    '<p class="card-text" id="summary_plan_description">'+data_resp[i].selected_plan.package_description+ '</p>' +
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
    '<div id="seperator"></div>'+

    //Vehicle Number Block
    '<div style=" margin-bottom: 0px;font-size: large;color: darkgray;">' +
    "गाडी नंबर / Vehicle Number" +
    "</div>"+
    '<div class="card" style="margin-top: 5px;">' +
    '<div class="card-body">' +
    '<div class="car-number" style="font-weight:bolder;text-align:center"><h5>' +data_resp[i].vehicle_number + '</h5></div>'+
    "</div>" +
    "</div>" +
    '<div id="seperator"></div>'+

    //Fair BreakUp
    '<div style="margin-bottom: 0px;font-size: large;color: darkgray;margin-top:25px;">' +
    "किराया ब्रेकअप / Fare Breakup" +
    "</div>" +
    '<ul class="list-group list-group-flush" id="cost_breakup_list">' +
    '<li class="list-group-item">' +
    "<div>Base Fare</div>" +
    '<div id="breakup_base_fare">₹ '+data_resp[i].selected_plan.selected_vehicle_plan.base_amount+'</div>' +
    "</li>" +
    '<li class="list-group-item" id="discount_li">' +
    "<div>Discount</div>" +
    '<div id="breakup_discount">' +
    "₹ " +data_resp[i].selected_plan.selected_vehicle_plan.discount+
    "</div>" +
    "</li>" +
    '<li class="list-group-item">' +
    "<div>Allowance</div>" +
    '<div id="breakup_allowance">₹ '+data_resp[i].selected_plan.selected_vehicle_plan.allowance_amount+'</div>' +
    "</li>" +
    '<li class="list-group-item">' +
    "<div>Total Fare Amount</div>" +
    '<div id="breakup_pd_payable_fare">₹ '+data_resp[i].selected_plan.selected_vehicle_plan.payable_post_discount+'</div>' +
    "</li>" +
    '<li class="list-group-item">' +
    "<div>Amount Paid</div>" +
    '<div id="breakup_booking_payable_amount" style="font-weight:bold">₹ '+data_resp[i].selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount+'</div>' +
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
for (var i = 0; i < booked_data.length; i++){
  if(booked_data[i].status=="Booked"){
    // console.log(booked_data);
    console.log("if is true");
    $('#populate_rides_booked').append(
      
      '<div class="container2">'+
      '<div class="container5">'+
       ' <div class="time">Booked Rides-Driver Yet To Be Alloted '+
        '<img class="clock_img" src="../../assets/time.png">'+
      '</div></div>'+
        '<div class="container02">'+
          '<div class="container2_1">'+
              '<img class="car" src="../../assets/'+get_car_image(booked_data[i].selected_plan.selected_vehicle_plan.selected_vehicle)+'">'+
          '</div>'+
          '<div class="container2_2">'+
              '<div class="route"><b>'+booked_data[i].station+'</b></div>'+
              '<div class="date_time">'+booked_data[i].pickup_date+' | '+booked_data[i].pickup_time+'</div>'+
              '<div class="km">'+booked_data[i].selected_plan.selected_vehicle_plan.selected_vehicle+'</div>'+
         ' </div>'+
        '</div>'+  
          //view more button 
    '<div><span class="badge badge-pill badge-viewmore" onclick="viewMoreUnAllotedModal('+i+')">View Details</span></div>' +'</div>'+
    //View More MODAL
    '<div class="modal unallotedmodals" id="cabBookingViewMoreUnAllotedModal'+i+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">' +
    '<div id="booking_summary" class="modal-content" style="height: 85vh;margin-top: 15vh;">' +
    '<div id="summary_holder" style="padding:30px;">' +
    '<div class="modal-header">' +
      "<span style='margin-left:0' ><h5><b>Booking Details</b></h5></span>"+"<span>"+
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +"</span>"+
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
    booked_data[i].selected_plan.selected_vehicle_plan.no_of_seats + ' Seater' +
    "</div>" +
    ' <div class="car-sub-name" style="width:55vw!important;padding-right:20px!important;" id="summary_plan_overview">' 
    + booked_data[i].selected_plan.selected_vehicle_plan.selected_vehicle +',' +booked_data[i].selected_plan.name +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div id="seperator"></div>' +

   
    
    //Booking date time station and price
    '<div class="card" style="margin-top: 5px;">' +
    '<div class="card-body" style="padding:0" >'+'<div id="booking-details">'+
    '<div id="booking-Date-Time">'+
        '<div id="bookingDate" class="blocks">'+
            '<div class="title-modal">PickUp Date</div>'+
            '<div class="content-modal">'+booked_data[i].pickup_date+'</div>'+
        '</div>'+
        '<div id="bookingTime" class="blocks">'+
            '<div class="title-modal">PickUp Time</div>'+
            '<div class="content-modal">'+booked_data[i].pickup_time+'</div>'+
        '</div>'+'</div>'+
    '<br>'+
    '<div id="booking-PickUp-BasePrice">'+
        '<div id="pickUp" class="blocks">'+
            '<div class="title-modal">PickUp Station</div>'+
            '<div class="content-modal" style="overflow-wrap: break-word">'+booked_data[i].station+'</div>'+
        '</div>'+
        '<div id="basePrice" class="blocks">'+
            '<div class="title-modal">Base Fare</div>'+
            '<div class="content-modal"> ₹ '+booked_data[i].total_amount+'</div>'+
        '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+'</div>'+
    '<div id="seperator"></div>' +

    //Booking Plan Block
    '<div>' +
    '<div style=" margin-bottom: 0px;font-size: large;color: darkgray;">' +
    "बुकिंग प्लान / Booking Plan" +
    "</div>" +
    '<div class="card" style="margin-top: 5px;">' +
    '<div class="card-body">' +
    '<h5 class="card-title" id="summary_plan_name"><b>'+ booked_data[i].selected_plan.name+ '</b></h5>' +
    '<p class="card-text" id="summary_plan_description">'+booked_data[i].selected_plan.package_description+ '</p>' +
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
    '<div id="seperator"></div>'+

   

    //Fair BreakUp
    '<div style="margin-bottom: 0px;font-size: large;color: darkgray;margin-top:25px;">' +
    "किराया ब्रेकअप / Fare Breakup" +
    "</div>" +
    '<ul class="list-group list-group-flush" id="cost_breakup_list">' +
    '<li class="list-group-item">' +
    "<div>Base Fare</div>" +
    '<div id="breakup_base_fare">₹ '+booked_data[i].selected_plan.selected_vehicle_plan.base_amount+'</div>' +
    "</li>" +
    '<li class="list-group-item" id="discount_li">' +
    "<div>Discount</div>" +
    '<div id="breakup_discount">' +
    "₹ " +booked_data[i].selected_plan.selected_vehicle_plan.discount+
    "</div>" +
    "</li>" +
    '<li class="list-group-item">' +
    "<div>Allowance</div>" +
    '<div id="breakup_allowance">₹ '+booked_data[i].selected_plan.selected_vehicle_plan.allowance_amount+'</div>' +
    "</li>" +
    '<li class="list-group-item">' +
    "<div>Total Fare Amount</div>" +
    '<div id="breakup_pd_payable_fare">₹ '+booked_data[i].selected_plan.selected_vehicle_plan.payable_post_discount+'</div>' +
    "</li>" +
    '<li class="list-group-item">' +
    "<div>Amount Paid</div>" +
    '<div id="breakup_booking_payable_amount" style="font-weight:bold">₹ '+booked_data[i].selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount+'</div>' +
    "</li>" +
    ' <li class="list-group-item" id="booking_amount_note_label" style="text-align: center!important;color: #e1b109;font-size: small;">' +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div> "
    )
  }
}
}
function display_data_of_booking(data_res){

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
document.getElementById("seat").innerHTML = data_res.selected_plan.selected_vehicle_plan.no_of_seats+" seats";
$("#km").val(data_res.selected_plan.selected_vehicle_plan.selected_vehicle);
document.getElementById("km").innerHTML = data_res.selected_plan.selected_vehicle_plan.selected_vehicle;
$("#cost").val(data_res.total_amount);
document.getElementById("cost").innerHTML = data_res.total_amount;
$("#booked_car").attr("src", "../cab-booking/assets/" + get_car_image(data_res.selected_plan.selected_vehicle_plan.selected_vehicle));    
}