README

Este proyecto está enfocado en el desarrollo de una aplicación que gestiona la información de doctores, pacientes, citas y consultas. La implementación emplea diversos conceptos de programación, como la programación funcional, eventos, asincronía, y programación orientada a objetos, específicamente la herencia, encapsulación y polimorfismo.
Programación Funcional Aplicada

La programación funcional se utiliza en varias partes del proyecto, especialmente en la manipulación de datos y el cálculo de costos, tiempos de espera y descuentos. A continuación se detallan algunos de los enfoques clave:

    Currying y funciones parciales:
        La función calculateCost utiliza currying para calcular el costo total de consultas. Esta técnica permite que una función se evalúe parcialmente, lo que facilita la reutilización y la composición de funciones.

const calculateCost = pricePerConsultation => numConsultations => pricePerConsultation * numConsultations;

Funciones de alto orden:

    Se emplean funciones como reduce para calcular el costo total de las consultas, el tiempo promedio de espera y el total de horas semanales de trabajo de los doctores. Estas funciones permiten transformar y combinar colecciones de datos de manera eficiente.

const calculateAverage = times => times.reduce((a, b) => a + b, 0) / times.length;

Composición de funciones:

    Se utiliza la función applyDiscounts para aplicar varios descuentos a un costo, encadenando las funciones de descuento que se reciben como argumentos.

    const applyDiscounts = (cost, ...discounts) => discounts.reduce((acc, fn) => fn(acc), cost);

Eventos y Uso de Asincronía

El proyecto utiliza eventos personalizados y asincronía para manejar las interacciones con el usuario, como la gestión de citas y el contacto con pacientes.

    Eventos personalizados:
        Se utiliza el evento newPatient para simular la llegada de nuevos pacientes y mostrar notificaciones de forma dinámica. Esto se maneja mediante CustomEvent para pasar información adicional entre diferentes partes de la aplicación.

const patientEvent = new CustomEvent("newPatient", {
    detail: {
        name: name,
        phone: phone,
        message: message
    }
});
document.dispatchEvent(patientEvent);

Asincronía:

    La carga de datos de los doctores y clientes se realiza de manera asíncrona mediante fetch, que obtiene la información de archivos JSON o de APIs externas (como el ejemplo de la API de Pokémon). El uso de async y await asegura que los datos se gestionen de manera eficiente y no bloqueen la interfaz de usuario.

    async function loadDoctors() {
        try {
            const response = await fetch("dist/assets/doctors.json");
            const data = await response.json();
            // Lógica de manejo de datos...
        } catch (error) {
            console.error("Error al cargar los datos de los doctores:", error);
        }
    }

Implementación de Clases y Programación Orientada a Objetos

La programación orientada a objetos se utiliza para modelar las entidades principales del sistema, como doctores y pacientes, aprovechando conceptos clave como la herencia, encapsulación y polimorfismo.
1. Clases y Herencia

    Se crea una clase base Doctor que tiene propiedades y métodos comunes para todos los doctores, como el nombre, la especialidad y la experiencia. La clase Cirujano hereda de Doctor y añade una propiedad específica (surgeriesPerformed) y métodos adicionales.

class Doctor {
    constructor(name, specialty, experience) {
        this.name = name;
        this.specialty = specialty;
        this._experience = experience; 
    }

    showInfo() {
        return `${this.name}, Especialidad: ${this.specialty}, Años de experiencia: ${this.experience}`;
    }
}

class Cirujano extends Doctor {
    constructor(name, specialty, experience, surgeriesPerformed) {
        super(name, specialty, experience);
        this.surgeriesPerformed = surgeriesPerformed;
    }

    showInfo() {
        return `${super.showInfo()}, Operaciones realizadas: ${this.surgeriesPerformed}`;
    }
}

2. Encapsulación

    La propiedad _experience se maneja mediante un getter y setter, lo que asegura que solo se puedan asignar valores válidos (mayores o iguales a 0) a la experiencia del doctor.

get experience() {
    return this._experience;
}

set experience(value) {
    if (value >= 0) {
        this._experience = value;
    } else {
        console.log('La experiencia no puede ser negativa');
    }
}

3. Polimorfismo

    La clase Cirujano sobrescribe el método showInfo() de la clase Doctor para agregar información específica sobre las operaciones realizadas, demostrando polimorfismo.

showInfo() {
    return `${super.showInfo()}, Operaciones realizadas: ${this.surgeriesPerformed}`;
}

Conclusión

Este proyecto utiliza un enfoque modular y basado en buenas prácticas de programación para gestionar la información de un hospital. La programación funcional permite una manipulación eficiente de los datos, mientras que la programación orientada a objetos facilita la organización del código mediante el uso de clases, herencia, encapsulación y polimorfismo. La asincronía y los eventos permiten una interacción dinámica y fluida con el usuario.
