<template>
  <NavBar />
  <div class="container">
    <GroupSidebar />
    <GroupRoster />
  </div>
  <Footer />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import GroupSidebar from "./components/GroupSidebar.vue";
import GroupRoster from "./components/GroupRoster.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    NavBar,
    GroupSidebar,
    GroupRoster,
    Footer,
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

ul {
  list-style: none;
  display: contents;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 100%;
  background-color: #f2f2f2;
  // color: var(--color-text-body);
  line-height: 1.5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
