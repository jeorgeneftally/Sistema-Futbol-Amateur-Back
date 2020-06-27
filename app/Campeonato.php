<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Campeonato extends Model
{
    protected $table='campeonatos';
    
    protected $fillable = [
        'id','nombre','descripcion','user_id'
    ];

    
    //RELACION DE UNO A MUCHOS INVERSA campeonato-user
    public function user(){
        return $this->belongsTo('App\User','user_id');
    }
     //relacion uno a muchos de tabla-campeonato
     public function punto(){
        return $this->hasMany('App\Punto');
    }
     //relacion uno a muchos de tabla-campeonato
     public function equipo(){
        return $this->hasMany('App\Equipo');
    }
    //relacion uno a muchos de tabla-campeonato
    public function arbitro(){
        return $this->hasMany('App\Arbitro');
        

    }


    //FUNCION PARA TRAER LOS apoderados RELACIONADOS A UNA estudiante
    public function tablaposiciones($id){
        $tabla=DB::table('campeonatos')
        ->join('puntos', 'campeonatos.id', '=', 'puntos.campeonato_id')
        ->join('equipos', 'puntos.equipo_id', '=', 'equipos.id')
        ->select('equipos.nombre','puntos.puntos','puntos.id')
        ->where('campeonatos.id',$id)
        ->orderby('puntos','desc')
        ->get();
        return $tabla;
      }
}
