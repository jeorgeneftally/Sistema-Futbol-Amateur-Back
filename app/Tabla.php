<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tabla extends Model
{
    protected $table='tablas';
    
    protected $fillable = [
        'nombre','descripcion','campeonato_id'
    ];
   
    //RELACION DE UNO A MUCHOS INVERSA tabla-campeonato
    public function campeonato(){
        return $this->belongsTo('App\Campeonato','campeonato_id');
    }
    //relacion uno a muchos de tabla-puntos
    public function puntos(){
        return $this->hasMany('App\Punto');
    }
}
