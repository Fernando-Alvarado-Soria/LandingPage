# Configuración de Google Apps Script para Formulario de Contacto

## Pasos para configurar:

1. Abre tu Google Sheet
2. Ve a `Extensiones` > `Apps Script`
3. Borra el código existente y pega el siguiente código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contactos');
    
    // Si la hoja no existe, crearla
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Contactos');
      newSheet.appendRow(['Fecha', 'Nombre', 'Email', 'Mensaje']);
    }
    
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.message
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Guarda el proyecto
5. Haz clic en `Implementar` > `Nueva implementación`
6. Selecciona tipo: `Aplicación web`
7. Configuración:
   - Ejecutar como: Tu cuenta
   - Quién tiene acceso: Cualquier persona
8. Copia la URL de la implementación

## Usar la URL en tu código JavaScript:

Reemplaza la función `sendToGoogleSheets` con:

```javascript
async function sendToGoogleSheets(formData) {
    const SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Datos guardados en Google Sheets');
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
```
