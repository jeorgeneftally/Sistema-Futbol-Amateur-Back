@extends("theme.$theme.layout")
@section('contenido')
<div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <!-- /.card -->
                <!--Tarjeta para busqueda con filtro-->
                <div class="card">
                    <div class="card-header">
					
						<h3 class="card-title">Hora actual</h3>
						<div class="card-tools">
							<button type="button" class="btn btn-tool" data-widget="collapse"><i class="fas fa-minus"></i>
							</button>
						</div>
                    </div>
					
                    <div class="card-body p-0">
                    <div style="text-align:center;padding:1em 0;"> 
                    <h2><a style="text-decoration:none;" href="https://www.zeitverschiebung.net/es/city/3895088">
                    <span style="color:gray;">Hora actual en</span><br />Chillán, Chile</a></h2>
                     <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=es&size=large&timezone=America%2FSantiago" width="100%" height="140" frameborder="0" seamless>
                     </iframe>

                    </div>               
                     </div>
                    <!-- /.card-body -->
                </div>
				
            </div>
            <div class="col-md-9">
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
  <div class="carousel-inner">
    <div class="item active">
      <img src="{{asset("assets/$theme/dist/img/estadio.jpg")}}" alt="Image ">
    </div>
   
  </div>
</div>
            </div>
            </div>
    
            <div class="row">
            <div class="col-md-3">
                <!-- /.card -->
                <!--Tarjeta para busqueda con filtro-->
              
            </div>
            <div class="col-md-9">
            <img src="{{asset("assets/$theme/dist/img/estadio.jpg")}}" alt="Image ">

            </div>
            </div>

            </div>  

@endsection

