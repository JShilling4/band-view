import { ref } from "vue";
import { type Tables } from "@/core/models";
import { type LocalRehearsal, NewRehearsal } from "@/modules/rehearsal/models";
import { useRehearsalStore } from "@/modules/rehearsal/store";
import clone from "lodash/clone";

export function useRehearsalUtility() {
  // Dependency
  const rehearsalStore = useRehearsalStore();

  // State
  const localRehearsal = ref<LocalRehearsal | Tables<"rehearsal">>(NewRehearsal());
  const showRehearsalModal = ref(false);
  const rehearsalModalAction = ref<"Add" | "Edit">("Add");

  // Methods
  function onEditRehearsalClick(rehearsalId: number) {
    const rehearsal = clone(rehearsalStore.getRehearsalById(rehearsalId));
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
