<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>@yield('titulo', 'ANFA') | ANFA</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @yield("styles")
        <!-- Font Awesome -->
        <link rel="stylesheet" href="{{asset("assets/$theme/plugins/fontawesome-free/css/all.min.css")}}">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- SweetAlert2 -->
        <link rel="stylesheet" href="{{asset("assets/$theme/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css")}}">
        <!-- Toastr -->
        <link rel="stylesheet" href="{{asset("assets/$theme/plugins/toastr/toastr.min.css")}}">
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="{{asset("assets/$theme/plugins/overlayScrollbars/css/OverlayScrollbars.min.css")}}">
        <!-- Select2 -->
        <link rel="stylesheet" href="{{asset("assets/$theme/plugins/select2/css/select2.min.css")}}">
        <!-- Theme style -->
        <link rel="stylesheet" href="{{asset("assets/$theme/dist/css/adminlte.min.css")}}">
        <!-- Google Font: Source Sans Pro -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
        <!-- DataTables -->
        <link rel="stylesheet" href="{{asset("assets/$theme/plugins/DataTables/media/css/dataTables.bootstrap4.css")}}">
    </head>

    <body class="hold-transition sidebar-mini layout-fixed">
        <!-- Site wrapper -->
        <div class="wrapper">

            <!-- Inicio Navbar -->
            @include("theme/$theme/navbar")
            <!-- Fin Navbar -->

            <!-- Inicio aside -->
            @include("theme/$theme/aside")
            <!-- Fin aside -->

            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    @yield('contenidoHeader')
                </section>

                <!-- Main content -->
                <section class="content">
                    @yield('contenido')
                </section>
                <!-- /.content -->
            </div>

            <!-- Inicio footer -->
            @include("theme/$theme/footer")
            <!-- Fin footer -->

            <!-- Inicio asidepersonalizacion -->
            @include("theme/$theme/personalizacion")
            <!-- Fin asidepersonalizacion -->

        </div>
    </body>
    <!-- jQuery -->
    <script src="{{asset("assets/$theme/plugins/jquery/jquery.min.js")}}"></script>
    <script src="{{asset("assets/$theme/plugins/moment/moment.min.js")}}"></script>
    <!-- Bootstrap 4 -->
    <script src="{{asset("assets/$theme/plugins/bootstrap/js/bootstrap.bundle.min.js")}}"></script>
    <!-- SweetAlert2 -->
    <script src="{{asset("assets/$theme/plugins/sweetalert2/sweetalert2.min.js")}}"></script>
    <!-- Toastr -->
    <script src="{{asset("assets/$theme/plugins/toastr/toastr.min.js")}}"></script>
    <!-- overlayScrollbars -->
    <script src="{{asset("assets/$theme/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js")}}"></script>
    <!-- FastClick -->
    <script src="{{asset("assets/$theme/plugins/fastclick/fastclick.js")}}"></script>
    <!-- AdminLTE App -->
    <script src="{{asset("assets/$theme/dist/js/adminlte.min.js")}}"></script>
    <!-- Select2 -->
    <script src="{{asset("assets/$theme/plugins/select2/js/select2.full.min.js")}}"></script>
    {{-- Valida rut --}}
    <script src="{{asset("assets/$theme/plugins/validarut-chileno/jquery.rut.chileno.js")}}"></script>
    <!-- DataTables -->
    <script src="{{asset("assets/$theme/plugins/DataTables/media/js/jquery.dataTables.js")}}"></script>
    <script src="{{asset("assets/$theme/plugins/DataTables/media/js/dataTables.bootstrap4.js")}}"></script>
    <script src="js/usuarios.js"></script>

    @yield("scripts")

    <script>
        $(function () {
            //Initialize Select2 Elements
            $('.select2').select2()
        })
    </script>
</html>

@toastr_render
