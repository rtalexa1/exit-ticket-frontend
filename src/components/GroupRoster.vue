<template>
  <div class="container">
    <ul>
      <li v-for="student in students" :key="student.id">{{ student }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GroupRoster",
  data() {
    return {
      students: [],
    };
  },
  methods: {
    async getStudents() {
      const res = await fetch("http://localhost:3000/groups/1/students");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.students = await this.getStudents();
  },
};
</script>

<!-- <style scoped lang="scss">
.container {
  margin-top: 4em;
}
</style> -->
