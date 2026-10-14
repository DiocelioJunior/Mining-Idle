
//FUnção para adcionar Stamina
export function addStamina(currentStamina, amount) {
    return currentStamina + amount
}

//Função para consumir Stamina 
export function consumeStamina(currentStamina, amount) {
    if (currentStamina <= 0) {
                return {
            success: false,
            stamina: currentStamina - amount
        } 
    }

        return {
            success: true,
            stamina: currentStamina - amount
        } 
    }

