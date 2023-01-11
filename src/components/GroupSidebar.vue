<template>
  <div class="sidebar">
    <font-awesome-icon icon="fa-solid fa-bars" @click="onClick" />
    <h4>Classes</h4>
    <ul>
      <li>Class 1</li>
      <li>Class 2</li>
      <li>Class 3</li>
    </ul>
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
  border: solid 2px;
  width: 10em;
  height: 30em;
  padding: 1em;
}
</style>
