package com.parv.staynexus.Service.Interfaces;


import com.parv.staynexus.Entities.BookingEntity;

public interface CheckoutService {

    String getCheckoutSession(BookingEntity booking, String successUrl, String failureUrl);

}
