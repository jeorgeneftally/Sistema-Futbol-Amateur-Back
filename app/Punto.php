<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Punto extends Model
{
    protected $table='puntos';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'puntos','equipo_id','campeonato_id'
    ];
    //RELACION DE UNO A MUCHOS INVERSA puntos-tabla
    public function campeonato(){
        return $this->belongsTo('App\Campeonato','campeonato_id');
    }
    //RELACION DE UNO A MUCHOS INVERSA puntos-equipo
    public function equipo(){
        return $this->belongsTo('App\Equipo','equipo_id');
    }
}
