<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Serie;

class SerieController extends Controller
{
    public function index(){
        $series=Serie::all();
        return response()->json([
            'code'=>200,
            'status'=>'success',
            'series'=>$series
        ],200);
    }


    public function show($id){
        $serie=Serie::find($id);

        if(is_object($serie)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'serie'=>$serie
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'La serie no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }


      /**
     * store guarda una nueva ficha en la base de datos 
     */
    public function store(Request $request){
        
        //Recoger los datos por post
        $json=$request->input('json',null);
        $params_array=json_decode($json,true);

        if(!empty($params_array)){
            //validar los datos
            $validate=\Validator::make($params_array,[
                'nombre'=>'required',
                'descripcion'=>'required',
                
            ]);
            //guardar el modelo
            if($validate->fails()){
                $data=[
                    'code'=>400,
                    'status'=>'error',
                    'message'=> 'No se ha guardado la serie.'
                ];
            }else{
                //en caso de no haber errores, guarda el modelo en la base de datos
                $serie=new Serie();
                $serie->nombre= $params_array['nombre'];
                $serie->descripcion= $params_array['descripcion'];
                $serie->save();

                $data=[
                    'code'=>200,
                    'status'=>'success',
                    'serie'=> $serie
                ];
            }
        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ninguna serie'
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
                'nombre'=>'required',
                'descripcion'=>'required',
            ]);

            //quitar los datos que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //actualizar el registro de modelo
            $serie=Serie::where('id',$id)->update($params_array);

            $data=[
                'code'=>200,
                'status'=>'success',
                'serie'=>$params_array
            ];

        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ninguna serie.'
            ];
        }
        return response()->json($data,$data['code']);
    }

    public function destroy($id,Request $request){
        //conseguir el registro 
        $serie=Serie::where('id',$id)->first();
        if(!empty($serie)){

            //Borrar el registro
            $serie->delete();
            
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'serie'=>$serie
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'La Serie no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }
    

       //funcion para recibir los productos por cliente recibiendo el id del cliente
public function jugadoresporserie($id,$ids){
    $serie=Serie::first()->jugadores($id,$ids);

    if(is_object($serie)){
        $data=array(
            'code'=>200,
            'status'=>'success',
            'serie'=>$serie
        );
    }else{
        $data=array(
            'code'=>404,
            'status'=>'error',
            'message'=>'No hay serie'
        );
    }
    return response()->json($data,$data['code']);
}
}
