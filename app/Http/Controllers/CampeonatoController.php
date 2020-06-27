<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Campeonato;


class CampeonatoController extends Controller
{
    public function index(){
        $campeonatos=Campeonato::all()->load('User','Equipo');
        return response()->json([
            'code'=>200,
            'status'=>'success',
            'campeonatos'=>$campeonatos
        ],200);
    }

    public function show($id){
        $campeonato=Campeonato::find($id);

        if(is_object($campeonato)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'campeonato'=>$campeonato
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'el campeonato no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }

       /**
     * store guarda un nuevo campeonato en la base de datos 
     */
    public function store(Request $request){
        
        //Recoger los datos por post
        $json=$request->input('json',null);
        $params_array=json_decode($json,true);

        if(!empty($params_array)){
            //validar los datos
            $validate=\Validator::make($params_array,[
                'nombre' => 'required',
                'descripcion' => 'required'
            ]);

            //guardar el campeonato
            if($validate->fails()){
                $data=[
                    'code'=>400,
                    'status'=>'error',
                    'message'=> 'No se ha guardado el campeonato.'
                ];
            }else{
                //en caso de no haber errores, guarda el estudiante en la base de datos
                $campeonato=new Campeonato();
                $campeonato->nombre=$params_array['nombre'];
                $campeonato->descripcion=$params_array['descripcion'];
                $campeonato->user_id=$params_array['user_id'];
                $campeonato->save();

                $data=[
                    'code'=>200,
                    'status'=>'success',
                    'campeonato'=> $campeonato
                ];
            }
        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun campeonato.'
            ];
        }
        return response()->json($data,$data['code']);
    }

    /**
     * update permite actualizar un modelo en la base de datos
     */
    public function update($id,Request $request){

        //Recoger datos por post
        $json=$request->input('json',null);
        $params_array=json_decode($json,true);

        if(!empty($params_array)){
            //Validar los datos
            $validate=\Validator::make($params_array,[
                'nombre' => 'required',
                'descripcion' => 'required',
                
            ]);

            //quitar los datos que no quiero actualizar
            //unset($params_array['id']);
            unset($params_array['created_at']);

            //actualizar el registro de modelo
            $campeonato=Campeonato::where('id',$id)->update($params_array);

            $data=[
                'code'=>200,
                'status'=>'success',
                'campeonato'=>$params_array
            ];

        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ninguna campeonato.'
            ];
        }
        return response()->json($data,$data['code']);
    }
    

    public function destroy($id,Request $request){
        //conseguir el registro 
        $campeonato=Campeonato::where('id',$id)->first();
        if(!empty($campeonato)){

            //Borrar el registro
            $campeonato->delete();
            
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'campeonato'=>$campeonato
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El campeonato no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }


    //funcion para recibir los productos por cliente recibiendo el id del cliente
public function tabla($id){
    $tabla=Campeonato::first()->tablaposiciones($id);

    if(is_object($tabla)){
        $data=array(
            'code'=>200,
            'status'=>'success',
            'tabla'=>$tabla
        );
    }else{
        $data=array(
            'code'=>404,
            'status'=>'error',
            'message'=>'No hay tabla'
        );
    }
    return response()->json($data,$data['code']);
}
}
