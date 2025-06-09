import { type Tables } from "@/core/models";
import { type LocalShow, NewShow } from "@/modules/show/types";
import clone from "lodash/clone";

export function useShowUtility() {
  // Dependency
  const showStore = useShowStore();

  // State
  const localShow = ref<LocalShow | Tables<"show">>(NewShow());
  const showShowModal = ref(false);
  const showModalAction = ref<"Add" | "Edit">("Add");

  // Methods
  function onEditShowClick(showId: number) {
    const show = showStore.getShowById(showId);
    if (!show) return;
    localShow.value = clone(show);
    showModalAction.value = "Edit";
    showShowModal.value = true;
  }

  function onDeleteShowClick(id: number) {
    showStore.deleteShow(id);
  }

  function onAddShowClick() {
    showModalAction.value = "Add";
    showShowModal.value = true;
  }

  function onHideShowModal() {
    localShow.value = NewShow();
  }

  return {
    localShow,
    onDeleteShowClick,
    onAddShowClick,
    showShowModal,
    showModalAction,
    onHideShowModal,
    onEditShowClick,
  };
}
