import { test, expect } from '../fixture/api-fixture.ts';
import { BookingDetails } from '../models/booking-details.ts';

test('Verify that should return all the booking', async ({ clientApi }) => {
  // Example API request using the clientApi
  const response = await clientApi.makeRequest({
    method: 'GET',
    endpoint: '/booking'
  });
  // Expect the response to be successful
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log('The Booking data is:', data[1]['bookingid']);
});

test('Verify that should return booking details for booking with id 3', async ({ clientApi }) => {
  const response = await clientApi.makeRequest({
    method: 'GET',
    endpoint: '/booking/3'
  });

//const bookingDetail = await response.json(); // To serialise but don't cast

const bookingDetails = await response.json() as BookingDetails; // Parse the JSON response into a BookingDetails object. response.json() is the deserilisation here.

  // Expect the response to be successful
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(bookingDetails.totalprice).toBe(893); // Example assertion to check the total price

  //expect (bookingDetail['totalPrice']).toBe(893); // Example assertion to check the total price
  expect(bookingDetails.bookingdates.checkin).toBe('2023-07-01'); // Example assertion to check the check-in date
  expect(bookingDetails.depositpaid).toBe(true); // Example assertion to check if the deposit is paid

  console.log('The Booking details are:', data);
});


