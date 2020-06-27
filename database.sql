CREATE DATABASE IF NOT EXISTS DBsistemaanfa;
USE DBsistemaanfa;

CREATE TABLE users(
id                  int(255) auto_increment NOT NULL,
name                varchar(50) NOT NULL,
surname             varchar(100),
email               varchar(255) NOT NULL,
password            varchar(255) NOT NULL,
image               varchar(255),
profesion           varchar(255),
role                varchar(50) NOT NULL,
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
remember_token      varchar(255),
CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE series(
id                  int(255) auto_increment NOT NULL,
nombre              varchar(255),
descripcion         varchar(255),
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_series PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE campeonatos(
id                  int(255) auto_increment NOT NULL,
nombre              varchar(255),
descripcion         varchar(255),
user_id             int(255),
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_campeonatos PRIMARY KEY(id),
CONSTRAINT fk_campeonato_user FOREIGN KEY(user_id) REFERENCES users(id)
)ENGINE=InnoDb;

CREATE TABLE estadios(
id                  int(255) auto_increment NOT NULL,
nombre              varchar(255),
direccion           varchar(255),
descripcion         varchar(255),
cantidad_asistentes int(255),
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_estadios PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE equipos(
id                  int(255) auto_increment NOT NULL,
nombre              varchar(255),
fecha_creacion      date,
presidente          varchar(255),
descripcion         varchar(255),
campeonato_id       int(255),
estadio_id       int(255),
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_equipos PRIMARY KEY(id),
CONSTRAINT fk_equipo_campeonato FOREIGN KEY(campeonato_id) REFERENCES campeonatos(id),
CONSTRAINT fk_equipo_estadio FOREIGN KEY(estadio_id) REFERENCES estadios(id)
)ENGINE=InnoDb;


CREATE TABLE jugadores(
id                  int(255) auto_increment NOT NULL,
rut                 varchar(255) NOT NULL,
nombre              varchar(255),
apellido            varchar(255),
fecha_nacimiento    date,
direccion           varchar(255),
telefono            varchar(255),
imagen_perfil       varchar(255),       
equipo_id           int(255),
serie_id            int(255),
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_jugadores PRIMARY KEY(id),
CONSTRAINT fk_jugador_equipo FOREIGN KEY(equipo_id) REFERENCES equipos(id),
CONSTRAINT fk_jugador_serie FOREIGN KEY(serie_id) REFERENCES series(id)
)ENGINE=InnoDb;

CREATE TABLE tablas(
id                  int(255) auto_increment NOT NULL,
nombre              varchar(255),
descripcion         varchar(255),      
campeonato_id       int(255),      
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_tablas PRIMARY KEY(id),
CONSTRAINT fk_tabla_campeonato FOREIGN KEY(campeonato_id) REFERENCES campeonatos(id)
)ENGINE=InnoDb;


CREATE TABLE puntos(
id                  int(255) auto_increment NOT NULL,
puntos              int(255),
equipo_id           int(255) NOT NULL,
campeonato_id            int(255) NOT NULL,
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_puntos PRIMARY KEY(id),
CONSTRAINT fk_punto_equipo FOREIGN KEY(equipo_id) REFERENCES equipos(id),
CONSTRAINT fk_punto_campeonato  FOREIGN KEY(campeonato_id)  REFERENCES campeonatos(id)
)ENGINE=InnoDb;


CREATE TABLE arbitros(
id                  int(255) auto_increment NOT NULL,
nombres             varchar(255),
apellidos           varchar(255),
fecha_nacimiento    date,
campeonato_id       int(255),
created_at          datetime DEFAULT NULL,
updated_at          datetime DEFAULT NULL,
CONSTRAINT pk_arbitros PRIMARY KEY(id),
CONSTRAINT fk_arbitro_campeonato FOREIGN KEY(campeonato_id) REFERENCES campeonatos(id)
)ENGINE=InnoDb;


