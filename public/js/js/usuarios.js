var password_error = '';
var passPattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
var flagPass = false;
var flagFormatNueva = false;
var flagFormatRep = false;
var flagActual = false;

$(function () {
    console.log('estoy en usuarios');
    $('#mensaje-alerta').hide();
    $('#mensaje-alerta2').hide();

    $("#cambiar-pass").click(function () {
        event.preventDefault();
        $("#ok-pass").prop('disabled', true);

    });

    $('.cancelar').click(function () {
        event.preventDefault();
        $('#modal-password').modal('hide');
        limpiar();
    });

    $("#ok-pass").click(function () {
        event.preventDefault();
        // var id_usuario = $('#id_usuario').val();
        var password = $('#actual').val();
        var passwordN = $('#nueva-rep').val();
        // alert(id_usuario);
        // var rut = $('#rut_usuario').val();
        console.log();

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: 'http://127.0.0.1:8000/comprobarContrasenia',
            type: 'POST',
            data: ({ '_token': $('input[name=_token]').val(), password: password }),
            success: function (data) {
                console.log(data);
                if (data.success == false) {
                    $("#mensaje-alerta2").css("color", "#ff0000");
                    $("#mensaje-alerta2").html(data.message);
                    $('#mensaje-alerta2').show();
                } else if (data.success == true) {
                    $('#mensaje-alerta2').hide();
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        type: "POST",
                        url: 'http://127.0.0.1:8000/cambiarContrasenia',
                        data: { '_token': $('input[name=_token]').val(), password: passwordN },
                        success: function (data) {
                            console.log(data);
                            $('#modal-password').modal('hide')
                            Swal.fire(
                                'Actualizado!',
                                'El usuario se ha actualizado satisfactoriamente.',
                                'success'
                            );
                            location.reload();
                        },

                    });
                    flagActual = true;
                }
            }
        })

        // $.ajax({
        //     // headers: {
        //     //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //     // },
        //     type: "POST",
        //     url: 'http://127.0.0.1:8000/comprobarContrasenia',
        //     dataType: "text",
        //     data: { id: id_usuario, password: password, rut: rut },
        //     success: function (data) {
        //         console.log(data);
        //         if (data.success == false) {
        //             $("#mensaje-alerta2").css("color", "#ff0000");
        //             $("#mensaje-alerta2").html(data.message);
        //             $('#mensaje-alerta2').show();
        //         } else if (data.success == true) {
        //             $('#mensaje-alerta2').hide();
        //             $.ajax({
        //                 headers: {
        //                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //                 },
        //                 type: "POST",
        //                 url: 'http://127.0.0.1:8000/cambiarContrasenia',
        //                 data: { '_token': $('input[name=_token]').val(), id: id_usuario, password: passwordN },
        //                 success: function (data) {
        //                     console.log(data);
        //                     $('#modal-password').modal('hide')
        //                     Swal.fire(
        //                         'Actualizado!',
        //                         'El usuario se ha actualizado satisfactoriamente.',
        //                         'success'
        //                     );
        //                     location.reload();
        //                 },

        //             });
        //             flagActual = true;
        //         }

        //     },

        // });
        // console.log(flagActual);
    });

    $('#nueva,#nueva-rep').on('blur keyup', function () {
        if (!checkInput($(this), passPattern)) {
            console.log($(this).attr("id"));
            if ($(this).attr("id") == 'nueva') {
                $('#nueva').addClass("is-invalid");
                toastr.error('Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula.');
                //password_error='<p> Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula. </p>';
                $("#ok-pass").prop('disabled', true);
                flagFormatNueva = false;
            } else {
                $('#nueva-rep').addClass("is-invalid");
                toastr.error('Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula.');
                //password_error='<p> Contraseña debe tener entre 8 y 16 caracteres , al menos un dígito, al menos una minúscula y  una mayúscula. </p>';
                flagFormatRep = false;
            }

        } else {
            if ($(this).attr("id") == 'nueva') {
                $('#nueva').removeClass("is-invalid");
                $('#nueva').addClass("is-valid");
                //password_error='';
                $("#ok-pass").prop('disabled', true);
                flagFormatNueva = true;

                if (flagPass == true && flagFormatNueva == true && flagFormatRep == true) {
                    $("#ok-pass").prop('disabled', false);
                }
            } else {
                $('#nueva-rep').removeClass("is-invalid");
                $('#nueva-rep').addClass("is-valid");
                //password_error='';
                flagFormatRep = true;
            }

        }
    });

    $('#nueva-rep').on('keyup', function () {

        if ($('#nueva').val() == $('#nueva-rep').val()) {
            console.log('Las contraseñas coinciden');
            $("#mensaje-alerta").css("color", "#3b83bd");
            $("#mensaje-alerta").html("Las contraseñas coinciden");
            $('#mensaje-alerta').show();

            flagPass = true;

            if (flagPass == true && flagFormatNueva == true && flagFormatRep == true) {
                $("#ok-pass").prop('disabled', false);
            }

            console.log(flagPass);
            console.log(flagFormatNueva);
            console.log(flagFormatRep);
        } else {
            console.log('Las contraseñas no coinciden');
            $("#mensaje-alerta").css("color", "#ff0000");
            $("#mensaje-alerta").html("Las contraseñas no coinciden");
            $('#mensaje-alerta').show();
            $("#ok-pass").prop('disabled', true);
            flagPass = false;
            console.log(flagPass);
            console.log(flagFormatNueva);
            console.log(flagFormatRep);
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

function limpiar() {
    $('#actual').val("");
    $('#nueva').val("");
    $('#nueva-rep').val("");
    $('#nueva').removeClass("is-invalid");
    $('#nueva').removeClass("is-valid");
    $('#nueva-rep').removeClass("is-invalid");
    $('#nueva-rep').removeClass("is-valid");
    $('#mensaje-alerta').hide();
    $('#mensaje-alerta2').hide();
}
