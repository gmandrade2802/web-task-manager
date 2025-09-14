// Funcionalidades gerais do sistema de gerenciamento de tarefas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initMobileMenu();
    initFormValidation();
    initTaskActions();
    addFadeInAnimation();
});

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });
        
        if (overlay) {
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }
    }
}

// Validação de formulários
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'Este campo é obrigatório');
                } else {
                    field.classList.remove('error');
                    hideFieldError(field);
                }
            });
            
            // Validação de email
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'Digite um email válido');
                }
            });
            
            // Validação de senha
            const passwordFields = form.querySelectorAll('input[type="password"]');
            passwordFields.forEach(field => {
                if (field.value && field.value.length < 6) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'A senha deve ter pelo menos 6 caracteres');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// Mostrar erro no campo
function showFieldError(field, message) {
    hideFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f56565';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Esconder erro no campo
function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Ações das tarefas
function initTaskActions() {
    // Botões de editar tarefa
    const editButtons = document.querySelectorAll('.btn-edit-task');
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const taskId = this.getAttribute('data-task-id');
            editTask(taskId);
        });
    });
    
    // Botões de concluir tarefa
    const completeButtons = document.querySelectorAll('.btn-complete-task');
    completeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const taskId = this.getAttribute('data-task-id');
            completeTask(taskId);
        });
    });
    
    // Botões de excluir tarefa
    const deleteButtons = document.querySelectorAll('.btn-delete-task');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const taskId = this.getAttribute('data-task-id');
            if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                deleteTask(taskId);
            }
        });
    });
}

// Editar tarefa
function editTask(taskId) {
    // Redirecionar para página de edição
    window.location.href = `editar-tarefa.html?id=${taskId}`;
}

// Concluir tarefa
function completeTask(taskId) {
    // Simular conclusão da tarefa
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`).closest('.task-card');
    if (taskCard) {
        const statusElement = taskCard.querySelector('.task-status');
        if (statusElement) {
            statusElement.textContent = 'Concluída';
            statusElement.className = 'task-status status-completed';
        }
        
        // Desabilitar botão de concluir
        const completeButton = taskCard.querySelector('.btn-complete-task');
        if (completeButton) {
            completeButton.style.display = 'none';
        }
        
        showNotification('Tarefa concluída com sucesso!', 'success');
    }
}

// Excluir tarefa
function deleteTask(taskId) {
    // Simular exclusão da tarefa
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`).closest('.task-card');
    if (taskCard) {
        taskCard.style.transition = 'all 0.3s ease';
        taskCard.style.opacity = '0';
        taskCard.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            taskCard.remove();
            showNotification('Tarefa excluída com sucesso!', 'success');
        }, 300);
    }
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.color = '#ffffff';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    notification.style.transition = 'all 0.3s ease';
    
    // Cores por tipo
    switch (type) {
        case 'success':
            notification.style.background = '#48bb78';
            break;
        case 'error':
            notification.style.background = '#f56565';
            break;
        case 'warning':
            notification.style.background = '#ed8936';
            break;
        default:
            notification.style.background = '#4299e1';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Adicionar animação fade-in aos elementos
function addFadeInAnimation() {
    const elements = document.querySelectorAll('.task-card, .auth-card, .dashboard-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Função para alternar tema (futura implementação)
function toggleTheme() {
    // Implementar alternância de tema se necessário
    console.log('Toggle theme functionality');
}

// Função para buscar tarefas (futura implementação)
function searchTasks(query) {
    const taskCards = document.querySelectorAll('.task-card');
    
    taskCards.forEach(card => {
        const title = card.querySelector('.task-title').textContent.toLowerCase();
        const description = card.querySelector('.task-description').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para filtrar tarefas por status
function filterTasksByStatus(status) {
    const taskCards = document.querySelectorAll('.task-card');
    
    taskCards.forEach(card => {
        const taskStatus = card.querySelector('.task-status');
        
        if (status === 'all' || taskStatus.textContent.toLowerCase().includes(status.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Utilitários
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

function generateTaskId() {
    return 'task_' + Math.random().toString(36).substr(2, 9);
}

// Exportar funções para uso global
window.TaskManager = {
    editTask,
    completeTask,
    deleteTask,
    showNotification,
    searchTasks,
    filterTasksByStatus,
    formatDate,
    generateTaskId
};

