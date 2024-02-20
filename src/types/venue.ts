import { type Tables } from "@/types";

type LocalVenue = Omit<Tables<"venue">, "id">;
function NewVenue(
  name: string = "",
  address: string = "",
  city: string = "",
  state: string = "",
  phone: string = "",
  contact: number | null = null,
  serves_food: boolean = false,
  website_url: string = "",
  is_private: boolean = false
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
    is_private,
  };
}

export { type LocalVenue, NewVenue };
