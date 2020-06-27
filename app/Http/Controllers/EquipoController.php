<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Equipo;

class EquipoController extends Controller
{
    public function index(){
        $equipos=Equipo::all()->load('Estadio','Campeonato');
        return response()->json([
            'code'=>200,
            'status'=>'success',
            'equipos'=>$equipos
        ],200);
    }

    public function show($id){
        $equipo=Equipo::where('campeonato_id',$id)->get()->load('Estadio','Campeonato');

        if(is_object($equipo)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'equipo'=>$equipo
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El equipo no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }


    public function show2($id){
        $equipo=Equipo::find($id);

        if(is_object($equipo)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'equipo'=>$equipo
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El equipo no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }

    /**
     * store guarda un nuevo equipo en la base de datos 
     */
    public function store(Request $request){
        
        //Recoger los datos por post
        $json=$request->input('json',null);
        $params_array=json_decode($json,true);

        if(!empty($params_array)){
            //validar los datos
            $validate=\Validator::make($params_array,[
                'nombre'=>'required',
                'fecha_creacion'=>'required',
                'presidente'=>'required',
                'descripcion'=>'required',
                'campeonato_id' => 'required',
            ]);
            //guardar el modelo
            if($validate->fails()){
                $data=[
                    'code'=>400,
                    'status'=>'error',
                    'message'=> 'No se ha guardado el equipo.'
                ];
            }else{
                //en caso de no haber errores, guarda el modelo en la base de datos
                $equipo=new Equipo();
                $equipo->nombre= $params_array['nombre'];
                $equipo->fecha_creacion= $params_array['fecha_creacion'];
                $equipo->presidente= $params_array['presidente'];
                $equipo->descripcion=$params_array['descripcion'];
                $equipo->campeonato_id=$params_array['campeonato_id'];
                $equipo->estadio_id=$params_array['estadio_id'];
                $equipo->save();

                $data=[
                    'code'=>200,
                    'status'=>'success',
                    'equipo'=> $equipo
                ];
            }
        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun equipo.'
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
                'fecha_creacion'=>'required',
                'presidente'=>'required',
                'descripcion'=>'required',
                'campeonato_id' => 'required',
            ]);

            //quitar los datos que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['created_at']);

            //actualizar el registro de modelo
            $equipo=Equipo::where('id',$id)->update($params_array);

            $data=[
                'code'=>200,
                'status'=>'success',
                'equipo'=>$params_array
            ];

        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun equipo.'
            ];
        }
        return response()->json($data,$data['code']);
    }


    public function destroy($id,Request $request){
        //conseguir el registro 
        $equipo=Equipo::where('id',$id)->first();
        if(!empty($equipo)){
            //Borrar el registro
            $equipo->delete();
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'equipo'=>$equipo
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El equipo no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }

}
