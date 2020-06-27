<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Arbitro extends Model
{
    protected $table='arbitros';
    
    protected $fillable = [
        'id','nombres','apellidos','fecha_nacimiento','campeonato_id'
    ];

    
    //RELACION DE UNO A MUCHOS INVERSA campeonato-user
    public function campeonato(){
        return $this->belongsTo('App\Campeonato','campeonato_id');
    }
}
