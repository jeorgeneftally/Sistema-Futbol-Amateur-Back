<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class UserController extends Controller
{
   /**
     * funcion para listar todos los usuarios registrados
     */

    public function index(){
        $users=User::all();

        if(is_object($users)){
            $data=array(
                'code'=>200,
                'status'=>'success',
                'users'=>$users
            );
        }else{
            $data=array(
                'code'=>404,
                'status'=>'error',
                'message'=>'Los usuarios no existen'
            );
        }
        return response()->json($data,$data['code']);
    }


    /**
     * funcion para obtener un usuario por id
     */
    public function show($id){
        $user=User::find($id);

        if(is_object($user)){
            $data=array(
                'code'=>200,
                'status'=>'success',
                'user'=>$user
            );
        }else{
            $data=array(
                'code'=>404,
                'status'=>'error',
                'message'=>'El usuario no existe'
            );
        }
        return response()->json($data,$data['code']);
    }

    /**
     * funcion para registrar un nuevo usuario
     */
    public function register(Request $request){
        
        //recoger los datos del usuario enviados por post
        $json=$request->input('json',null);
        $params=json_decode($json);               //decodifica los datos en un objeto
        $params_array=json_decode($json,true);    //decodifica los datos en un array

        //limpiar datos (quita espacios en blanco)
        $params_array=array_map('trim',$params_array);

        //validar datos
        if(!empty($params) && !empty($params_array)){

            $validate=\Validator::make($params_array,[
                'name'      =>'required|alpha',
                'surname'   =>'required|alpha',
                'email'     =>'required|email|unique:users',  //unique:users, verifica que sea unico en la tabla usuarios(no puede haber 2 usuarios con le mismo correo)
            ]);

            if($validate->fails()){
                $data=array(
                    'status' =>'error',
                    'code'   =>404,
                    'message'=>'El usuario no se ha creado',
                    'errores'=>$validate->errors()
                );
            }else{
                //cifrar la contraseña
                $pwd=hash('sha256',$params->password);

                //crear el usuario
                $user=new User();
                $user->name=$params_array['name'];
                $user->surname=$params_array['surname'];
                $user->email=$params_array['email'];
                $user->password=$pwd;
                $user->profesion=$params_array['profesion'];
                $user->role=$params_array['role'];
                $user->estado=$params_array['estado'];
                
                //guardar el usuario
                $user->save();
                $data=array(
                    'status' =>'success',
                    'code'   =>200,
                    'message'=>'El usuario se ha creado',
                    'user'   =>$user
                );
            }

        }else{
            $data=array(
                'status' =>'error',
                'code'   =>404,
                'message'=>'Los datos no se han ingresado correctamente',
            );
        }

        return response()->json($data,$data['code']);
    }

   
    /**
     * login permite al usuario logearse en el servidor, utiliza nuestra clase jwtAuth para verificar 
     * si los datos ingresados son correctos y recibir el token o datos de regreso
     */
    public function login(Request $request){

        $jwtAuth=new \JwtAuth();
        //recibir datos por POST
        $json=$request->input('json',null);  
        $params=json_decode($json);
        $params_array=json_decode($json,true);

        //validar los datos
        $validate=\Validator::make($params_array,[
            'email'     =>'required|email',  
            'password'  =>'required'
        ]);

        if($validate->fails()){
            $signup=array(
                'status' =>'error',
                'code'   =>404,
                'message'=>'El usuario no se ha podido identificar',
                'errores'=>$validate->errors()
            );
        }else{
            //cifrar la password
            $pwd=hash('sha256',$params->password);
            //logea al usuario con la funcion signup en jwtAuth y recibe el token
            $signup=$jwtAuth->signup($params->email,$pwd);

            if(!empty($params->gettoken)){
                //logea al usuario con la funcion signup en jwtAuth y recibe los datos decodificados
                $signup=$jwtAuth->signup($params->email,$pwd,true);
            }
        }
        
        return response()->json($signup,200); 
    }

    /**
     * update actualia el user con los datos que recibe por parametro
     */
    public function update(Request $request){   

        //comprobar si el usuario esta identificado
        $token=$request->header('Authorization');  //en la cabezera es donde viene el token en las peticiones, se debe especificar Authorization
        $jwtAuth=new \JwtAuth();                
        $checkToken=$jwtAuth->checkToken($token);

        //recoger los datos por post
        $json=$request->input('json',null);
        $params_array=json_decode($json,true);
        
        if($checkToken && !empty($params_array)){

            //sacar usuario identificado
            $user=$jwtAuth->checkToken($token,true); //le solicita los datos al token (token posee los datos del usuario logeado), por ello el segundo parametro es true para que entrege los datos (y no el token cifrado)
           
            //validar los datos
            $validate=\Validator::make($params_array,[
                'name'=>'required|alpha',
                'surname'=>'required|alpha',
                'email'=>'required|email|unique:users'.$user->sub  //solo puede repetir el email con el usuario que realiza la peticion de actualizacio(sub hace referencia al id, asi esta especificado en JwtAuth)
            ]);

            //quitar los campos que no quiero actualizar 
            //la funcion unset permite que el parametro especificado NO se actualice
            unset($params_array['id']);                  
            unset($params_array['password']);
            unset($params_array['created_at']);
            unset($params_array['remember_token']);
            //ESTOS DATOS NO DEBERIAN LLEGAR SE DEBE ARREGLAR PROBLEMA EN EL FRONT, POR MIENTRAS SE DESACTIVAN
            unset($params_array['sub']);
            unset($params_array['iat']);
            unset($params_array['exp']);

            //actualizar usuario en la bdd
            $user_update=User::where('id',$user->sub)->update($params_array);

            //devolver array con el resultado
            $data=array(
                'code'=>200,
                'status'=>'success',
                'user'=>$user,
                'changes'=>$params_array
            );


        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'el usuario no esta identificado'
            );
        }

        return response()->json($data,$data['code']);
        
    }

    /**
     * upload permite guardar una imagen en el servidor
     */
    public function upload(Request $request){

        //Recoger datos de la petición
        $image=$request->file('file0');

        //validación de la imagen
        $validate=\Validator::make($request->all(),[
            'file0'=>'required|image|mimes:jpg,jpeg,png,gif'
        ]);

        //Guardar imagen
        if(!$image || $validate->fails()){

            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'Error al subir imagen'
            );
            
        }else{

            //asignar nombre a la imagen
            $image_name=time().$image->getClientOriginalName();
            //asignar lugar donde se guardara la imagen en este caso en storage\app\users, se debe configurar 
            //carpeta users en filesystems.php en config, para que pueda guardar las imagenes
            \Storage::disk('users')->put($image_name,\File::get($image));
        
            $data=array(
                'code'=>200,
                'status'=>'success',
                'image'=>$image_name,
            );
        }

        return response()->json($data,$data['code']);
    }

    /**
     * getImage retorna la imagen del servidor, obtiendo el nombre del archivo y luego
     * buscandola en la carpeta de almacenamiento
     */
    public function getImage($filename){
        //verificar si existe el archivo
        $isset=\Storage::disk('users')->exists($filename);  
        if($isset){
            $file=\Storage::disk('users')->get($filename);
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

    public function destroy($id,Request $request){
        //conseguir el registro 
        $user=User::where('id',$id)->first();
        if(!empty($entrevista)){

            //Borrar el registro
            $user->delete();
            
            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'user'=>$user
            ];
        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El user no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }


   
    public function role($id){

        //conseguir el registro 
        $user=User::where('id',$id)->update(['role'=>'Role_Admin']);

        if(!empty($user)){

            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'user'=>$user
            ];

        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El user no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }


    public function disable($id){

        //conseguir el registro 
        $user=User::where('id',$id)->update(['estado'=>'Inactivo']);

        if(!empty($user)){

            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'user'=>$user
            ];

        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El user no existe'
            ];
        }
        

        return response()->json($data,$data['code']);
    }

    public function habilitar($id){

        //conseguir el registro 
        $user=User::where('id',$id)->update(['estado'=>'Activo']);

        if(!empty($user)){

            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'user'=>$user
            ];

        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El user no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }

    public function roleU($id){

        //conseguir el registro 
        $user=User::where('id',$id)->update(['role'=>'Role_User']);

        if(!empty($user)){

            //Devolver una respuesta
            $data=[
                'code'=>200,
                'status'=>'success',
                'user'=>$user
            ];

        }else{
            $data=[
                'code'=>404,
                'status'=>'error',
                'message'=>'El user no existe'
            ];
        }
        return response()->json($data,$data['code']);
    }
}
