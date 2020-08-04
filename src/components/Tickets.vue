/* eslint-disable vue/require-v-for-key */
<template>
  <div class="tickets">
    <Loading v-if="remoteDataBusy" />

    <div class="empty" v-else-if="tickets.length === 0">
      You don`t have any ticket yet
    </div>
    <section v-else class="tickets-list">
      <!--  eslint-disable-next-line vue/require-v-for-key -->
      <div
        v-for="ticket of tickets"
        v-bind:key="ticket.title"
        class="ticket-item"
      >
        <!-- <a @click="id = ticket._id">{{ ticket.title }}</a> -->
        <!-- <span>{{ ticket.title }}</span> -->
        <router-link :to="{name: 'ticket', params: { id: ticket._id }}">
          {{ ticket.title }}
        </router-link>
        <span class="badge">{{ ticket.status }}</span>
        <span class="date">{{ ticket.date | date }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import RemoteData from "../mixins/RemoteData";


export default {
  mixins: [
    RemoteData({
      tickets: "tickets"
    })
  ]
};
</script>
