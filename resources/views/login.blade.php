<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ANFA | Ingresar</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{asset("assets/$theme/plugins/icheck-bootstrap/icheck-bootstrap.min.css")}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset("assets/$theme/dist/css/adminlte.min.css")}}">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

    {{-- <link href="{{asset("css/app.css")}}" rel="stylesheet"> --}}
    <style type="text/css">
  body {
    background-image: url("https://pamboleros.com/wp-content/uploads/2017/08/VIR_31068_3040_cuanto_sabes_de_estadios_de_futbol_version_lfp-768x514.jpg") !important;
    background-position: center !important;
    background-size: cover !important;
    background-attachment: fixed !important;
    }
  </style>
</head>

<body class="hold-transition login-page" >
    <div class="login-box">
        <div class="login-logo">
            <a href=""><b style="color:white;">Sistema ANFA</b></a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Por favor, ingresa tu cuenta</p>

                <form action="{{url('/verificar')}}" method="post" id="form_agregar">
                    {{csrf_field()}}
                    <div class="input-group mb-3">
                        <div class="input-group">
                            <input {{ $errors->has('correo') ? 'has-error': '' }} type="text" class="form-control"
                                placeholder="Ingrese su correo" name="correo" id="correo" value="{{old('rut')}}">

                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input {{ $errors->has('password') ? 'has-error': '' }} type="password" class="form-control"
                            placeholder="Ingrese su contraseña" name="password" id="password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                        <div id="password_error">
                            {!!$errors->first('password','<small class="error help-block"
                                style="float: left; color:#f41035;">:message</small>')!!}
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-12 form-group">
                            {{-- <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label for="remember">
                                    Recordar contraseña
                                </label>
                            </div> --}}
                            <button id="boton-ingresar" type="submit"
                                class="btn btn-primary btn-block">Ingresar</button>
                        </div>
                        <!-- /.col -->
                        {{-- <button id="boton-ingresar" type="submit" class="btn btn-primary btn-block">Ingresar</button> --}}
                        <!-- /.col -->
                    </div>
                </form>

               

            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->

   

    <!-- jQuery -->
    <script src="{{asset("assets/$theme/plugins/jquery/jquery.min.js")}}"></script>
    <!-- Bootstrap 4 -->
    <script src="{{asset("assets/$theme/plugins/bootstrap/js/bootstrap.bundle.min.js")}}"></script>
    {{-- Valida rut --}}
    <script src="{{asset("assets/$theme/plugins/validarut-chileno/jquery.rut.chileno.login.js")}}"></script>


    <script>
        $(document).on('click', '#boton-ingresar', function () {

            if ($('#rut').val() == "") {
                event.preventDefault();
                $('#rut_error').empty();
                $('#rut').addClass("is-invalid");
                $('#rut_error').html('<small class="help-block" style="float: left; color:#f41035;">El RUT no es válido o no tiene el formato adecuado.</small>');
            }

            if ($('#password').val() == "") {
                event.preventDefault();
                $('#password_error').empty();
                $('#password').addClass("is-invalid");
                $('#password_error').html('<small class="help-block" style="float: left; color:#f41035;">La contraseña debe tener entre 8 y 16 caracteres y contener al menos una mayúscula, una minúscula y un número.</small>');
            }
        });

            $('#password').on('blur',function(){
                if(!checkInput($(this), passPattern)){
                    $('#password_error').empty();
                    $(this).addClass("is-invalid");
                    $('#password_error').html('<small class="help-block" style="float: left; color:#f41035;">La contraseña debe tener entre 8 y 16 caracteres y contener al menos una mayúscula, una minúscula y un número.</small>');
                }else{
                    $('#password_error').empty();
                    $(this).removeClass("is-invalid");
                    $(this).addClass("is-valid");
                }
            });
        });

        // //valida que calze un input en base a un patron especificado
        function checkInput(idInput, pattern) {

            if($(idInput).val().match(pattern)){
                return true
            }else{

                return false
            }
        }
    </script>

</body>

</html>
