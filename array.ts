/* import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
const answer = await rl.question("¿Cuál es tu nombre? ");
console.log(`Hola, ${answer}!`);

rl.close(); */


let amigos: string[] = [
    "car",
    "moe",
    "barnie",
    "leny",
    "homero", 
    "krusty",
    "homero", 
    "alcalde diamente"
];

let swich = true;
let lista: string [] = [];
for (let index = 0; index < amigos.length; index++) {
    if (amigos[index].toLocaleLowerCase() === "homero" && swich) {
        lista.push(amigos[index]);
        swich = false;
    } else {
        if (amigos[index].toLocaleLowerCase() !== "homero") {
            lista.push(amigos[index]);
        }
    }
    
}

console.log(lista);
