$(function () {
    var semestre = $('#select-semestres').val();
    var anyo = $('#select-anyos').val();
    $.get('/semestre/' + semestre + '/' + anyo + '/cursos', function (data) {
        var html_select = '<option value="">Seleccione un curso</option>';
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].id + '">' + data[i].nombre + '</option>';
        }
        $('#select-cursos').html(html_select);
    });
});

$(function () {
    document.getElementById('tarjeta-resumen').style.display = 'none';
    $('#select-anyos').on('change', onSelectAnyoChange);
    $('#select-semestres').on('change', onSelectSemestresChange);
    $('#select-cursos').on('change', onSelectCursosChange);
});

function onSelectAnyoChange() {
    var anyo = $(this).val();
    $.get('/anyo/' + anyo + '/semestres', function (data) {
        var html_select = '<option>Seleccione un semestre</option>';
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].semestre + '">' + data[i].semestre + '</option>';
        }
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
    $.get('/semestre/' + semestre_id + '/' + anyo + '/cursos', function (data) {
        var html_select = '<option value="">Seleccione un curso</option>';
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].id + '">' + data[i].nombre + '</option>';
        }
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
    $.get('/curso/' + curso_id + '/' + semestre + '/' + anyo + '/asignaturas', function (data) {
        var html_select = '<option value="">Seleccione una asignatura</option>';
        for (var i = 0; i < data.length; ++i) {
            html_select += '<option value = "' + data[i].id_asignatura + '">' + data[i].asignatura + '</option>';
        }
        $('#select-asignaturas').html(html_select);
    });
}

$("#agregarEvaluacion").click(function () {
    var valorSlug = document.getElementById("curso_id_curso").value;
    location.href = 'http://' + window.location.hostname + ':8000/ingresarNotas/' + valorSlug;
})

var alumnos;
$(document).on('click', '#boton-buscar', function () {
    var semestre = $('#select-semestres').val();
    var curso = $('#select-cursos').val();
    var asignatura = $('#select-asignaturas').val();
    var anyo = $('#select-anyos').val();
    alumnos = null;

    // Pone en el titulo la asignatura seleccionada
    $.get('/actividades/' + curso + '/' + asignatura + '/' + semestre + '/' + anyo + '/getCurso', function (data) {
        var id_curso = '';
        var nombreAsignatura = '';
        for (var i = 0; i < data.length; ++i) {
            id_curso = data[i].id_curso;
            nombreAsignatura = data[i].asignatura;
        }
        $('#curso_id_curso').val(id_curso);
        $('#NombreAsignatura').html(nombreAsignatura);
    })

    //Verifica si existen alumnos registrados en la asignaruta
    $.getJSON('http://127.0.0.1:8000/notas/' + anyo + '/' + semestre + '/' + curso + '/' + asignatura + '/listarAlumnos/', function (data) {
        if (JSON.stringify(data) == '[]') {
            document.getElementById('tarjeta-resumen').style.display = 'none';
            document.getElementById('nota-alerta').style.display = 'block';
            toastr.warning('No existen alumnos registrados en esta asignatura', 'Advertencia!');
            $("#mensajeNota").empty();
            $("#mensajeNota").append("No existen alumnos registrados en esta asignatura");
        } else {
            document.getElementById('nota-alerta').style.display = 'none';
            mostrarResumen(anyo, semestre, curso, asignatura);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (errorThrown == "Not Found") {
            toastr.warning('¡Seleccione todos los campos!');
        }
    });
});


function mostrarResumen(anyo, semestre, curso, asignatura) {
    $.getJSON('http://127.0.0.1:8000/notas/' + anyo + '/' + semestre + '/' + curso + '/' + asignatura + '/getEvaluaciones', function (data) {
        // console.log(JSON.stringify(data));
    })
        .done(function (response) {
            var cabecera = '';
            cabecera += '<tr>';
            cabecera += '<th style="text-align: center;">N°</th>';
            cabecera += '<th>Apellidos</th>';
            cabecera += '<th>Nombres</th>';
            $.each(response, function (index, element) {
                cabecera += '<th style="text-align: center;">' + element.nombre + '</th>';
            })
            cabecera += '</tr>';
            $("#cabecera").empty();
            $("#cabecera").append(cabecera);
        })


    //Lista los alumnos en las tablas y sus respectivas notas
    $.getJSON('http://127.0.0.1:8000/notas/' + anyo + '/' + semestre + '/' + curso + '/' + asignatura + '/alumnos', function (data) {
        console.log('hola: ', JSON.stringify(data));
        document.getElementById('tarjeta-resumen').style.display = 'block';
        if (JSON.stringify(data) === '[]') {
            document.getElementById('cuerpo-tabla').style.display = 'none';
            $("#mensaje-en-tabla").empty();
            $("#mensaje-en-tabla").append('<h5>¡Sin registros!</h5> <p>Para registrar notas haga click en el botón "Administrar Notas"</p>');
        }else{
            var id_alumno;
            var contador = 1;
            var cuerpo = '';
            for (var i in data) {
                if (data[i].id_alumno != id_alumno) {
                    console.log(data[i].nombres);
                    cuerpo += '<tr>';
                    cuerpo += '<td style="text-align: center;">' + contador + '</td>';
                    cuerpo += '<td>' + data[i].apellido_paterno + ' ' + data[i].apellido_materno + '</td>';
                    cuerpo += '<td>' + data[i].nombres + '</td>';
                    contador++;

                }
                if (JSON.stringify(data[i].nota)==="null"){
                    cuerpo += '<td> </td>';
                }else{
                    cuerpo += '<td style="text-align: center;">' + parseFloat(Math.round(data[i].nota * 100)/100).toFixed(1) + '</td>';
                }
                // cuerpo += '<td style="text-align: center;">' + data[i].nota + '</td>';
                id_alumno = data[i].id_alumno;
                alumnos = data[i].id_alumno;
            }
            cuerpo += '</tr>';
            $("#mensaje-en-tabla").empty();
            document.getElementById('cuerpo-tabla').style.display = 'block';
            $("#cuerpo").empty();
            $("#cuerpo").append(cuerpo);
        }
    })
}

