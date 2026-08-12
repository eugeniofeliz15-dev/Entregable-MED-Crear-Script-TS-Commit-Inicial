import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
const answer = await rl.question("¿Cuál es tu nombre? ");
console.log(`Hola, ${answer}!`);

/* // ✍️ Escribe tu código aquí 👇
let systemName: string = "Digibros";
console .log (systemName);
let version: number  = 2.14;
console .log (version);
let userName: string = "Carlos";
console .log (userName);
let Sueldo: string = "Sueldo por dia";
console .log (Sueldo);

// Horas trabajadas * sueldo

let horasTrabajadas: number = 8;
let sueldoPorHora: number = 250;

console .log (horasTrabajadas * sueldoPorHora);

