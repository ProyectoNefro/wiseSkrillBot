<script setup>
import getData from "./services/getDataService";
import { ref, onMounted } from "vue";
import axios from "axios";

const skrillData = ref({});
const wiseData = ref({});
const loading = ref(true);

// functions that mutate state and trigger updates

// lifecycle hooks
onMounted(async () => {
  try {
    const response = await getData(); // Replace with your API endpoint
    skrillData.value = response.skrill;
    wiseData.value = response.wise;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="container flex flex-col p-16 gap-16">
    <div
      class="tableContainers flex flex-col justify-center align-center gap-16"
    >
    <div class="loadingContainer w-full flex justify-center flex-col items-center" v-if="loading">
      <span class="w-1/3 loading loading-infinity loading-lg bg-success"></span>
      <span class="w-1/3 loading loading-infinity loading-lg bg-primary"></span>
    </div>
      <table class="table text-center w-full" v-if="!loading">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Price</th>
            <th>User</th>
            <th>Minimum Buy</th>
            <th>Maximum Buy</th>
            <th>Positive Rate</th>
          </tr>
        </thead>
        <tbody>
            <tr
              v-for="(item, index) in Object.values(wiseData)"
              :key="index"
              class="bg-success text-white font-bold"
            >
              <th>{{ index + 1 }}</th>
              <td>{{ item.price }}</td>
              <td>{{ item.user }}</td>
              <td>{{ item.minimum }}</td>
              <td>{{ item.maximum }}</td>
              <td>{{ item.positiveRate.toFixed(2) }}</td>
            </tr>
        </tbody>
      </table>
      <table class="table text-center w-full" v-if="!loading">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Price</th>
            <th>User</th>
            <th>Minimum Buy</th>
            <th>Maximum Buy</th>
            <th>Positive Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in Object.values(skrillData)"
            :key="index"
            class="bg-primary text-white font-bold"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ item.price }}</td>
            <td>{{ item.user }}</td>
            <td>{{ item.minimum }}</td>
            <td>{{ item.maximum }}</td>
            <td>{{ item.positiveRate.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
