import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { supabase } from "../supabase";

export async function updateGuestAction(formData: any) {
    const session = await auth();
  
    if (!session)
      throw new Error("You need to be signed in to update your profile");
  
    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");
  
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
      throw new Error("Invalid national ID");
  
    const updateData = { nationality, countryFlag, nationalID };
  
    console.log(session);
  
    const { error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session?.user?.guestId);
  
    if (error) throw new Error("Guest could not be updated");
  
    revalidatePath("/account/profile");
  }