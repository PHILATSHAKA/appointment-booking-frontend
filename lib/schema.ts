import { z } from 'zod';
export const bookingFormSchema = z.object({
    branchId: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
    customerName: z.string().min(1),
    customerEmail: z.email(),
    slotId: z.string()
});
export type BookingFormValues = z.infer<typeof bookingFormSchema>;