let doctors = []; 
let stack = []; 
let queue = [];


fetch('dist/assets/doctors.json')
    .then(response => response.json())
    .then(data => {
        doctors = data.doctors;
        displayDoctors();
    });


function displayDoctors() {
    const doctorList = document.getElementById("doctorList");
    doctorList.innerHTML = "";
    doctors.forEach(doctor => {
        const li = document.createElement("li");
        li.textContent = `${doctor.name} - ${doctor.specialty}`;
        doctorList.appendChild(li);
    });
}

function addDoctor() {
    const newDoctor = {
        name: prompt("Nombre del Doctor:"),
        specialty: prompt("Especialidad del Doctor:"),
        experience: prompt("Años de Experiencia:"),
        profile: prompt("Perfil del Doctor:"),
        availableHours: prompt("Horas Disponibles:"),
        contact: prompt("Contacto del Doctor:")
    };
    doctors.push(newDoctor);
    displayDoctors();
}


function removeDoctor() {
    const doctorName = prompt("Nombre del doctor a eliminar:");
    doctors = doctors.filter(doctor => doctor.name !== doctorName);
    displayDoctors();
}


function searchDoctor() {
    const doctorName = prompt("Buscar doctor por nombre:");
    const foundDoctor = doctors.find(doctor => doctor.name.toLowerCase() === doctorName.toLowerCase());
    if (foundDoctor) {
        alert(`Doctor Encontrado: ${foundDoctor.name}, Especialidad: ${foundDoctor.specialty}`);
    } else {
        alert("Doctor no encontrado");
    }
}


function displayStack() {
    const stackList = document.getElementById("stackList");
    stackList.innerHTML = "";
    stack.forEach(cita => {
        const li = document.createElement("li");
        li.textContent = `Cita: ${cita}`;
        stackList.appendChild(li);
    });
}


function addToStack() {
    const cita = prompt("Descripción de la Cita:");
    stack.push(cita);
    displayStack();
}

function removeFromStack() {
    const cita = stack.pop();
    alert(`Cita eliminada: ${cita}`);
    displayStack();
}


function displayQueue() {
    const queueList = document.getElementById("queueList");
    queueList.innerHTML = "";
    queue.forEach(paciente => {
        const li = document.createElement("li");
        li.textContent = `Paciente: ${paciente}`;
        queueList.appendChild(li);
    });
}


function addToQueue() {
    const paciente = prompt("Nombre del Paciente:");
    queue.push(paciente);
    displayQueue();
}


function removeFromQueue() {
    const paciente = queue.shift();
    alert(`Atendiendo a: ${paciente}`);
    displayQueue();
}

function searchDoctor() {
    const doctorName = prompt("Buscar doctor por nombre:");
    const foundDoctor = doctors.find(doctor => doctor.name.toLowerCase() === doctorName.toLowerCase());
    if (foundDoctor) {
        alert(`Doctor Encontrado: ${foundDoctor.name}, Especialidad: ${foundDoctor.specialty}`);
    } else {
        alert("Doctor no encontrado");
    }
}

function sortDoctorsByExperience() {
    for (let i = 0; i < doctors.length - 1; i++) {
        for (let j = i + 1; j < doctors.length; j++) {
            if (doctors[i].experience < doctors[j].experience) {
           
                let temp = doctors[i];
                doctors[i] = doctors[j];
                doctors[j] = temp;
            }
        }
    }
    displayDoctors(); 
}
export { queue };