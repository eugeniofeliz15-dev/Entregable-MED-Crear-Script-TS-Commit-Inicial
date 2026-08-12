let tareas: string[] = [
    "Configurar el entorno de desarrollo",
    "Repasar las bases de TypeScript",
    "Crear mi primer proyecto"
];

console.log("========== SIMULACIÓN DE MENÚ ==========\n");


console.log("--- Lista Inicial de Tareas ---");
for (let i = 0; i < tareas.length; i++) {
    console.log((i + 1) + ". " + tareas[i]);
}


console.log("--- Agregando una nueva tarea ---");
let nuevaTarea = "Aprender a usar arreglos y ciclos";
tareas.push(nuevaTarea); 
console.log("¡Tarea agregada!: " + nuevaTarea);



console.log("\n--- Eliminando la última tarea ---");
if (tareas.length > 0) {
    let tareaEliminada = tareas.pop(); 
    console.log("Se eliminó con éxito la tarea: " + tareaEliminada);
} else {
    console.log("La lista está vacía.");
}



console.log("\n--- Lista Final de Tareas ---");
for (let i = 0; i < tareas.length; i++) {
    console.log((i + 1) + ". " + tareas[i]);
}

console.log("========================================");
console.log("Programa terminado.");