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

// Modifiqué listTasks para que reciba un arreglo de tareas. 
// Por defecto, si no le pasamos nada, usa el arreglo global 'tareas'.
const listTasks = (arregloDeTareas: Task[] = tareas) => {
    if (arregloDeTareas.length === 0) {
        console.log("La lista está vacía.");
        return; // Salimos de la función temprano
    }

    // 1. .map() y Desestructuración
    const tareasFormateadas = arregloDeTareas.map((task) => {
        const { id, title, completed } = task; // Desestructuración
        const estado = completed ? "completed" : "pending";
        return `[${id}] ${title} - ${estado}`; // Retornamos el string ya listo
    });

    // 2. .forEach() para imprimir
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

// --- NUEVAS FUNCIONES ---

const markCompleted = (id: number) => {
    // Usamos .find() para localizar la tarea
    const tareaEncontrada = tareas.find((task) => task.id === id);
    
    if (tareaEncontrada) {
        tareaEncontrada.completed = true;
        console.log(`¡Listo! La tarea con ID ${id} fue marcada como completada.`);
    } else {
        console.log(`No se encontró ninguna tarea con el ID ${id}.`);
    }
};

const filterPending = () => {
    // Usamos .filter() para retornar las que tienen completed: false
    return tareas.filter((task) => task.completed === false);
};

const filterCompleted = () => {
    // Usamos .filter() para retornar las que tienen completed: true
    return tareas.filter((task) => task.completed === true);
};


let menuActivo = true;

while (menuActivo) {
    console.log("\n========== MENÚ DE TAREAS ==========");
    console.log("1. Agregar tarea");
    console.log("2. Listar todas las tareas");
    console.log("3. Eliminar última tarea");
    console.log("4. Marcar tarea como completada"); // Nueva opción
    console.log("5. Ver solo tareas pendientes");     // Nueva opción
    console.log("6. Ver solo tareas completadas");    // Nueva opción
    console.log("7. Salir");
    console.log("====================================");
    
    let opcion = await rl.question("Elige una opción: ");

    if (opcion === "1") {
        let title = await rl.question("Escribe el nombre de la nueva tarea: ");
        addTask(title);
        
    } else if (opcion === "2") {
        console.log("\n--- Lista de Todas las Tareas ---");
        listTasks(); // Al no pasar argumentos, usa 'tareas'
        
    } else if (opcion === "3") {
        console.log("\n--- Eliminando tarea ---");
        removeTask();
        
    } else if (opcion === "4") {
        let idIngresado = await rl.question("Escribe el ID de la tarea a completar: ");
        // Convierte el texto que escribe el usuario a número (Number)
        markCompleted(Number(idIngresado));
        
    } else if (opcion === "5") {
        console.log("\n--- Tareas Pendientes ---");
        const tareasPendientes = filterPending();
        listTasks(tareasPendientes); // Reutilizamos listTasks pasándole el filtro
        
    } else if (opcion === "6") {
        console.log("\n--- Tareas Completadas ---");
        const tareasCompletadas = filterCompleted();
        listTasks(tareasCompletadas); // Reutilizamos listTasks pasándole el filtro
        
    } else if (opcion === "7") {
        console.log("Saliendo del programa...");
        menuActivo = false;
        rl.close(); // Cerramos readline para que el proceso no se quede colgado
        
    } else {
        console.log("Opción no válida. Intenta de nuevo.");
    }
}