

$(function () { 
    
        $('#semestre,#anio').on('change click blur',selectSemestre);
        //$('#material-modal').on('change click',modalCrear);
        $('#buscar-asignatura').on('click',listar);
        selectSemestre();

        //lista cursos en función de año y semestre
        function selectSemestre() {
           // event.preventDefault();
            var semestre= $('#semestre').val();
            var anio=$('#anio').val();
            console.log(anio);
            
            if(!semestre){
                $('#select_curso').html('<option selected >Todas las asignaturas</option>');
                return;
            }
    
            //Peticion AJAX
            $.get('http://127.0.0.1:8000/cursos/'+anio+'/'+semestre+'',function(data){
            var html_semestre='<option selected >Seleccione un curso</option>';
    
            for(var i=0;i<data.length;++i){
                html_semestre=html_semestre+'<option value="'+data[i].id+'" >'+data[i].nombre_curso+'</option>';
                //$('#select_curso').val(data[i].id);
            }
    
            console.log(html_semestre);
            if(data.length==0){
                html_semestre='<option selected>No existen cursos registrados</option>';
                
            }
            $('#select_curso').html(html_semestre);
    
            });
    
        }

        function listar(){
            event.preventDefault();
            var semestre= $('#semestre').val();
            var anio=$('#anio').val();
            var curso=$('#select_curso').val();
            if($("#select_curso option:selected").text()=='Seleccione un curso'){

                toastr.warning('¡Seleccione el curso!', '¡Advertencia!');
               
            }else if($("#select_curso option:selected").text()=='No existen cursos registrados'){
                toastr.warning('¡El periodo no registra cursos!','¡Advertencia!');
            }else{
                
                $.get('http://127.0.0.1:8000/listarAsignaturas/'+anio+'/'+semestre+'/'+curso+'',function(data){
                    var html_materiales='';
    
                    for(var i=0;i<data.length;++i){
                        html_materiales+='<h3 class="col-sm-12 no-margin">';
                        html_materiales+='<a href="materialcurso/'+data[i].id_curso+'" class="enlace-asignatura">';
                        html_materiales+='<i class="fa fa-graduation-cap green "></i> '+data[i].nombre_asignatura+' ';
                        html_materiales+='</a></h3>';
    
                        html_materiales+='<ul class="list-unstyled col-sm-4 col-xs-12">';
                        html_materiales+='<li> <i class="fa fa-angle-right"></i>';
                        html_materiales+='<strong>Docente:</strong> '+data[i].nombre_profesor+' </li>';
                        html_materiales+='<li> <i class="fa fa-angle-right"></i>';
                        html_materiales+='<strong>Código:</strong> '+data[i].codigo_asignatura+' </li>';
                        html_materiales+='</ul>';
    
                        html_materiales+='</ul><ul class="list-unstyled col-sm-2 col-xs-12">';
                        html_materiales+='<li> <i class="fa fa-angle-right"></i>';
                        html_materiales+='<strong>Participantes:</strong> </li>';
                        html_materiales+='<li><i class="fa fa-angle-right"></i>';
                        html_materiales+='<strong>Sede:</strong>&nbsp;</li>';
                        //html_materiales+='<li><i class="fa fa-angle-right"></i>';
                        //html_materiales+='<strong>Periodo: </strong>'+anio+' -  '+semestre+'</li>';
                        html_materiales+='</ul> <hr>';
                                
                            
                    }
    
                    $('#contenido-materiales').html(html_materiales);
                    $('#select_curso').val(curso);
    
                });
            }
       
        }

    //Funcion para eliminar un Alumno usando Ajax
    $(document).on('click','a.delete-record', function(){
        event.preventDefault();
        console.log('estoy en eliminar material');
        var x = $(this);
        var delete_url = x.attr('data-id');
        console.log(delete_url);
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
                        //$("#tabla-contenido").load(location.href + " #tabla-contenido");
                        // setTimeout(location.reload.bind(location), 1500);
                        location.reload();
                    },
                    error: function () {
                        toastr.error('Error, intente más tarde');
                    }
                });
            }
        }); 
    });

  

           /* $(document).on('click', '.enlace-asignatura', function () {
                event.preventDefault()
                console.log('material por curso');
                // alert('material por curso');
                var href= $(this).attr('href');
                var id=href.split('/');
               console.log(id[1]);
               $.get('http://127.0.0.1:8000/materialcurso/'+id[1],function(data){
                var html_materiales='';
                var cabecera='';
                var pdf='';
                cabecera+='<h4 class="card-title"> '+data[0].nombre_curso+': '+data[0].nombre_asignatura+' <small>';
                cabecera+='<i class="ace-icon fa fa-angle-double-right"></i>Portada del curso</small></h4>';
                $('.cabecera-material').html(cabecera);

                for(var i=0;i<data.length;++i){
                    html_materiales+='<h3 class="col-sm-12 no-margin">';
                    html_materiales+='<a href="#">';
                    html_materiales+='<i class="nav-icon far fa-file"></i> '+data[i].nombre_material+' ';
                    html_materiales+='</a></h3> ';

                    html_materiales+='<ul class="list-unstyled col-sm-9 col-xs-12">';
                    html_materiales+='<li> <i class="fa fa-angle-right"></i>';
                    html_materiales+='<strong>Archivo:</strong> '+data[i].path+' </li>';
                    html_materiales+='<li> <i class="fa fa-angle-right"></i>';
                    html_materiales+='<strong>Descripcion:</strong> '+data[i].descripcion+' </li>';
                    html_materiales+='</ul><hr>';
                    pdf+='';
                    
                   
                    //     html_materiales+='</ul><ul class="list-unstyled col-sm-2 col-xs-12">';
                    //     html_materiales+='<li> <i class="fa fa-angle-right"></i>';
                    //     html_materiales+='<strong>Participantes:</strong> </li>';
                    //     html_materiales+='<li><i class="fa fa-angle-right"></i>';
                    //     html_materiales+='<strong>Sede:</strong>&nbsp;</li>';
                    //     html_materiales+='<li><i class="fa fa-angle-right"></i>';
                    //     html_materiales+='<strong>Periodo: </strong>'+anio+' -  '+semestre+'</li>';
                    //     html_materiales+='</ul> <hr>';
                                    
                }
                $('#contenido-materiales').html(html_materiales);
                // var iframe = $('<iframe>');
                // iframe.attr('src','http://127.0.0.1:8000/boleta-honorario.pdf');
                // $('#pdf').html(iframe);
               });
               

            });*/
});

