import { consumeStamina } from "./staminaSystem";
import { addItem } from "./inventorySystem";

export function mine(gameState) {
    const staminaResult = consumeStamina(gameState.stamina, 10);

    if(!staminaResult.success) {
        return {
            success: false,
            reason: "not_enough_stamina",
        };
    }

    const newInventory = addItem(
        gameState.inventory,
        "coal",
        1
    );

    const newGameState = {
        ...gameState,
        stamina: staminaResult.stamina,
        inventory: newInventory,
    };
    
    return{
        success: true,
        gameState: newGameState,
    }
}
