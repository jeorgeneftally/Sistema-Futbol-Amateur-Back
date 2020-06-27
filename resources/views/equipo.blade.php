@extends("theme.$theme.layout")

@section('titulo')
    Administrar Equipos
@endsection

@section('contenidoHeader')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Administrar Equipos</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                    <li class="breadcrumb-item active">Administrar Equipos</li>
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
                    <h3 class="card-title">Listado de Equipos</h3>
                    <div class="card-tools">
                        <div class="input-group input-group-sm">
                            <div class="input-group-append">
                                <button id="botonguardar" type="button" class="btn btn-success " style="width: 190px"><i class="fas fa-plus-square"></i>&nbsp Agregar Equipo</button>
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
                                <th>Campeonato</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        @foreach ($equipos as $equipo)
                                <tr>
                                    <td>{{$loop->iteration}}</td>
                                    <td>{{$equipo->nombre}}</td>
                                    <td>{{$equipo->descripcion}}</td>
                                    <td>{{$equipo->campeonato->nombre}}</td>    
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

@endsection
