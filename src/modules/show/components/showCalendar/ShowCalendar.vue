<template>
  <div class="">
    <ShowCalendarNav
      class="q-mb-sm"
      @today="onToday"
      @prev-month="onPrevMonth"
      @next-month="onNextMonth"
      @prev-year="onPrevYear"
      @next-year="onNextYear"
    />
    <div class="q-mb-sm heading-display">{{ headingDisplay }}</div>
    <div class="calendar-wrapper">
      <QCalendarMonth
        ref="calendar"
        v-model="selectedDate"
        weekday-align="center"
        date-align="left"
        :day-min-height="80"
        animated
        bordered
        :show-month-label="true"
        @click-day="onClickDay"
      >
        <template #day="{ scope: { timestamp } }">
          <template v-for="event in eventsMap[timestamp.date]" :key="event.id">
            <div
              :class="badgeClasses(event, 'day')"
              class="row justify-start items-center no-wrap calendar-event"
              @click.stop="onEventClick(event)"
            >
              <div class="title q-calendar__ellipsis">
                {{ getVenueById(event.venue)?.name || "" }}
              </div>
            </div>
          </template>
        </template>
      </QCalendarMonth>

      <ShowModal
        v-model:show-modal="showShowModal"
        v-model:show="localShow"
        :action="showModalAction"
        persistent
        @hide="onHideShowModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseDate, QCalendarMonth, Timestamp, today } from "@quasar/quasar-ui-qcalendar";
import { addYears, subYears, format, compareAsc, compareDesc } from "date-fns";
import { type Show } from "@/modules/show/types";
import "@quasar/quasar-ui-qcalendar/index.css";

const userStore = useUserStore();
const showStore = useShowStore();
const { getVenueById } = useVenueStore();
const {
  onHideShowModal,
  showShowModal,
  localShow,
  onEditShowClick,
  showModalAction,
  onAddShowClick,
} = useShowUtility();

const calendar = ref<QCalendarMonth>();
const selectedDate = ref(today());

const eventsMap = computed<Record<string, Show[]>>(() => {
  const map: Record<string, Show[]> = {};
  if (showStore.shows.length > 0) {
    showStore.shows.forEach((show) => {
      const key = parseDate(new Date(show.date))?.date;
      if (key) {
        (map[key] = map[key] || []).push(show);
      }
    });
  }
  return map;
});

const headingDisplay = computed(() => {
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${MONTH[Number(selectedDate.value.split("-")[1]) - 1]} ${selectedDate.value.split("-")[0]}`;
});

// Calendar Navigation
function onToday() {
  if (calendar.value) {
    calendar.value.moveToToday();
  }
}

function onPrevMonth() {
  if (calendar.value) {
    calendar.value.prev();
  }
}

function onNextMonth() {
  if (calendar.value) {
    calendar.value.next();
  }
}

function onPrevYear() {
  const newDate = subYears(selectedDate.value, 1);
  selectedDate.value = format(newDate, "yyyy-MM-dd");
}

function onNextYear() {
  const newDate = addYears(selectedDate.value, 1);
  selectedDate.value = format(newDate, "yyyy-MM-dd");
}

// Calendar event handling
function onEventClick(show: Show) {
  onEditShowClick(show.id);
}

function onClickDay({ scope }: { scope: { timestamp: Timestamp } }) {
  if (userStore.memberIsAdmin) {
    localShow.value.date = scope.timestamp.date;
    onAddShowClick();
  }
}

// Event dates
function badgeClasses(event: Show, _type: string) {
  return {
    "text-white": true,
    ["bg-grey-7"]: compareAsc(event.date, new Date()) == -1,
    ["bg-blue-7"]: compareDesc(event.date, new Date()) == -1,
    "q-calendar__ellipsis": true,
  };
}
</script>

<style lang="scss" scoped>
:deep(.q-calendar-month__day--month) {
  font-weight: 600;
  color: brown;
}

.heading-display {
  font-weight: 500;
  font-size: 24px;
  color: #333;
}

.calendar-wrapper {
  display: flex;
  max-width: 800px;
  width: 100%;

  .calendar-event {
    position: relative;
  }
}
</style>
