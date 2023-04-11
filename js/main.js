// Находимо елементи на сторінці
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');



let tasks = [];


if(localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'))
}
checkEmptyList()

tasks.forEach(function (task){
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `<li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`;

    taskList.insertAdjacentHTML('beforeend', taskHTML);
})


//Добавления задачи
form.addEventListener('submit', addTask);


// Удаление задачи
taskList.addEventListener('click', deleteTask)


//Завершеная задача
taskList.addEventListener('click', doneTask)



function addTask(event){
     //отмена отправки формы
     event.preventDefault(); // обновление страинцы не будет
    
     //достаем текст задачт из поля ввода
     const taskText = taskInput.value;
 

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    //Добавление в масив
    tasks.push(newTask)

    saveToLocalStorage()


    //Формируем ссс клас
    // условие ? if true : if folse - тернальний оператор
    const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

     // формируем розметку для новой задачи
     const taskHTML = `<li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
         <span class="${cssClass}">${newTask.text}</span>
         <div class="task-item__buttons">
             <button type="button" data-action="done" class="btn-action">
                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
             </button>
             <button type="button" data-action="delete" class="btn-action">
                 <img src="./img/cross.svg" alt="Done" width="18" height="18">
             </button>
         </div>
     </li>`;
     
     //Добавляем елемент на страницу
     taskList.insertAdjacentHTML('beforeend', taskHTML);
 
     // Очищаем поле ввода, и фокус назад
     
     taskInput.value = '';
     taskInput.focus();
 
    //  if (taskList.children.length > 1) {
    //      emptyList.classList.add('none')
    //  }

    checkEmptyList()

     
}

function deleteTask(event){
    //event.target - бачимо елемент по якому був клік
    if(event.target.dataset.action !== 'delete')return;


    //event.target.closest() - шукає в батьках
    const parentNode = event.target.closest('li')

    const id = Number(parentNode.id);

    //Находим индекс задачи в массиве

    // const index = tasks.findIndex((task) => task.id === id);    
    
    //  const index = tasks.findIndex((task) => {
    //     // if(task.id === id){
    //     //     return true;
    //     // }
    //     return task.id === id;
    // })

    //Удаляем из массива задачу
    // tasks.splice(index, 1)


    tasks = tasks.filter((task) => task.id !== id)

    saveToLocalStorage()
        // if(task.id === id){
        //     return false
        // } else {
        //     return true;
        // }

   
    



    parentNode.remove();

    // if (taskList.children.length === 1) {
    //     emptyList.classList.remove('none')
    // }
    
    checkEmptyList()
}

function doneTask(event){
    if(event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);
    

    const task = tasks.find(function(task){
        if (task.id === id) {
            return true;
        }
    })

    task.done = !task.done;
    saveToLocalStorage()
    const taskTitle = parentNode.querySelector('span');
    taskTitle.classList.toggle('task-title--done')



    // if(event.target.dataset.action === 'done'){
    //     const parentNode = event.target.closest('li');
    //     const taskTitle = parentNode.querySelector('span');
    //     taskTitle.classList.toggle('task-title--done')
    // }
  
}


function checkEmptyList()  {
    if(tasks.length === 0){
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">Список справ пустий</div>
        </li>`;
        taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null;
    }
}


function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

