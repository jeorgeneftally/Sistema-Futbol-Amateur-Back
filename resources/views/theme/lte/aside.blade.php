<!-- Main Sidebar Container Menu lateral-->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
        <img src="{{asset("assets/$theme/dist/img/pelota.png")}}" alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">ANFA</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 ">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link ">
                        <i>
                            <img src="{{asset("assets/$theme/dist/img/pelota.png")}}" class="img-circle elevation-2"
                                alt="User Image">
                            <i> &nbsp; Jeorge (colocar aqui) </i>
                        </i>
                        <p><i class="fas fa-angle-left right"></i></p>
                    </a>
                  
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-toggle="modal" data-target="#logoutModal">
                                <i class="nav-icon fa fa-sign-out-alt"></i>
                                <p>Salir</p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
                <li class="nav-header">MENÚ</li>

                <li class="nav-item">
                    <a href="" class="nav-link">
                        <i class="nav-icon fa fa-home"></i>
                        <p>
                            Inicio
                        </p>
                    </a>
                </li>
                
                <li class="nav-item">
                    <a href="{{Route('campeonatos')}}" class="nav-link">
                        <i class="nav-icon fa fa-book"></i>
                        <p>
                            Campeonato
                        </p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="{{Route('equipos')}}" class="nav-link">
                        <i class="nav-icon fa fa-bullhorn"></i>
                        <p>
                            Equipos
                        </p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="" class="nav-link">
                        <i class="nav-icon far fa-calendar-alt"></i>
                        <p>
                            Arbitros
                        </p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="{{Route('series')}}" class="nav-link">
                        <i class="nav-icon far fa-folder-open"></i>
                        <p>
                            Series
                        </p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="" class="nav-link">
                        <i class="nav-icon fas fa-graduation-cap"></i>
                        <p>
                            Tabla de posiciones
                        </p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="" class="nav-link">
                    <i class="nav-icon fas fa-graduation-cap"></i>
                        <p>
                          Puntos
                        </p>
                    </a>
                </li>
               
           


            </ul>

        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>

