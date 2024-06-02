# Hall Booking API

Created an Booking API with multiple endpoint's ,each endpoint has their own destination and task

#### API :https://hall-booking-api-3hra.onrender.com

#### Routing Endpoint : /Rooms

(API/Routing Endpoint/Endpoint)

## Documentation

#### Postman Doucment : https://documenter.getpostman.com/view/35282596/2sA3Qwc9uM

#### 1. Endpoint ("/addRooms")

POST :

```bash
https://hall-booking-api-3hra.onrender.com/Rooms/addRooms
```

This API endpoint is used to Create a room with Client inputs like (roomName, seatsAvailable, amenities, pricePerhour)

{
"roomName":"AVmm HoTEl",
"numberOfSeats":"500",
"amenities":"Wifi,AC,Parking",
"pricePerHour":"10000"
}

#### 2 Endpoint("/bookRoom/:id")

POST :

```bash
 https://hall-booking-api-3hra.onrender.com/Rooms/bookRoom/R1
```

This APi endpoint will book a room with client input of(customer,bookingDate,startTime,endTime) and Hotel Id as Pramas(R1) It will book the room if it is available on that date if not it send an proper res to client

{
"customer":"Vignesh",
"bookingDate":"19/30/2024",
"startTime":"10:00:00 AM",
"endTime": "10:00:00 PM"

}

#### 3 Endpoint("/viewBookings")

GET :

```bash
https://hall-booking-api-3hra.onrender.com/Rooms/viewBookings
```

This end point will show all booking details with booking data

#### 4 Endpoint ("/viewCustomers")

GET :

```bash
https://hall-booking-api-3hra.onrender.com/Rooms/viewCustomers
```

This API endpoint will show alll the customer with booking data

#### 5 Endpoint ("/customer/:name")

GET :

```bash
 https://hall-booking-api-3hra.onrender.com/Rooms/customer/Vignesh
```

This End point will get a particular user by params(name) how many times he booked rooms
