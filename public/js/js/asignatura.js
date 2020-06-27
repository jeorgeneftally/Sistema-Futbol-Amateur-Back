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
        removerClases();

    });


    //Funcion para eliminar una Asignatura usando Ajax
    $(document).on('click','a.delete-record', function(){
        event.preventDefault();
        var x = $(this);
        var delete_url = x.attr('data-href')+'/'+x.attr('data-id');
        // alert(delete_url);
        Swal.fire({
            title: '¿Desea eliminar la asignatura?',
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
                            'La asignatura se ha eliminado satisfactoriamente.',
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
        alert(catch_url);
        $.get(catch_url,function(data){
            // alert(data.rut_apoderado);
            $('#id_asignatura_upd').val(data.id_asignatura);
            $('#nombre_upd').val(data.nombre);
        });
    });

    $(document).on('click', 'a.edit-record', function () {

        html_errores=asignatura_error;

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
            var id=$('#id_asignatura_upd').val();
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
                        'La asignatura se ha actualizado satisfactoriamente.',
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
var asignaturaPattern = "^[a-z A-ZñáéíóúÁÉÍÓÚ 1-9]{3,60}$";
var html_errores='';
var asignatura_error='';


$(function() {
    $('#erroresAlert, #erroresAlert_upd').hide();

    $('#agregar_asignatura, #guardar-modal').on('click',function(){
        html_errores=asignatura_error;
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
        if(!checkInput($(this), asignaturaPattern)){
            $(this).addClass("is-invalid");
            toastr.error('El nombre de la asignatura debe tener de 3 a 60 caracteres ' );
            asignatura_error='<p> El nombre de la asignatura debe tener de 3 a 60 caracteres </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            asignatura_error='';
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
