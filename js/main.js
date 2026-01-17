// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Verificar preferencia guardada o del sistema
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Aplicar tema guardado
htmlElement.setAttribute('data-theme', savedTheme);

// Toggle del tema
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Animación de entrada para las tarjetas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Carrusel de proyectos
const projectsContainer = document.querySelector('.projects');
const prevBtn = document.querySelector('.carousel-btn--prev');
const nextBtn = document.querySelector('.carousel-btn--next');
const projectCards = document.querySelectorAll('.project-card');

let currentIndex = 0;
const cardsToShow = 3; // Número de cards visibles
const totalCards = projectCards.length;
const maxIndex = totalCards - cardsToShow;

// Función para actualizar el carrusel
function updateCarousel() {
    const cardWidth = projectCards[0].offsetWidth;
    const gap = 32; // 2rem en px
    const offset = -(currentIndex * (cardWidth + gap));
    projectsContainer.style.transform = `translateX(${offset}px)`;
    
    // Deshabilitar botones en los extremos
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
    
    // Agregar estilos visuales a botones deshabilitados
    if (currentIndex === 0) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
    }
    
    if (currentIndex === maxIndex) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

// Event listeners para los botones
nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Actualizar carrusel en resize
window.addEventListener('resize', updateCarousel);

// Inicializar carrusel
updateCarousel();

// ============================================
// CONFIGURACIÓN - Reemplaza estos valores con los tuyos
// ============================================

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'TU_PUBLIC_KEY_AQUI',  // Obtén esto de tu cuenta EmailJS
    serviceID: 'TU_SERVICE_ID_AQUI',   // ID del servicio de email configurado
    templateID: 'TU_TEMPLATE_ID_AQUI'  // ID de la plantilla creada
};

// Google Sheets Configuration (Opcional)
const GOOGLE_SHEETS_CONFIG = {
    apiKey: 'TU_GOOGLE_API_KEY_AQUI',
    spreadsheetId: 'TU_SPREADSHEET_ID_AQUI',
    sheetName: 'Contactos'  // Nombre de la hoja dentro del spreadsheet
};

// ============================================
// Inicializar EmailJS
// ============================================
(function() {
    // Inicializa EmailJS con tu Public Key
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Mostrar notificación al usuario
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Agregar estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Agregar animaciones CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enviar datos a Google Sheets
async function sendToGoogleSheets(formData) {
    try {
        const { name, email, message } = formData;
        const timestamp = new Date().toLocaleString('es-MX');
        
        // Nota: Esta es una implementación simplificada
        // Para producción, deberías usar Google Apps Script como intermediario
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A:D:append?valueInputOption=USER_ENTERED&key=${GOOGLE_SHEETS_CONFIG.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [[timestamp, name, email, message]]
                })
            }
        );
        
        if (!response.ok) {
            throw new Error('Error al guardar en Google Sheets');
        }
        
        console.log('Datos guardados en Google Sheets exitosamente');
        return true;
    } catch (error) {
        console.error('Error al enviar a Google Sheets:', error);
        // No fallar todo el proceso si Google Sheets falla
        return false;
    }
}

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm?.querySelector('.btn--submit');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Deshabilitar botón durante el envío
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            submitButton.style.opacity = '0.6';
        }
        
        try {
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Validar datos
            if (!data.name || !data.email || !data.message) {
                throw new Error('Por favor completa todos los campos');
            }
            
            // 1. Enviar email usando EmailJS
            console.log('Enviando email...');
            const emailResponse = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                    to_name: 'Fernando Alvarado', // Tu nombre
                }
            );
            
            console.log('Email enviado exitosamente:', emailResponse);
            
            // 2. Guardar en Google Sheets (opcional)
            if (GOOGLE_SHEETS_CONFIG.apiKey && GOOGLE_SHEETS_CONFIG.spreadsheetId) {
                console.log('Guardando en Google Sheets...');
                await sendToGoogleSheets(data);
            }
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
            
            // Limpiar formulario
            contactForm.reset();
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            
            // Mostrar mensaje de error específico
            const errorMessage = error.text || error.message || 'Error al enviar el mensaje. Por favor intenta nuevamente.';
            showNotification(errorMessage, 'error');
            
        } finally {
            // Rehabilitar botón
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensaje';
                submitButton.style.opacity = '1';
            }
        }
    });
}