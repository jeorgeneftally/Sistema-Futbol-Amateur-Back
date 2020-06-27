var namePattern = "^[a-z 0-9 A-ZñáéíóúÁÉÍÓÚ]{3,60}$";
var nombre_error='<p> El nombre debe tener de 3 a 60 caracteres </p>';
var imagen_error='<p> Adjunte un archivo </p>';
//var url;
$(function () {
    //url=window.location.href;
    console.log('estoy en la seccion de los materiales de la asignatura');
    //listar();
    var on = false;
    $('a.delete-record').on('click',eliminar);
    $('#modal-material').on('click',function(){
        $('#mdlAgregar').modal('show');
    });
    $('a.update-record').on('click',editar);
    $('#modal-editar').on('click',botonEditarActivar);
    $('#modal-editar-2').on('click',botonEditarDesactivar);

    $('.lista-desplegable').hide();
    $('#modal-editar-2').hide();
    
$('.cancelar_upd').click(function(){
    event.preventDefault();
    $('#modal-editar').modal('hide');
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



$("#form-actualizar").submit(function(e){
    e.preventDefault();
    
    console.log('estoy en actualizar material');
    imagen_error='';
    html_errores=nombre_error;
    if(html_errores!=''){
        event.preventDefault();
        $('#errores').html(html_errores);
        $('#errores').show();
    }else{
        html_errores='';
        $('#errores').hide();
        $('#errores').html(html_errores);
        event.preventDefault();
        
        var id=$('#material_id_upd').val();
        var nombre=$('#nombre_upd').val();
        var descripcion=$('#descripcion_upd').val();
        
        var formData = new FormData();
        var files = $('#path_upd')[0].files[0];
        formData.append('path_upd',files);
        formData.append('id',id);
        formData.append('nombre',nombre);
        formData.append('descripcion',descripcion);
        formData.append('_token', $('input[name=_token]').val());
        console.log(id);
        $.ajax({
            headers:
            {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            ,
            type: "POST",
            url: 'http://127.0.0.1:8000/actualizarmaterial',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
                console.log(data);
                $('#mdlActualizar').modal('hide');
                removerClasesUpd();        
                Swal.fire(
                    'Actualizado!',
                    'Material Actualizado',
                    'success'
                );
                
                location.reload();

                //var contenedor= $("#row_"+id).html();
                //console.log(contenedor);
                //--
                //$('#row_'+id).empty();
                //$("#row_"+id).load(location.href+' #row_'+id+'>*',"");
                //$('#row_'+id).append('<script  type="text/javascript"src="../js/asignaturas.js"></script>');

                reseteoError();
                imagen_error='<p> Adjunte un archivo </p>';
            },

        });

    }


});

//$('button.update-record').on('click',function(){
    
    
//});
    
    function editar (){
        event.preventDefault();
        console.log('estoy en editar material');
         formateoUpdate();
        console.log('update');
        $("#mdlActualizar").modal();
        var x = $(this);
        var catch_url = x.attr('href');
         console.log(catch_url);
        $.get(catch_url,function(data){
            console.log(data.id);
            $('#nombre_upd').val(data.nombre);
            $('#descripcion_upd').val(data.descripcion);
            $('#archivo').attr('src','/storage/'+data.path+'');
            $('#material_id_upd').val(data.id);
            $('#curso_id_upd').val(data.id_curso);
        });
    }
    function eliminar(){
        event.preventDefault();
        console.log('estoy en eliminar material');
        var x = $(this);
        var delete_url = x.attr('href');
        console.log(delete_url);

        var arregloCadena=delete_url.split("/eliminarMaterial/");
        var id=arregloCadena[1];
        console.log(id);
        
        Swal.fire({
        title: '¿Desea eliminar el registro asociado al material?',
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
                success: function (data) {
                    Swal.fire(
                        'Eliminado!',
                        'El material se ha eliminado satisfactoriamente.',
                        'success'
                    );
    
                    $('#row_'+id).remove();
                },
                error: function () {
                    toastr.error('Error, intente más tarde');
                }
            });
        }
        }); 
    }
    
$('#erroresAlert, #erroresAlert_upd').hide();

$('#boton-guardar, #boton-actualizar').on('click',function(){
    html_errores=nombre_error+imagen_error;
    if(html_errores!=''){
        event.preventDefault();
        $('#erroresText, #erroresText_upd').html(html_errores);
        $('#erroresAlert, #erroresAlert_upd').show();

    }else{
        html_errores='';
        $('#erroresAlert, #erroresAlert_upd').hide();
        //$('#erroresText, #erroresText_upd').html("");
        
    }
});

$('#nombre,#nombre_upd').on('blur',function(){
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

  $('#path').on('blur change',function(){
        if($(this).val() ==''){
            $(this).addClass("is-invalid");
            toastr.error('Adjunte un archivo' );
            imagen_error='<p> Adjunte un archivo </p>';
        }else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            imagen_error='';
        }
    });
    
    function botonEditarActivar(){
        $('.lista-desplegable').show();	
        $('#modal-editar').hide();
        $('#modal-editar-2').show();
    
    }
    
    function botonEditarDesactivar(){
        $('.lista-desplegable').hide();	
        $('#modal-editar-2').hide();
        $('#modal-editar').show();	
    }

    function listar(){
        console.log('estoy en listar');
        //event.preventDefault();


          //Peticion AJAX
          $.get(url,function(data){
            var html='';
            //$('#header-avisos').show();
            for(var i=0;i<data.length;++i){
                html+='<h3 class="col-sm-12 no-margin"> <a href="#">';
                html+='<i class="nav-icon far fa-file"></i> '+data.nombre_material+' </a></h3> ';
                html+='<ul class="list-unstyled col-sm-9 col-xs-12">';
                html+='<li> <i class="fa fa-angle-right"></i>';
                html+='<strong>Archivo:</strong> <a target="_blank"  ';

                html+='href="{{asset("storage/$mat->path")}}"> {{$mat->path}}';

                html+='</a></li>';
                html+='<li> <i class="fa fa-angle-right"></i>';
                html+='<strong>Descripcion:</strong>  '+data.descripcion+' </li>';
                html+='</ul>';

                html+='<div class="dropdown show lista-desplegable" >';
                html+='<a class="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
                html+='Opciones </a>';
                html+='<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">';
               // html+='<a class="dropdown-item update-record" href="{{route('buscarMaterial',$mat->id_material)}}" >Editar</a>';
               // html+='<a class="dropdown-item delete-record" id="material_{{$mat->id_material}}" href="{{route('eliminarMaterial',$mat->id_material)}}">Eliminar</a>';
                html+='</div>';
                html+='</div>';
                html+='<hr>';
            }

            //console.log(html_avisos);
            if(html==''){
                //$('#header-avisos').hide();
                html=html+'<p>No existen materiales registrado en este curso</p>';
                //$('.icono-eliminar').hide();
            }
            $('#contenido-materiales').html(html);
            

            //$('#select_curso').val(curso);
        }); 
    }

});



function checkInput(idInput, pattern) {
    if($(idInput).val().match(pattern)){
        return true
    }else{
        return false
    }
}

function removerClases(){

$('#nombre').removeClass("is-invalid");
$('#nombre').removeClass("is-valid");
$('#nombre').val("");


$('#path').removeClass("is-invalid");
$('#path').removeClass("is-valid");
$('#path').val("");
$('#descripcion').val("");
}


function removerClasesUpd(){

$('#nombre_upd').removeClass("is-invalid");
$('#nombre_upd').removeClass("is-valid");
$('#nombre_upd').val("");


$('#path_upd').removeClass("is-invalid");
$('#path_upd').removeClass("is-valid");
$('#path_upd').val("");
$('#descripcion_upd').val("");
}


function reseteoError(){
    html_errores='';
    nombre_error='<p> El nombre debe tener de 4 a 60 caracteres </p>';
    imagen_error='<p> Adjunte un archivo </p>';
}

function formateoUpdate(){
    html_errores='';
    nombre_error='';
    imagen_error='';
}