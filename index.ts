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
    const nuevaTarea: Task = {
        id: idCounter,
        title: title,
        completed: false
    };
    tareas.push(nuevaTarea);
    idCounter++;
    console.log(`¡Tarea agregada!: ${title}`);
};


const listTasks = (arregloDeTareas: Task[] = tareas) => {
    if (arregloDeTareas.length === 0) {
        console.log("La lista está vacía.");
        return; // Salimos de la función temprano
    }

    
    const tareasFormateadas = arregloDeTareas.map((task) => {
        const { id, title, completed } = task; 
        const estado = completed ? "completed" : "pending";
        return `[${id}] ${title} - ${estado}`; 
    });

    
    tareasFormateadas.forEach((textoTarea) => {
        console.log(textoTarea);
    });
};

const removeTask = () => {
    if (tareas.length > 0) {
        const tareaEliminada = tareas.pop();
        if (tareaEliminada) {
            console.log(`Se eliminó con éxito la tarea: ${tareaEliminada.title}`);
        }
    } else {
        console.log("La lista está vacía.");
    }
};



const markCompleted = (id: number) => {
    
    const tareaEncontrada = tareas.find((task) => task.id === id);
    
    if (tareaEncontrada) {
        tareaEncontrada.completed = true;
        console.log(`¡Listo! La tarea con ID ${id} fue marcada como completada.`);
    } else {
        console.log(`No se encontró ninguna tarea con el ID ${id}.`);
    }
};

const filterPending = () => {
    
    return tareas.filter((task) => task.completed === false);
};

const filterCompleted = () => {
    
    return tareas.filter((task) => task.completed === true);
};


let menuActivo = true;

while (menuActivo) {
    console.log("\n========== MENÚ DE TAREAS ==========");
    console.log("1. Agregar tarea");
    console.log("2. Listar todas las tareas");
    console.log("3. Eliminar última tarea");
    console.log("4. Marcar tarea como completada"); 
    console.log("5. Ver solo tareas pendientes");     
    console.log("6. Ver solo tareas completadas");   
    console.log("7. Salir");
    console.log("====================================");
    
    let opcion = await rl.question("Elige una opción: ");

    if (opcion === "1") {
        let title = await rl.question("Escribe el nombre de la nueva tarea: ");
        addTask(title);
        
    } else if (opcion === "2") {
        console.log("\n--- Lista de Todas las Tareas ---");
        listTasks(); 
        
    } else if (opcion === "3") {
        console.log("\n--- Eliminando tarea ---");
        removeTask();
        
    } else if (opcion === "4") {
        let idIngresado = await rl.question("Escribe el ID de la tarea a completar: ");
        
        markCompleted(Number(idIngresado));
        
    } else if (opcion === "5") {
        console.log("\n--- Tareas Pendientes ---");
        const tareasPendientes = filterPending();
        listTasks(tareasPendientes); 
        
    } else if (opcion === "6") {
        console.log("\n--- Tareas Completadas ---");
        const tareasCompletadas = filterCompleted();
        listTasks(tareasCompletadas); 
        
    } else if (opcion === "7") {
        console.log("Saliendo del programa...");
        menuActivo = false;
        rl.close(); 
        
    } else {
        console.log("Opción no válida. Intenta de nuevo.");
    }
}