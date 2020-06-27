$(function () {
    // Al seleccionar la evaluación
    $('#evaluaciones').on('click', 'div', function () {
        $('#NombreEvaluacion').html(($(this).attr('name')));
        $("#calificacion_id").val($(this).attr('id'));
        $(".seleccionado").removeAttr('style');
        $(this).css({ "border": "solid 2px #FF0000" });
        $(this).addClass("seleccionado");
        // alert($("#calificacion_id").val($(this).attr('id')));
    })


    //Ajax para agregar evaluación
    $('#add-new-eval').click(function (e) {
        event.preventDefault();
        var eval = $('#new-eval').val();
        var curso = $('#curso_id_curso').val();
        if (eval.length == 0) {
            return
        }
        // alert(eval);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: "POST",
            url: '../notas/registrarEvaluacion',
            data: {
                '_token': $('input[name=_token]').val(),
                nombre: eval,
                curso_id_curso: curso
            },
            success: function (data) {
                $("#evaluaciones").load(location.href + " #evaluaciones");
            },
            error: function () {
                toastr.error('Error, intente más tarde');
            }
        });
    })


    //Valida el boton guardar
    $('#guardar-nota').click(function (e) {
        var calificacion_id = $('#calificacion_id').val();
        if (calificacion_id==""){
            event.preventDefault();
            toastr.warning('Debe seleccionar una evaluación', 'Advertencia!');
        }
    })
})

//Ajax Eliminar evaluacion
$(document).on('click', 'a.delete-record', function () {
    event.preventDefault();
    var x = $(this);
    var delete_url = x.attr('data-href');
    // +'/'+x.attr('data-id');
    var id = x.attr('data-id');
    // alert(delete_url);
    // alert(id);
    Swal.fire({
        title: '¿Estás seguro de eliminar la evaluación?',
        text: "Los datos no podrán ser recuperados",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'DELETE',
                url: delete_url,
                data: { '_token': $('input[name=_token]').val(), id: id },
                success: function (data) {
                    // $("#modal-event").modal('hide');
                    // $('#calificacion_id').val()="";
                    $('#NombreEvaluacion').empty();
                    $("#calificacion_id").val("");
                    $("#evaluaciones").load(location.href + " #evaluaciones");
                    Swal.fire(
                        '¡Felicidades!',
                        'La actividad se ha eliminado satisfactoriamente.',
                        'success'
                    );
                },
                error: function () {
                    toastr.error('Error, intente más tarde');
                }
            });
        }
    });
});

$("#registro").submit(function(e){

    e.preventDefault();

    $.ajax({
        type: "POST",
        url: '/registrarNotas',
        data: $('#registro').serialize(),
        success: function (data) {
            $("#mdlEvent").modal('hide');
            Swal.fire(
                '¡Felicidades!',
                'La actividad se ha creado satisfactoriamente.',
                'success'
            );

        },
        error: function () {
            toastr.error('Error, intente más tarde');
        }
    });



});


// //Ajax para registrar notas
// $(document).on('click', 'guardar-nota', function (e) {
//     event.preventDefault(e);
//     alert("hola");
//     // $.ajax({
//     //     type: "POST",
//     //     url: '/actividades/store',
//     //     data: $('#form-create').serialize(),
//     //     success: function (data) {
//     //         $("#mdlEvent").modal('hide');
//     //         Swal.fire(
//     //             '¡Felicidades!',
//     //             'La actividad se ha creado satisfactoriamente.',
//     //             'success'
//     //         );
//     //         onBotonBuscar();
//     //     },
//     //     error: function () {
//     //         toastr.error('Error, intente más tarde');
//     //     }
//     // });
// });
