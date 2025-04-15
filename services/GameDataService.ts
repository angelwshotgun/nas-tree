class _GameDataService {
  async getCharacters() {
    const res = await $fetch<any>(
      'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/vi/characters.json',
      {
        parseResponse: JSON.parse,
      }
    );
    if (res != null) {
      return JSON.parse(JSON.stringify(res));
    }
    return {};
  }
  async getLightCones() {
    const res = await $fetch(
      'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/vi/light_cones.json'
    );
    if (res != null) {
      return res;
    }
    return [];
  }
}
const GameDataService = new _GameDataService();
export { GameDataService };
