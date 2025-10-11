// components/BookingForm.tsx
'use client';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema, type BookingFormValues } from '@/lib/schema';
import { createBooking, getBranches, getSlots } from '@/app/api';

export default function BookingForm() {
  const [branches, setBranches] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema)
  });

  const branchId = watch('branchId');
  const date = watch('date');

  useEffect(() => {
    (async () => setBranches(await getBranches()))();
  }, []);

  useEffect(() => {
    if (!branchId || !date) {
      setSlots([]);
      return;
    }
    setLoadingSlots(true);
    getSlots(branchId, date)
      .then(setSlots)
      .finally(() => setLoadingSlots(false));
  }, [branchId, date]);

  function formatTime(dateString: string) {
    const d = new Date(dateString);
    const hh = d.getUTCHours().toString().padStart(2, '0');
    const mm = d.getUTCMinutes().toString().padStart(2, '0');
    return `${hh}:${mm}`; // matches /^\d{2}:\d{2}$/
  }

  const onSubmit: SubmitHandler<BookingFormValues> = async (values: BookingFormValues) => {
    console.log('form values', values);
    const payload = {
      branchId: values.branchId,
      slotDate: values.date,
      slotTime: values.time,
      slotId: values.slotId,
      customerName: values.customerName,
      customerEmail: values.customerEmail
    };
    console.log('payload', payload)
    try {
        const res = await createBooking(payload);
        alert(`Booking confirmed! ID: ${res.bookingId}`);
      } catch (err: any) {
        console.log(err)
        if (err.message.startsWith("409")) {
          alert("That slot is no longer available. Please pick another one.");
        } else {
          alert("Something went wrong while booking. Please try again.");
          console.error("Booking error", err);
        }
      }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg space-y-4 p-6 rounded-2xl shadow bg-white"
    >
      <h1 className="text-2xl font-semibold">Book an appointment</h1>

      {/* Branch select */}
      <div>
        <label className="block mb-1">Branch</label>
        <select className="w-full border rounded p-2" {...register('branchId')}>
          <option value="">Select a branch</option>
          {branches.map((b) => (
            <option key={b.branchId} value={b.branchId}>
              {b.name}
            </option>
          ))}
        </select>
        {errors.branchId && (
          <p className="text-sm text-red-600">{errors.branchId.message as any}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          className="w-full border rounded p-2"
          {...register('date')}
          onChange={(e) => setValue('date', e.target.value)}
        />
        {errors.date && (
          <p className="text-sm text-red-600">{errors.date.message as any}</p>
        )}
      </div>

      {/* Time slots directly from slots[] */}
      <div>
        <label className="block mb-1">Time</label>
        <select
          className="w-full border rounded p-2"
          disabled={!slots.length || loadingSlots}
          {...register('slotId')}
          onChange={(e) => {
            const selected = slots.find((slot) => String(slot.id) === e.target.value);
            console.log(selected)
            if (selected) {
                const startTime = formatTime(selected.start_time);
                setValue("slotId", selected.id);
                setValue("time", startTime)
            }
          }}
        >
          <option value="">
            {loadingSlots
              ? 'Loading…'
              : slots.length
              ? 'Select a time'
              : 'No available slots'}
          </option>
          {slots.map((s) => {
              const start = formatTime(s.start_time);
              const end =formatTime(s.end_time);
            return (
              <option key={s.id} value={s.id}>
                       {start} – {end}
              </option>
            );
          })}
        </select>
        {errors.time && (
          <p className="text-sm text-red-600">{errors.time.message as any}</p>
        )}
      </div>

      {/* Customer details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Your name</label>
          <input className="w-full border rounded p-2" {...register('customerName')} />
          {errors.customerName && (
            <p className="text-sm text-red-600">{errors.customerName.message as any}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full border rounded p-2" {...register('customerEmail')} />
          {errors.customerEmail && (
            <p className="text-sm text-red-600">{errors.customerEmail.message as any}</p>
          )}
        </div>
      </div>

      <button
        className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
        disabled={isSubmitting}
      >
        Book
      </button>
    </form>
  );
}
