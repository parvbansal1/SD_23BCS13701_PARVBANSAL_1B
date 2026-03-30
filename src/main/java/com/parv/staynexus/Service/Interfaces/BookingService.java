package com.parv.staynexus.Service.Interfaces;

import com.parv.staynexus.Dto.BookingDTO;
import com.parv.staynexus.Dto.BookingRequest;
import com.parv.staynexus.Dto.GuestDTO;
import com.parv.staynexus.Dto.HotelReportDTO;
import com.parv.staynexus.Enums.BookingStatus;
import com.stripe.model.Event;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    BookingDTO initialiseBooking(BookingRequest bookingRequest);

    BookingDTO addGuests(Long bookingId, List<GuestDTO> guestDtoList);

    String initiatePayments(Long bookingId);

    void capturePayment(Event event);

    void cancelBooking(Long bookingId);

    BookingStatus getBookingStatus(Long bookingId);

    List<BookingDTO> getAllBookingsByHotelId(Long hotelId);

    HotelReportDTO getHotelReport(Long hotelId, LocalDate startDate, LocalDate endDate);

    List<BookingDTO> getMyBookings();
}
