var booking = {};
var booking_date_set = [];
var booking_date_object_set = [];
var booking_time_set = [];
var booking_time_set_display = [];
booking.station_is = "Pickup";

$(document).ready(function(){    
    // $('#stationSelectionModal').hide(); //enter the class or id of the particular html element which you wish to hide. 
    $('#foodBookingHomeScreen').hide();
});

function stationSelection() {
    $("#trainSelectionModal").fadeOut("def", function () {
        $("#stationSelectionModal").fadeIn("slow");
});
}

function station_selected(station) {

    populate_date_list();
    booking.station = station;
    if (booking.station_is == "Pickup") {
      booking.pickup = station;
      booking.pickup_coordinates = "";
    } else {
      booking.destination = station;
      booking.destination_coordinates = "";
    }
    console.log("Station Selected", booking);
    
  
  }
  
  function populate_date_list() {
    $("#new_account_label").text("पिक उप की  तरीक चुनिए।");
    var ul = document.getElementById("date_selection_list");
    var startdate = moment();
    var list_text = "";
  
    for (i = 0; i < 16; i++) {
      var new_date = moment().add(i, "days");
  
      list_text = new_date.format("DD, MMM YYYY");
      booking_date_set.push(list_text);
      var date_obj = {};
      date_obj.date = new_date.format("DD");
      date_obj.month = new_date.format("M");
      date_obj.year = new_date.format("YYYY");
      booking_date_object_set.push(date_obj);
      if (i == 0) {
        list_text = list_text + "  [ आज की बुकिंग ]";
      }
      if (i == 1) {
        list_text = list_text + "  [ कल की बुकिंग ]";
      }
      if (i == 2) {
        list_text = list_text + "  [ परसो की बुकिंग ]";
      }
      var li = document.createElement("li");
      li.className = "list-group-item";
      li.appendChild(document.createTextNode(list_text));
      ul.appendChild(li);
    }
  
    $("#date_selection_list li").prop('onclick', null).off('click');
  
    $("#date_selection_list li").click(function () {
      booking.pickup_date = booking_date_set[$(this).index()];
      booking.pickup_date_object = booking_date_object_set[$(this).index()];
      console.log("Date Selected", booking);
  
      $("#account_details_layout").fadeOut("def", function () {
       
        $("#date_selection_list").fadeOut("slow");
        $("#time_selection_list_layout").fadeIn("slow");
        populate_time_list();
  
      });
    });  
    $("#station_selection").fadeOut("def", function () {
      $("#account_details_layout").fadeIn("slow");
    });
  }
  
  function populate_time_list() {
    $("#new_account_label").text("पिक उप का समय चुने |");
    $("#new_account_sub_label").text(booking.pickup_date + " को  कितने बजे " + booking.pickup + " से पिक उप करे ?");
    var ul = document.getElementById("time_selection_list");
  
    var list_text = "";
  
    if (moment().format("DD, MMM YYYY") == booking.pickup_date) {
      var jetzt = moment();
      jetzt.seconds(0);
      jetzt.milliseconds(0);
      var minuten = jetzt.minutes();
      var minutenToAdd = 0;
      if (minuten >= 0 && minuten <= 29) {
        minutenToAdd = 30 - minuten;
      } else if (minuten >= 31 && minuten <= 59) {
        minutenToAdd = 60 - minuten;
      }
      var MIN_IN_MS = 60000;
      var HALF_HOUR_IN_MS = 3600000;
  
      minutenToAdd = minutenToAdd * MIN_IN_MS;
      var next_30min_rounded_hour = moment(jetzt + minutenToAdd);
      next_30min_rounded_hour = next_30min_rounded_hour.add(2, 'hours');
  
      if (next_30min_rounded_hour.isSame(moment(), "day")) {
  
        while (next_30min_rounded_hour.isSame(moment(), "day")) {
          var prefix = "";
  
          if (next_30min_rounded_hour.format("A") == "AM") {
            if (Number(next_30min_rounded_hour.format("hh")) > 11) {
              prefix = "लेट नाईट, ";
            }
            else if (Number(next_30min_rounded_hour.format("hh")) < 5) {
              prefix = "लेट नाईट, ";
            }
            else {
              prefix = "सुबह, ";
            }
          } else {
            if (Number(next_30min_rounded_hour.format("hh")) < 4) {
              prefix = "दोपहर , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 7) {
              prefix = "शाम , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 12) {
              prefix = "शाम , ";
            } else prefix = "दोपहर  , ";
          }
          booking_time_set.push(next_30min_rounded_hour.format("hh:mm A"));
          booking_time_set_display.push(
            prefix + next_30min_rounded_hour.format("hh:mm A")
          );
          next_30min_rounded_hour = next_30min_rounded_hour.add(30, "minutes");
        }
  
        //console.log(booking_time_set_display);
      }
      else {
        alert("आज की बुकिंग खिड़की बंद , आप कल की बुकिंग कर सकते हैं |");
        populate_date_list();
      }
    }
    else {
      var next_30min_rounded_hour = moment().startOf("day").add(1, "day");
  
      //console.log(next_30min_rounded_hour.format("DD.MM.YYYY, h:mm:ss a"));
  
      if (next_30min_rounded_hour.isSame(moment().add(1, "day"), "day")) {
  
        while (next_30min_rounded_hour.isSame(moment().add(1, "day"), "day")) {
          var prefix = "";
  
          if (next_30min_rounded_hour.format("A") == "AM") {
            if (Number(next_30min_rounded_hour.format("hh")) > 11) {
              prefix = "लेट नाईट, ";
            }
            else if (Number(next_30min_rounded_hour.format("hh")) < 5) {
              prefix = "लेट नाईट, ";
            } else {
              prefix = "सुबह, ";
            }
          } else {
            if (Number(next_30min_rounded_hour.format("hh")) < 4) {
              prefix = "दोपहर , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 7) {
              prefix = "शाम , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 12) {
              prefix = "रात  , ";
            } else prefix = "दोपहर , ";
          }
          booking_time_set.push(next_30min_rounded_hour.format("hh:mm A"));
          booking_time_set_display.push(
            prefix + next_30min_rounded_hour.format("hh:mm A")
          );
          next_30min_rounded_hour = next_30min_rounded_hour.add(30, "minutes");
        }
      }
    }
  
    if (booking_time_set_display.length > 0) {
      var ul = document.getElementById("time_selection_list");
      for (i = 0; i < booking_time_set_display.length; i++) {
        var li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(booking_time_set_display[i]));
        ul.appendChild(li);
      }
  
      $("#time_selection_list li").click(function () {
        booking.pickup_time = booking_time_set[$(this).index()];
        console.log("Time Selected", booking);
        localStorage.setItem('Booking', JSON.stringify(booking));
        // location.href='./FoodBooking-HomeScreen/index.html'
        $("#time_selection_list").fadeOut("slow");
        $("#new_account_label").fadeOut("slow");
        $("#new_account_sub_label").fadeOut("slow");
        $("#foodBookingHomeScreen").fadeIn("slow");
        // $("#loader_layout").modal();
        // load_packages();
      });
    }
  }
  
// foodBooking code

var filtercategory = "";
var received_products;
var selecteditems = [];
var arr = [];
function stringmatch(input, thali_title) {
  console.log(thali_title);
  console.log(input);
  var flag;
  for (var i = 1; i < (input.length+1); i++) {
     if (thali_title.substr(0, i) === input.substr(0, i)) {
      
      flag = 1;
    } else {
      flag = 0;
    }
  }
  return flag;
}

function call_main_menu() {
  $("#main_menu").modal("toggle");
}
//searchbar
function searchfood() {
  let input = $("#input").val();
  console.log(input);
  input = input.toLowerCase();
  console.log(input);

  $(".title-thali").each(function (i, obj) {
    
    thali_title = $(this).text().toLowerCase();
    inputString = input;

    if ((stringmatch(inputString, thali_title))) {
      console.log("yes");
    } else {
       //hiding the div
      // console.log($(this).parent());
      var parent1=$(this).parent() ;
      var parent2=parent1.parent() ;
      parent2.parent().hide();
       
    }
    if($("#input").val()=='')
    {
      $('.con2').each(function(){
        $(this).show();
      })
    }
  });

  // var cart_item=localStorage.getItem('cart_item');
  // cart_itemslist = JSON.parse(cart_item);
  // for (i = 0; i < cart_itemslist.length; i++) {
  //   console.log(cart_itemslist[i])
  //     if (!cart_itemslist[i].name.toLowerCase().includes(input)) {
  //        id=cart_itemslist[i].id;
  //       $(cart_itemslist[i]).hide();
  //       element=$('#div')
  //       $('#div')
  //       console.log('nah')
  //     }
  //     else {
  //       $(cart_itemslist[i]).show();
  //       console.log('reh')

  //     }
  // }
}
function updatelocalstorage(i, incartcount) {
  var old = localStorage.getItem("cart_item");
  old = old ? JSON.parse(old) : [];
  old[i].count = incartcount;
  console.log(old[i].count);
  localStorage.setItem("cart_item", JSON.stringify(old));
}
$(".combobox").hide();
function storeInLocalStorage() {
  var old = localStorage.getItem("cart_item");
  old = old ? JSON.parse(old) : [];
  var newarr = old.concat(selecteditems);
  console.log(newarr);

  localStorage.setItem("cart_item", JSON.stringify(newarr));
}
function cart() {
  storeInLocalStorage();
  // location.href = "../Food-Cart/index.html";
}
function addtocart(i, products) {
  console.log(products);
  $("#addtocartbtn" + i).hide();
  $("#box" + i).show();
  $(".cart").show();
  received_products[i].count = 1;
  received_products[i].inCart = true;
  selecteditems.push(received_products[i]);
  console.log(selecteditems);
}
function minus(i) {
  var count = $("#num" + i).val() - 1;
  count = count < 1 ? 1 : count;
  $("#num" + i).val(count);
  // alert(count);
  $("#num" + i).change();
  received_products[i].count = $("#num" + i).val();
  received_products[i].inCart = true;
  if (received_products[i].inCart) {
    incartcount = $("#num" + i).val();
    console.log(incartcount);
    updatelocalstorage(i, incartcount);
  }
  $(".cart").show();
  return false;
}

function plus(i) {
  var count = $("#num" + i).val();
  count++;
  $("#num" + i).val(count);
  $("#num" + i).change();

  received_products[i].count = $("#num" + i).val();
  id = $("#num" + i);

  received_products[i].inCart = true;
  if (received_products[i].inCart) {
    incartcount = $("#num" + i).val();
    console.log(incartcount);
    updatelocalstorage(i, incartcount);
  }
  $(".cart").show();

  // selecteditems.push(received_products[i]);
  return false;
}

$(document).ready(function () {
  var cart_item = localStorage.getItem("cart_item");
  console.log(cart_item);
  cart_itemslist = JSON.parse(cart_item);
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllProducts",

    method: "POST", //First change type to method here
    success: function (response) {
      alert("Successfully Received;");
      console.log(
        "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllProducts",
        response
      );
      received_products = response;
      console.log(filtercategory);
      // console.log(received_products)
      var data = response;
      function findid(id) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == id) {
            return false;
          }
        }
        return true;
      }

      items = [];
      if (cart_itemslist) {
        cart_itemslist?.forEach(function (cart_item, i) {
          arr.push(cart_item.id);
          console.log(arr);
          if (cart_item.isDeleted) {
          } else {
            var htmlcode =
              "<div class='con2'  >" +
              '<div class="con7">' +
              '<div class="imgcon">' +
              "<img class='img_food' src=" +
              cart_item.media +
              " " +
              "/>" +
              "</div>" +
              '<div class="btns">' +
              ' <div class="ordernow">' +
              ' <button class="ordernowbtn" >' +
              "ORDER NOW" +
              "</button>" +
              " </div>" +
              ' <div class="ordercombobox" id="box' +
              i +
              '">' +
              '<div class="number">' +
              '<button class="minus" onclick="minus(' +
              i +
              ')">' +
              "-" +
              "</button>" +
              '<input type="text" id="num' +
              i +
              '" value="' +
              cart_item.count +
              '"/>' +
              '<button class="plus" onclick="plus(' +
              i +
              ')">' +
              "+" +
              "</button>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              '<div class="con3">' +
              ' <div class="con4">' +
              ' <div class="title-thali"><b>' +
              cart_item.name +
              "</b></div>" +
              ' <div id="percentoff" >15% Off</div>' +
              "</div>" +
              '<div class="con5">' +
              ' <div id="price"><b>' +
              "₹" +
              cart_item.price +
              "</b></div>" +
              '<div id="mrp">' +
              cart_item.mrp +
              "</div>" +
              "</div>" +
              '<div id="items">' +
              "2 Chapati, 1 Mix Veg, 1 Dal Fry, 1 Jeera Rice, Salad, Pickle" +
              " </div>" +
              '<div class="con6">' +
              ' <div class="rating">' +
              ' <img class="star" src="star.png" />' +
              '<div id="number">4.5</div>' +
              "</div>" +
              '<div class="time">' +
              '<img class="clock" src="clock.png" />' +
              '<div id="mins">' +
              cart_item.delay +
              "</div>" +
              "</div>" +
              '<div class="availableAt">' +
              "<div>" +
              "</div>" +
              '<div class="availableAtText">' +
              cart_item.availableAt +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";

            items.push(htmlcode);
          }
        });
      }
      if (data) {
        data?.forEach(function (products, i) {
          if (findid(products.id)) {
            if (products.isDeleted) {
            } else {
              var htmlcode =
                "<div class='con2'>" +
                '<div class="con7">' +
                '<div class="imgcon">' +
                "<img class='img_food' src=" +
                products.media +
                " " +
                "/>" +
                "</div>" +
                '<div class="btns">' +
                ' <div class="addtocart">' +
                ' <button class="addtocartbtn" id="addtocartbtn' +
                i +
                '" onclick="addtocart(' +
                i +
                ')">' +
                "ADD TO CART" +
                "</button>" +
                " </div>" +
                ' <div class="combobox" id="box' +
                i +
                '">' +
                '<div class="number">' +
                '<button class="minus" onclick="minus(' +
                i +
                ')">' +
                "-" +
                "</button>" +
                '<input type="text" id="num' +
                i +
                '" value="1"/>' +
                '<button class="plus" onclick="plus(' +
                i +
                ')">' +
                "+" +
                "</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="con3">' +
                ' <div class="con4">' +
                ' <div class="title-thali"><b>' +
                products.name +
                "</b></div>" +
                ' <div id="percentoff" >15% Off</div>' +
                "</div>" +
                '<div class="con5">' +
                ' <div id="price"><b>' +
                "₹" +
                products.price +
                "</b></div>" +
                '<div id="mrp">' +
                products.mrp +
                "</div>" +
                "</div>" +
                '<div id="items">' +
                "2 Chapati, 1 Mix Veg, 1 Dal Fry, 1 Jeera Rice, Salad, Pickle" +
                " </div>" +
                '<div class="con6">' +
                ' <div class="rating">' +
                ' <img class="star" src="star.png" />' +
                '<div id="number">4.5</div>' +
                "</div>" +
                '<div class="time">' +
                '<img class="clock" src="clock.png" />' +
                '<div id="mins">' +
                products.delay +
                "</div>" +
                "</div>" +
                '<div class="availableAt">' +
                "<div>" +
                "</div>" +
                '<div class="availableAtText">' +
                products.availableAt +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";

              items.push(htmlcode);
            }
          }
        });
      }

      document.querySelector(".products").innerHTML = "";
      $(".products").append(items.join(""));
      $(".combobox").hide();
      $(".ordernowbtn").hide();
      $(".cart").hide();
      $(".products").show();
    },
    error: function () {
      alert("error");
    },
  });
});
