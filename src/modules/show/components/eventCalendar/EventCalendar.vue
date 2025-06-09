<template>
  <div class="">
    <EventCalendarNavbar class="q-mb-sm" @today="onToday" @prev="onPrev" @next="onNext" />
    <div style="display: flex; max-width: 800px; width: 100%">
      <QCalendarMonth
        ref="calendar"
        v-model="selectedDate"
        weekday-align="center"
        date-align="right"
        month-label-size="md"
        :day-min-height="70"
        animated
        bordered
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
                {{ event.title + (event.time ? " - " + event.time : "") }}
                <QTooltip>{{ event.details }}</QTooltip>
              </div>
            </div>
          </template>
        </template>
      </QCalendarMonth>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today,
  type Timestamp,
} from "@quasar/quasar-ui-qcalendar";
import "@quasar/quasar-ui-qcalendar/index.css";

// The function below is used to set up our demo data
// const CURRENT_DAY = new Date();
// function getCurrentDay(day: number) {
//   const newDay = new Date(CURRENT_DAY);
//   newDay.setDate(day);
//   const tm = parseDate(newDay);
//   return tm!.date;
// }

// interface Event {
//   id: number;
//   title: string;
//   details: string;
//   date: string;
//   time?: string;
//   duration?: number;
//   bgcolor?: string;
//   icon?: string;
//   days?: number;
// }

const calendar = ref<QCalendarMonth>();
const selectedDate = ref(today());
const events = ref<Show[]>([]);

const eventsMap = computed<Record<string, Event[]>>(() => {
  const map: Record<string, Event[]> = {};
  if (events.value.length > 0) {
    events.value.forEach((event) => {
      (map[event.date] = map[event.date] || []).push(event);
    });
  }
  // console.info(map)
  return map;
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
function badgeClasses(event: Event, _type: string) {
  // console.info('event', event)
  return {
    "text-white": true,
    [`bg-${event.bgcolor}`]: true,
    "q-calendar__ellipsis": true,
  };
}

function badgeStyles(_event: Event, _type: string) {
  const s = {};
  // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
  // s.top = 0
  // s.bottom = 0
  // s.width = (event.days * this.parsedCellWidth) + '%'
  return s;
}
</script>

<style lang="scss" scoped></style>
