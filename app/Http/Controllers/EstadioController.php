<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Estadio;

class EstadioController extends Controller
{
    public function index(){
        $estadios=Estadio::all();
        return response()->json([
            'code'=>200,
            'status'=>'success',
            'estadios'=>$estadios
        ],200);
    }


    public function show($id){
        $estadio=Estadio::find($id);

        if(is_object($estadio)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'estadio'=>$estadio
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El estadio no existe'
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
                $estadio=new Estadio();
                $estadio->nombre= $params_array['nombre'];
                $estadio->direccion= $params_array['direccion'];
                $estadio->descripcion= $params_array['descripcion'];
                $estadio->cantidad_asistentes= $params_array['cantidad_asistentes'];
                $estadio->save();

                $data=[
                    'code'=>200,
                    'status'=>'success',
                    'estadio'=> $estadio
                ];
            }
        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun estadio'
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
            $estadio=Estadio::where('id',$id)->update($params_array);

            $data=[
                'code'=>200,
                'status'=>'success',
                'estadio'=>$params_array
            ];

        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun estadio.'
            ];
        }
        return response()->json($data,$data['code']);
    }

    public function destroy($id,Request $request){
        //conseguir el registro 
        $estadio=Estadio::where('id',$id)->first();
        if(!empty($estadio)){

            //Borrar el registro
            $estadio->delete();
            
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'estadio'=>$estadio
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El estadio no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }
    
}
