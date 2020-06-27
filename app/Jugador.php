<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Jugador extends Model
{
    protected $table='jugadores';
    
    protected $fillable = [
        'rut','nombre','apellido','fecha_nacimiento','telefono','direccion','imagen_perfil','equipo_id','serie_id'
    ];
    //RELACION DE UNO A MUCHOS INVERSA jugador-equipo
    public function equipo(){
        return $this->belongsTo('App\Equipo','equipo_id');
    }
    //RELACION DE UNO A MUCHOS INVERSA jugador-serie
    public function serie(){
        return $this->belongsTo('App\Serie','serie_id');
    }
}
