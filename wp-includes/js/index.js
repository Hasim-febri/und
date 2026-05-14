// /assets/js/index.js

import { comentarService } from "./comment.js";
import { data } from "./data.js";

let currentPage = 1;
let allData = [];

async function init() {
  await loadData();
}

async function loadData() {
  allData = await comentarService.getComentar();
  console.log("DATA:", allData);
  allData.reverse(); // terbaru di atas
  currentPage = 1;
  render();
}

function render() {
  const container = document.getElementById("wish-list");

  const start = (currentPage - 1) * data.perPage;
  const end = start + data.perPage;

  const sliced = allData.slice(start, end);

  if (currentPage === 1) container.innerHTML = "";

  sliced.forEach(item => {
    container.innerHTML += `
      <div class="wish-card">
        <div class="name">${item.name}</div>
        <div class="message">${item.message}</div>
        <div class="date">${formatDate(item.date)}</div>
      </div>
    `;
  });
}

function loadMore() {
  currentPage++;
  render();
}

async function submitForm() {
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) {
    alert("Isi dulu!");
    return;
  }

  if (message.length > data.maxChar) {
    alert("Max 500 karakter");
    return;
  }

  await comentarService.addComentar({ name, message });

  document.getElementById("message").value = "";

  await loadData();
}

function formatDate(date) {
  return new Date(date).toLocaleString("id-ID");
}

// expose ke HTML
window.submitForm = submitForm;
window.loadMore = loadMore;

init();