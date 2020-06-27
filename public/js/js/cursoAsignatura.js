$(function () { 
    console.log('documento listo');
    $(document).on('click', '#botonguardar', function () {
        $("#mdlAgregar").modal('show');
    });

    $('.cancelar_upd').click(function(){
        event.preventDefault();
        $('#mdlActualizar').modal('hide');
        $('#erroresAlert, #erroresAlert_upd').hide();
        $('#erroresText, #erroresText_upd').html("");
       
   
    });

    $('.cancelar').click(function(){
        event.preventDefault();
        $('#mdlAgregar').modal('hide');
        reseteoError();
        reseteoSelect();
        $('#erroresAlert, #erroresAlert_upd').hide();
        $('#erroresText, #erroresText_upd').html("");     
        
 
    });

    //Funcion para eliminar un Alumno usando Ajax
    $(document).on('click','a.delete-record', function(){
        event.preventDefault();
        var x = $(this);
        var delete_url = x.attr('href');
        console.log(delete_url);
        Swal.fire({
            title: '¿Desea eliminar el registro asociado al curso?',
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
                            'El curso se ha eliminado satisfactoriamente.',
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
        
        $.get(catch_url,function(data){

            $('#anyo_upd').val(data.anyo);

            $('#semestre_upd').trigger('change.select2');
            $('#semestre_upd').val(data.semestre).trigger('change.select2');

            $('#nivel_upd').trigger('change.select2');
            $('#nivel_upd').val(data.nivel_curso_id).trigger('change.select2');

            $('#asignatura_upd').trigger('change.select2');
            $('#asignatura_upd').val(data.asignatura_id).trigger('change.select2');

            $('#profesor_upd').trigger('change.select2');
            $('#profesor_upd').val(data.profesor_id).trigger('change.select2');
           
            $('#descripcion_upd').val(data.descripcion); 

            $('#curso_id').val(data.id); 
            
        });
    });

      //Función para editar
      $(document).on('click', 'a.edit-record', function () {
        event.preventDefault();
        var x = $(this);
        var update_url = x.attr('href');
        var id=$('#curso_id').val();
        var anyo=$('#anyo_upd').val();
        var semestre=$('#semestre_upd').val();
        var descripcion=$('#descripcion_upd').val();
        var nivel=$('#nivel_upd').val();
        var asignatura=$('#asignatura_upd').val();
        var profesor=$('#profesor_upd').val();
        
    
        $.ajax({
            type: "POST",
            url: update_url,
            data: {id:id,anyo:anyo,semestre:semestre,descripcion:descripcion,
                        nivel:nivel,asignatura:asignatura,profesor:profesor},
            success: function(data){
                console.log(data);
                $('#mdlActualizar').modal('hide');
                $('#erroresAlert, #erroresAlert_upd').hide();
                reseteoError();
                reseteoSelectUpdate();
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


            

    });


   
});


// Validar datos

var html_errores='';
var nivel_error='<p> ¡Seleccione un nivel! </p>';
var asignatura_error='<p> ¡Seleccione una asignatura! </p>';
var profesor_error='<p> ¡Seleccione un docente! </p>';
var periodo_error='<p>  ¡Seleccione un periodo!</p>';

$(function() {
    $('#erroresAlert, #erroresAlert_upd').hide();

    $('#agregar_curso').on('click',function(){
       

        html_errores=nivel_error+asignatura_error+profesor_error+periodo_error;
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

    $('#nivel').on('change blur',function(){
      
        if($("#nivel option:selected").text()=='Seleccione un nivel'){
            console.log($("#nivel option:selected").text());
            
            toastr.error('¡Seleccione un nivel!' );
            nivel_error='<p> ¡Seleccione un nivel! </p>';
        }else{
            
            nivel_error='';
        }
    });

    $('#asignatura').on('change blur',function(){
        if($("#asignatura option:selected").text()=='Seleccione una asignatura'){
            console.log($("#asignatura option:selected").text());
           
            toastr.error('¡Seleccione una asignatura! ' );
            asignatura_error='<p> ¡Seleccione una asignatura! </p>';
        }else{
           
            asignatura_error='';
        }
    });

    $('#profesor').on('change blur',function(){
        if($("#profesor option:selected").text()=='Seleccione un profesor'){
            console.log($("#profesor option:selected").text());
           
            toastr.error('¡Seleccione un docente ! ' );
            profesor_error='<p> ¡Seleccione un docente! </p>';
        }else{
           
            profesor_error='';
        }
    });

    $('#semestre').on('change blur',function(){
        if($("#semestre option:selected").text()=='Seleccione un periodo'){
            console.log($("#semestre option:selected").text());
           
            toastr.error(' ¡Seleccione un periodo!' );
            periodo_error='<p>  ¡Seleccione un periodo!</p>';
        }else{
           
            periodo_error='';
        }
    });
});


function reseteoError(){
    html_errores='';
    nivel_error='<p> ¡Seleccione un nivel! </p>';
    asignatura_error='<p> ¡Seleccione una asignatura! </p>';
    profesor_error='<p> ¡Seleccione un docente! </p>';
    periodo_error='<p>  ¡Seleccione un periodo!</p>';

}

function reseteoSelect(){
    $('#nivel').select2();
    $("#nivel").val('0').trigger('change.select2');

    $('#asignatura').select2();
    $("#asignatura").val('0').trigger('change.select2');

    $('#profesor').select2();
    $("#profesor").val('0').trigger('change.select2');

    $('#semestre').select2();
    $("#semestre").val('0').trigger('change.select2');
}

function reseteoSelectUpdate(){
    $('#nivel_upd').select2();
    $("#nivel_upd").val('0').trigger('change.select2');

    $('#asignatura_upd').select2();
    $("#asignatura_upd").val('0').trigger('change.select2');

    $('#profesor_upd').select2();
    $("#profesor_upd").val('0').trigger('change.select2');

    $('#semestre_upd').select2();
    $("#semestre_upd").val('0').trigger('change.select2');
}

