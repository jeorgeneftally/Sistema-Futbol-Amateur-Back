<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estadio extends Model
{
    protected $table='estadios';
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre','direccion','descripcion','cantidad_asistentes'
    ];

    //relacion uno a muchos de serie-jugador
    public function equipo(){
        return $this->hasMany('App\Equipo');
    }
}
