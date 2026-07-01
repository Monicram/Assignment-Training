let form = document.querySelector("#task-form");
let taskList = document.querySelector("#task-list");
let clearBtn = document.querySelector("#clear-all");

let allBtn = document.querySelector("#all");
let pendingBtn = document.querySelector("#pending");
let doneBtn = document.querySelector("#done");

let sort = document.querySelector("#sort");
let counter = document.querySelector("#counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

renderTasks();

form.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.querySelector("#task-name").value;
    let priority = document.querySelector("#priority").value;
    let dueDate = document.querySelector("#due-date").value;

    let task = {
        id: Date.now(),
        name: name,
        priority: priority,
        dueDate: dueDate,
        done: false
    };

    tasks.push(task);

    saveData();
    renderTasks();

    form.reset();
});

function renderTasks(){

    taskList.innerHTML = "";

    let showTasks = tasks;

    if(currentFilter == "pending"){
        showTasks = tasks.filter(task => task.done == false);
    }

    if(currentFilter == "done"){
        showTasks = tasks.filter(task => task.done == true);
    }

    if(sort.value == "priority"){
        showTasks.sort(function(a,b){
            return a.priority.localeCompare(b.priority);
        });
    }

    if(sort.value == "date"){
        showTasks.sort(function(a,b){
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    showTasks.map(function(task){

        let li = document.createElement("li");

        li.innerHTML =
        task.name + " | " +
        task.priority + " | " +
        task.dueDate;

        let btn = document.createElement("button");
        btn.textContent = "Done";

        btn.onclick = function(){

            task.done = !task.done;

            saveData();
            renderTasks();

        };

        if(task.done){
            li.classList.add("done");
        }

        let today = new Date().toISOString().split("T")[0];

        if(task.dueDate <= today){
            li.style.color = "red";
        }

        li.appendChild(btn);

        taskList.appendChild(li);

    });

    counter.textContent =
    "Showing " + showTasks.length + " of " + tasks.length + " tasks";

}

function saveData(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

allBtn.onclick = function(){

    currentFilter = "all";

    renderTasks();

};

pendingBtn.onclick = function(){

    currentFilter = "pending";

    renderTasks();

};

doneBtn.onclick = function(){

    currentFilter = "done";

    renderTasks();

};

sort.onchange = function(){

    renderTasks();

};

clearBtn.onclick = function(){

    tasks = [];

    saveData();

    renderTasks();

};