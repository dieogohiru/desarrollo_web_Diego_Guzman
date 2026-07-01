import pymysql
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Enum, Text, text
from sqlalchemy.orm import sessionmaker, relationship, joinedload
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = "3306"

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class Region(Base):
    __tablename__ = 'region'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)

class Comuna(Base):
    __tablename__ = 'comuna'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)

    miembros = relationship("Miembro", back_populates="comuna")

class Miembro(Base):
    __tablename__ = 'miembro'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(80), nullable=False)
    telefono = Column(String(15), nullable=False)
    fecha_registro = Column(DateTime, nullable=False, default=datetime.now)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)

    comuna = relationship("Comuna", back_populates="miembros")

    actividades = relationship("Actividad", back_populates="miembro", cascade="all, delete")

class Actividad(Base):
    __tablename__ = 'actividad'
    id = Column(Integer, primary_key=True, autoincrement=True)
    miembro_id = Column(Integer, ForeignKey('miembro.id'), nullable=False)
    dia = Column(Enum('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'), nullable=False)
    hora_inicio = Column(String(5), nullable=False)
    duracion = Column(String(5), nullable=False)
    tipo = Column(Enum('arte', 'deporte', 'tecnología', 'social', 'recreación', 'otra'), nullable=False)
    nombre = Column(String(45), nullable=False)
    descripcion = Column(Text, nullable=True)

    miembro = relationship("Miembro", back_populates="actividades")

    fotos = relationship("Foto", back_populates="actividad", cascade="all, delete")

class Foto(Base):
    __tablename__ = 'foto'
    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="fotos")

class Comentario(Base):
    __tablename__ = 'comentario'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(Text, nullable=False)
    fecha = Column(DateTime, nullable=False, default=datetime.now)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", backref="comentarios")



def get_miembro_by_email(email):
    session = SessionLocal()
    miembro = session.query(Miembro).filter_by(email=email).first()
    session.close()
    return miembro

def get_miembro_by_telefono(telefono):
    session = SessionLocal()
    miembro = session.query(Miembro).filter(Miembro.telefono == telefono).first()
    session.close()
    return miembro

def get_ultimos_miembros():
    session = SessionLocal()
    miembros = session.query(Miembro)\
        .options(joinedload(Miembro.comuna), joinedload(Miembro.actividades))\
        .order_by(Miembro.fecha_registro.desc())\
        .limit(5).all()
    session.close()
    return miembros

def get_regiones():
    session = SessionLocal()
    regiones = session.query(Region).all()
    session.close()
    return regiones

def get_comunas_by_region(region_id):
    session = SessionLocal()
    comunas = session.query(Comuna).filter_by(region_id=region_id).all()
    session.close()
    return comunas

def get_miembro_completo(miembro_id):
    session = SessionLocal()
    miembro = session.query(Miembro)\
        .options(joinedload(Miembro.comuna), 
                 joinedload(Miembro.actividades).joinedload(Actividad.fotos))\
        .filter(Miembro.id == miembro_id).first()
    session.close()
    return miembro

def get_todas_las_comunas():
    session = SessionLocal()
    comunas = session.query(Comuna).order_by(Comuna.nombre.asc()).all()
    session.close()
    return comunas

def get_miembros_paginados(pagina, per_pagina, nombre="", comuna_id=None):
    session = SessionLocal()
    query = session.query(Miembro).options(joinedload(Miembro.comuna))
    
    if nombre:
        query = query.filter(Miembro.nombre.like(f"%{nombre}%"))
    if comuna_id:
        query = query.filter(Miembro.comuna_id == comuna_id)
        
    total = query.count()
    offset = (pagina - 1) * per_pagina
    
    miembros = query.order_by(Miembro.fecha_registro.desc())\
                    .offset(offset)\
                    .limit(per_pagina)\
                    .all()
    
    session.close()
    return miembros, total
    
def get_stats_miembros_por_dia():
    session = SessionLocal()
    
    query = text("""
        SELECT DATE(fecha_registro) as fecha, COUNT(*) as total 
        FROM miembro 
        GROUP BY DATE(fecha_registro) 
        ORDER BY fecha ASC
    """)
    
    resultados = session.execute(query).fetchall()
    
    fechas = []
    totales = []
    
    for fila in resultados:
        fechas.append(str(fila[0])) 
        totales.append(fila[1])
        
    session.close()
    
    return {
        "fechas": fechas,
        "totales": totales
    }

def get_stats_actividades_por_tipo():
    session = SessionLocal()
    
    query = text("""
        SELECT tipo, COUNT(*) as total 
        FROM actividad 
        GROUP BY tipo
    """)
    
    resultados = session.execute(query).fetchall()
    
    datos_torta = []
    for fila in resultados:
        datos_torta.append({
            "name": fila[0],
            "y": fila[1]
        })
        
    session.close()
    
    return datos_torta

def get_stats_actividades_por_comuna():
    session = SessionLocal()
    
    query = text("""
        SELECT c.nombre, COUNT(a.id) as total 
        FROM actividad a
        INNER JOIN miembro m ON a.miembro_id = m.id
        INNER JOIN comuna c ON m.comuna_id = c.id
        GROUP BY c.id, c.nombre
        ORDER BY total DESC
    """)
    
    resultados = session.execute(query).fetchall()
    
    comunas = []
    totales = []
    
    for fila in resultados:
        comunas.append(fila[0])
        totales.append(fila[1])
        
    session.close()
    
    return {
        "comunas": comunas,
        "totales": totales
    }

def get_comentarios_actividad(actividad_id):
    session = SessionLocal()
    comentarios = session.query(Comentario)\
        .filter_by(actividad_id=actividad_id)\
        .order_by(Comentario.fecha.desc())\
        .all()
    
    lista = []
    for c in comentarios:
        lista.append({
            "nombre": c.nombre,
            "texto": c.texto,
            "fecha": c.fecha.strftime("%Y-%m-%d %H:%M:%S")
        })
    session.close()
    return lista



def create_miembro(nombre, email, telefono, comuna_id):
    session = SessionLocal()
    
    nuevo_miembro = Miembro(
        nombre=nombre, 
        email=email, 
        telefono=telefono, 
        comuna_id=comuna_id,
        fecha_registro=datetime.now()
    )
    
    session.add(nuevo_miembro)
    session.commit()
    
    miembro_id = nuevo_miembro.id
    session.close()
    
    return miembro_id

def create_actividad(miembro_id, tipo, nombre_act, dia, hora, duracion, desc, lista_fotos):
    session = SessionLocal()
    
    nueva_act = Actividad(
        miembro_id=miembro_id,
        tipo=tipo,
        nombre=nombre_act,
        dia=dia,
        hora_inicio=hora,
        duracion=duracion,
        descripcion=desc
    )
    session.add(nueva_act)
    session.flush()
    
    for foto_data in lista_fotos:
        nueva_foto = Foto(
            ruta_archivo=foto_data['ruta'],
            nombre_archivo=foto_data['nombre'],
            actividad_id=nueva_act.id
        )
        session.add(nueva_foto)
    
    session.commit()
    session.close()
    return True

def agregar_comentario(actividad_id, nombre, texto):
    session = SessionLocal()
    nuevo_comentario = Comentario(
        actividad_id=actividad_id,
        nombre=nombre,
        texto=texto,
        fecha=datetime.now()
    )
    session.add(nuevo_comentario)
    session.commit()
    session.close()
    return True