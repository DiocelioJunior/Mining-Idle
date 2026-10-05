export const initialGameState = {
//Guardamos o id do player que está jogando 
  playerId: "player_basic",
//Guardamos o id da ferramenta que o player está usando
  toolId: "tool_pickaxe_basic",

  equipmentIds: [
    null,
    null,
    null,
    null,
    null
  ],

  terrainId: "terrain_abandoned_mine",

  deck: [
    "action_mine",
    null,
    null,
    null,
    null
  ],

  stamina: 100,

  money: 0,

  inventory: {}
};