import Header from "../components/Header";
import players from "../data/players.json";
import tools from "../data/tools.json";
import terrains from "../data/terrains.json";
import resources from "../data/resources.json";

import { addStamina } from "../systems/staminaSystem";
import { consumeStamina } from "../systems/staminaSystem";
import { mine } from "../systems/miningSystem";
import { addItem, getItemAmount, removeItem } from "../systems/inventorySystem";

import { initialGameState } from "../systems/gameState";
import { useState } from "react";


function Home() {
    const [gameState, setGameState] = useState(initialGameState);
    const [miningMessage, setMiningMessage] = useState("");
    //O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida
    //Busca do player
    const player = players.find((player) => player.id === gameState.playerId)
    //Busca das ferramentas do player
    const tool = tools.find((tool) => tool.id === gameState.toolId)
    //Busca dos terrenos do player
    const terrain = terrains.find((terrain) => terrain.id === gameState.terrainId)

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Funções de consumo de Stamina
    function handleAddStamina() {
        //Pegue a stamina atual e peça para o sistema calcular quanto será a nova stamina.
        const newStamina = addStamina(gameState.stamina, 10);

        //Criando um novo objeto de estado.
        setGameState({
            ...gameState, //Copia os outros dados.
            stamina: newStamina
        });
    }


    function handleConsumeStamina() {
        const newStamina = consumeStamina(gameState.stamina, 10)

        setGameState({
            ...gameState,
            stamina: newStamina
        })
    }


    ////////////////////////////////////////////////////////////////////////
    //Inventário
    const inventory = gameState.inventory;


    function handleAddItem() {
        const newInventory = addItem(inventory, "coal", 5);

        setGameState({
            ...gameState,
            inventory: newInventory
        });
    }



    function handleMine() {
        const result = mine(gameState);

        if (result.success) {
            setGameState(result.gameState);

            const resource = resources.find(
                (item) => item.id === result.resourceId
            );

            setMiningMessage(`Você encontrou 1 ${resource.name}!`);
            return;
        }

        switch (result.reason) {
            case "missing_mining_card":
                setMiningMessage("Você não possui a carta de mineração.");
                break;

            case "invalid_terrain":
                setMiningMessage("O terreno selecionado não existe.");
                break;

            case "no_resources":
                setMiningMessage("Este terreno não possui recursos.");
                break;

            case "not_enough_stamina":
                setMiningMessage("Stamina insuficiente para minerar.");
                break;

            default:
                setMiningMessage("Não foi possível minerar.");
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div>
            <Header></Header>
            <p>{player.name}</p>
            <p>Stamina: {gameState.stamina}</p>
            <p>{miningMessage}</p>
            <div>
                <p>Inventario</p>
                {resources.map((resource) => (
                    <p key={resource.id}>
                        {resource.name}: {getItemAmount(inventory, resource.id)}
                    </p>
                ))}
            </div>
            <button onClick={handleMine}>Minerar</button>
            <button onClick={handleAddItem}>Adicionar 5 Carvão</button>
            <button onClick={handleAddStamina}>+ Stamina</button>
            <button onClick={handleConsumeStamina}>- Stamina</button>
        </div>
    )
}

export default Home