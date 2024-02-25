import { ref } from "vue";
import { useShowStore } from "@/stores";
import { NewShow } from "@/types";
import { type LocalShow, type Tables } from "@/types";

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
    localShow.value = show;
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
