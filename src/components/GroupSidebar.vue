<template>
  <div class="sidebar" :class="{ toggled: toggle }">
    <font-awesome-icon icon="fa-solid fa-bars" @click="onClick" />
    <div v-show="toggle">
      <h4>Classes</h4>
      <ul>
        <li>Class 1</li>
        <li>Class 2</li>
        <li>Class 3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupSidebar",
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    onClick() {
      this.toggle = !this.toggle;
      console.log(this.toggle);
    },
  },
};
</script>

<style>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-width: 0 2px 2px 2px;
  border-style: solid;
  height: 30em;
  padding: 5em 1em 1em 1em;
}

.toggled {
  width: 10em;
}

.untoggled {
  width: 0.5em;
}
</style>
