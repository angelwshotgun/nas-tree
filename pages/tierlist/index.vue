<template>
  <div class="container">
    <h1>{{apiData[0].title}}</h1>
    <div class="tierlist">
      <template v-for="(tier, tierIndex) in apiData[0].tiers" :key="tier.name">
        <div class="tier flex flex-row">
          <div class="tier-label flex items-center justify-center" :style="{ backgroundColor: tier.color }">{{ tier.name }}</div>
          <draggable 
            class="items flex flex-row flex-wrap w-full" 
            v-model="tier.items" 
            :group="{ name: 'items', pull: true, put: true }"
            item-key="name"
            animation="200"
            ghost-class="ghost-item"
          >
            <template #item="{ element }">
              <div class="item">
                <img v-tooltip="element.name" :src="element.img" :alt="element.name" />
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </div>
    <h2 class="mt-6 mb-2">Available Items</h2>
    <div class="list">
      <draggable 
        class="items flex flex-row flex-wrap" 
        v-model="unassignedItems" 
        :group="{ name: 'items', pull: true, put: true }"
        item-key="name"
        animation="200"
        ghost-class="ghost-item"
      >
        <template #item="{ element }">
          <div class="item">
            <img v-tooltip="element.name" :src="element.img" :alt="element.name" />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';

const tierlistData = ref([
  {
    name: 'S',
    color: '#ff7f7f',
    items: [
      { name: 'Item 1', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/zzzzz-16740912010094cpng.png' },
      { name: 'Item 2', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/zzzzz-16740924800143bpng.png' },
    ],
  },
  {
    name: 'A',
    color: '#ffbf7f',
    items: [
      { name: 'Item 4', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/zzzzz-16740896870025dpng.png' },
      { name: 'Item 5', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/0012bpng.png' },
    ],
  },
  {
    name: 'B',
    color: '#ffdf7f',
    items: [],
  },
  {
    name: 'C',
    color: '#ffff7f',
    items: [],
  },
  {
    name: 'D',
    color: '#bfff7f',
    items: [],
  },
]);

// Items that are not yet assigned to any tier
const unassignedItems = ref([
  { name: 'Item 3', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/zzzzz-16740912010094cpng.png' },
  { name: 'Item 6', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/zzzzz-16740912010094cpng.png' },
  { name: 'Item 7', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/zzzzz-16740912010094cpng.png' },
  { name: 'Item 8', img: 'https://tiermaker.com/images/template_images/2022/15556175/every-pokmon-ever-all-forms-updated-to-newest-pokmon-15556175/zzzzz-16740912010094cpng.png' },
]);
const apiData = ref();
await $fetch('/api/tierlist').then((res) => {
  apiData.value = res;
  console.log(apiData.value);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}

.tierlist {
  background-color: #333;
  border-width: 2px;
  border-color: black;
  border-style: solid;
  border-right-width: 0px;
}

.tier {
  background-color: #333;
  border-width: 2px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-color: black;
  border-style: solid;
}
.tier:first-child {
  background-color: #333;
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-color: black;
  border-style: solid;
}
.tier:last-child {
  background-color: #333;
  border-bottom-width: 0px;
  border-color: black;
  border-style: solid;
}
.tier-label {
  border-right: black 2px solid;
}
.tierlist,
.list {
  width: 80%;
}

.list {
  background-color: #444;
  border: 1px solid black;
  min-height: 120px;
}

.items {
  height: 100px;
}

.item {
  cursor: move;
  transition: transform 0.2s;
}

.item:hover {
  transform: scale(1.05);
}

.item img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.tier-label {
  width: 120px;
  color: black;
  font-size: 1.5rem;
}

.ghost-item {
  opacity: 0.5;
}
</style>