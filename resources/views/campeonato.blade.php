@extends("theme.$theme.layout")

@section('titulo')
    Administrar Campeonatos
@endsection

@section('contenidoHeader')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Administrar Campeonatos</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                    <li class="breadcrumb-item active">Administrar Campeonatos</li>
                </ol>
            </div>
        </div>
    </div><!-- /.container-fluid -->
@endsection

@section('contenido')

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Listado de Campeonatos</h3>
                    <div class="card-tools">
                        <div class="input-group input-group-sm">
                            <div class="input-group-append">
                                <button id="botonguardar" type="button" class="btn btn-success " style="width: 190px"><i class="fas fa-plus-square"></i>&nbsp Agregar Alumno</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <table id="tabla-contenido" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Registrado por</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        @foreach ($campeonatos as $campeonato)
                                <tr>
                                    <td>{{$loop->iteration}}</td>
                                    <td>{{$campeonato->nombre}}</td>
                                    <td>{{$campeonato->descripcion}}</td>
                                    <td>{{$campeonato->user->name}} {{$campeonato->user->surname}}</td>    
                                    <td>botones</td> 
                                </tr>
                                @endforeach
                        </tbody>
                    </table>
                </div>
                        <!-- /.card-body -->
            </div>
        </div>
    </div>
</div>

{{-- Modal para agregar un campeonato --}}
<form action="{{url('/campeonato')}}" method="post" id="form_agregar" name="form_agregar"  enctype="multipart/form-data" >
    {{ csrf_field() }}
    <div class="modal fade" id="mdlAgregar">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Agregar Alumno</h4>
                    <button type="button" class="close cancelar" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <div class="alert alert-danger alert-dismissible  fade show" id="erroresAlert" role="alert">
                                    <div id="erroresText"></div>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="rut_alumno">{{'RUT'}}</label>
                                    <input autocomplete="off"   type="text" name="rut_alumno" id="rut_alumno" class="form-control" onblur="return Rut(form_agregar.rut_alumno.value)" placeholder="11.111.111-1" required >
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="nombres">{{'Nombres'}}</label>
                                    <input autocomplete="off" required="true" placeholder="Primer y segundo nombre" type="text" name="nombres" id="nombres" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="apellido_paterno">{{'Apellido Paterno'}}</label>
                                    <input autocomplete="off" required="true" placeholder="Apellido paterno" type="text" name="apellido_paterno" id="apellido_paterno" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="apellido_materno">{{'Apellido Materno'}}</label>
                                    <input autocomplete="off" required="true" placeholder="Apellido materno" type="text" name="apellido_materno" id="apellido_materno" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="anio_ingreso">{{'Año Ingreso'}}</label>
                                    <input autocomplete="off" required placeholder="Año ingreso del alumno" type="number" name="anio_ingreso" id="anio_ingreso" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="anio_ingreso">{{'Subir Imagen'}}</label>
                                    <input type="file" name="foto" id="foto" class="form-control-file" accept=".jpg,.jpeg,.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" id="cancelar"class="btn btn-default cancelar" data-dismiss="modal">Cancelar</button>
                    <button type="submit" id="agregar_alumno" class="btn btn-primary">Guardar</button>
                </div>
            </div>
              <!-- /.modal-content -->
        </div>
            <!-- /.modal-dialog -->
    </div>
</form>

{{-- Modal para actualizar un campeonato --}}
<form  id="form_actualizar">
    {{ csrf_field() }}
    <div class="modal fade" id="mdlActualizar">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Actualizar Alumno</h4>
                    <button type="button" class="close cancelar_upd" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12" >
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <div class="alert alert-danger alert-dismissible  fade show" id="erroresAlert_upd" role="alert">
                                    <div id="erroresText_upd"></div>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="rut_alumno">{{'RUT'}}</label>
                                    <input autocomplete="off" type="text" name="rut_alumno_upd" id="rut_alumno_upd" class="form-control" onblur="return Rut(form_agregar.rut_alumno.value)" placeholder="11.111.111-1" required >
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="nombres">{{'Nombres'}}</label>
                                    <input required autocomplete="off" required="true" placeholder="Primer y segundo nombre" type="text" name="nombres_upd" id="nombres_upd" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="apellido_paterno">{{'Apellido Paterno'}}</label>
                                    <input autocomplete="off" required="true" placeholder="Apellido paterno" type="text" name="apellido_paterno_upd" id="apellido_paterno_upd" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="apellido_materno">{{'Apellido Materno'}}</label>
                                    <input autocomplete="off" required="true" placeholder="Apellido materno" type="text" name="apellido_materno_upd" id="apellido_materno_upd" class="form-control">
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="anio_ingreso">{{'Año Ingreso'}}</label>
                                    <input autocomplete="off" required placeholder="Año ingreso del alumno" type="number" name="anio_ingreso_upd" id="anio_ingreso_upd" class="form-control">
                                </div>
                            </div>


							<div class="col-sm-6  ">
								<div class="form-group">
									<label for="foto_upd">Subir Imagen</label>
									<input type="file" class="form-control-file" name="imagen" id="foto_upd"  accept=".jpg,.jpeg,.png">
								</div>
							</div>
                            <!-- <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="foto">{{'Foto'}}</label>
                                    <input type="file" name="foto" id="foto">
                                </div>
                            </div> -->
                            <input type="hidden" value="" id="id_alumno_upd" name="id_alumno_upd">
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" id="cancelar"class="btn btn-default cancelar_upd" data-dismiss="modal">Cancelar</button>
                    <a id="guardar-modal" href=""
                    class="btn btn-xs btn-primary edit-record">Aceptar</a>
                    {{-- <button type="submit" id="update-event" class="btn btn-primary">Actualizar</button> --}}
                </div>
            </div>
              <!-- /.modal-content -->
        </div>
            <!-- /.modal-dialog -->
    </div>
</form>
@endsection


@section('scripts')
<script src="js/alumno.js"></script>
@endsection


