<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Arbitro;

class ArbitroController extends Controller
{
    public function index(){
        $arbitros=Arbitro::all()->load('Campeonato');
        return response()->json([
            'code'=>200,
            'status'=>'success',
            'arbitros'=>$arbitros
        ],200);
    }


    public function show($id){
        $arbitro=Arbitro::find($id);

        if(is_object($arbitro)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'arbitro'=>$arbitro
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El arbitro no existe'
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
                'nombres'=>'required',
                'apellidos'=>'required',
                
            ]);
            //guardar el modelo
            if($validate->fails()){
                $data=[
                    'code'=>400,
                    'status'=>'error',
                    'message'=> 'No se ha guardado el arbitro.'
                ];
            }else{
                //en caso de no haber errores, guarda el modelo en la base de datos
                $arbitro=new Arbitro();
                $arbitro->nombres= $params_array['nombres'];
                $arbitro->apellidos= $params_array['apellidos'];
                $arbitro->fecha_nacimiento= $params_array['fecha_nacimiento'];
                $arbitro->campeonato_id= $params_array['campeonato_id'];
                $arbitro->save();

                $data=[
                    'code'=>200,
                    'status'=>'success',
                    'arbitro'=> $arbitro
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
                'nombres'=>'required',
                'apellidos'=>'required',
            ]);

            //quitar los datos que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //actualizar el registro de modelo
            $arbitro=Arbitro::where('id',$id)->update($params_array);

            $data=[
                'code'=>200,
                'status'=>'success',
                'arbitro'=>$params_array
            ];

        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun arbitro.'
            ];
        }
        return response()->json($data,$data['code']);
    }

    public function destroy($id,Request $request){
        //conseguir el registro 
        $arbitro=Arbitro::where('id',$id)->first();
        if(!empty($arbitro)){

            //Borrar el registro
            $arbitro->delete();
            
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'arbitro'=>$arbitro
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El arbitro no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }
    
}
