const USERS_KEY = 'users';
const TASKS_KEY = 'tasks';

// Função para obter dados do Local Storage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Função para salvar dados no Local Storage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ==================== Cadastro de Usuários ====================
const userForm = document.getElementById('userForm');
if (userForm) {
    userForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        const users = getData(USERS_KEY);
        users.push({ id: Date.now(), name, email });
        saveData(USERS_KEY, users);

        alert('Usuário cadastrado com sucesso!');
        userForm.reset();
    });
}

// ==================== Cadastro de Tarefas ====================
const taskForm = document.getElementById('taskForm');
if (taskForm) {
    const editingTask = JSON.parse(localStorage.getItem('editingTask'));

    // Se for edição, preenche os campos com os dados da tarefa
    if (editingTask) {
        document.getElementById('description').value = editingTask.description;
        document.getElementById('sector').value = editingTask.sector;
        document.getElementById('user').value = editingTask.userId;
        document.getElementById('priority').value = editingTask.priority;
    }

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const sector = document.getElementById('sector').value;
        const userId = document.getElementById('user').value;
        const priority = document.getElementById('priority').value;

        const tasks = getData(TASKS_KEY);

        if (editingTask) {
            // Atualiza a tarefa existente
            const taskIndex = tasks.findIndex(t => t.id == editingTask.id);
            tasks[taskIndex] = {
                ...editingTask,
                description,
                sector,
                userId,
                priority
            };
            localStorage.removeItem('editingTask');
            alert('Tarefa atualizada com sucesso!');
        } else {
            // Cria uma nova tarefa
            tasks.push({
                id: Date.now(),
                description,
                sector,
                userId,
                priority,
                status: 'todo' // Status inicial é "A Fazer"
            });
            alert('Tarefa cadastrada com sucesso!');
        }

        saveData(TASKS_KEY, tasks);
        taskForm.reset();
        window.location.href = 'index.html';
    });
}

// Preenche o dropdown de usuários no cadastro de tarefas
const userSelect = document.getElementById('user');
if (userSelect) {
    const users = getData(USERS_KEY);
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

// ==================== Gerenciamento de Tarefas ====================
function renderTasks() {
    const tasks = getData(TASKS_KEY);
    const todoColumn = document.getElementById('todo').querySelector('.task-list');
    const doingColumn = document.getElementById('doing').querySelector('.task-list');
    const doneColumn = document.getElementById('done').querySelector('.task-list');

    // Limpa as colunas antes de adicionar as tarefas
    todoColumn.innerHTML = '';
    doingColumn.innerHTML = '';
    doneColumn.innerHTML = '';

    // Adiciona tarefas às colunas correspondentes
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h4>${task.description}</h4>
            <p><strong>Setor:</strong> ${task.sector}</p>
            <p><strong>Usuário:</strong> ${getUserName(task.userId)}</p>
            <p><strong>Prioridade:</strong> ${formatPriority(task.priority)}</p>
            <p><strong>Status:</strong> ${formatStatus(task.status)}</p>
            <button onclick="editTask(${task.id})">Editar Tarefa</button>
        `;

        // Distribui a tarefa na coluna correta
        switch (task.status) {
            case 'todo':
                todoColumn.appendChild(taskElement);
                break;
            case 'doing':
                doingColumn.appendChild(taskElement);
                break;
            case 'done':
                doneColumn.appendChild(taskElement);
                break;
        }
    });
}

// Formata o nome da prioridade
function formatPriority(priority) {
    switch (priority) {
        case 'low': return 'Baixa';
        case 'medium': return 'Média';
        case 'high': return 'Alta';
        default: return 'Desconhecida';
    }
}

// Formata o status
function formatStatus(status) {
    switch (status) {
        case 'todo': return 'A Fazer';
        case 'doing': return 'Fazendo';
        case 'done': return 'Pronto';
        default: return 'Desconhecido';
    }
}

// Recupera o nome do usuário pelo ID
function getUserName(userId) {
    const users = getData(USERS_KEY);
    const user = users.find(u => u.id == userId);
    return user ? user.name : 'Usuário não encontrado';
}

// Edita uma tarefa
function editTask(taskId) {
    const tasks = getData(TASKS_KEY);
    const task = tasks.find(t => t.id == taskId);
    if (task) {
        localStorage.setItem('editingTask', JSON.stringify(task));
        window.location.href = 'cadastro_tarefas.html';
    } else {
        alert('Tarefa não encontrada.');
    }
}

// Renderiza as tarefas automaticamente ao carregar gerenciamento.html
if (document.getElementById('todo')) {
    renderTasks();
}
