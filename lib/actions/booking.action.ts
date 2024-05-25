import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { getBookings } from "../data-service";

export async function deleteBookingAction(bookingId: number) {
    const session = await auth();
  
    if (!session)
      throw new Error("You need to be signed in to delete a reservation");
  
    const guestBookings = await getBookings(session.user.guestId);
  
    const guestBookingIds = guestBookings.map((booking) => booking.id);
  
    if (!guestBookingIds.includes(bookingId))
      throw new Error("You are not authorized to delete this booking");
  
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);
  
    if (error) throw new Error("Booking could not be deleted");
  
    revalidatePath("/account/reservations");
  }
  
  export async function updateBookingAction(formData: any) {
    const bookingId = Number(formData.get("bookingId"));
    const session = await auth();
    if (!session)
      throw new Error("You need to be signed in to update a reservation");
  
    const guestBookings = await getBookings(session.user.guestId);
  
    const guestBookingIds = guestBookings.map((booking) => booking.id);
  
    if (!guestBookingIds.includes(bookingId))
      throw new Error("You are not authorized to update this booking");
  
    const updatedFields = {
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations").slice(0, 1000),
    };
  
    // Mutation
  
    const { error } = await supabase
      .from("bookings")
      .update(updatedFields)
      .eq("id", bookingId)
      .select()
      .single();
  
    // Error handling
    if (error) {
      console.error(error);
      throw new Error("Booking could not be updated");
    }
    // Revalidation
    revalidatePath(`/account/reservations/edit/${bookingId}`);
  
    // Redirection
    redirect("/account/reservations");
  }
  
  export async function createBookingAction(bookingData: any, formData: any) {
    const session = await auth();
    if (!session)
      throw new Error("You need to be signed in to update a reservation");
  
    const newBooking = {
      ...bookingData,
      guestId: session.user.guestId,
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations").slice(0, 1000),
      extrasPrice: 0,
      totalPrice: bookingData.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: "unconfirmed",
    };
  
    const { error } = await supabase.from("bookings").insert([newBooking]);
    // So that the newly created object gets returned!
  
    if (error) throw new Error("Booking could not be created");
  
    revalidatePath(`/cabins/${bookingData.cabinId}`);
  
    redirect("/cabins/thankyou");
  }