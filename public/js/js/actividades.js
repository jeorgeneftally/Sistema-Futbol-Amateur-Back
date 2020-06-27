
function obtenerIDTipo($id) {
    $('#tipo').val($id);
}
function obtenerIDTipo2($id) {
    $('#modal-event #tipo').val($id);
}

$(function () {
    var Calendar = FullCalendar.Calendar;
    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, {

        locale: 'es',
        plugins: ['bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list'],

        // Cabecera del calendario
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
        },

        dateClick: function (info) {
            toastr.warning('Para crear o consultar actividades, por favor realice una búsqueda', 'Advertencia!');
        },

        eventClick: function (info) {
            console.log(info.event);
            var fechafin;
            if ((info.event.end != null)) {
                fechafin = info.event.end;
            } else {
                fechafin = info.event.start;
            }
            $("#fechas_update").daterangepicker({
                timePicker: true,
                timePicker24Hour: true,
                timePickerIncrement: 15,
                "startDate": info.event.start,
                "endDate": fechafin,
                locale: {
                    format: 'YYYY-MM-DD hh:mm',
                    //Traducción
                    "separator": " - ",
                    "applyLabel": "Aplicar",
                    "cancelLabel": "Cancelar",
                    "fromLabel": "DE",
                    "toLabel": "HASTA",
                    "customRangeLabel": "Custom",
                    "daysOfWeek": [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mie",
                        "Jue",
                        "Vie",
                        "Sáb"
                    ],
                    "monthNames": [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre"
                    ],
                    "firstDay": 1
                }
                //  defaultDate: new Date(info.dateStr+' 00:00 - '+info.dateStr+' 00:00'),
            })
        }

    });
    calendar.render();
})

$(function () {
    var semestre = $('#select-semestres').val();
    var anyo = $('#select-anyos').val();
    $.get('/semestre/' + semestre + '/' + anyo + '/cursos', function (data) {
        var html_select = '<option value="">Seleccione un curso</option>';
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].id + '">' + data[i].nombre + '</option>';
        }
        console.log(html_select);
        $('#select-cursos').html(html_select);
    });
});

$(function () {
    $('#select-anyos').on('change', onSelectAnyoChange);
    $('#select-semestres').on('change', onSelectSemestresChange);
    $('#select-cursos').on('change', onSelectCursosChange);
    $('#boton-buscar').on('click', onBotonBuscar);
});

function onSelectAnyoChange() {
    var anyo = $(this).val();
    console.log("anyo ", anyo);
    // Ajax
    $.get('/anyo/' + anyo + '/semestres', function (data) {
        var html_select = '<option>Seleccione un semestre</option>';
        console.log(data);
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].semestre + '">' + data[i].semestre + '</option>';
        }
        console.log(html_select);
        $('#select-semestres').html(html_select);
        html_select = '<option value="">Seleccione un curso</option>';
        $('#select-cursos').html(html_select);
        html_select = '<option value="">Seleccione una asignatura</option>';
        $('#select-asignaturas').html(html_select);
    });

}

function onSelectSemestresChange() {
    var semestre_id = $(this).val();
    var anyo = $('#select-anyos').val();
    console.log("Id semestre ", semestre_id);
    // Ajax
    $.get('/semestre/' + semestre_id + '/' + anyo + '/cursos', function (data) {
        var html_select = '<option value="">Seleccione un curso</option>';
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].id + '">' + data[i].nombre + '</option>';
        }
        console.log(html_select);
        $('#select-cursos').html(html_select);
        html_select = '<option value="">Seleccione una asignatura</option>';
        $('#select-asignaturas').html(html_select);
    });

}

function onSelectCursosChange() {
    var curso_id = $(this).val();
    var semestre = $('#select-semestres').val();
    var anyo = $('#select-anyos').val();
    curso = curso_id;
    console.log("id_semestre curso", semestre);
    console.log("curso", curso_id);
    // Ajax
    $.get('/curso/' + curso_id + '/' + semestre + '/' + anyo + '/asignaturas', function (data) {
        var html_select = '<option value="">Seleccione una asignatura</option>';
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].id_asignatura + '">' + data[i].asignatura + '</option>';
        }
        console.log(html_select);
        $('#select-asignaturas').html(html_select);
    });

}

//Ajax crear actividad
$(document).on('click', 'a.save-record2', function () {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: '/actividades/store',
        data: $('#form-create').serialize(),
        success: function (data) {
            $("#mdlEvent").modal('hide');
            Swal.fire(
                '¡Felicidades!',
                'La actividad se ha creado satisfactoriamente.',
                'success'
            );

            onBotonBuscar();
        },
        error: function () {
            toastr.error('Error, intente más tarde');
        }
    });
});

//Ajax actualizar actividad
$(document).on('click', 'a.edit-record2', function () {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: '/actividades/update',
        data: $('#form-update').serialize(),
        success: function (data) {
            $("#modal-event").modal('hide');
            Swal.fire(
                '¡Felicidades!',
                'La actividad se ha actualizado satisfactoriamente.',
                'success'
            );
            onBotonBuscar();
        },
        error: function () {
            toastr.error('Error, intente más tarde');
        }
    });
});

//Ajax Eliminar actividad
$(document).on('click', 'a.delete-record', function () {
    event.preventDefault();
    var actividad = $('#modal-event #titulo').val();
    var x = $(this);
    var delete_url = x.attr('data-href') + '/' + x.attr('data-id');
    // alert(delete_url);
    Swal.fire({
        title: '¿Estás seguro de eliminar la actividad ' + actividad + '?',
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
                type: 'DELETE',
                url: delete_url,
                data: $('#form-update').serialize(),
                success: function (data) {
                    $("#modal-event").modal('hide');
                    Swal.fire(
                        '¡Felicidades!',
                        'La actividad se ha eliminado satisfactoriamente.',
                        'success'
                    );
                    onBotonBuscar();
                },
                error: function () {
                    toastr.error('Error, intente más tarde');
                }
            });
        }
    });
});






var errorTitulo = 0;
var errorDescripcion = 0;
$(document).on('click', 'a.save-record', function () {
    event.preventDefault();
    if ($('#tituloActividad').val() == "") {
        $("#tituloActividad").addClass("is-invalid");
        $('#tituloError').html('<small class="error help-block" style="float: left; color:#f41035;">Campo obligatorio.</small>');
    } else if (errorTitulo > 0 || errorDescripcion > 0) {
    } else {
        $.ajax({
            type: "POST",
            url: '/actividades/store',
            data: $('#form-create').serialize(),
            success: function (data) {
                $("#mdlEvent").modal('hide');
                Swal.fire(
                    '¡Felicidades!',
                    'La actividad se ha creado satisfactoriamente.',
                    'success'
                );
                onBotonBuscar();
            },
            error: function () {
                toastr.error('Error, intente más tarde');
            }
        });
    }
});

$(document).on('click', 'a.edit-record', function () {
    event.preventDefault();
    if ($('#titulo_update').val() == "") {
        $("#titulo_update").addClass("is-invalid");
        $('#titulo_updateError').html('<small class="error help-block" style="float: left; color:#f41035;">Campo obligatorio.</small>');
    } else if (errorTitulo > 0 || errorDescripcion > 0) {
    } else {
        $.ajax({
            type: "POST",
            url: '/actividades/update',
            data: $('#form-update').serialize(),
            success: function (data) {
                $("#modal-event").modal('hide');
                Swal.fire(
                    '¡Felicidades!',
                    'La actividad se ha actualizado satisfactoriamente.',
                    'success'
                );
                onBotonBuscar();
            },
            error: function () {
                toastr.error('Error, intente más tarde');
            }
        });
    }
});

$(function () {
    var tituloPattern = "^[a-z A-ZñáéíóúÁÉÍÓÚ°,:.;¿?!¡ 0-9]{1,60}$";
    var descripcionPattern = "^[a-z A-ZñáéíóúÁÉÍÓÚ°,:.;#$¿?!¡ 0-9]{0,500}$";

    $('#tituloActividad').on('blur', function () {
        if ($(this).val() == "") {
            $(this).addClass("is-invalid");
            $('#tituloError').html('<small class="error help-block" style="float: left; color:#f41035;">Campo obligatorio.</small>');
            errorTitulo++;
        } else if (!checkInput($(this), tituloPattern)) {
            $("#tituloError").empty();
            $(this).addClass("is-invalid");
            $('#tituloError').html('<small class="error help-block" style="float: left; color:#f41035;">Debe tener como máximo 60 caracteres entre letras y números.</small>');
            errorTitulo++;
        } else {
            $("#tituloError").empty();
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            errorTitulo = 0;
        }
    });

    $('#titulo_update').on('blur', function () {
        if ($(this).val() == "") {
            $("#titulo_updateError").empty();
            $(this).addClass("is-invalid");
            $('#titulo_updateError').html('<small class="error help-block" style="float: left; color:#f41035;">Campo obligatorio.</small>');
            errorTitulo++;
        } else if (!checkInput($(this), tituloPattern)) {
            $("#titulo_updateError").empty();
            $(this).addClass("is-invalid");
            $('#titulo_updateError').html('<small class="error help-block" style="float: left; color:#f41035;">Debe tener como máximo 60 caracteres entre letras y números.</small>');
            errorTitulo++;
        } else {
            $("#titulo_updateError").empty();
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            errorTitulo = 0;
        }
    });

    $('#fechas, #fechas_update').on('blur', function () {
        $(this).addClass("is-valid");
    });

    $('#descripcion').on('blur', function () {
        if (!checkInput($(this), descripcionPattern)) {
            $("#descripcionError").empty();
            $(this).addClass("is-invalid");
            $('#descripcionError').html('<small class="error help-block" style="float: left; color:#f41035;">Debe tener como máximo 500 caracteres entre letras y números.</small>');
            errorDescripcion++;
        } else {
            $("#descripcionError").empty();
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            errorDescripcion = 0;
        }
    });

    $('#descripcion_update').on('blur', function () {
        if (!checkInput($(this), descripcionPattern)) {
            $("#descripcion_updateError").empty();
            $(this).addClass("is-invalid");
            $('#descripcion_updateError').html('<small class="error help-block" style="float: left; color:#f41035;">Debe tener como máximo 500 caracteres entre letras y números.</small>');
            errorDescripcion++;
        } else {
            $("#descripcion_updateError").empty();
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            errorDescripcion = 0;
        }
    });
});
function checkInput(idInput, pattern) {
    if ($(idInput).val().match(pattern)) {
        return true
    } else {
        return false
    }
}

function onBotonBuscar() {
    var semestre = $('#select-semestres').val();
    var curso = $('#select-cursos').val();
    var asignatura = $('#select-asignaturas').val();
    var anyo = $('#select-anyos').val();

    // calendar.destroy();

    $.get('/actividades/' + curso + '/' + asignatura + '/' + semestre + '/' + anyo + '/getCurso', function (data) {
        // $('#id_apoderado_upd').val(data.id_apoderado);
        // console.log(data);
        var id_curso = '';
        var nombreAsignatura = '';
        for (var i = 0; i < data.length; ++i) {
            id_curso = data[i].id_curso;
            nombreAsignatura = data[i].asignatura;
        }
        $('#curso_id_curso').val(id_curso);
        // $('#titulo').empty();
        $('#NombreAsignatura').html(nombreAsignatura);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (errorThrown == "Not Found") {
            toastr.warning('¡Seleccione todos los campos!');
        }
    });;


    $('#calendar').empty();
    /* ADDING EVENTS */
    var currColor = '#3c8dbc' //Red by default
    //  document.getElementById('tipo').value = currColor;
    //Color chooser button
    var colorChooser = $('#color-chooser-btn')
    $('#color-chooser > li > a').click(function (e) {

        e.preventDefault()
        //Save color

        currColor = $(this).css('color')
        console.log(currColor);
        //  document.getElementById('tipo2').value = currColor;
        //  document.getElementById('tipo').value = currColor;
        //Add color effect to button
        $('#add-new-event').css({
            'background-color': currColor,
            'border-color': currColor
        })
        $('#update-event').css({
            'background-color': currColor,
            'border-color': currColor
        })
    });

    /* initialize the calendar
    -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
    var date = new Date()
    var d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear()

    var Calendar = FullCalendar.Calendar;
    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {

        locale: 'es',
        plugins: ['bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list'],

        // Cabecera del calendario
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
        },

        //Se obtienen los eventos
        //  events: '/api/actividades/get',
        events: '/actividades/' + curso + '/' + asignatura + '/' + semestre + '/' + anyo + '/get',
        //  textColor: 'black',
        dateClick: function (info) {
            $("#fechas").daterangepicker({
                timePicker: true,
                timePicker24Hour: true,
                timePickerIncrement: 15,
                "startDate": info.dateStr,
                "endDate": info.dateStr,
                locale: {
                    format: 'YYYY-MM-DD hh:mm',
                    //Traducción
                    "separator": " - ",
                    "applyLabel": "Aplicar",
                    "cancelLabel": "Cancelar",
                    "fromLabel": "DE",
                    "toLabel": "HASTA",
                    "customRangeLabel": "Custom",
                    "daysOfWeek": [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mie",
                        "Jue",
                        "Vie",
                        "Sáb"
                    ],
                    "monthNames": [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre"
                    ],
                    "firstDay": 1
                }
                //  defaultDate: new Date(info.dateStr+' 00:00 - '+info.dateStr+' 00:00'),
            }),
                $("#mdlEvent").modal();


        },

        eventClick: function (info) {
            console.log(info.event);
            var fechafin;
            if ((info.event.end != null)) {
                fechafin = info.event.end;
            } else {
                fechafin = info.event.start;
            }
            $("#fechas_update").daterangepicker({
                timePicker: true,
                timePicker24Hour: true,
                timePickerIncrement: 15,
                "startDate": info.event.start,
                "endDate": fechafin,
                locale: {
                    format: 'YYYY-MM-DD hh:mm',
                    //Traducción
                    "separator": " - ",
                    "applyLabel": "Aplicar",
                    "cancelLabel": "Cancelar",
                    "fromLabel": "DE",
                    "toLabel": "HASTA",
                    "customRangeLabel": "Custom",
                    "daysOfWeek": [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mie",
                        "Jue",
                        "Vie",
                        "Sáb"
                    ],
                    "monthNames": [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre"
                    ],
                    "firstDay": 1
                }
                //  defaultDate: new Date(info.dateStr+' 00:00 - '+info.dateStr+' 00:00'),
            }),
                console.log(info.event);
            $('#boton-delete').attr('data-id', info.event.id);
            $('#modal-event #titulo_update').val(info.event.title);
            $('#modal-event #descripcion_update').val(info.event._def.extendedProps.descripcion);
            $('#modal-event #tipo').val(info.event._def.extendedProps.tipo_actividad_id);
            //  console.log("idactividad",info.event._def.extendedProps.tipo_actividad_id);
            $('#modal-event #curso_id_curso').val(info.event._def.extendedProps.curso_id_curso);
            //  console.log("idcurso",info.event._def.extendedProps.curso_id_curso);
            // $('#modal-event #_time_start').val(time_start);
            // $('#modal-event #_date_end').val(date_end);
            // $('#modal-event #_color').val(event.color);
            // $id = info.event.id;
            $('#update-event').css({
                'background-color': info.event.borderColor,
                'border-color': info.event.borderColor
            })
            $('#modal-event #id_actividad').val(info.event.id);
            $('#modal-event').modal('show');
        }

    });
    calendar.render();
}

