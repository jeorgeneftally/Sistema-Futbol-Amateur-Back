<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Middleware\ApiAuthMiddleware;


//RUTAS PARA USER
Route::get('/user','UserController@index');
Route::get('/user/{id}','UserController@show');
Route::post('/user','UserController@register');
Route::post('/user/login','UserController@login');
Route::put('/user/update','UserController@update');
Route::post('/user/upload','UserController@upload')->middleware(ApiAuthMiddleware::class);
Route::get('/user/image/{filename}','UserController@getImage');
Route::put('/userRole/{id}','UserController@role');
Route::put('/userRoleU/{id}','UserController@roleU');
Route::put('/userDisable/{id}','UserController@disable');
Route::put('/userHabilitar/{id}','UserController@habilitar');
Route::delete('/user/{id}','UserController@destroy');

//rutas Jugadores
Route::get('/jugadores','JugadorController@index');
Route::get('/jugador/{id}','JugadorController@show');
Route::post('/jugador','JugadorController@store');
Route::put('/jugador/{id}','JugadorController@update');
Route::post('/jugador/upload','JugadorController@upload');
Route::get('/jugador/image/{filename}','JugadorController@getImage');
Route::delete('/jugador/{id}','JugadorController@destroy');

//rutas Campeonato
Route::get('/campeonatos','CampeonatoController@index');
Route::get('/campeonato/{id}','CampeonatoController@show');
Route::post('/campeonato','CampeonatoController@store');
Route::put('/campeonato/{id}','CampeonatoController@update');
Route::delete('/campeonato/{id}','CampeonatoController@destroy');
Route::get('/campeonato/tabla/{id}','CampeonatoController@tabla');

//rutas Equipo
Route::get('/equipos','EquipoController@index');
Route::get('/equipo/{id}','EquipoController@show');
Route::post('/equipo','EquipoController@store');
Route::put('/equipo/{id}','EquipoController@update');
Route::delete('/equipo/{id}','EquipoController@destroy');

//rutas Tabla
Route::get('/tablas','TablaController@index');
Route::get('/tabla/{id}','TablaController@show');
Route::post('/tabla','TablaController@store');
Route::put('/tabla/{id}','TablaController@update');
Route::delete('/tabla/{id}','TablaController@destroy');

//rutas Punto
Route::get('/puntos','PuntoController@index');
Route::get('/punto/{id}','PuntoController@show');
Route::post('/punto','PuntoController@store');
Route::put('/punto/{id}','PuntoController@update');
Route::delete('/punto/{id}','PuntoController@destroy');

//rutas Serie
Route::get('/series','SerieController@index');
Route::get('/serie/{id}','SerieController@show');
Route::post('/serie','SerieController@store');
Route::put('/serie/{id}','SerieController@update');
Route::delete('/serie/{id}','SerieController@destroy');
Route::get('/serie/jugador/{id}{ids}','SerieController@jugadoresporserie');

//rutas estadio
Route::get('/estadios','EstadioController@index');
Route::get('/estadio/{id}','EstadioController@show');
Route::post('/estadio','EstadioController@store');
Route::put('/estadio/{id}','EstadioController@update');
Route::delete('/estadio/{id}','EstadioController@destroy');

//rutas Arbitro
Route::get('/arbitros','ArbitroController@index');
Route::get('/arbitro/{id}','ArbitroController@show');
Route::post('/arbitro','ArbitroController@store');
Route::put('/arbitro/{id}','ArbitroController@update');
Route::delete('/arbitro/{id}','ArbitroController@destroy');


Route::get('/', function () {
    return view('/welcome');
});

Route::get('/hola', function () {
    return "<h1>bienvenido</h1>";
});
//Rutas del controlador de usuario
//Route::get('/api/estudiante','EstudianteController@index');
//Route::post('/api/login','UserController@login');
//Route::put('/api/user/update','UserController@update');
//Route::post('/api/user/upload','UserController@upload')->middleware(ApiAuthMiddleware::class);
//Route::get('/api/user/avatar/{filename}','UserController@getImage');   //retorna la imagen que se entrega por url
