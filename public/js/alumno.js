$(function () {

    $("#botonguardar" ).click(function() {
        $("#mdlAgregar").modal();
    });

    $('.cancelar_upd').click(function(){
        event.preventDefault();
        $('#mdlActualizar').modal('hide');
        $('#erroresAlert, #erroresAlert_upd').hide();
        $('#erroresText, #erroresText_upd').html("");
        removerClasesUpd();
   
    });

    $('.cancelar').click(function(){
        event.preventDefault();
        $('#mdlAgregar').modal('hide');
        $('#erroresAlert, #erroresAlert_upd').hide();
        $('#erroresText, #erroresText_upd').html("");
        reseteoError();     
        removerClases();
 
    });


    //Funcion para eliminar un Alumno usando Ajax
    $(document).on('click','a.delete-record', function(){
        event.preventDefault();
        var x = $(this);
        var delete_url = x.attr('href');
        console.log(delete_url);
        Swal.fire({
            title: '¿Desea eliminar el registro asociado al alumno?',
            text: "Los datos no podrán ser recuperados!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: 'DELETE',
                    url: delete_url,
                    data: $('#form_agregar').serialize(),
                    success: function (data) {
                        Swal.fire(
                            'Eliminado!',
                            'El alumno se ha eliminado satisfactoriamente.',
                            'success'
                        );
                        $("#tabla-contenido").load(location.href + " #tabla-contenido");
                        // setTimeout(location.reload.bind(location), 1500);
                    },
                    error: function () {
                        toastr.error('Error, intente más tarde');
                    }
                });
            }
        });
    });

    //Funcion para enviar los datos al formulario
    $(document).on('click', 'a.update-record', function () {
        formateoUpdate();
        event.preventDefault();
        $("#mdlActualizar").modal();
        var x = $(this);
        var catch_url = x.attr('href');
         console.log('hola'+catch_url);
        $.get(catch_url,function(data){
            console.log(data.id);
            $('#id_alumno_upd').val(data.id);
            $('#rut_alumno_upd').val(data.rut);
            $('#nombres_upd').val(data.nombres);
            $('#apellido_paterno_upd').val(data.apellido_paterno);
            $('#apellido_materno_upd').val(data.apellido_materno);
            $('#anio_ingreso_upd').val(data.anyo_ingreso);

        });
    });
    //Función para editar
    $(document).on('click', 'a.edit-record', function () {
        html_errores=rut_error+nombre_error+apellidoP_error+apellidoM_error+anio_error;
        if(html_errores!=''){
            event.preventDefault();
            $('#errores').html(html_errores);
            $('#errores').show();
        }else{
            html_errores='';
            $('#errores').hide();
            $('#errores').html(html_errores);
            event.preventDefault();
            var x = $(this);
            var update_url = x.attr('href');
            var id=$('#id_alumno_upd').val();
            var rut=$('#rut_alumno_upd').val();
            var nombres=$('#nombres_upd').val();
            var apellido_paterno=$('#apellido_paterno_upd').val();
            var apellido_materno=$('#apellido_materno_upd').val();
            var anio_ingreso=$('#anio_ingreso_upd').val();

            var formData = new FormData();
            var files = $('#foto_upd')[0].files[0];
            console.log(files);
            formData.append('imagen',files);
            formData.append('id',id);
            formData.append('rut',rut);
            formData.append('nombres',nombres);
            formData.append('apellido_paterno',apellido_paterno);
            formData.append('apellido_materno',apellido_materno);
            formData.append('anio_ingreso',anio_ingreso);

            $.ajax({
                type: "POST",
                url: update_url,
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    console.log(data);
                    $('#mdlActualizar').modal('hide');
                    $('#erroresAlert, #erroresAlert_upd').hide();
                    removerClasesUpd();     
                    Swal.fire(
                        'Actualizado!',
                        'El alumno se ha actualizado satisfactoriamente.',
                        'success'
                    );
                    $("#tabla-contenido").load(location.href + " #tabla-contenido");
                },
                error: function () {
                    toastr.error('Error, intente más tarde');
                }
            });
        }
    });

    $(document).ready(function() {
        $('#tabla-contenido').DataTable( {
            "language": {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla =(",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            },
            "ordering": false
        } );
    } );
});

// Validar datos
var namePattern = "^[a-z A-ZñáéíóúÁÉÍÓÚ]{4,60}$";
var apellidoPattern = "^[a-z A-ZñáéíóúÁÉÍÓÚ]{4,30}$";
var anioPattern=/^(\d{4})$/g;
var validaRut;
var html_errores='';
var rut_error='<p> El rut no es válido o no tiene el formato adecuado</p>';
var nombre_error='<p> El nombre debe tener de 4 a 60 caracteres </p>';
var apellidoP_error='<p> El apellido paterno debe tener de 4 a 30 caracteres </p>';
var apellidoM_error='<p> El apellido materno debe tener de 4 a 30 caracteres </p>';
var anio_error='<p> Formato de año incorrecto </p>';

$(function() {
    $('#erroresAlert, #erroresAlert_upd').hide();

    $('#agregar_alumno, #guardar-modal').on('click',function(){
        html_errores=rut_error+nombre_error+apellidoP_error+apellidoM_error+anio_error;
        if(html_errores!=''){
            event.preventDefault();
            $('#erroresText, #erroresText_upd').html(html_errores);
            $('#erroresAlert, #erroresAlert_upd').show();
        }else{
            html_errores='';
            $('#erroresAlert, #erroresAlert_upd').hide();
            //$('#erroresText, #erroresText_upd').html(html_errores);
        }
    })

    validaRut=$('#rut_alumno, #rut_alumno_upd').rut({
        fn_error : function(input){
            $('#rut_alumno, #rut_alumno_upd').addClass("is-invalid");
            toastr.error('El rut: ' + input.val() + ' es incorrecto');
            rut_error='<p> El rut no es válido o no tiene el formato adecuado</p>';
        },fn_validado:function(){
            $('#rut_alumno, #rut_alumno_upd').removeClass("is-invalid");
            $('#rut_alumno, #rut_alumno_upd').addClass("is-valid");
            rut_error='';
        }
    });

    $('#nombres, #nombres_upd').on('blur',function(){
        if(!checkInput($(this), namePattern)){
            $(this).addClass("is-invalid");
            toastr.error('El nombre debe tener de 4 a 60 caracteres ' );
            nombre_error='<p> El nombre debe tener de 4 a 60 caracteres </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            nombre_error='';
        }
    });

    $('#apellido_paterno, #apellido_paterno_upd').on('blur',function(){
        if(!checkInput($(this), apellidoPattern)){
            $(this).addClass("is-invalid");
            toastr.error('El apellido paterno debe tener de 4 a 30 caracteres  ' );
            apellidoP_error='<p> El apellido paterno debe tener de 4 a 30 caracteres </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            apellidoP_error='';
        }
    });

    $('#apellido_materno, #apellido_materno_upd').on('blur',function(){
        if(!checkInput($(this), apellidoPattern)){
            $(this).addClass("is-invalid");
            toastr.error('El apellido materno debe tener de 4 a 30 caracteres  ' );
            apellidoM_error='<p> El apellido materno debe tener de 4 a 30 caracteres </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            apellidoM_error='';
        }
    });


    $('#anio_ingreso, #anio_ingreso_upd').on('blur',function(){
        if(!checkInput($(this), anioPattern)){
            $(this).addClass("is-invalid");
            toastr.error('Formato de año incorrecto' );
            anio_error='<p> Formato de año incorrecto </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            anio_error='';
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

function removerClasesUpd(){
    $('#rut_alumno_upd').removeClass("is-invalid");
    $('#rut_alumno_upd').removeClass("is-valid");

    $('#nombres_upd').removeClass("is-invalid");
    $('#nombres_upd').removeClass("is-valid");

    $('#apellido_paterno_upd').removeClass("is-invalid");
    $('#apellido_paterno_upd').removeClass("is-valid");

    $('#apellido_materno_upd').removeClass("is-invalid");
    $('#apellido_materno_upd').removeClass("is-valid");

   

    $('#anio_ingreso_upd').removeClass("is-invalid");
    $('#anio_ingreso_upd').removeClass("is-valid");
}

function removerClases(){
    $('#rut_alumno').removeClass("is-invalid");
    $('#rut_alumno').removeClass("is-valid");
    $('#rut_alumno').val("");

    $('#nombres').removeClass("is-invalid");
    $('#nombres').removeClass("is-valid");
    $('#nombres').val("");

    $('#apellido_paterno').removeClass("is-invalid");
    $('#apellido_paterno').removeClass("is-valid");
    $('#apellido_paterno').val("");

    $('#apellido_materno').removeClass("is-invalid");
    $('#apellido_materno').removeClass("is-valid");
    $('#apellido_materno').val("");

    $('#anio_ingreso').removeClass("is-invalid");
    $('#anio_ingreso').removeClass("is-valid");
    $('#anio_ingreso').val("");
}

function reseteoError(){
    html_errores='';
    rut_error='<p> El rut no es válido o no tiene el formato adecuado</p>';
    nombre_error='<p> El nombre debe tener de 4 a 60 caracteres </p>';
    apellidoP_error='<p> El apellido paterno debe tener de 4 a 30 caracteres </p>';
    apellidoM_error='<p> El apellido materno debe tener de 4 a 30 caracteres </p>';
    anio_error='<p> Formato de año incorrecto </p>';

}

function formateoUpdate(){
    html_errores='';
    rut_error='';
    nombre_error='';
    apellidoP_error='';
    apellidoM_error='';
    anio_error='';
}