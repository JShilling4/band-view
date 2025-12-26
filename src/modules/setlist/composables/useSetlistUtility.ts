import { type Tables } from "@/plugins/supabase";
import { type LocalSetlist, NewSetlist } from "@/modules/setlist/models";
import { useSetlistStore } from "@/modules/setlist/store";

export function useSetlistUtility() {
  // Dependency
  const setlistStore = useSetlistStore();

  // State
  const localSetlist = ref<LocalSetlist | Tables<"setlist">>(NewSetlist());
  const showSetlistModal = ref<boolean>(false);
  const setlistModalAction = ref<"Add" | "Edit">("Add");
  const setsToCreate = ref("");

  // Methods
  function onEditSetlistClick(setlistId: number) {
    const setlist = setlistStore.getSetlistById(setlistId);
    if (!setlist) return;
    localSetlist.value = setlist;
    setlistModalAction.value = "Edit";
    showSetlistModal.value = true;
  }

  async function onDeleteSetlist(setlist: Tables<"setlist">): Promise<boolean | undefined> {
    return setlistStore.deleteSetlist(setlist);
  }

  function onAddSetlistClick() {
    setlistModalAction.value = "Add";
    showSetlistModal.value = true;
  }

  function onHideSetlistModal() {
    localSetlist.value = NewSetlist();
    setsToCreate.value = "";
  }

  return {
    localSetlist,
    setsToCreate,
    onDeleteSetlist,
    onAddSetlistClick,
    showSetlistModal,
    setlistModalAction,
    onHideSetlistModal,
    onEditSetlistClick,
  };
}
