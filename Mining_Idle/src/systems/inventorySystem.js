export function addItem(inventory, itemId, amount){
    const newInventory = {...inventory};

    //Verifica se o item ja esta no inventario
    const currentAmount = newInventory[itemId] || 0;
    //Adiciona a quantidade ao item no inventario
    newInventory[itemId] = currentAmount + amount;
    
    return newInventory;
}

export function getItemAmount(inventory, itemId){
    return inventory[itemId] || 0;
}

export function removeItem(inventory, itemId, amount){
    const currentAmount =inventory[itemId] || 0;

    if (currentAmount < amount){
        return{
            sucess: false,
            inventory: inventory
        };
    }

    const newInventory = {...inventory};

    newInventory[itemId] = currentAmount - amount;

    return{
        sucess: true,
        inventory: newInventory
    };
}
