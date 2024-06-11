document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const actividad = document.getElementById('actividad').value;
        const tiempo = parseFloat(document.getElementById('tiempo').value);
        const fecha = document.getElementById('fecha').value;
    
        if (actividad === '' || isNaN(tiempo) || fecha === '') {
            alert('Por favor, completa todos los campos');
            return;
        }
    
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');
        newTask.textContent = `${actividad} - ${tiempo} minutos - ${fecha}`;
        taskList.appendChild(newTask);
    
        document.getElementById('task-form').reset();
        
        updateChart();
    });
    
    function updateChart() {
        const tasks = document.querySelectorAll('#task-list li');
        const taskData = [];
        tasks.forEach(task => {
            const taskInfo = task.textContent.split(' - ');
            taskData.push({
                actividad: taskInfo[0],
                tiempo: parseFloat(taskInfo[1]),
                fecha: taskInfo[2]
            });
        });
    
        const ctx = document.getElementById('task-chart').getContext('2d');
        if (window.taskChart) {
            window.taskChart.destroy();
        }
    
        window.taskChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: taskData.map(task => task.actividad),
                datasets: [{
                    label: 'Tiempo (minutos)',
                    data: taskData.map(task => task.tiempo),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
