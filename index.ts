import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

let tareas: Task[] = [];
let idCounter: number = 1;

const addTask = (title: string) => {
    let nuevaTarea: Task = {
        id: idCounter,
        title: title,
        completed: false
    };
    tareas.push(nuevaTarea);
    idCounter++;
    console.log("¡Tarea agregada!: " + title);
};

const listTasks = () => {
    if (tareas.length === 0) {
        console.log("La lista está vacía.");
    } else {
        for (let i = 0; i < tareas.length; i++) {
            let estado = "";
            if (tareas[i].completed === true) {
                estado = "completed";
            } else {
                estado = "pending";
            }
            console.log("[" + tareas[i].id + "] " + tareas[i].title + " - " + estado);
        }
    }
};

const removeTask = () => {
    if (tareas.length > 0) {
        let tareaEliminada = tareas.pop();
        if (tareaEliminada) {
            console.log("Se eliminó con éxito la tarea: " + tareaEliminada.title);
        }
    } else {
        console.log("La lista está vacía.");
    }
};

let menuActivo = true;

while (menuActivo) {
    console.log("\n========== MENÚ DE TAREAS ==========");
    console.log("1. Agregar tarea");
    console.log("2. Listar tareas");
    console.log("3. Eliminar última tarea");
    console.log("4. Salir");
    console.log("====================================");
    
    let opcion = await rl.question("Elige una opción: ");

    if (opcion === "1") {
        let title = await rl.question("Escribe el nombre de la nueva tarea: ");
        addTask(title);
    } else if (opcion === "2") {
        console.log("\n--- Lista de Tareas ---");
        listTasks();
    } else if (opcion === "3") {
        console.log("\n--- Eliminando tarea ---");
        removeTask();
    } else if (opcion === "4") {
        console.log("Saliendo del programa...");
        menuActivo = false;
    } else {
        console.log("Opción no válida. Intenta de nuevo.");
    }
}
