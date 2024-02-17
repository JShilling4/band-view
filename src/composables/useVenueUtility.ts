import { ref } from "vue";
import { useVenueStore } from "@/stores";
import { type LocalVenue, NewVenue, type Tables } from "@/types";

export function useVenueUtility() {
  // Dependency
  const venueStore = useVenueStore();

  // State
  const localVenue = ref<LocalVenue | Tables<"venue">>(NewVenue());
  const showVenueModal = ref(false);
  const venueModalAction = ref<"Add" | "Edit">("Add");

  // Methods
  function onVenueClick(venueId: number) {
    localVenue.value = venueStore.getVenueById(venueId) ?? NewVenue();
    venueModalAction.value = "Edit";
    showVenueModal.value = true;
  }

  function onDeleteVenueClick(id: number) {
    venueStore.deleteVenue(id);
  }

  function onAddVenueClick() {
    venueModalAction.value = "Add";
    showVenueModal.value = true;
  }

  function onHideVenueModal() {
    localVenue.value = NewVenue();
  }

  return {
    localVenue,
    onVenueClick,
    onDeleteVenueClick,
    onAddVenueClick,
    showVenueModal,
    venueModalAction,
    onHideVenueModal,
  };
}
