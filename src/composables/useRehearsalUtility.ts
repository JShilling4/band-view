import { ref } from "vue";
import { useRehearsalStore } from "@/stores";
import { type LocalRehearsal, NewRehearsal, type Tables } from "@/types";

export function useRehearsalUtility() {
  // Dependency
  const rehearsalStore = useRehearsalStore();

  // State
  const localRehearsal = ref<LocalRehearsal | Tables<"rehearsal">>(NewRehearsal());
  const showRehearsalModal = ref(false);
  const rehearsalModalAction = ref<"Add" | "Edit">("Add");

  // Methods
  function onEditRehearsalClick(rehearsalId: number) {
    const rehearsal = rehearsalStore.getRehearsalById(rehearsalId);
    if (!rehearsal) return;
    localRehearsal.value = rehearsal;
    rehearsalModalAction.value = "Edit";
    showRehearsalModal.value = true;
  }

  function onDeleteRehearsalClick(id: number) {
    rehearsalStore.deleteRehearsal(id);
  }

  function onAddRehearsalClick() {
    rehearsalModalAction.value = "Add";
    showRehearsalModal.value = true;
  }

  function onHideRehearsalModal() {
    localRehearsal.value = NewRehearsal();
  }

  return {
    localRehearsal,
    onAddRehearsalClick,
    onDeleteRehearsalClick,
    showRehearsalModal,
    rehearsalModalAction,
    onHideRehearsalModal,
    onEditRehearsalClick,
  };
}
