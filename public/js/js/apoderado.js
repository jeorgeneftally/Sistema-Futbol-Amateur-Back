$(function () {
    var selected = [];
    var id_apoderado;
    var anyo;
    var semestre;
      //Bootstrap Duallistbox
      var listamultiple=$('.duallistbox').bootstrapDualListbox({
        nonSelectedListLabel : 'No seleccionado' ,
        selectedListLabel : 'Seleccionado' ,
        preserveSelectionOnMove : 'movido' ,
        moveOnSelect : false
        /*nonSelectedFilter : 'ion ([7-9] | [1] [0-2])'*/ });
    $("#botonguardar" ).click(function() {
        $("#mdlAgregar").modal();
    });

    $('.asociar-record').on('click',seleccionar);
    $('#asociar-alumnos').on('click',inscribir);

    $('.password-box').hide();

    $('.cancelar_upd').click(function(){
        event.preventDefault();
        $('#mdlActualizar').modal('hide');
        $('.password-box').hide();
        password_error="";
        $('#password_upd').val("");

        removerClasesUpd();
        $('#erroresAlert, #erroresAlert_upd').hide();
        $('#erroresText, #erroresText_upd').html("");

    });

    $('.cancelar').click(function(){
        event.preventDefault();
        $('#mdlAgregar').modal('hide');
        reseteoError();
        removerClases();
        $('#erroresAlert, #erroresAlert_upd').hide();
        $('#erroresText, #erroresText_upd').html("");

    });



    //revisar el estado del check box para cambiar la contraseña
    $('#password-check').change(function(){
        if($(this).is(":checked")){
            $('.password-box').show();
        }else{
            $('.password-box').hide();
            password_error="";
            $('#password_upd').val("");
            $('#password_upd').removeClass("is-invalid");
            $('#password_upd').removeClass("is-valid");
        }
    });

    function seleccionar(){

        event.preventDefault();
        $("#mdlAsociar").modal();
        id_apoderado= $(this).attr('href');
        anyo=$('#anyo').val();
        semestre=$('#semestre').val();
        console.log('hola '+id_apoderado);
        console.log(listamultiple);
        console.log('año:'+$('#anyo').val());
        console.log('semestre:'+$('#semestre').val())
    }

    function inscribir (){
        var err;
        event.preventDefault();
        console.log('asociar alumnos a apoderado alumnos');
        var alumnos = $('.duallistbox');
        $(alumnos).each(function(index, alumno){
            selected.push([$('.duallistbox').val()]);
        });

        var alumnos_id=[];
        for(var i=0;i<selected[0][0].length;i++){

            alumnos_id.push(selected[0][0][i]);
        }

        for(var i=0;i<alumnos_id.length;i++){
            var id_alumno=alumnos_id[i];

            $.ajax({
                type: "POST",
                url: 'http://127.0.0.1:8000/api/asociarAlumnos',
                data: {alumno_id:id_alumno,apoderado_id:id_apoderado,anyio:anyo,semestre:semestre},
                success: function(data){
                    console.log(data);

                },
                error: function () {

                    err=1;
                    console.log('dentro de error'+err);

                },
            });
        }
        $('#mdlAsociar').modal('hide');
        console.log('fuera del for'+err);
        Swal.fire(
            'Agregados!',
            'El/los alumnos han sido correctamente asociados al apoderado .',
            'success'
        );
        location.reload();

    }

    //Funcion para eliminar un Apoderado usando Ajax
    $(document).on('click','a.delete-record', function(){
        event.preventDefault();
        var x = $(this);
        var delete_url = x.attr('data-href')+'/'+x.attr('data-id');
        // alert(delete_url);
        Swal.fire({
            title: '¿Desea eliminar el registro asociado al apoderado?',
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
        formateoUpdate();
        event.preventDefault();
        $("#mdlActualizar").modal();
        var x = $(this);
        var catch_url = x.attr('href');

        $.get(catch_url,function(data){

            $('#id_apoderado_upd').val(data.id_apoderado);
            $('#rut_apoderado_upd').val(data.rut_apoderado);
            $('#nombres_upd').val(data.nombres);
            $('#apellido_paterno_upd').val(data.apellido_paterno);
            $('#apellido_materno_upd').val(data.apellido_materno);
            //$('#password_upd').val(data.password);
            $('#telefono_upd').val(data.telefono);
            $('#email_upd').val(data.email);
            // $('#direccion_upd').val(data.direccion);
        });
    });

    $(document).on('click', 'a.edit-record', function () {
        html_errores=rut_error+nombre_error+apellidoP_error+apellidoM_error+cellphone_error+email_error+password_error;
        if(html_errores!=''){
            event.preventDefault();
            $('#errores').html(html_errores);
            $('#errores').show();
        }else{
            html_errores='';
            $('#errores').hide();
            $('#errores').html(html_errores);
            event.preventDefault();
            //$("#modal-editar").hide();
            var x = $(this);
            var update_url = x.attr('href');
            // alert(update_url);
            var id=$('#id_apoderado_upd').val();
            var rut=$('#rut_apoderado_upd').val();
            var nombres=$('#nombres_upd').val();
            var apellido_paterno=$('#apellido_paterno_upd').val();
            var apellido_materno=$('#apellido_materno_upd').val();
            var password=$('#password_upd').val();
            var telefono=$('#telefono_upd').val();
            var email=$('#email_upd').val();
            // var direccion=$('#direccion_upd').val();

            var formData = new FormData();


            formData.append('id',id);
            formData.append('rut',rut);
            formData.append('nombres',nombres);
            formData.append('apellido_paterno',apellido_paterno);
            formData.append('apellido_materno',apellido_materno);
            formData.append('telefono',telefono);
            formData.append('email',email);
            formData.append('password',password);

            $.ajax({
                type: "POST",
                url: update_url,
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    console.log(data);
                    $('#mdlActualizar').modal('hide')
                    $('#erroresAlert, #erroresAlert_upd').hide();
                    $('.password-box').hide();
                    password_error="";
                    $('#password_upd').val("");
                    removerClasesUpd();
                    Swal.fire(
                        'Actualizado!',
                        'El profesor se ha actualizado satisfactoriamente.',
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
var emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
var cellPhonePattern="^[0-9]{9}$";
var passPattern=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
var direccionPattern="^[a-z A-ZñáéíóúÁÉÍÓÚ 0-9]+[,]+[^.]";
var validaRut;

var html_errores='';
var rut_error='<p> El rut no es válido o no tiene el formato adecuado</p>';
var nombre_error='<p> El nombre debe tener de 4 a 60 caracteres </p>';
var apellidoP_error='<p> El apellido Paterno debe tener de 4 a 30 caracteres </p>';
var apellidoM_error='<p> El apellido Materno debe tener de 4 a 30 caracteres </p>';
var password_error='<p> Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula. </p>';
var cellphone_error='<p> Teléfono debe tener 9 digitos </p>';
var email_error='<p> Formato de email incorrecto </p>';

$(function() {
    $('#erroresAlert, #erroresAlert_upd').hide();

    $('#boton-guardar, #guardar-modal').on('click',function(){
        html_errores=rut_error+nombre_error+apellidoP_error+apellidoM_error+cellphone_error+email_error+password_error;
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

    validaRut=$('#rut_apoderado, #rut_apoderado_upd').rut({
        fn_error : function(input){
            $('#rut_apoderado, #rut_apoderado_upd').addClass("is-invalid");
            toastr.error('El rut: ' + input.val() + ' es incorrecto');
            rut_error='<p> El rut no es válido o no tiene el formato adecuado</p>';
        },fn_validado:function(){
            $('#rut_apoderado, #rut_apoderado_upd').removeClass("is-invalid");
            $('#rut_apoderado, #rut_apoderado_upd').addClass("is-valid");;
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
            toastr.error('El apellido Paterno debe tener de 4 a 30 caracteres  ' );
            apellidoP_error='<p> El apellido Paterno debe tener de 4 a 30 caracteres </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            apellidoP_error='';
        }
    });

    $('#apellido_materno, #apellido_materno_upd').on('blur',function(){
        if(!checkInput($(this), apellidoPattern)){
            $(this).addClass("is-invalid");
            toastr.error('El apellido Materno debe tener de 4 a 30 caracteres  ' );
            apellidoM_error='<p> El apellido Materno debe tener de 4 a 30 caracteres </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            apellidoM_error='';
        }
    });

    $('#password, #password_upd').on('blur',function(){
        if(!checkInput($(this), passPattern)){
            $(this).addClass("is-invalid");
            toastr.error('Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula.' );
            password_error='<p> Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula. </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            password_error='';
        }
    });

    $('#telefono, #telefono_upd').on('blur',function(){
        if(!checkInput($(this), cellPhonePattern)){
            $(this).addClass("is-invalid");
            toastr.error(' Teléfono debe tener 9 digitos' );
            cellphone_error='<p> Teléfono debe tener 9 digitos </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            cellphone_error='';
        }
    });

    $('#email, #email_upd').on('blur',function(){
        if(!checkInput($(this), emailPattern)){
            $(this).addClass("is-invalid");
            toastr.error('Formato de email incorrecto' );
            email_error='<p> Formato de email incorrecto </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            email_error='';
        }
    });

    /*$('#direccion, #direccion_upd').on('blur',function(){
        if(!checkInput($(this), direccionPattern)){
            $(this).addClass("is-invalid");
            toastr.error('Ingrese dirección en formato Calle, Comuna' );
            direccion_error='<p> Ingrese dirección en formato Calle, Comuna </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            direccion_error='';
        }
    });*/


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
    $('#rut_apoderado_upd').removeClass("is-invalid");
    $('#rut_apoderado_upd').removeClass("is-valid");

    $('#nombres_upd').removeClass("is-invalid");
    $('#nombres_upd').removeClass("is-valid");

    $('#apellido_paterno_upd').removeClass("is-invalid");
    $('#apellido_paterno_upd').removeClass("is-valid");

    $('#apellido_materno_upd').removeClass("is-invalid");
    $('#apellido_materno_upd').removeClass("is-valid");

    $('#telefono_upd').removeClass("is-invalid");
    $('#telefono_upd').removeClass("is-valid");

    $('#email_upd').removeClass("is-invalid");
    $('#email_upd').removeClass("is-valid");

    $('#password_upd').removeClass("is-invalid");
    $('#password_upd').removeClass("is-valid");
}

function removerClases(){
    $('#rut_apoderado').removeClass("is-invalid");
    $('#rut_apoderado').removeClass("is-valid");
    $('#rut_apoderado').val("");

    $('#nombres').removeClass("is-invalid");
    $('#nombres').removeClass("is-valid");
    $('#nombres').val("");

    $('#apellido_paterno').removeClass("is-invalid");
    $('#apellido_paterno').removeClass("is-valid");
    $('#apellido_paterno').val("");

    $('#apellido_materno').removeClass("is-invalid");
    $('#apellido_materno').removeClass("is-valid");
    $('#apellido_materno').val("");

    $('#telefono').removeClass("is-invalid");
    $('#telefono').removeClass("is-valid");
    $('#telefono').val("");

    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");
    $('#email').val("");

    $('#password').removeClass("is-invalid");
    $('#password').removeClass("is-valid");
    $('#password').val("");
}

function reseteoError(){
    html_errores='';
    rut_error='<p> El rut no es válido o no tiene el formato adecuado</p>';
    nombre_error='<p> El nombre debe tener de 4 a 60 caracteres </p>';
    apellidoP_error='<p> El apellido Paterno debe tener de 4 a 30 caracteres </p>';
    apellidoM_error='<p> El apellido Materno debe tener de 4 a 30 caracteres </p>';
    password_error='<p> Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula. </p>';
    cellphone_error='<p> Teléfono debe tener 9 digitos </p>';
    email_error='<p> Formato de email incorrecto </p>';
}

function formateoUpdate(){
    html_errores='';
    rut_error='';
    nombre_error='';
    apellidoP_error='';
    apellidoM_error='';
    password_error='';
    cellphone_error='';
    email_error='';
}


