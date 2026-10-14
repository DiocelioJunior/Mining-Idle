import { consumeStamina } from "./staminaSystem";
import { addItem } from "./inventorySystem";
import terrains from "../data/terrains.json";

export function mine(gameState) {
    const staminaResult = consumeStamina(gameState.stamina, 10);
    const terrain = terrains.find((terrain) => terrain.id === gameState.terrainId)
    const hasMiningCard = gameState.deck.includes("action_mine");

    ///////////////////
    //Terrenos
    //////////////////
    if(!terrain){
        return{
            success: false,
            reason: "invalid_terrain",
        }
    }

    if (!terrain.resources || terrain.resources.length === 0) {
    return {
        success: false,
        reason: "no_resources",
    };
}

    if(!hasMiningCard) {
        return {
            success: false,
            reason: "missing_mining_card",
        }
    }

    if(!staminaResult.success) {
        return {
            success: false,
            reason: "not_enough_stamina",
        };
    }

    const randomIndex = Math.floor(Math.random() * terrain.resources.length)
    const resourcesId = terrain.resources[randomIndex]
    const newInventory = addItem(gameState.inventory, resourcesId, 1)

    console.log(newInventory)

    const newGameState = {
        ...gameState,
        stamina: staminaResult.stamina,
        inventory: newInventory,
    };
    
    return{
        success: true,
        gameState: newGameState,
        resourcesId: resourcesId
    }
}
