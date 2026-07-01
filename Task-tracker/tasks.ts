// Task Interface
interface Task {
    id: number;
    name: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    done: boolean;
}

// Task Manager Class
class TaskManager {

    private tasks: Task[] = [];

    constructor() {
        this.load();
    }

    add(data: Omit<Task, "id" | "done">): Task {

        let task: Task = {
            id: Date.now(),
            name: data.name,
            priority: data.priority,
            dueDate: data.dueDate,
            done: false
        };

        this.tasks.push(task);

        this.save();

        return task;
    }

    getAll(): Task[] {
        return this.tasks;
    }

    toggle(id: number): void {

        for (let task of this.tasks) {

            if (task.id === id) {
                task.done = !task.done;
            }

        }

        this.save();

    }

    filter(status: "all" | "done" | "pending"): Task[] {

        if (status === "done") {
            return this.tasks.filter(task => task.done);
        }

        if (status === "pending") {
            return this.tasks.filter(task => !task.done);
        }

        return this.tasks;

    }

    sortBy(field: keyof Pick<Task, "priority" | "dueDate">): Task[] {

        return [...this.tasks].sort((a, b) => {

            if (field === "priority") {
                return a.priority.localeCompare(b.priority);
            }

            return a.dueDate.localeCompare(b.dueDate);

        });

    }

    private save(): void {

        localStorage.setItem("tasks", JSON.stringify(this.tasks));

    }

    load(): void {

        let data = localStorage.getItem("tasks");

        if (data) {
            this.tasks = JSON.parse(data);
        }

    }

}

// Generic Function
function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {

    let result: Record<string, T[]> = {};

    items.forEach(item => {

        let group = String(item[key]);

        if (!result[group]) {
            result[group] = [];
        }

        result[group].push(item);

    });

    return result;

}

// Example

let manager = new TaskManager();

let groups = groupBy(manager.getAll(), "priority");

for (let key in groups) {

    const list = groups[key];

    if (list) {
        console.log(key, list.length);
    }

}

// Export
export { TaskManager, groupBy };
export type { Task };