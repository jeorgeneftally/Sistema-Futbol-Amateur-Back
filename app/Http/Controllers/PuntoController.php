<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Punto;

class PuntoController extends Controller
{
    public function index(){
        $puntos=Punto::all();

        return response()->json([
            'code'=>200,
            'status'=>'success',
            'puntos'=>$puntos
        ],200);
    }

    public function show($id){
        $punto=punto::find($id);

        if(is_object($punto)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'punto'=>$punto
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El punto no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }

     
    /**
     * store guarda un nuevo estudiante en la base de datos 
     */
    public function store(Request $request){
        
        //Recoger los datos por post
        $json=$request->input('json',null);
        $params_array=json_decode($json,true);

        if(!empty($params_array)){
            //validar los datos
            $validate=\Validator::make($params_array,[
                'puntos'=>'required',
                'equipo_id' => 'required',
                'campeonato_id' => 'required',
                    
            ]);

            //guardar el estudiante
            if($validate->fails()){
                $data=[
                    'code'=>400,
                    'status'=>'error',
                    'message'=> 'No se ha guardado el punto.'
                ];
            }else{
                //en caso de no haber errores, guarda el estudiante en la base de datos
                $punto=new Punto();
                $punto->puntos= $params_array['puntos'];
                $punto->equipo_id=$params_array['equipo_id'];
                $punto->campeonato_id=$params_array['campeonato_id'];
                $punto->save();

                $data=[
                    'code'=>200,
                    'status'=>'success',
                    'punto'=> $punto
                ];
            }
        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun punto.'
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
                'puntos'=>'required',
                'equipo_id' => 'required',
                'campeonato_id' => 'required',
            ]);

            //quitar los datos que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //actualizar el registro de modelo
            $punto=Punto::where('id',$id)->update($params_array);

            $data=[
                'code'=>200,
                'status'=>'success',
                'punto'=>$params_array
            ];

        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun punto.'
            ];
        }
        return response()->json($data,$data['code']);
    }

    public function destroy($id,Request $request){
        //conseguir el registro 
        $punto=Punto::where('id',$id)->first();
        if(!empty($punto)){

            //Borrar el registro
            $punto->delete();
            
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'punto'=>$punto
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El punto no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }

   

}
