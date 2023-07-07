<script setup>
import { getData, sendMessage } from "./services/getDataService";
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const skrillData = ref({});
const wiseData = ref({});
const USDTData = ref({});
const loading = ref(true);
const loadingMessage = ref(false);

const fetchData = async () => {
  try {
    const response = await getData();
    skrillData.value = response.skrill;
    wiseData.value = response.wise;
    USDTData.value = response.usdt;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const sendTelegram = async () => {
  loadingMessage.value = true;
  const response = await sendMessage();
  if (response.status === 200) {
    alert("Message sent successfully");
    loadingMessage.value = false;
  } else {
    alert("Error sending message");
  }
};

const fetchDataEveryFiveMinutes = async () => {
  await fetchData();
  setInterval(fetchData, 5 * 60 * 1000);
};

onMounted(() => {
  fetchDataEveryFiveMinutes();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="flex flex-col p-8 md:p-16 lg:pl-32 lg:pr-32 lg:pb-32 m-0">
    <h1 class="text-4xl font-bold text-center mb-8">
      Binance P2P Exchange Rates
    </h1>
    <div class="tableContainers flex flex-col justify-center align-center">
      <div
        class="loadingContainer w-full flex justify-center flex-col items-center"
        v-if="loading"
      >
        <span
          class="w-1/3 loading loading-infinity loading-lg bg-success"
        ></span>
        <span
          class="w-1/3 loading loading-infinity loading-lg bg-primary"
        ></span>
      </div>
      <template v-else>
        <img
          class="w-24 my-4"
          src="https://cryptologos.cc/logos/tether-usdt-logo.png"
          alt=""
        />
        <table class="table text-center w-full mb-8" v-if="!loading">
          <!-- head -->
          <thead class="bg-white text-green-700 font-bold">
            <tr>
              <th class="hidden md:block"></th>
              <th>Price</th>
              <th class="hidden md:block">User</th>
              <th>Minimum Buy</th>
              <th>Maximum Buy</th>
              <th class="hidden md:block">Positive Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in Object.values(USDTData)"
              :key="index"
              class="bg-green-700 text-white font-bold"
            >
              <th class="hidden md:block">{{ index + 1 }}</th>
              <td>$ {{ item.price }}</td>
              <td class="hidden md:block">{{ item.user }}</td>
              <td>{{ item.minimum }}</td>
              <td>{{ item.maximum }}</td>
              <td class="hidden md:block">
                {{ item.positiveRate.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
        <img
          class="w-24"
          src="https://d21buns5ku92am.cloudfront.net/69645/images/470451-Frame%2039321-0745ed-medium-1677657684.png"
          alt=""
        />
        <table class="table text-center w-full mb-16">
          <!-- head -->
          <thead class="bg-white text-success font-bold">
            <tr>
              <th class="hidden md:block"></th>
              <th>Price</th>
              <th class="hidden md:block">User</th>
              <th>Minimum Buy</th>
              <th>Maximum Buy</th>
              <th class="hidden md:block">Positive Rate</th>
              <th class="bg-red-700 text-white font-bold">% "Lost"</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in Object.values(wiseData)"
              :key="index"
              class="bg-success text-white font-bold"
            >
              <th class="hidden md:block">{{ index + 1 }}</th>
              <td>{{ item.price }}</td>
              <td class="hidden md:block">{{ item.user }}</td>
              <td>{{ item.minimum }}</td>
              <td>{{ item.maximum }}</td>
              <td class="hidden md:block">
                {{ item.positiveRate.toFixed(2) }}
              </td>
              <td class="bg-red-700 text-white font-bold">
                {{ ((1 - 1 / item.price) * 100).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
        <img
          class="w-48 my-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Skrill_logo.svg/2560px-Skrill_logo.svg.png"
          alt=""
        />
        <table class="table text-center w-full" v-if="!loading">
          <!-- head -->
          <thead class="bg-white text-primary font-bold">
            <tr>
              <th class="hidden md:block"></th>
              <th>Price</th>
              <th class="hidden md:block">User</th>
              <th>Minimum Buy</th>
              <th>Maximum Buy</th>
              <th class="hidden md:block">Positive Rate</th>
              <th class="bg-red-700 text-white font-bold">% "Lost"</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in Object.values(skrillData)"
              :key="index"
              class="bg-primary text-white font-bold"
            >
              <th class="hidden md:block">{{ index + 1 }}</th>
              <td>{{ item.price }}</td>
              <td class="hidden md:block">{{ item.user }}</td>
              <td>{{ item.minimum }}</td>
              <td>{{ item.maximum }}</td>
              <td class="hidden md:block">
                {{ item.positiveRate.toFixed(2) }}
              </td>
              <td class="bg-red-700 text-white font-bold">
                {{ ((1 - 1 / item.price) * 100).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <div class="buttonContainer flex justify-center items-center pt-16">
      <button class="btn btn-info text-white" @click="sendTelegram">
        <span v-if="loadingMessage" class="loading loading-spinner"></span>
        <span v-else>Send data via Telegram</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
