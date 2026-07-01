// Task Manager Class
class TaskManager {
    tasks = [];
    constructor() {
        this.load();
    }
    add(data) {
        let task = {
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
    getAll() {
        return this.tasks;
    }
    toggle(id) {
        for (let task of this.tasks) {
            if (task.id === id) {
                task.done = !task.done;
            }
        }
        this.save();
    }
    filter(status) {
        if (status === "done") {
            return this.tasks.filter(task => task.done);
        }
        if (status === "pending") {
            return this.tasks.filter(task => !task.done);
        }
        return this.tasks;
    }
    sortBy(field) {
        return [...this.tasks].sort((a, b) => {
            if (field === "priority") {
                return a.priority.localeCompare(b.priority);
            }
            return a.dueDate.localeCompare(b.dueDate);
        });
    }
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    load() {
        let data = localStorage.getItem("tasks");
        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
}
// Generic Function
function groupBy(items, key) {
    let result = {};
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
