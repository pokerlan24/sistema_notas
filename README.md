Proyecto Sistema de Ingreso de Notas
Este proyecto es un sistema de gestión de alumnos y notas. 
Incluye un frontend desarrollado con React y un backend construido con Spring Boot. La base de datos utilizada es MySQL, y se gestiona utilizando XAMPP para la configuración local.

Tabla de Contenidos
Requisitos previos
Configuración del Backend
Configuración del Frontend
Configuración de la Base de Datos
Instrucciones para ejecutar el proyecto
Requisitos previos
Asegúrate de tener instalados los siguientes componentes en tu máquina:

XAMPP (para la gestión de MySQL y Apache) 
Node.js (versión 14 o superior) 
Java 17 o superior 
Maven (para gestionar dependencias del proyecto Spring Boot
Git (opcional, para clonar el repositorio)
Configuración del Backend
1. Clonar el repositorio (si no lo has hecho)
Clona el proyecto en tu máquina local desde GitHub o descarga el código fuente manualmente.

bash
Copiar código
git clone https://github.com/pokerlan24/sistema_notas.git
cd proyecto-sistema-notas/backend
2. Configuración del archivo application.properties
En el backend, abre el archivo src/main/resources/application.properties y asegúrate de que está configurado correctamente para tu entorno de MySQL. Si utilizas XAMPP, el host y las credenciales predeterminadas de MySQL suelen ser:

properties
Copiar código
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_notas
spring.datasource.username=root
spring.datasource.password= # Si no tienes contraseña, deja este campo vacío
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
3. Ejecutar el Backend
Asegúrate de tener XAMPP corriendo con MySQL habilitado. Luego, en el directorio del backend, ejecuta el siguiente comando para iniciar el proyecto:

bash
Copiar código
mvn spring-boot:run
Esto iniciará el backend en http://localhost:8080.

Configuración del Frontend
1. Clonar el repositorio (si no lo has hecho)
Si no lo has hecho, clona el proyecto en tu máquina local y navega al directorio del frontend:

bash
Copiar código
git clone https://github.com/pokerlan24/sistema_notas.git
cd proyecto-sistema-notas/frontend
2. Instalar dependencias
Instala todas las dependencias del frontend utilizando npm:

bash
Copiar código
npm install
3. Configuración del archivo package.json
Asegúrate de que el archivo package.json tenga el siguiente script para iniciar el proyecto:

json
Copiar código
"scripts": {
  "start": "react-scripts start"
}
4. Ejecutar el Frontend
Ejecuta el siguiente comando para levantar el servidor de desarrollo:

bash
Copiar código
npm start
Esto iniciará el frontend en http://localhost:3000.

Configuración de la Base de Datos
1. Levantar MySQL con XAMPP
Abre XAMPP y activa el módulo de MySQL.
Accede a phpMyAdmin (http://localhost/phpmyadmin) para gestionar tu base de datos.
2. Crear la base de datos
Crea la base de datos que utilizará el proyecto:

sql
Copiar código
CREATE DATABASE sistema_notas;
3. Importar la estructura de la base de datos
Utiliza el siguiente archivo SQL para crear las tablas y su estructura en la base de datos. Ve a phpMyAdmin, selecciona la base de datos sistema_notas, y en la pestaña Importar sube el archivo SQL que contiene la estructura.

Ejemplo del archivo SQL que deberás importar:

sql
Copiar código
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
-- Servidor: 127.0.0.1
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.24

CREATE DATABASE IF NOT EXISTS sistema_notas;
USE sistema_notas;

CREATE TABLE `alumnos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `carrera` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `notas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `actividad` int(11) NOT NULL,
  `primer_parcial` int(11) NOT NULL,
  `segundo_parcial` int(11) NOT NULL,
  `examen_final` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `alumno_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alumno` (`alumno_id`),
  CONSTRAINT `fk_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
4. Datos de ejemplo
Puedes insertar algunos datos de ejemplo para probar el sistema:

sql
Copiar código
INSERT INTO `alumnos` (`nombre`, `carrera`, `edad`) VALUES
('Juan Pérez', 'Ingeniería', 20),
('Ana López', 'Medicina', 22),
('Carlos Ramírez', 'Derecho', 21);

INSERT INTO `notas` (`actividad`, `primer_parcial`, `segundo_parcial`, `examen_final`, `total`, `alumno_id`) VALUES
(30, 12, 14, 33, 89, 1),
(25, 13, 14, 30, 82, 2),
(28, 12, 13, 31, 84, 3);
Instrucciones para ejecutar el proyecto
Iniciar el backend:

Desde el directorio backend, ejecuta el comando:
bash
Copiar código
mvn spring-boot:run
Iniciar el frontend:

Desde el directorio frontend, ejecuta:
bash
Copiar código
npm start
Acceder al proyecto:

Frontend: Navega a http://localhost:3000 para interactuar con el sistema.
Backend: La API del backend estará disponible en http://localhost:8080/api.
