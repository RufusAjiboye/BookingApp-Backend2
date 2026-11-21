export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingDetails {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
}

// bookingdates: BookingDates;
// bookingdates: BookingDates;
