import { type Tables } from "@/types";

export type LocalVenue = Omit<Tables<"venue">, "id">;
export function NewVenue(
  name: string = "",
  address: string = "",
  city: string = "",
  state: string = "",
  phone: string = "",
  contact: number | null = null,
  serves_food: boolean = false,
  website_url: string = ""
): LocalVenue {
  return {
    name,
    address,
    city,
    state,
    phone,
    contact,
    serves_food,
    website_url,
  };
}
