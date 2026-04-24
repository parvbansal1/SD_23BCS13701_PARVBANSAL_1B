<<<<<<< HEAD
# 🏨 StayNexus – Hotel Booking Backend API

StayNexus is a scalable backend system for a hotel booking platform, built using Spring Boot.
It supports complete booking lifecycle management, inventory handling, secure authentication, and payment integration.

---

## 🚀 Tech Stack

* **Backend:** Spring Boot, Spring MVC
* **Security:** Spring Security + JWT
* **Database:** MySQL / PostgreSQL (JPA + Hibernate)
* **API Docs:** Swagger (OpenAPI)
* **Payment Integration:** Stripe
* **Build Tool:** Maven

---

## 🧠 Architecture

The project follows a clean layered architecture:

* **Controller Layer** → Handles HTTP requests
* **Service Layer** → Business logic
* **Repository Layer** → Database interaction
* **Security Layer** → Authentication & authorization

---

## 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access (Admin/User)
* Secure API endpoints

---

## 📦 Features

### 🛠️ Admin Inventory

* GET `/admin/inventory/rooms/{roomId}`
* PATCH `/admin/inventory/rooms/{roomId}`
* PUT `/admin/hotels/{hotelId}/rooms/{roomId}`

---

### 📅 Booking Flow

* Initialize booking
* Add guests
* Payment integration (Stripe)
* Booking confirmation & cancellation

Endpoints:

* GET `/bookings/{bookingId}/status`
* POST `/bookings/init`
* POST `/bookings/{bookingId}/payments`
* POST `/bookings/{bookingId}/cancel`
* POST `/bookings/{bookingId}/addGuests`

---

### 👥 Guest Management

* GET `/users/guests`
* POST `/users/guests`
* PUT `/users/guests/{guestId}`
* DELETE `/users/guests/{guestId}`

---

### 🔍 Hotel Browse

* GET `/hotels/search`
* GET `/hotels/{hotelId}/info`

---

### 🏨 Hotel Management (Admin)

* POST `/admin/hotels`
* GET `/admin/hotels`
* GET `/admin/hotels/{hotelId}`
* PUT `/admin/hotels/{hotelId}`
* DELETE `/admin/hotels/{hotelId}`
* PATCH `/admin/hotels/{hotelId}/activate`

---

### 🛏️ Room Management

* POST `/admin/hotels/{hotelId}/rooms`
* GET `/admin/hotels/{hotelId}/rooms`
* GET `/admin/hotels/{hotelId}/rooms/{roomId}`
* PUT `/admin/hotels/{hotelId}/rooms/{roomId}`
* DELETE `/admin/hotels/{hotelId}/rooms/{roomId}`

---

### 👤 User Profile

* GET `/users/profile`
* PATCH `/users/profile`
* GET `/users/myBookings`

---

### 💳 Payment Webhook

* POST `/webhook/payment`

---

## 🔄 Booking Flow (High-Level)

1. User searches hotels
2. Selects room & dates
3. Initializes booking
4. Adds guests
5. Payment is initiated
6. Webhook confirms payment
7. Booking is finalized

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/parvbansal1/StayNexus.git
cd StayNexus
```

### 2. Configure database

Update `application.properties`:

```properties
spring.datasource.url=YOUR_DB_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Run the application

```bash
mvn clean install
mvn spring-boot:run
```

---

## 📄 API Documentation

Swagger UI available at:

```
http://localhost:8080/api/v1/swagger-ui/index.html
```

---

## 🖼️ System Design

### 📊 Architecture Diagram

![Architecture](https://github.com/user-attachments/assets/585136d9-05b5-4832-ad37-0a47d4678433)

### 🗄️ Database Schema

![Schema](https://github.com/user-attachments/assets/bc209296-e0f2-48f9-a7ae-65d084e4cb6c)

---

## 🌟 Key Highlights

* Modular and scalable architecture
* Secure JWT authentication
* Real-world booking workflow
* Payment integration using Stripe
* Clean REST API design

---

## 📌 Future Improvements

* Caching with Redis
* Email notifications
* Rate limiting
* Microservices architecture

---

## 👨‍💻 Author

**Parv Bansal**
Backend Developer

---
=======

- 📌 **Name:** PARV BANSAL
- 🆔 **University ID:** 23BCS13701 
- 🏫 **Program:** B.E. CSE – Chandigarh University
- 📚 **Course:** System Design (23CSH-314)
- 📆 **Semester:** 6th
>>>>>>> cbcbe97c449b841c6079adceea68c3a7dd00c95f
