<template>
  <NavBar />
  <GroupRoster />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import GroupRoster from "./components/GroupRoster.vue";

export default {
  components: {
    NavBar,
    GroupRoster,
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  overflow-y: scroll;
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  background-color: #f2f2f2;
  // color: var(--color-text-body);
  line-height: 1.5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
