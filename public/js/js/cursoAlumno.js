$(function () {
    var selected = [];
    var id_curso;
    console.log('documento listo');
    //Bootstrap Duallistbox
    var listamultiple=$('.duallistbox').bootstrapDualListbox({ 
        nonSelectedListLabel : 'No seleccionado' , 
        selectedListLabel : 'Seleccionado' , 
        preserveSelectionOnMove : 'movido' , 
        moveOnSelect : false  
        /*nonSelectedFilter : 'ion ([7-9] | [1] [0-2])'*/ });
    $('.update-record').on('click',seleccionar);
    $('#inscribir_alumnos').on('click',inscribir);

    function seleccionar(){

        event.preventDefault();
        $("#mdlAgregar").modal('show');
        id_curso= $(this).attr('href');
        console.log('hola '+id_curso);
        console.log(listamultiple);
    }

    function inscribir (){
        var err;
        event.preventDefault();
        console.log('inscribir alumnos');
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
                url: 'http://127.0.0.1:8000/api/inscribirAlumnos',
                data: {curso_id:id_curso,alumno_id:id_alumno},
                success: function(data){
                    console.log(data);
                    
                },
                error: function () {

                    err=1;
                    console.log('dentro de error'+err);
                   
                },
            });
        }
        $('#mdlAgregar').modal('hide');

        console.log('fuera del for'+err);

        /*if(err==1){
            toastr.error('Error, intente más tarde');
          
        }else{
            
            Swal.fire(
                'Agregados!',
                'Los alumnos se ha agregados satisfactoriamente al curso.',
                'success'
            );
        }*/
        Swal.fire(
            'Agregados!',
            'Los alumnos se ha agregados satisfactoriamente al curso.',
            'success'
        );
        location.reload();
     
    }

});