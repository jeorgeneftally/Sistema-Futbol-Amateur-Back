<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Jugador;

class JugadorController extends Controller
{
    public function index(){
        $jugadores=Jugador::all()->load('Equipo','Serie');
        return response()->json([
            'code'=>200,
            'status'=>'success',
            'jugadores'=>$jugadores
        ],200);
    }

    public function show($id){
        $jugador=Jugador::find($id);

        if(is_object($jugador)){
            $data=[
                'code'=>200,
                'status'=>'success',
                'jugador'=>$jugador
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El jugador no existe'
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
                'rut' => 'required',
                'nombre' => 'required',
                'apellido' => 'required',
                'fecha_nacimiento' => 'required',

            ]);

            //guardar el estudiante
            if($validate->fails()){
                $data=[
                    'code'=>400,
                    'status'=>'error',
                    'message'=> 'No se ha guardado el jugador.'
                ];
            }else{
                //en caso de no haber errores, guarda el estudiante en la base de datos
                $jugador=new Jugador();
                $jugador->rut= $params_array['rut'];
                $jugador->nombre=$params_array['nombre'];
                $jugador->apellido=$params_array['apellido'];
                $jugador->fecha_nacimiento=$params_array['fecha_nacimiento'];
                $jugador->direccion=$params_array['direccion'];
                $jugador->telefono=$params_array['telefono'];
                $jugador->equipo_id=$params_array['equipo_id'];
                $jugador->serie_id=$params_array['serie_id'];
                $jugador->save();

                $data=[
                    'code'=>200,
                    'status'=>'success',
                    'jugador'=> $jugador
                ];
            }
        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun jugador.'
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
                'rut' => 'required',
                'nombre' => 'required',
            ]);

            //quitar los datos que no quiero actualizar
           // unset($params_array['id']);
            unset($params_array['created_at']);

            //actualizar el registro de modelo
            $jugador=Jugador::where('id',$id)->update($params_array);

            $data=[
                'code'=>200,
                'status'=>'success',
                'jugador'=>$params_array
            ];

        }else{
            $data=[
                'code'=>400,
                'status'=>'error',
                'message'=> 'No has enviado ningun jugador.'
            ];
        }
        return response()->json($data,$data['code']);
    }


    public function destroy($id,Request $request){
        //conseguir el registro 
        $jugador=Jugador::where('id',$id)->first();
        if(!empty($jugador)){

            //Borrar el registro
            $jugador->delete();
            
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'jugador'=>$jugador
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El jugador no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }


     /**
     * upload permite guardar una nueva imagen en la base de datos
     */
    public function upload(Request $request){

        //Recoger datos de la petición
        $imagen=$request->file('file0');

        //validación de la imagen
        $validate=\Validator::make($request->all(),[
            'file0'=>'required|image|mimes:jpg,jpeg,png,gif'
        ]);

        //Guardar imagen
        if(!$imagen || $validate->fails()){

            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'Error al subir imagen'
            );
            
        }else{

            //asignar nombre a la imagen
            $image_name=time().$imagen->getClientOriginalName();
            //guarda la imagen en el servidor, especificando la carpeta en este caso storage\app\products,
            //la carpeta products se debe configurar en filesystems.php para permitir que almacene archivos
            \Storage::disk('jugadores')->put($image_name,\File::get($imagen)); 
        
            $data=array(
                'code'=>200,
                'status'=>'success',
                'image'=>$image_name,
            );

        }

        return response()->json($data,$data['code']);
    }

    /**
     * getImage retorna la imagen almacenada en el servidor para ello debe recibir el nombre de la imagen
     * y buscarla en la carpeta especificada
     */
    public function getImage($filename){
        //verificar si existe el archivo
        $isset=\Storage::disk('jugadores')->exists($filename);  
        if($isset){
            $file=\Storage::disk('jugadores')->get($filename);
            return new Response($file,200);
        }else{
            $data=array(
                'code'=>404,
                'status'=>'error',
                'message'=>'La imagen no existe',
            );

            return response()->json($data,$data['code']);
        }
    }
     
}
