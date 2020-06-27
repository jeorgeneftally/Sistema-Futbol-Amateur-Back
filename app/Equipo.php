<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Equipo extends Model
{
    protected $table='equipos';
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre','fecha_creacion','presidente','descripcion','campeonato_id','estadio_id'
    ];


    //RELACION DE UNO A MUCHOS INVERSA equipo-campeonato
    public function campeonato(){
        return $this->belongsTo('App\Campeonato','campeonato_id');
    }

    //RELACION DE UNO A MUCHOS INVERSA equipo-campeonato
    public function estadio(){
        return $this->belongsTo('App\Estadio','estadio_id');
    }
    //relacion uno a muchos de serie-jugador
    public function jugador(){
        return $this->hasMany('App\Jugador');
    }
   //relacion uno a muchos de tabla-puntos
    public function puntos(){
    return $this->hasMany('App\Punto');
}

}
