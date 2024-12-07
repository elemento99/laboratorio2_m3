document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const appointmentForm = document.getElementById("appointmentForm");
    const notificationContainer = document.getElementById("notification-container");
    const appointmentsList = document.getElementById("appointments-list");

   
    function getRandomPatientData() {
        const names = ["Juan Pérez", "Ana Gómez", "Carlos Martínez", "Laura López", "Pedro Sánchez"];
        const phones = ["123-456-7890", "987-654-3210", "555-123-4567", "666-987-6543", "777-555-9876"];
        const messages = [
            "Hola, necesito una cita.",
            "Tengo dolor de cabeza desde ayer.",
            "Quiero saber más sobre los tratamientos disponibles.",
            "Me gustaría agendar una consulta urgente.",
            "¿Puedo obtener información sobre mis resultados?"
        ];

        const name = names[Math.floor(Math.random() * names.length)];
        const phone = phones[Math.floor(Math.random() * phones.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];

        return { name, phone, message };
    }

   
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();

       
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const phone = document.getElementById("phone").value;

        const confirmationMessage = `Gracias, ${name}. Hemos recibido tu mensaje. Nos pondremos en contacto contigo en la dirección: ${email}.`;
        
 
        notificationContainer.innerHTML = `<div class="alert alert-success">${confirmationMessage}</div>`;

      
        const patientEvent = new CustomEvent("newPatient", {
            detail: {
                name: name,
                phone: phone,
                message: message
            }
        });

        document.dispatchEvent(patientEvent);
    });

    
    document.addEventListener("newPatient", function(e) {
        const patient = e.detail;
        const notification = document.createElement("div");
        notification.classList.add("alert", "alert-info");
        notification.textContent = `Nuevo paciente: ${patient.name} (Tel: ${patient.phone}). Mensaje: ${patient.message}`;
        notificationContainer.appendChild(notification);

      
        setTimeout(() => {
            notification.remove();
        }, 10000);
    });

   
    async function fetchDoctors() {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");  
            const data = await response.json();
            
            const doctors = data.results.map(pokemon => ({
                name: pokemon.name,
                specialty: "Especialista en Pokémon"
            }));

            console.log(doctors); 

            const doctorSelect = document.getElementById("doctor");
            doctorSelect.innerHTML = '<option value="">Seleccione un doctor</option>';

            doctors.forEach(doctor => {
                const option = document.createElement("option");
                option.value = doctor.name;
                option.textContent = `${doctor.name} - ${doctor.specialty}`;
                doctorSelect.appendChild(option);
            });

        } catch (error) {
            console.error("Error al obtener los doctores:", error);
        }
    }

 
    fetchDoctors();

    function displayAppointment(appointment) {
        const appointmentElement = document.createElement("div");
        appointmentElement.classList.add("appointment", "alert", "alert-secondary");
        appointmentElement.innerHTML = `
            <h5>Cita Agendada</h5>
            <p><strong>Doctor:</strong> ${appointment.doctor}</p>
            <p><strong>Fecha:</strong> ${appointment.date}</p>
            <p><strong>Hora:</strong> ${appointment.time}</p>
        `;
        appointmentsList.appendChild(appointmentElement);
    }

    appointmentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const doctorName = document.getElementById("doctor").value;
        const appointmentDate = document.getElementById("appointment-date").value;
        const appointmentTime = document.getElementById("appointmentTime").value;

        if (!doctorName || !appointmentDate || !appointmentTime) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const appointment = {
            doctor: doctorName,
            date: appointmentDate,
            time: appointmentTime,
        };

        displayAppointment(appointment);

        appointmentForm.reset();
    });

    function simulateNewPatientArrival() {
        const simulatedPatient = getRandomPatientData();
        const patientEvent = new CustomEvent("newPatient", {
            detail: simulatedPatient
        });

        document.dispatchEvent(patientEvent);
    }

    setInterval(simulateNewPatientArrival, 5000);
});
