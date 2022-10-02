const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({ origin: true });
admin.initializeApp();

fast2smsAuthKey = 'YFkpGQXE2jyuRm9fU1P5oC4ehISni7wHLxlrVTWAd6cJDgbs8z0AOKEMCYjmDa2RLn4vziTVch9GxSpb'

exports.createBooking = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const booking = request.body;
  admin
    .firestore()
    .collection("Booking")
    .doc(booking.id).set(booking)
    .then(() => {
      response.json({
        id: booking.id,
        name: booking.name,
      });
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});


exports.updateBooking = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const booking = request.body;
  admin
    .firestore()
    .collection("Booking")
    .doc(booking.id).set(booking)
    .then(() => {
      response.json({
        id: booking.userId,
        name: booking.pickup,
      });
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.getBookings = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const number = request.body.number;
    admin
      .firestore()
      .collection("Booking")
      .where("user.number", "==", number)
      .get()
      .then((querySnapshot) => {
        const bookings = [];
        querySnapshot.forEach((doc) => {
          const booking = doc.data();
          booking.pickup = doc.pickup;
          bookings.push(booking);
        });
        response.json(bookings);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});

exports.getAllBookings = functions.https
  .onRequest((request, response) => {
    cors(response, request, () => {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      admin
        .firestore()
        .collection("Booking")
        .get()
        .then((querySnapshot) => {
          const bookings = [];
          querySnapshot.forEach((doc) => {
            const booking = doc.data();
            bookings.push(booking);
          });
          response.json(bookings);
        })
        .catch((error) => {
          response.status(500).json({
            error: error.code,
          });
        });
    });
  });

exports.getBookingDetails = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const number = request.body.number;
  admin
    .firestore()
    .collection("Bookings")
    .where("user.number", "==", number)
    .get()
    .then((querySnapshot) => {
      const bookings = [];
      querySnapshot.forEach((doc) => {
        const booking = doc.data();
        booking.pickup = doc.pickup;
        bookings.push(booking);
      });
      response.json(bookings);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.createPackage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const package = request.body;
    admin
      .firestore()
      .collection("Package")
      .doc(package.id).set(package)
      .then(() => {
        response.json({
          id: package.id,
        });
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});

exports.updatePackage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const package = request.body;
    admin
      .firestore()
      .collection("Package")
      .doc(package.id).update(package)
      .then(() => {
        response.json(package);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});

exports.getAllPackages = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    admin
      .firestore()
      .collection("Package")
      // .where("special_plan", "!=", "true")
      .get()
      .then((querySnapshot) => {
        const packages = [];
        querySnapshot.forEach((doc) => {
          const package = doc.data();
          packages.push(package);
        });
        response.json(packages);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.getSpecialPackages = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    admin
      .firestore()
      .collection("Package")
      .where("special_plan", "==", "true")
      .get()
      .then((querySnapshot) => {
        const packages = [];
        querySnapshot.forEach((doc) => {
          const package = doc.data();
          packages.push(package);
        });
        response.json(packages);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });


exports.createDiscountCoupon = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const discountCoupon = request.body;
    admin
      .firestore()
      .collection("Discount Coupon")
      .doc(discountCoupon.code).set(discountCoupon)
      .then(() => {
        response.json({
          id: discountCoupon.id,
          name: discountCoupon.name,
        });
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.updateDiscountCoupon = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const discountCoupon = request.body;
    admin
      .firestore()
      .collection("Discount Coupon")
      .doc(discountCoupon.id).update(discountCoupon)
      .then(() => {
        response.json({
          id: discountCoupon.id,
          name: discountCoupon.name,
        });
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.getDiscountCoupons = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    admin
      .firestore()
      .collection("Discount Coupon")
      .get()
      .then((querySnapshot) => {
        const coupons = [];
        querySnapshot.forEach((doc) => {
          const coupon = doc.data();
          coupons.push(coupon);
        });
        response.json(coupons);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.createPartner = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const partner = request.body;
  admin
    .firestore()
    .collection("partners")
    .doc(partner.contact_number).set(partner)
    .then(() => {
      response.json({
        contact_number: partner.contact_number,
        name: partner.car_owner,
      });
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.getAllPartners = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Origin", "*");
    admin
      .firestore()
      .collection("partners")
      .get()
      .then((querySnapshot) => {
        const packages = [];
        querySnapshot.forEach((doc) => {
          const package = doc.data();
          packages.push(package);
        });
        response.json(packages);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.updatePartner = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const partner = request.body;
  admin
    .firestore()
    .collection("partners")
    .doc(partner.contact_number).update(partner)
    .then(() => {
      response.json({
        number: partner.contact_number,
      });
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});

exports.getDiscountCoupon = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const code = request.body.code;
    admin
      .firestore()
      .collection("Discount Coupon")
      .doc(code)
      .get()
      .then((doc) => {
        console.log(doc.data());
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});


exports.getActiveCoupon = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // const code = request.body.code;
    admin
      .firestore()
      .collection("Discount Coupon")
      // .doc(code)
      .where("isActive","==","true")
      .get()
      .then((querySnapshot) => {
        const packages = [];
        querySnapshot.forEach((doc) => {
          const package = doc.data();
          packages.push(package);
        });
        response.json(packages);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});

exports.sendOTP = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Origin", "*");
    const { phoneNumber } = request.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your OTP is ${otp}. Please enter it to verify your phone number.`;
    // OTP store to firestore database
    var OTPDataStoreKey;
    admin
      .firestore()
      .collection("OTP").doc().set({
        otp: otp,
      }).then(docRef => {
        OTPDataStoreKey = docRef.id; console.log("Document written with ID: ", docRef);
      }).catch(error => { console.error("Error adding document: ", error); });

    axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsAuthKey}&variables_values=${otp}&route=otp&numbers=${phoneNumber}`)
      .then(res => {
        response.json({
          message: message,
          otp: otp,
          DataBaseKey: res.data.request_id,
        });
      })
      .catch(error => {
        response.status(500).json({
          error: error.code
        });
      });
  });
});

exports.getAllotedData = functions.https
  .onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    admin
      .firestore()
      .collection("Alloted Data")
      .get()
      .then((querySnapshot) => {
        const coupons = [];
        querySnapshot.forEach((doc) => {
          const coupon = doc.data();
          coupons.push(coupon);
        });
        response.json(coupons);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });

exports.getAllotedDataByNumber = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const number = request.body.number;
    admin
      .firestore()
      .collection("Alloted Data")
      .where("user.number", "==", number)
      .get()
      .then((querySnapshot) => {
        const coupons = [];
        querySnapshot.forEach((doc) => {
          const coupon = doc.data();
          coupons.push(coupon);
        });
        response.json(coupons);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});

exports.applyCoupon = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const code = request.body.code;
    const amount = request.body.amount;
    admin
      .firestore()
      .collection("Discount Coupon")
      .where("code", "==", code)
      .onSnapshot((querySnapshot) => {
        const coupon = querySnapshot.docs[0].data()
        if (coupon) {
          if (coupon.isActive == "true") {
            if (coupon.selected_coupon_type == "Percentage") {
              const discount = (coupon.amount * amount) / 100;
              const total = amount - discount;
              response.json({
                code: code,
                discount: discount,
                total: total,
              });
            } else {
              const discount = coupon.amount;
              const total = amount - discount;
              response.json({
                code : code,
                discount: discount,
                total: total,
              });
            }
          } else {
            response.status(500).json({
              error: "Coupon is not active",
            });
          }
        } else {
          response.status(500).json({
            error: "Coupon not found",
          });
        }
      });
  });
});

exports.applyCtrial = functions.https
.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  const code = request.body.code;
  const amount = request.body.amount;
  admin
    .firestore()
    .collection("Discount Coupon")
    .where("code", "==", code)
    .get()
    .then((querySnapshot) => {
      const packages = [];
      querySnapshot.forEach((doc) => {
        const package = doc.data();
        packages.push(package);
      });
      response.json(packages);
    })
    .catch((error) => {
      response.status(500).json({
        error: error.code,
      });
    });
});


exports.updateAllotedData = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const booking = request.body;
    admin
      .firestore()
      .collection("Alloted Data")
      .doc(booking.id)
      .update(booking)
      .then(() => {
        response.json();
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});

exports.checkUsers = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    const number = request.body.number;
    admin
      .firestore()
      .collection("Users")
      .where("number", "==", number)
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          users.push(user);
        });
        response.json(users);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
  });
});