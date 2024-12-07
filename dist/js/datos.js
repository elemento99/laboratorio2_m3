      
        Promise.all([
            fetch('dist/assets/doctors.json').then(response => response.json()),
            fetch('dist/assets/medical-services.json').then(response => response.json())
        ])
        .then(([doctorsData, servicesData]) => {
           
            const clonedDoctors = JSON.parse(JSON.stringify(doctorsData));
            clonedDoctors.doctors[0].name = "Dr. Juan Pérez (Modificado)"; 

           
            const mergedData = {
                doctors: doctorsData.doctors.map(doctor => ({
                    ...doctor,
                    services: servicesData.services.filter(service => {
                
                        return service.name.toLowerCase().includes(doctor.specialty.toLowerCase());
                    })
                }))
            };

     
            const doctorList = document.getElementById('doctor-list');
            doctorsData.doctors.forEach(doctor => {
                const listItem = document.createElement('li');
                listItem.textContent = `${doctor.name} - ${doctor.specialty} - ${doctor.availableHours}`;
                doctorList.appendChild(listItem);
            });

           
            const clonedJsonElement = document.getElementById('cloned-json');
            clonedJsonElement.textContent = JSON.stringify(clonedDoctors, null, 2);

           
            const mergedJsonElement = document.getElementById('merged-json');
            mergedJsonElement.textContent = JSON.stringify(mergedData, null, 2);
            
       
            console.log('Clonado:', JSON.stringify(clonedDoctors, null, 2));
            console.log('Fusionado:', JSON.stringify(mergedData, null, 2));
        })
        .catch(error => console.error('Error al cargar los datos JSON:', error));