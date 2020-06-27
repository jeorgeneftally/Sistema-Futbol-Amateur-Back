<?php

namespace App\Http\Middleware;

use Closure;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //comprobar si el usuario esta identificado
        //en la cabezera es donde viene el token en las peticiones, se debe especificar Authorization
        $token=$request->header('Authorization');  
        $jwtAuth=new \JwtAuth();
        //checkea si el usuario esta logeado
        $checkToken=$jwtAuth->checkToken($token);

        if($checkToken){
            return $next($request);
        }else{
            $data=array(
                'code'=>400,
                'status'=>'error',
                'message'=>'el usuario no esta identificado'
            );
            return response()->json($data,$data['code']);
        }
    }
}
