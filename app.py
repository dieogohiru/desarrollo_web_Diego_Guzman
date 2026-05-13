import os
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from datetime import datetime
from werkzeug.utils import secure_filename

import db 
from validaciones import validate_miembro, validate_actividad

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "secret_key"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/')
def index():
    miembros = db.get_ultimos_miembros()
    return render_template('index.html', miembros=miembros)

@app.route('/registro', methods=['GET', 'POST'])
def registrar_miembro():
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        telefono = request.form.get('telefono')
        comuna_id = request.form.get('comuna_id')

        errores = validate_miembro(nombre, email, telefono, comuna_id)

        if errores:
            for e in errores:
                flash(e, "error")
            regiones = db.get_regiones()
            return render_template('registro.html', regiones=regiones, datos_previos=request.form)

        miembro_id = db.create_miembro(nombre, email, telefono, comuna_id)
        return redirect(url_for('registrar_actividad', m_id=miembro_id))

    regiones = db.get_regiones()
    return render_template('registro.html', regiones=regiones, datos_previos={})

@app.route('/registro/<int:m_id>', methods=['GET', 'POST'])
def registrar_actividad(m_id):
    if request.method == 'POST':
        tipo = request.form.get('tipo_actividad')
        nombre_act = request.form.get('nombre_actividad')
        dia = request.form.get('dia')
        hora = request.form.get('hora_inicio')
        duracion = request.form.get('duracion')
        desc = request.form.get('descripcion')
        files = request.files.getlist('foto')
        
        errores = validate_actividad(tipo, nombre_act, dia, hora, duracion, files)

        if errores:
            for e in errores:
                flash(e, "error")
            return redirect(url_for('registrar_actividad', m_id=m_id))

        lista_fotos_db = []
        for file in files[:3]:
            if file and file.filename != '':
                filename = secure_filename(f"{datetime.now().timestamp()}_{file.filename}")
                ruta_fisica = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(ruta_fisica)
                
                lista_fotos_db.append({
                    'ruta': f"uploads/{filename}",
                    'nombre': filename
                })

        db.create_actividad(m_id, tipo, nombre_act, dia, hora, duracion, desc, lista_fotos_db)

        accion = request.form.get('accion')
        
        if accion == 'repetir':
            flash(f"¡Actividad '{nombre_act}' guardada! Puedes registrar otra actividad.", "success")
            return redirect(url_for('registrar_actividad', m_id=m_id))
        else:
            flash("¡Todo guardado exitosamente!", "success")
            return redirect(url_for('index'))

    return render_template('registro.html', m_id=m_id)

@app.route('/listado')
def listado_miembros():
    pagina = request.args.get('pagina', 1, type=int)
    nombre_busqueda = request.args.get('busqueda', '')
    comuna_id = request.args.get('filtro_comuna', type=int)
    
    per_pagina = 5
    
    miembros, total = db.get_miembros_paginados(pagina, per_pagina, nombre_busqueda, comuna_id)
    
    todas_las_comunas = db.get_todas_las_comunas() 
    
    tiene_sig = total > (pagina * per_pagina)
    
    return render_template('listado.html', miembros=miembros, comunas=todas_las_comunas, pagina=pagina, tiene_sig=tiene_sig)
    
@app.route('/ver-miembro/<int:id>')
def ver_miembro(id):
    miembro = db.get_miembro_completo(id)
    if not miembro:
        flash("El miembro solicitado no existe.", "error")
        return redirect(url_for('listado_miembros'))
    return render_template('detalle.html', miembro=miembro)

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

@app.route('/get_comunas/<int:reg_id>')
def get_comunas(reg_id):
    comunas = db.get_comunas_by_region(reg_id)
    return jsonify([{'id': c.id, 'nombre': c.nombre} for c in comunas])

if __name__ == '__main__':
    app.run(debug=True)