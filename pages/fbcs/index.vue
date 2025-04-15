<template>
  <div class="min-h-screen bg-slate-900 text-white p-4 flex flex-col gap-4">
    <h1 class="text-center mb-4 text-gray-200 text-2xl">
      Genshin Impact Ban Pick
    </h1>

    <div class="flex justify-between items-start md:flex-row flex-col">
      <div
        class="w-full md:w-32 text-center bg-slate-800 rounded-lg p-4 flex flex-col items-center mb-4 md:mb-0"
      >
        <h2 class="mt-0 mb-2 text-lg">Opponent</h2>
        <div
          class="w-20 h-20 rounded-full bg-slate-700 overflow-hidden mb-2 flex items-center justify-center"
        >
          <img
            src=""
            alt="Player 2"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="font-bold">Player2</div>
      </div>

      <div class="flex-1 mx-0 md:mx-4">
        <h3 class="text-center my-2 text-base">Ban List</h3>
        <div class="flex justify-between mb-4">
          <div class="flex gap-2">
            <div
              v-for="(char, index) in opponentBans"
              :key="`opponent-ban-${index}`"
              class="w-16 md:w-[70px] h-20 md:h-[90px] bg-slate-700 rounded-lg flex flex-col items-center justify-center overflow-hidden relative"
              :class="{ 'bg-slate-800 border-2 border-slate-600': char }"
            >
              <img
                v-if="char"
                :src="char.image"
                :alt="char.name"
                class="w-full h-[70%] object-cover"
              />
              <div
                v-if="char"
                class="text-xs text-center p-1 whitespace-nowrap overflow-hidden text-ellipsis w-full bg-black bg-opacity-70"
              >
                {{ char.name }}
              </div>
              <div v-else class="text-slate-500 text-xl">--</div>
            </div>
          </div>

          <div class="flex gap-2">
            <div
              v-for="(char, index) in playerBans"
              :key="`player-ban-${index}`"
              class="w-16 md:w-[70px] h-20 md:h-[90px] bg-slate-700 rounded-lg flex flex-col items-center justify-center overflow-hidden relative"
              :class="{ 'bg-slate-800 border-2 border-slate-600': char }"
            >
              <img
                v-if="char"
                :src="char.image"
                :alt="char.name"
                class="w-full h-[70%] object-cover"
              />
              <div
                v-if="char"
                class="text-xs text-center p-1 whitespace-nowrap overflow-hidden text-ellipsis w-full bg-black bg-opacity-70"
              >
                {{ char.name }}
              </div>
              <div v-else class="text-slate-500 text-xl">--</div>
            </div>
          </div>
        </div>

        <h3 class="text-center my-2 text-base">Pick List</h3>
        <div class="flex justify-between mb-4">
          <div class="flex gap-2 flex-wrap md:flex-nowrap">
            <div
              v-for="(char, index) in opponentPicks"
              :key="`opponent-pick-${index}`"
              class="w-16 md:w-[70px] h-20 md:h-[90px] bg-slate-700 rounded-lg flex flex-col items-center justify-center overflow-hidden relative"
              :class="{
                'bg-slate-800 border-2 border-slate-600': char,
                'border-2 border-yellow-400':
                  selectedSlot === `opponent-pick-${index}`,
              }"
            >
              <img
                v-if="char"
                :src="char.image"
                :alt="char.name"
                class="w-full h-[70%] object-cover"
              />
              <div
                v-if="char"
                class="text-xs text-center p-1 whitespace-nowrap overflow-hidden text-ellipsis w-full bg-black bg-opacity-70"
              >
                {{ char.name }}
              </div>
              <div v-else class="text-slate-500 text-xl">--</div>
            </div>
          </div>

          <div class="flex gap-2 flex-wrap md:flex-nowrap">
            <div
              v-for="(char, index) in playerPicks"
              :key="`player-pick-${index}`"
              class="w-16 md:w-[70px] h-20 md:h-[90px] bg-slate-700 rounded-lg flex flex-col items-center justify-center overflow-hidden relative"
              :class="{
                'bg-slate-800 border-2 border-slate-600': char,
                'border-2 border-yellow-400':
                  selectedSlot === `player-pick-${index}`,
              }"
            >
              <img
                v-if="char"
                :src="char.image"
                :alt="char.name"
                class="w-full h-[70%] object-cover"
              />
              <div
                v-if="char"
                class="text-xs text-center p-1 whitespace-nowrap overflow-hidden text-ellipsis w-full bg-black bg-opacity-70"
              >
                {{ char.name }}
              </div>
              <div v-else class="text-slate-500 text-xl">--</div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-4 my-4">
          <button
            label="BAN"
            class="p-button-rounded bg-red-500 border-0"
            @click="handleBan"
          />
          <button
            label="PICK"
            class="p-button-rounded bg-blue-500 border-0"
            @click="handlePick"
          />
        </div>

        <div class="flex justify-center gap-4 my-4">
          <span
            v-for="element in elements"
            :key="element.name"
            class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
          >
            <i :class="element.icon"></i>
          </span>
        </div>
      </div>

      <div
        class="w-full md:w-32 text-center bg-slate-800 rounded-lg p-4 flex flex-col items-center"
      >
        <h2 class="mt-0 mb-2 text-lg">You</h2>
        <div
          class="w-20 h-20 rounded-full bg-slate-700 overflow-hidden mb-2 flex items-center justify-center"
        >
          <img
            src=""
            alt="Player 1"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="font-bold">1</div>
      </div>
    </div>

    <div
      class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 mt-4"
    >
      <div
        v-for="character in charactersData"
        :key="character.id"
        class="w-[80px] h-[100px] bg-slate-800 rounded-lg overflow-hidden relative cursor-pointer transition-transform duration-200 hover:-translate-y-1"
        :class="{
          'opacity-50 pointer-events-none':
            isBanned(character) || isPicked(character),
          'border-2 border-blue-500': isPicked(character),
        }"
        @click="selectCharacter(character)"
      >
        <img
          :src="urlImg + character.icon"
          :alt="character.name"
          class="w-full h-[70%] object-cover"
        />
        <div
          class="text-xs text-center p-1 whitespace-nowrap overflow-hidden text-ellipsis w-full bg-black bg-opacity-70"
        >
          {{ character.name }}
        </div>

        <div
          v-if="character.rarity"
          class="absolute top-0 left-0 bg-black bg-opacity-70 p-0.5 text-xs text-yellow-400"
        >
          <i v-for="n in character.rarity" :key="n" class="pi pi-star-fill"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GameDataService } from '~/services/GameDataService.ts';

definePageMeta({
  layout: 'default',
  auth: false,
});
const urlImg = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/';
const characters = ref([
  {
    id: 1,
    name: 'Kamisato Ayaka',
    image: '',
    element: 'Cryo',
    rarity: 5,
  },
  {
    id: 2,
    name: 'Mika',
    image: '',
    element: 'Cryo',
    rarity: 4,
  },
  {
    id: 3,
    name: 'Mona',
    image: '',
    element: 'Hydro',
    rarity: 5,
  },
  {
    id: 4,
    name: 'Xianyun',
    image: '',
    element: 'Anemo',
    rarity: 5,
  },
  {
    id: 5,
    name: 'Razor',
    image: '',
    element: 'Electro',
    rarity: 4,
  },
  {
    id: 6,
    name: 'Xiao',
    image: '',
    element: 'Anemo',
    rarity: 5,
  },
  {
    id: 7,
    name: 'Qiqi',
    image: '',
    element: 'Cryo',
    rarity: 5,
  },
  {
    id: 8,
    name: 'Chongyun',
    image: '',
    element: 'Cryo',
    rarity: 4,
  },
  // Add more characters as needed
  {
    id: 9,
    name: 'Albedo',
    image: '',
    element: 'Geo',
    rarity: 5,
  },
  {
    id: 10,
    name: 'Alhaitham',
    image: '',
    element: 'Dendro',
    rarity: 5,
  },
  {
    id: 11,
    name: 'Aloy',
    image: '',
    element: 'Cryo',
    rarity: 5,
  },
  {
    id: 12,
    name: 'Amber',
    image: '',
    element: 'Pyro',
    rarity: 4,
  },
  {
    id: 13,
    name: 'Arataki Itto',
    image: '',
    element: 'Geo',
    rarity: 5,
  },
  {
    id: 14,
    name: 'Baizhu',
    image: '',
    element: 'Dendro',
    rarity: 5,
  },
  {
    id: 15,
    name: 'Barbara',
    image: '',
    element: 'Hydro',
    rarity: 4,
  },
  {
    id: 16,
    name: 'Beidou',
    image: '',
    element: 'Electro',
    rarity: 4,
  },
  // Add more characters to fill the grid
]);

// Game state
const playerBans = ref([null, null, null, null]);
const opponentBans = ref([
  { id: 1, name: 'Kamisato Ayaka', image: '' },
  { id: 2, name: 'Mika', image: '' },
  { id: 3, name: 'Mona', image: '' },
  null,
]);
const playerPicks = ref([
  { id: 7, name: 'Qiqi', image: '' },
  { id: 8, name: 'Chongyun', image: '' },
  null,
  null,
  null,
  null,
  null,
  null,
]);
const opponentPicks = ref([
  { id: 1, name: 'Kamisato Ayaka', image: '' },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]);

const elements = ref([
  { name: 'Anemo', icon: 'pi pi-wind' },
  { name: 'Cryo', icon: 'pi pi-snowflake' },
  { name: 'Dendro', icon: 'pi pi-leaf' },
  { name: 'Electro', icon: 'pi pi-bolt' },
  { name: 'Geo', icon: 'pi pi-mountain' },
  { name: 'Hydro', icon: 'pi pi-water' },
  { name: 'Pyro', icon: 'pi pi-fire' },
]);

const selectedCharacter = ref(null);
const selectedSlot = ref(null);
const currentAction = ref(null); // 'ban' or 'pick'

// Check if a character is banned
const isBanned = (character) => {
  return [...playerBans.value, ...opponentBans.value].some(
    (ban) => ban && ban.id === character.id
  );
};

// Check if a character is picked
const isPicked = (character) => {
  return [...playerPicks.value, ...opponentPicks.value].some(
    (pick) => pick && pick.id === character.id
  );
};

// Select a character from the grid
const selectCharacter = (character) => {
  if (isBanned(character) || isPicked(character)) return;
  selectedCharacter.value = character;
};

// Handle ban action
const handleBan = () => {
  currentAction.value = 'ban';
  // Logic for ban action
};

// Handle pick action
const handlePick = () => {
  currentAction.value = 'pick';
  // Logic for pick action
};

const charactersData = ref([]);
charactersData.value = await GameDataService.getCharacters();
</script>
