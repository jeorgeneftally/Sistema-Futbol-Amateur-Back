function setear(){
    
    var semestre = $('#semestre').val();
    var anio=$('#anio').val(); 

    $.get('http://127.0.0.1:8000/semestre/'+anio+'/'+semestre+'',function(data){
        var html_semestre='<option selected>Seleccione un curso</option>';

        for(var i=0;i<data.length;++i){
           
            html_semestre=html_semestre+'<option value="'+data[i].id+'" >'+data[i].nombre+'</option>';
            $('#select_curso').val(data[i].id);
        }
       
        if(data.length==0){
            html_semestre='<option selected>No existen cursos registrados</option>';
            
        }

        $('#select_curso').html(html_semestre);

        });
}

$(function () {

    $('#header-avisos').hide();
    $('#header-apoderados').hide();
    $('.icono-eliminar').hide();
    $('#envio-masivo').hide();

    $('#contenido').on('keyup',function(){
        if($('#contenido').val().trim()===''){
            $('#enviar-aviso').attr("disabled", true);
        }else{
        
            console.log('con contenido');
            $('#enviar-aviso').attr("disabled", false);
        }
    });
    

    $('#contenido2').on('keyup',function(){
        if($('#contenido2').val().trim()===''){
            $('#enviar-aviso2').attr("disabled", true);
        }else{
          
            console.log('con contenido');
            $('#enviar-aviso2').attr("disabled", false);
        }
    });

    $('.cancelar1').on('click',function(){
        limpiar();
        desmarcar();
    });

    $('.cancelar2').on('click',function(){
        limpiar2();
        desmarcar();
        
    });

    

    setear();
    var clickeado = false;
    var check=false;
    $('.check-all-aviso').on('click',marcarTodos);
    $('.eliminar').on('click',eliminar);

    $('#anio,#semestre').on('change click blur',selectSemestre);
    //$('#semestre').on('change click',selectSemestre);

    $('#selector-apoderado').on('click',checkAll);

    $('#buscar-aviso').on('click',listar);
    $('#buscar-aviso').on('click',listarApoderado);
    

    //verifica los chekbox de envio
    function checkAll(){
        if(check==false){
            $('.caja-apoderado').prop('checked',true); 
            check=true;
        }else{
            $('.caja-apoderado').prop('checked',false); 
            check = false;
        }
    }


    //abre el modal y carga los datos del apoderado
    $(document).on('click', 'a.mensaje-accion', function () {
        event.preventDefault();
        $('#enviar-aviso').attr("disabled", true);
        var cadena=  $(this).attr('href');
        var arregloCadena=cadena.split("-");
        console.log(arregloCadena);
        var i=arregloCadena[0];
        var id=arregloCadena[1];
        $('#destinatario').val(id);//
        var datos= $('#row_'+i+' td:nth-child(5)').text();
        //$("#avisoModal").modal();
        console.log(datos);
        console.log(i);
        console.log('este es el id '+id);
        $('#apoderado').val(datos);
    });


    //se carga el modal con los datos de los apoderados en la sección destinatarios
    $(document).on('click', '#enviar-varios', function () {
        event.preventDefault();

        let valoresCheck = [];
        let indiceChek=[];
        let idcheck=[];
        $("input[class=caja-apoderado]:checked").each(function(){
            valoresCheck.push(this.value);
        });

        //var arregloCadena=cadena.split("-");
        //console.log(arregloCadena);
        //var i=arregloCadena[0];

        console.log(valoresCheck);
        var id;
        var cadena='';

        if(valoresCheck.length==0){

            toastr.warning('¡Seleccione un apoderado!' );
        }else{
            $('#avisoModal2').modal();
            $('#enviar-aviso2').attr("disabled", true);

            for(var i=0;i<valoresCheck.length;i++){
                id=valoresCheck[i].split('-')[0];
    
                if(i==valoresCheck.length-1){
                    cadena=cadena+$('#row_'+id+' td:nth-child(5)').text();
                    cadena=cadena+'';
                    console.log('cadena en la posicion '+i+':'+cadena);
                }else{
                    cadena=cadena+$('#row_'+id+' td:nth-child(5)').text();
                    cadena=cadena+', ';
                    console.log('cadena en la posicion '+i+':'+cadena);
                }
            }
            console.log(cadena);

            $('#apoderado2').val(cadena);  
        }

       
    });

    //envia mensaje a apoderados seleccionados con checkbox
    $(document).on('click', '#enviar-aviso2', function () {
        console.log('enviando aviso personalizado');
        let valoresCheck = [];
        $("input[class=caja-apoderado]:checked").each(function(){
            valoresCheck.push(this.value);
        });
        console.log(valoresCheck);

        var anyo=$('#anio').val();
        var semestre=$('#semestre').val();
        var curso=$('#select_curso').val();

        var contenido2=$('#contenido2').val();
        var emisor2=$('#emisor2').val();

        for(var i=0;i<valoresCheck.length;i++){
            var destinatario2=valoresCheck[i].split('-')[1];
            console.log(destinatario2);
            $.ajax({
                type: "POST",
                url: 'http://127.0.0.1:8000/api/guardarAviso',
                data: {anyo:anyo,semestre:semestre,contenido:contenido2,destinatario:destinatario2,emisor:emisor2,
                curso:curso},
                success: function(data){
                    console.log(data);
                },
            });
        }

        $('#avisoModal2').modal('hide');

        Swal.fire(
            'Agregado!',
            'El aviso se ha agregado satisfactoriamente.',
            'success'
        );
        limpiar2();
        desmarcar();
        setTimeout(actualizar(), 1000);
        
    });

    //envia y almacena un aviso en bd
    $(document).on('click', '#enviar-aviso', function () {
        event.preventDefault();
        var anyo=$('#anio').val();
        var semestre=$('#semestre').val();
        var contenido=$('#contenido').val();
        var destinatario=$('#destinatario').val();
        var emisor=$('#emisor').val();
        var curso=$('#select_curso').val();
        console.log(anyo);
        console.log(semestre);
        console.log(contenido);
        console.log(destinatario);
        console.log(curso);

        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:8000/api/guardarAviso',
            data: {anyo:anyo,semestre:semestre,contenido:contenido,destinatario:destinatario,emisor:emisor,
            curso:curso},
            success: function(data){
                console.log(data);
                $('#avisoModal').modal('hide');
               
                Swal.fire(
                    'Agregado!',
                    'El aviso se ha agregado satisfactoriamente.',
                    'success'
                );
                limpiar();
                desmarcar();
                setTimeout(actualizar(), 1000);
            },

        });
    });

   

    
    //elimina un aviso
    function eliminar() {
        let valoresCheck = [];
        $("input[class=caja]:checked").each(function(){
            valoresCheck.push(this.value);
        });

        if(valoresCheck.length==0){
         
            toastr.warning('¡Seleccione un aviso!' );

        }else{
            Swal.fire({
                title: '¿Desea eliminar los registros asociados a los avisos seleccionados?',
                text: "Los datos no podrán ser recuperados!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    for(var i=0;i<valoresCheck.length;i++){
                        var id=valoresCheck[i];
                        
                        console.log(id);
                        var ruta='http://127.0.0.1:8000/api/aviso/eliminar/'+id+'';
            
                      
                                $.ajax({
                                    url:ruta,
                                    type:'DELETE',
                                    success:function(data){
                                        console.log(data);
                                        //$('#header-avisos').hide();
                                        //setTimeout($("#contenido-avisos").load(location.href + "#contenido-avisos"), 1000);
                                    }
                                });
                    }
                    setTimeout(actualizar(), 1000);
                    
    
                }  
            });

        }
      


     
    }

   

    //lista cursos en función de año y semestre
    function selectSemestre() {
        
        event.preventDefault();
        var semestre= $("#semestre").val();
        var anio=$('#anio').val();

        //
        if(!semestre){
            $('#select_curso').html('<option  selected >Todas las asignaturas</option>');
            return;
        }

        //Peticion AJAX
        $.get('http://127.0.0.1:8000/semestre/'+anio+'/'+semestre+'',function(data){
        var html_semestre='<option selected >Seleccione un curso</option>';

        for(var i=0;i<data.length;++i){
            html_semestre=html_semestre+'<option value="'+data[i].id+'" >'+data[i].nombre+'</option>';
            $('#select_curso').val(data[i].id);
        }
         
        if(data.length==0){
            html_semestre='<option selected>No existen cursos registrados</option>';
            
        }
        $('#select_curso').html(html_semestre);

        });

    }

    /*Entrega el detalle de todos los avisos hecho por el profesor en el curso,
    con el detalle del apoderado como destinatario*/
    function listar(){
        event.preventDefault();
      
        var semestre= $('#semestre').val();
        var anio=$('#anio').val();
        var curso=$('#select_curso').val();
        console.log($("#select_curso option:selected").text());

        if($("#select_curso option:selected").text()=='Seleccione un curso'){
           
            toastr.warning('¡Seleccione un Curso!' );

        }else if($("#select_curso option:selected").text()=='No existen cursos registrados'){
            console.log('no existen cursos');
            toastr.warning('¡El periodo no registra cursos!');
        }
        else{
            event.preventDefault();
           
            $('#tabs').show();
            $('.icono-eliminar').show();


           //Peticion AJAX
           $.get('http://127.0.0.1:8000/listarAvisos/'+anio+'/'+semestre+'/'+curso+'',function(data){
               var html_avisos='';
               $('#header-avisos').show();
               for(var i=0;i<data.length;++i){

                   //$('#check1').val(data.id);
                   html_avisos=html_avisos+'<tr>';
                   html_avisos=html_avisos+'<td> <div class="icheck-primary"><center><input type="checkbox" value="'+data[i].id+'" id="check1" class="caja"></center>';
                   html_avisos=html_avisos+' <label for="check1"></label> </div> </td>';
                   //html_avisos=html_avisos+' <td class="mailbox-star"><a href="#"><i class="fas fa-star text-warning"></i></a></td>';
                   html_avisos=html_avisos+'<td class="mailbox-name"><a href="">'+data[i].nombres+' '+data[i].apellido_paterno+'</a></td>';
                   html_avisos=html_avisos+'<td class="mailbox-subject"><b>EduAPP</b><br>' +data[i].contenido+'</td>';
                  // html_avisos=html_avisos+' <td class="mailbox-attachment"> </td> ';
                   html_avisos=html_avisos+'<td class="mailbox-date">' +data[i].created_at+ '</td></tr>';
               }
               //console.log(html_avisos);
               if(html_avisos==''){
                $('#header-avisos').hide();
                   html_avisos=html_avisos+'<p><center>¡No hay mensajes enviados! </center></p>';
                   $('.icono-eliminar').hide();
               }
               $('#contenido-avisos').html(html_avisos);
               

               $('#select_curso').val(curso);
           }); 
        }
           
    }
  

    //obtiene el detalle de los alumnos de un curso, y su apoderado asociado

    function listarApoderado(){
        event.preventDefault();
        
        var semestre= $('#semestre').val();
        var anio=$('#anio').val();
        var curso=$('#select_curso').val();

     

        if($("#select_curso option:selected").text()!='Seleccione un curso' &&
        $("#select_curso option:selected").text()!='No existen cursos registrados'){

            $.get('http://127.0.0.1:8000/obtenerDatos/'+anio+'/'+semestre+'/'+curso+'',function(data){
                var html_enviar='';
                console.log('segundo metodo ajax');
                console.log($('#anio').val());
                console.log($('#semestre').val());
                console.log($('#select_curso').val());
                for(var i=0;i<data.length;++i){
       
                    html_enviar=html_enviar+'<tr id="row_'+(i+1)+'">';
                    html_enviar=html_enviar+'<td>'+(i+1)+'</td>';
                    html_enviar=html_enviar+'<td align="center"><input type="checkbox" id="cbox1" class="caja-apoderado" value="'+(i+1)+'-'+data[i].id_apoderado+'"></td>';
                    //checkbox value first_checkbox class combo-box-ausencia
                    html_enviar=html_enviar+'<td>'+data[i].apellido_alumno+'</td>';
                    html_enviar=html_enviar+'<td>'+data[i].nombre_alumno+'</td>';
                    html_enviar=html_enviar+'<td>'+data[i].apellido_apoderado+'  '+data[i].nombre_apoderado+'</td>';
                    html_enviar=html_enviar+'<td align="center"><a href="'+(i+1)+'-'+data[i].id_apoderado+'" class="mensaje-accion" name="mensaje-accion" ><i class="ace-icon fa fa-envelope bigger-130 green " data-toggle="modal" data-target="#avisoModal" data-whatever="@getbootstrap"></i></a></td>';
                    html_enviar=html_enviar+'</tr>';
                }
                console.log(html_enviar);
                if(html_enviar==''){
                    $('#envio-masivo').show();
                    $('#header-apoderados').show();
                    html_enviar=html_enviar+'<p><center>¡No hay apoderados registrados! <center> </p>';
                }
                $('#envio-masivo').show();
                $('#header-apoderados').show();
                $('#listado-apoderados').html(html_enviar);
                //$('#tabla-apoderados').DataTable();
               
            });
        }
        /*var tabla;
        if (tabla === undefined) {
            tabla = $('#tabla-apoderados').DataTable();
            tabla.destroy();
        }
        var count = 0;
        

        tabla = $('#tabla-apoderados').DataTable({


            "processing": true,
            "serverSide": true,
            "ajax":'http://127.0.0.1:8000/obtenerDatos/'+anio+'/'+semestre+'/'+curso+'' ,
            "columns": [
                {data:'seleccion'},
               {data:'seleccionar'},
               {   "render":
                        function (data, type, row) {
                            count++;
                            return (count);
                        }
                }, 
                {data: 'apellido_alumno'},
                {data: 'nombre_alumno'},
                {
                    "render":
                        function (data, type, row) {
                            //console.log(data);
                            return (row.apellido_apoderado + ' ' + row.nombre_apoderado);
                        }
                },
                {data:'accion'}
                
               
               
            ],
    
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla =(",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            },
            "ordering": true
    
    
    
        });*/
    
    

    }
    /*$(document).on('click', '#buscar-aviso', function listarApoderados () {
       

    });*/

    function actualizar() {
        listar();
        
    }

    function marcarTodos() {
       
        if(clickeado==false){
            $('.caja').prop('checked',true); 
            clickeado=true;
        }else{
            $('.caja').prop('checked',false); 
            clickeado = false;
        }
           
    }

    function limpiar(){
        $('#contenido').val('');
        $('#destinatario').val(''); 
    };
 
    function limpiar2(){
        $('#contenido2').val('');
        $('#destinatario2').val(''); 
    };


//obtiene el detalle de los alumnos de un curso, y su apoderado asociado
/*$(document).on('click', '#boton-buscar', function (e) {
    var semestre = $('#select-semestres').val();
    var curso = $('#select-cursos').val();
    var asignatura = $('#select-asignaturas').val();
    var anyo = $('#select-anyos').val();
    $('#anyo').val(anyo);
    $('#semestre').val(semestre);
    $('#nivel').val(curso);
    $('#asignatura').val(asignatura);

    $.get('/actividades/'+curso+'/'+asignatura+'/'+semestre+'/'+anyo+'/getCurso',function (data){
        // $('#id_apoderado_upd').val(data.id_apoderado);
        console.log(data);
        var id_curso='';
        var nombreAsignatura='';
        for (var i=0; i<data.length; ++i){
            id_curso = data[i].id_curso;
            nombreAsignatura = data[i].asignatura;
        }
        $('#curso_id_curso').val(id_curso);
        $('#titulo').html('<h1>Registro de Notas ' + nombreAsignatura + '</h1>');
    });


    var table;
    if (table === undefined) {
        table = $('#tabla-alumno').DataTable();
        table.destroy();
    }
    var count = 0;
    table = $('#tabla-alumno').DataTable({


        "processing": true,
        "serverSide": true,
        "ajax": 'http://127.0.0.1:8000/notas/' + anyo + '/' + semestre + '/' + curso + '/' + asignatura + '/alumnos',
        "columns": [
            {
                "render":
                    function (data, type, row) {
                        count++;
                        return (count);
                    }
            },
            {
                "render":
                    function (data, type, row) {
                        // console.log(row);
                        return (row.apellido_paterno + ' ' + row.apellido_materno);
                    }
            },
            { data: 'nombres' },
        ],

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



    });

});*/

function desmarcar(){
    $('#selector-apoderado').prop('checked',false);
    $('.caja-apoderado').prop('checked',false); 
    check=false;
    console.log(check);
}
});



