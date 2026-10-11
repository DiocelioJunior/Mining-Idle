import {consumeStamina, addStamina} from "../systems/staminaSystem";
    

export function mine(gameState) {
    //Verifica Stamina
    const stamina = gameState.stamina
    //Calcula o resultado
    //Cris um novo estado
    return {
        sucess: true,
        gameState: stamina
    };
}