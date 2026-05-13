import re
import os
import db  

def validate_miembro(nombre, email, telefono, comuna_id):
    errores = []
    
    if not nombre or len(nombre.strip()) < 3 or len(nombre) > 255:
        errores.append("El nombre es obligatorio y debe tener entre 3 y 255 caracteres.")
    
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not email or not re.match(email_regex, email):
        errores.append("El formato del correo electrónico no es válido.")
    elif db.get_miembro_by_email(email): 
        errores.append("Este correo electrónico ya está registrado.")
    
    digitos = re.sub(r'\D', '', telefono)
    if not telefono or len(digitos) < 8 or len(digitos) > 15:
        errores.append("El teléfono debe contener entre 8 y 15 dígitos.")
    elif db.get_miembro_by_telefono(telefono): 
        errores.append("Este número de teléfono ya está registrado.")
    
    if not comuna_id:
        errores.append("Debes seleccionar una comuna.")
        
    return errores

def validate_actividad(tipo, nombre_act, dia, hora, duracion, archivos):
    errores = []
    tipos_validos = ['arte', 'deporte', 'tecnología', 'social', 'recreación', 'otra']
    dias_validos = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
    
    if tipo not in tipos_validos:
        errores.append("El tipo de actividad seleccionado no es válido.")
        
    if dia not in dias_validos:
        errores.append("El día seleccionado no es válido.")
    
    if not nombre_act or len(nombre_act.strip()) < 3 or len(nombre_act) > 45:
        errores.append("El nombre de la actividad debe tener entre 3 y 45 caracteres.")
    
    if not hora or not re.match(r'^\d{1,2}:\d{2}$', hora):
        errores.append("La hora debe tener el formato HH:MM.")
        
    archivos_reales = [f for f in archivos if f.filename != '']
    
    if len(archivos_reales) > 3:
        errores.append("Puedes subir un máximo de 3 archivos.")
        
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov', 'wmv'}
    MAX_FILE_SIZE = 50 * 1024 * 1024 
    
    for f in archivos_reales:
        ext = f.filename.rsplit('.', 1)[-1].lower() if '.' in f.filename else ''
        if ext not in ALLOWED_EXTENSIONS:
            errores.append(f"El archivo {f.filename} tiene una extensión no permitida.")

        f.seek(0, os.SEEK_END)
        size = f.tell()
        f.seek(0)

        if size > MAX_FILE_SIZE:
            errores.append(f"El archivo {f.filename} excede el límite de 50MB.")
                
    return errores