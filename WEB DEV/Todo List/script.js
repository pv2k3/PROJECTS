var task = document.getElementById("task-input");
var buttonAddTask = document.getElementById("add-task")
var c = 0;
var completed = 0;
var formnew = document.getElementsByClassName("new")[0];
var temp = document.getElementsByClassName("temp")[0];
var allRadio = []
var complete = document.getElementById("compCount");

function checkRadioCount(radio){
    if(radio.checked){
        allRadio.splice(allRadio.indexOf(radio), 1);
    }
    complete.innerHTML = allRadio.length;
}

function checkRadioStatus(radio){
    allRadio.push(radio);
    const task = radio.parentElement.children[1];
    let status = radio;
    if(status.checked){
        task.style.textDecoration = "line-through"
    }
    complete.innerHTML = allRadio.length;
}

function addTask(task) {
    if (c == 0) {
        temp.style.display = "none";
    }
    if(!task){
        alert("Please Enter a Task")
        return;
    }
    c += 1;
    let taskCount = document.getElementById("taskCount");
    taskCount.innerHTML = c;

    let created = document.getElementsByClassName("created-tasks")[0];

    const taskItem = document.createElement('li');
    taskItem.className = 'actualTask';
    taskItem.innerHTML = `
        <input type="radio" class="status" onclick=checkRadioStatus(this)>
        <p class="task">${task}</p>
        <button class="delete" onclick=deleteTask(this)>
            <img src=${"./icons-img/bin.svg"} alt="delete">
        </button>
    `;

    created.appendChild(taskItem);
}

function deleteTask(button) {
    c--;
    if(c==0){
        temp.style.display = "flex";
    }
    const taskItem = button.parentElement;
    let taskCount = document.getElementById("taskCount");
    taskItem.remove();
    taskCount.innerHTML = c;
    checkRadioCount(button.parentElement.children[0]);
}


buttonAddTask.addEventListener("click", () => {
    let value = task.value
    task.value = "";
    return addTask(value);
});