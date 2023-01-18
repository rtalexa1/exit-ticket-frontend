<template>
  <div class="nav-bar"></div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-bar {
  position: fixed;
  display: flex;
  border-bottom: solid 2px;
  border-color: black;
  width: 100%;
  height: 4em;
  background-color: #253c55;
  color: #f2f2f2;
}
</style>
