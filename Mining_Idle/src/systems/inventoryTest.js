import{ addItem, getItemAmount, removeItem} from "./inventorySystem";

let inventory = {};

console.log("Inicial", inventory);

inventory = addItem(inventory, "item1", 5);
console.log("Após adicionar 5 item1:", inventory);

inventory = addItem(inventory, "item1", 3);
console.log("Após adicionar 3 item1:", inventory);

console.log("Quantidade de item1:", getItemAmount(inventory, "item1"));

const result = removeItem(inventory, "item1", 4);
console.log("Após remover 4 item1:", result.inventory);

inventory = result.inventory;
console.log("inventário final:", inventory);

