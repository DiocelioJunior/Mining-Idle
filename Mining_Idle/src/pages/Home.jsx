import Header from "../components/Header";
import players from "../data/players.json";
import tools from "../data/tools.json";
import terrains from "../data/terrains.json";

import { addStamina } from "../systems/staminaSystem";
import { consumeStamina } from "../systems/staminaSystem";
import { mine } from "../systems/miningSystem";
import { addItem, getItemAmount, removeItem} from "../systems/inventorySystem";

import { initialGameState } from "../systems/gameState";
import { useState } from "react";


function Home() {
    const [gameState, setGameState] = useState(initialGameState);
    //O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida
    //Busca do player
    const player = players.find((player) => player.id === gameState.playerId)
    //Busca das ferramentas do player
    const tool = tools.find((tool) => tool.id === gameState.toolId)
    //Busca dos terrenos do player
    const terrain = terrains.find((terrain) => terrain.id === gameState.terrainId)

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Funções de consumo de Stamina
    function handleAddStamina(){
        //Pegue a stamina atual e peça para o sistema calcular quanto será a nova stamina.
        const newStamina = addStamina(gameState.stamina, 10);

        //Criando um novo objeto de estado.
        setGameState({
            ...gameState, //Copia os outros dados.
            stamina: newStamina
        });
    }


    function handleConsumeStamina(){
        const newStamina = consumeStamina(gameState.stamina, 10)

        setGameState({
            ...gameState,
            stamina: newStamina
        })
    }

    function handleMine(){
        const result = mine(gameState);

        setGameState(result.gameState);
        console.log(result)
    }

    ////////////////////////////////////////////////////////////////////////
    //Inventário
    const inventory = gameState.inventory;

    const coalAmount = getItemAmount(inventory, "coal");
    console.log("Quantidade de carvão no inventário:", coalAmount);

    function handleAddItem() {
        const newInventory = addItem(inventory, "coal", 5);
        
        setGameState({
            ...gameState,
            inventory: newInventory
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log(player)
    console.log(tool)
    console.log(terrain)
    console.log(gameState)
  

    return(
        <div>
            <Header></Header>
            <p>{player.name}</p>
            <p>Stamina: {gameState.stamina}</p>
            <p>Carvão: {coalAmount}</p>
           <button onClick={handleMine}>Minerar</button>
            <button onClick={handleAddItem}>Adicionar 5 Carvão</button>
            <button onClick={handleAddStamina}>+ Stamina</button>
            <button onClick={handleConsumeStamina}>- Stamina</button>
        </div>
    )
}

export default Home