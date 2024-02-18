import { ref } from "vue";
import { useVenueStore } from "@/stores";
import { type LocalVenue, NewVenue, type Tables } from "@/types";

export function useVenueUtility() {
  // Dependency
  const venueStore = useVenueStore();

  // State
  const localVenue = ref<LocalVenue | Tables<"venue">>(NewVenue());
  const showVenueModal = ref(false);
  const venueDetail = ref<Tables<"venue"> | null>(null);
  const showVenueDetail = ref(false);
  const venueModalAction = ref<"Add" | "Edit">("Add");

  // Methods
  function onVenueClick(venueId: number) {
    venueDetail.value = venueStore.getVenueById(venueId) ?? null;
    showVenueDetail.value = true;
  }

  function onEditVenueClick(venueId: number) {
    localVenue.value = venueStore.getVenueById(venueId) ?? NewVenue();
    venueModalAction.value = "Edit";
    showVenueModal.value = true;
  }

  function onVenueInfoClick(venueId: number) {
    venueDetail.value = venueStore.getVenueById(venueId) ?? null;
    showVenueDetail.value = true;
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
    showVenueDetail.value = false;
  }

  function onHideVenueDetail() {
    venueDetail.value = null;
    showVenueDetail.value = false;
  }

  return {
    localVenue,
    venueDetail,
    onVenueClick,
    onDeleteVenueClick,
    onAddVenueClick,
    showVenueModal,
    venueModalAction,
    onHideVenueModal,
    onEditVenueClick,
    showVenueDetail,
    onHideVenueDetail,
    onVenueInfoClick,
  };
}
