<template>
  <div class="sidebar" :class="{ toggled: toggle }">
    <div class="icon">
      <font-awesome-icon icon="fa-solid fa-bars" @click="onClick" />
    </div>
    <div v-show="toggle" class="sidebar-content">
      <h4>Exit Tickets</h4>
      <ul>
        <li>Exit Ticket 1</li>
        <li>Exit Ticket 2</li>
        <li>Exit Ticket 3</li>
      </ul>
      <button>Create a new exit ticket</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExitTicketSidebar",
  data() {
    return {
      toggle: true,
    };
  },
  methods: {
    onClick() {
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style>
.icon {
  cursor: pointer;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 0 2px 0 2px;
  border-style: solid;
  height: 35em;
  padding: 5em 1em 1em 1em;
  background-color: #fcfcfc;
}

.toggled {
  width: 12em;
}

.untoggled {
  width: 0.5em;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
