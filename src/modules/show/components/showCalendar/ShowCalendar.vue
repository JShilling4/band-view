<template>
  <div class="">
    <ShowCalendarNav class="q-mb-sm" @today="onToday" @prev="onPrev" @next="onNext" />
    <div class="q-mb-sm heading-display">{{ headingDisplay }}</div>
    <div style="display: flex; max-width: 800px; width: 100%">
      <QCalendarMonth
        ref="calendar"
        v-model="selectedDate"
        weekday-align="center"
        date-align="left"
        :day-min-height="70"
        animated
        bordered
        month-label-size="lg"
        :show-month-label="true"
        @click-day="onClickDay"
      >
        <template #day="{ scope: { timestamp } }">
          <template v-for="event in eventsMap[timestamp.date]" :key="event.id">
            <div
              :class="badgeClasses(event, 'day')"
              :style="badgeStyles(event, 'day')"
              class="row justify-start items-center no-wrap my-event"
            >
              <!-- <QIcon v-if="event?.icon" :name="event.icon" class="q-mr-xs"></QIcon> -->
              <div class="title q-calendar__ellipsis">
                {{ getVenueById(event.venue)?.name || "" }}
                <QTooltip>{{ getVenueById(event.venue)?.name || "" }}</QTooltip>
              </div>
            </div>
          </template>
        </template>
      </QCalendarMonth>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseDate, QCalendarMonth, today, type Timestamp } from "@quasar/quasar-ui-qcalendar";
import "@quasar/quasar-ui-qcalendar/index.css";
import { Show } from "@/modules/show/types";
import { useShowStore } from "@/modules/show/store";

const showStore = useShowStore();
const { getVenueById } = useVenueStore();

const calendar = ref<QCalendarMonth>();
const selectedDate = ref(today());

const eventsMap = computed<Record<string, Show[]>>(() => {
  const map: Record<string, Show[]> = {};
  if (showStore.getShowsThisYear.length > 0) {
    showStore.getShowsThisYear.forEach((show) => {
      const key = parseDate(new Date(show.date))?.date;
      if (key) {
        (map[key] = map[key] || []).push(show);
      }
    });
  }
  // console.info(map)
  return map;
});

const headingDisplay = computed(() => {
  const dateObj = new Date(selectedDate.value);
  // const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.toLocaleString("default", { year: "numeric" });
  return year;
});

// Calendar Navigation
function onToday() {
  if (calendar.value) {
    calendar.value.moveToToday();
  }
}

function onPrev() {
  if (calendar.value) {
    calendar.value.prev();
  }
}

function onNext() {
  if (calendar.value) {
    calendar.value.next();
  }
}

// Calendar event handling
function onClickDay(data: Timestamp) {
  console.info("onClickDay", data);
}

// Event dates
function badgeClasses(_event: Show, _type: string) {
  // console.info('event', event)
  return {
    "text-white": true,
    [`bg-blue-9`]: true,
    "q-calendar__ellipsis": true,
  };
}

function badgeStyles(_event: Show, _type: string) {
  const s = {};
  // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
  // s.top = 0
  // s.bottom = 0
  // s.width = (event.days * this.parsedCellWidth) + '%'
  return s;
}
</script>

<style lang="scss" scoped>
:deep(.q-calendar-month__day--month) {
  font-weight: 600;
  color: brown;
}
</style>
