# Wave Rider 🌊  
Wave Rider es una aplicación web diseñada para conectar propietarios de motos acuáticas con usuarios interesados en alquilarlas.

Prueba la aplicación en [Wave Rider](https://waverider.netlify.app/).

## Características principales 🚀  
- 🛶 **Registro y gestión de usuarios**: Los propietarios pueden registrarse para subir sus motos y los arrendatarios para reservarlas.  
- 🌟 **Subida de motos acuáticas**: Los propietarios pueden agregar sus motos con imágenes, descripciones y precios.  
- 🔍 **Filtrado**: Los usuarios pueden ordenarlas por precio, potencia o valoraciones.  
- 📅 **Reservas simplificadas**: Los arrendatarios pueden seleccionar fechas para realizar reservas (solo disponible si están registrados).  
- ⭐ **Sistema de valoraciones**: Los arrendatarios pueden calificar su experiencia tras alquilar una moto acuática (disponible solo para usuarios que hayan realizado una reserva).  
- 📋 **Gestión de perfiles**: Cada usuario puede gestionar su perfil, sus motos y visualizar sus reservas desde un único lugar.  

## Estructura del proyecto 🛠️  

### Página principal:  
- Muestra las motos más populares y accesibles con la posibilidad de filtrarlas según precio, potencia o valoraciones.  
- Los usuarios no registrados pueden ver las motos pero no pueden realizar reservas.

### Detalles de la moto:  
- Visualiza información detallada como descripción, precio y valoración promedio.
- **Funcionalidades adicionales** (disponibles solo para usuarios registrados):  
  - Acceso al perfil del propietario para explorar todas las motos que tiene disponibles.  
  - Posibilidad de realizar una reserva directamente desde la página de detalles.  

### Gestión de reservas:  
- Los usuarios pueden visualizar sus reservas y contactar con los propietarios.  
- Los propietarios pueden administrar las reservas de sus motos.  

### Perfil de usuario:  
- Cada usuario tiene su espacio para gestionar sus datos personales y realizar cambios.  
- Los propietarios pueden subir o editar información de sus motos.  

---

## Tecnologías utilizadas 🛠️  

### **Frontend**  
- React.js (Hooks y React Router)  
- CSS (diseño responsive)  

### **Backend**  
- Node.js y Express.js  

### **Base de datos**  
- MongoDB (MongoDB Atlas)  

### **Autenticación**  
- JSON Web Tokens (JWT)  
- Bcrypt (encriptación de contraseñas)  

---

## ¿Cómo usar la aplicación? 💻  
### Navegar en la aplicación:  
1. Regístrate como propietario o arrendatario.  
2. Navega por las motos disponibles en la página principal.  
3. Filtra las motos según tus preferencias (precio, potencia, valoraciones).  

### Reservar motos acuáticas:  
1. Selecciona las fechas deseadas y comprueba la disponibilidad.  
2. Reserva tu moto y, una vez realizada la reserva, tendrás acceso a los datos de contacto del propietario para coordinar el alquiler.

### Sistema de valoraciones:  
- Solo los usuarios que hayan realizado una reserva pueden calificar la moto acuática y dejar un comentario sobre su experiencia.    

### Gestionar como propietario:  
1. Subir nuevas motos con información detallada.  
2. Editar o eliminar motos según disponibilidad.  
3. Visualizar y gestionar las reservas hechas por los arrendatarios.  
