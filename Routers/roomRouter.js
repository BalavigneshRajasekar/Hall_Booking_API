const express = require("express");
const Room = require("../model/rooms");
const router = express.Router();

//creating variables for storing data
let rooms = [
  {
    roomId: "R1",
    seats: "4",
    roomName: "3star",
    amenities: "tv,ac,heater",
    pricePerHour: "100",
  },
];
let bookings = [
  {
    customer: "Vignesh",
    bookingDate: "5/30/2024",
    startTime: "12:00pm",
    endTime: "11:59am",
    bookingID: "B1",
    roomId: "R1",
    status: "booked",
  },
];
let customers = [
  {
    name: "Vignesh",
    bookings: [
      {
        customer: "Vignesh",
        bookingDate: "5/30/2024",
        startTime: "12:00pm",
        endTime: "11:59am",
        bookingID: "B1",
        roomId: "R1",
        status: "booked",
      },
    ],
  },
];

//This API is used to save rooms in an local variable called "Rooms"
router.post("/addRooms", async (req, res) => {
  const { roomName, pricePerHour, numberOfSeats, amenities } = req.body;
  try {
    const room = {
      roomId: `R${rooms.length + 1}`,
      roomName: roomName,
      pricePerHour: pricePerHour,
      seats: numberOfSeats,
      amenities: amenities,
    };
    rooms.push(room);

    console.log(rooms);
    res.status(200).send({ message: "room created", data: rooms });
  } catch (err) {
    res.status(400).send(err);
  }
});

//This API is used to Book room if Rooms ara available
router.post("/bookRoom/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.params);
  const userInputs = req.body;
  //Check whether room exists or not
  let idExists = rooms.find((el) => el.roomId == id);
  try {
    if (idExists === undefined) {
      return res
        .status(400)
        .json({ message: "room does not exist.", RoomsList: rooms });
    }
    //Check whether room is already Booked or not
    const roomAvailable = bookings.filter((ele) => ele.roomId == id);

    if (roomAvailable.length > 0) {
      //If the room is already in Bookings then here we check with date's
      let checkDate = roomAvailable.filter(
        (date) => date.bookingDate === userInputs.bookingDate
      );
      if (checkDate.length == 0) {
        let newID = `B${bookings.length + 1}`;
        let newBooking = {
          ...userInputs,
          BookingID: newID,
          roomId: id,
          status: "booked",
        };
        bookings.push(newBooking);
        //Once The date verification is passed ,
        // here we check that is new or existing customer in order to add those booking details in their DB
        let addCustomer = customers.find(
          (cus) => cus.name == userInputs.customer
        );
        //This flow help us to Book for new Customer
        if (addCustomer == undefined) {
          let newCustomer = {
            name: userInputs.customer,
            bookings: [newBooking],
          };
          customers.push(newCustomer);
          res
            .status(200)
            .send({ message: "new Customer booked room", data: newCustomer });
          console.log(customers);
          console.log(bookings);
          console.log(rooms);
        } //This flow help us to book existing customer
        else {
          addCustomer.bookings.push(newBooking);
          res.status(200).send({
            message: "Existing customer booked room",
            data: newBooking,
          });
          console.log(customers);
          console.log(bookings);
          console.log(rooms);
        }
        res.status(200).send({ message: "roomBooked", data: newBooking });
        console.log(bookings);
      } else {
        res
          .status(400)
          .json({ message: "Room is already booked on this date" });
      }
    }
    //This flow help to book a room which doesn't has any previous booking
    else {
      let bookID = `B${bookings.length + 1}`;
      let newBooking = {
        ...userInputs,
        BookingID: bookID,
        roomId: id,

        status: "booked",
      };
      bookings.push(newBooking);
      let addCustomer = customers.find(
        (cus) => cus.name == userInputs.customer
      );
      //This help us to add the booking details to the particular user data based on Name
      if (addCustomer) {
        addCustomer.bookings.push(newBooking);
        res.status(200).send({
          message: "Existing customer booked room",
          data: newBooking,
        });
      } else {
        let newCustomer = {
          name: userInputs.customer,
          bookings: [newBooking],
        };
        customers.push(newCustomer);
        res
          .status(200)
          .send({ message: "new Customer booked room", data: newCustomer });
      }
    }
  } catch (err) {
    res.status(400).send("Error while booking");
  }
});

//This endpoint will get all the booked rooms with data
router.get("/viewBookings", (req, res) => {
  try {
    //  Here we take the particular details only to show
    let BookedDetails = bookings.map((ele) => {
      const {
        customer,
        bookingDate,
        startTime,
        endTime,

        roomId,
        status,
      } = ele;
      return { roomId, customer, bookingDate, startTime, endTime, status };
    });

    if (BookedDetails) {
      res
        .status(200)
        .send({ message: "Previous Booking details", data: BookedDetails });
    } else {
      res.status(400).send({ message: "No previous Booking Details" });
    }
  } catch (err) {
    res.status(400).send("Error while");
  }
});

router.get("/viewCustomers", (req, res) => {
  const customerBookings = customers.map((bookings) => {
    return bookings.bookings;
  });

  const allCustomerDetails = customerBookings.map((booking) => {
    return booking.map((details) => {
      const { customer, roomId, bookingDate, startTime, endTime } = details;
      return { customer, roomId, bookingDate, startTime, endTime };
    });
  });
  console.log(customerBookings);
  console.log(allCustomerDetails);
  res
    .status(200)
    .send({ message: "customers retrived", data: allCustomerDetails });
});

//This endpoint help us to get the Booking details of the customer by name
//It will show many times the customer booked the room
router.get("/customer/:name", (req, res) => {
  const { name } = req.params;
  const customer = customers.find((cust) => cust.name === name);
  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }
  const customerBookings = customer.bookings.map((booking) => {
    const {
      customer,
      roomId,
      startTime,
      endTime,
      bookingID,
      status,
      bookingDate,
      booked_On,
    } = booking;
    return {
      customer,
      roomId,
      startTime,
      endTime,
      bookingID,
      status,
      bookingDate,
      booked_On,
    };
  });
  res.json(customerBookings);
});
module.exports = router;
