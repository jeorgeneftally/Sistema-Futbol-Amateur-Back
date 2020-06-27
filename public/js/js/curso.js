$(function () {
    // console.log('Estoy en niveles');
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
        removerClases();

    });

    //Funcion para eliminar un Curso usando Ajax
    $(document).on('click','a.delete-record', function(){
        event.preventDefault();
        var x = $(this);
        var delete_url = x.attr('data-href')+'/'+x.attr('data-id');
        // alert(delete_url);
        // alert(delete_url);
        Swal.fire({
            title: '¿Desea eliminar el curso?',
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
                            'La actividad se ha eliminado satisfactoriamente.',
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

    $(document).on('click', 'a.update-record', function () {
        event.preventDefault();
        $("#mdlActualizar").modal();
        var x = $(this);
        var catch_url = x.attr('href');
        // alert(catch_url);
        $.get(catch_url,function(data){
            // alert(data.rut_apoderado);
            $('#id_curso_upd').val(data.id);
            $('#nombre_upd').val(data.nombre);
            console.log($('#id_curso_upd').val(data.id));
        });
    });

    $(document).on('click', 'a.edit-record', function () {
        html_errores=curso_error;

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
            var id=$('#id_curso_upd').val();
            var nombre=$('#nombre_upd').val();


            $.ajax({
                type: "POST",
                url: update_url,
                data: {id:id,nombre:nombre},
                success: function(data){
                    console.log(data);
                    $('#mdlActualizar').modal('hide');
                    $('#erroresAlert, #erroresAlert_upd').hide();
                    removerClasesUpd();
                    Swal.fire(
                        'Actualizado!',
                        'El curso se ha actualizado satisfactoriamente.',
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
var cursoPattern = "^[a-z A-ZñáéíóúÁÉÍÓÚ° 1-9]{3,20}$";
var html_errores='';
var curso_error='';

$(function() {
    $('#erroresAlert, #erroresAlert_upd').hide();

    $('#agregar_curso, #guardar-modal').on('click',function(){
        html_errores=curso_error;
        if(html_errores!=''){
            event.preventDefault();
            $('#erroresText, #erroresText_upd').html(html_errores);
            $('#erroresAlert, #erroresAlert_upd').show();
        }else{
            html_errores='';
            $('#erroresAlert, #erroresAlert_upd').hide();
            //$('#erroresText, #erroresText_upd').html(html_errores);
        }
    });

    $('#nombre, #nombre_upd').on('blur',function(){
        if(!checkInput($(this), cursoPattern)){
            $(this).addClass("is-invalid");
            toastr.error('El nombre del curso debe tener de 3 a 20 caracteres ' );
            curso_error='<p> El nombre del curso debe tener de 3 a 20 caracteres </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            curso_error='';
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
    $('#nombre_upd').removeClass("is-invalid");
    $('#nombre_upd').removeClass("is-valid");


}

function removerClases(){
    $('#nombre').removeClass("is-invalid");
    $('#nombre').removeClass("is-valid");
    $('#nombre').val("");


}


