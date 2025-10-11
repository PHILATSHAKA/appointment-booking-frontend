// app/booking/page.tsx (Booking Page)

import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Book an Appointment</h2>
      <BookingForm />
    </div>
  );
}
