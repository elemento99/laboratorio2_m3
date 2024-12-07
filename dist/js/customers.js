    let customers = [];
    let doctors = [];
  

    async function loadData() {
      customers = await fetch("dist/assets/customers.json").then(res => res.json()).then(data => data.customers);
      doctors = await fetch("dist/assets/doctors.json").then(res => res.json()).then(data => data.doctors);
      populateSelects();
    }
  
    function populateSelects() {
      const patientSelect = document.getElementById('patientSelect');
      customers.forEach((customer, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = customer.name;
        patientSelect.appendChild(option);
      });
  
      const doctorSelect = document.getElementById('doctorSelect');
      doctors.forEach((doctor, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
      });
    }
  
    // Currying para calcular el costo total
    const calculateCost = pricePerConsultation => numConsultations => pricePerConsultation * numConsultations;
  
    function calculateTotalCost() {
      const patientIndex = parseInt(document.getElementById('patientSelect').value);
      if (isNaN(patientIndex)) {
        document.getElementById('costResult').innerText = 'Por favor, selecciona un paciente.';
        return;
      }
      const patient = customers[patientIndex];
      const totalCost = patient.appointments.reduce((sum, appointment) => sum + appointment.price, 0);
      document.getElementById('costResult').innerText = `Costo total de consultas: $${totalCost}`;
    }
  
    const calculateAverage = times => times.reduce((a, b) => a + b, 0) / times.length;
  
    function calculateAverageWait() {
      const waitTimes = customers.flatMap(customer => customer.appointments.map(appointment => appointment.waitTime));
      const average = calculateAverage(waitTimes);
      document.getElementById('averageWaitResult').innerText = `Tiempo promedio de espera: ${average.toFixed(2)} minutos`;
    }

    function totalHoursRecursive(hours, index = 0) {
      if (index >= hours.length) return 0;
      return hours[index] + totalHoursRecursive(hours, index + 1);
    }
  
    function calculateTotalHours() {
      const doctorIndex = parseInt(document.getElementById('doctorSelect').value);
      if (isNaN(doctorIndex)) {
        document.getElementById('hoursResult').innerText = 'Por favor, selecciona un doctor.';
        return;
      }
      const doctor = doctors[doctorIndex];
      const dailyHours = doctor.availableHours.match(/\d+/g).map(Number); 
      const total = totalHoursRecursive(dailyHours);
      document.getElementById('hoursResult').innerText = `Total de horas semanales: ${total}`;
    }
  
 
    const applyDiscounts = (cost, ...discounts) => discounts.reduce((acc, fn) => fn(acc), cost);
  
    const calculateDiscountByHours = totalHours => cost => {
      const discountRate = totalHours > 10 ? 0.25 : totalHours > 5 ? 0.15 : 0;
      return cost - cost * discountRate;
    };
  
    function applyDiscount() {
      const patientIndex = parseInt(document.getElementById('patientSelect').value);
      if (isNaN(patientIndex)) {
        document.getElementById('discountResult').innerText = 'Por favor, selecciona un paciente.';
        return;
      }
      const patient = customers[patientIndex];
      const totalHours = patient.appointments.reduce((sum, appointment) => sum + appointment.waitTime, 0); // Total de horas basadas en el tiempo de espera
      const originalCost = patient.appointments.reduce((sum, appointment) => sum + appointment.price, 0);
      const finalCost = applyDiscounts(originalCost, calculateDiscountByHours(totalHours));
      document.getElementById('discountResult').innerText = `Costo con descuento: $${finalCost.toFixed(2)}`;
    }
  
    loadData();