<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Serie extends Model
{
    protected $table='series';
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre','descripcion'
    ];

    //relacion uno a muchos de serie-jugador
    public function jugador(){
        return $this->hasMany('App\Jugador');
    }

    //FUNCION PARA TRAER LOS apoderados RELACIONADOS A UNA estudiante
    public function jugadores($id_serie,$id_equipo){
        $tabla=DB::table('series')
        ->join('jugadores', 'series.id', '=', 'jugadores.serie_id')
        ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
        ->select('jugadores.*')
        ->where('series.id',$id_serie)
        ->where('equipos.id',$id_equipo)
        ->get();
        return $tabla;
      }
}
