///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           Cargar contenido              /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadContent(url) {
    const mainContent = document.getElementById('main-content');

    if (url === '#usuarios') {
        fetch('users/usuarios.php')
            .then(response => response.json())
            .then(data => {

                const miembroContainer = document.createElement('div');
                miembroContainer.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
                miembroContainer.style.width = '90%';
                miembroContainer.style.height = '80vh';
    
                const header = document.createElement('h1');
                header.textContent = 'Usuarios';
                header.style.color = '#0d4a8e';
                header.classList.add('mb-4');
                miembroContainer.appendChild(header);

                const descripcion = document.createElement('p');
                descripcion.textContent = 'Aquí puedes encontrar una lista de todos los miembros de la asociación registrados en el sistema.';
                descripcion.style.color = '#0d4a8e';
                descripcion.style.marginBottom = '20px';
                descripcion.classList.add('mb-4');
                miembroContainer.appendChild(descripcion);

                const linea1 = document.createElement('hr');
                miembroContainer.appendChild(linea1);
    
                const tabla = document.createElement('table');
                tabla.classList.add('table', 'table-striped');
    
                const cabecera = ['ID', 'Nombre', 'Usuario', 'Directiva'];
                if (isAdmin) {
                    cabecera.push('Acciones');
                }
    
                const filaCabecera = document.createElement('tr');
                cabecera.forEach(textoCabecera => {
                    const header = document.createElement('th');
                    header.textContent = textoCabecera;
                    filaCabecera.appendChild(header);
                });
                tabla.appendChild(filaCabecera);
    
                data.forEach(usuario => {
                    const fila = document.createElement('tr');
                    ['user_id', 'user_name', 'user_username', 'user_admin'].forEach(campo => {
                        const celda = document.createElement('td');
                        const valor = campo === 'user_admin' ? (parseInt(usuario[campo]) === 1 ? 'Sí' : 'No') : usuario[campo];
                        celda.textContent = valor;
                        fila.appendChild(celda);
                    });
    
                    if (isAdmin) {
                        const celdaAcciones = document.createElement('td');
    
                        const botonEditar = document.createElement('button');
                        botonEditar.textContent = 'Editar';
                        botonEditar.classList.add('btn', 'btn-primary', 'me-2');
                        botonEditar.addEventListener('click', () => {
                            console.log(usuario);
                            formularioMiembro(usuario);
                        });
                        celdaAcciones.appendChild(botonEditar);
    
                        const botonBorrar = document.createElement('button');
                        botonBorrar.textContent = 'Eliminar';
                        botonBorrar.classList.add('btn', 'btn-danger');
                        botonBorrar.addEventListener('click', () => {
                            borrarMiembro(usuario.user_id);
                        });
                        celdaAcciones.appendChild(botonBorrar);
    
                        fila.appendChild(celdaAcciones);
                    }
                    tabla.appendChild(fila);
                });
                miembroContainer.appendChild(tabla);

                const linea2 = document.createElement('hr');
                miembroContainer.appendChild(linea2);
    
                if (isAdmin) {
                    const botonCrear = document.createElement('button');
                    botonCrear.textContent = 'Añadir Usuario';
                    botonCrear.classList.add('btn', 'btn-primary', 'mb-3');
                    botonCrear.addEventListener('click', () => {
                        formularioMiembro();
                    });
                    miembroContainer.appendChild(botonCrear);
                }

                mainContent.innerHTML = '';
                mainContent.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'vh-100');
                mainContent.appendChild(miembroContainer);
        })
        .catch(error => {
            console.error('Error al cargar usuarios', error);
            mainContent.innerHTML = '<p>Error al cargar usuarios.</p>';
        });

    } else if (url === '#secciones') {
        mainContent.innerHTML = '';

        const seccionContainer = document.createElement('div');
        seccionContainer.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
        seccionContainer.style.width = '90%';
        seccionContainer.style.height = '80vh';
        seccionContainer.style.margin = '0 auto';
        seccionContainer.style.position = 'relative';

        const seccionTitulo = document.createElement('h1');
        seccionTitulo.textContent = 'Secciones web';
        seccionTitulo.style.color = '#0d4a8e';
        seccionTitulo.classList.add('mb-4');
        seccionContainer.appendChild(seccionTitulo);

        const seccionDescripcion = document.createElement('p');
        seccionDescripcion.textContent = 'Aquí puedes agregar secciones de la página pública. Tanto header como footer.';
        seccionDescripcion.style.color = '#0d4a8e';
        seccionDescripcion.style.marginTop = '20px';
        seccionDescripcion.classList.add('mb-4');
        seccionContainer.appendChild(seccionDescripcion);

        const linea = document.createElement('hr');
        seccionContainer.appendChild(linea);

        const divBotones = document.createElement('div');
        divBotones.style.display = 'flex';
        divBotones.style.justifyContent = 'center';
        divBotones.style.alignItems = 'center';
        divBotones.style.height = '50%';

        const botonContainer = document.createElement('div');
        botonContainer.classList.add('d-flex', 'justify-content-center'); 
        
        const botonHeader = document.createElement('button');
        botonHeader.textContent = 'Secciones Header';
        botonHeader.classList.add('btn', 'btn-primary', 'me-2', 'mb-2'); 
        botonHeader.addEventListener('click', muestraHeader); 
        
        const botonFooter = document.createElement('button');
        botonFooter.textContent = 'Secciones Footer';
        botonFooter.classList.add('btn', 'btn-primary', 'mb-2'); 
        botonFooter.addEventListener('click', muestraFooter); 
        
        botonContainer.appendChild(botonHeader);
        botonContainer.appendChild(botonFooter);
        
        divBotones.appendChild(botonContainer);
        seccionContainer.appendChild(divBotones);
        mainContent.appendChild(seccionContainer);

    } else if (url === '#actas') {
        mainContent.innerHTML = '';
        
        const actasContainer = document.createElement('div');
        actasContainer.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
        actasContainer.style.width = '90%';
        actasContainer.style.height = '80vh';

        const actasTitulo = document.createElement('h1');
        actasTitulo.textContent = 'Actas';
        actasTitulo.style.color = '#0d4a8e';
        actasTitulo.classList.add('mb-4');
        actasContainer.appendChild(actasTitulo);

        const actasDescripcion = document.createElement('p');
        actasDescripcion.textContent = 'Aquí puedes encontrar para descargar las actas de la asociación del último año en curso.';
        actasDescripcion.style.color = '#0d4a8e';
        actasDescripcion.style.marginBottom = '20px';
        actasDescripcion.classList.add('mb-4');
        actasContainer.appendChild(actasDescripcion);

        const linea1 = document.createElement('hr');
        actasContainer.appendChild(linea1);
        
        fetch('actas/get_actas.php')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const zonaActas = document.createElement('div');
                zonaActas.classList.add('actas-container', 'mt-4', 'd-flex', 'flex-wrap', 'justify-content-center');

                data.forEach(acta => {
                    const cajitaActa = document.createElement('div');
                    cajitaActa.classList.add('acta-box', 'mb-2', 'mx-2'); 
                    cajitaActa.style.width = '150px';
                    const actaLink = document.createElement('a');
                    actaLink.textContent = acta.acta_name;
                    actaLink.href = `actas/download_acta.php?id=${acta.acta_id}`;
                    actaLink.classList.add('acta-link', 'btn', 'btn-outline-primary', 'btn-lg', 'd-block', 'text-center', 'w-100');

                    cajitaActa.appendChild(actaLink);
                    zonaActas.appendChild(cajitaActa);

                });
                actasContainer.appendChild(zonaActas);

            } else {
                const noActas = document.createElement('p');
                noActas.textContent = 'No hay actas disponibles.';
                actasContainer.appendChild(noActas);
            }

            const linea2 = document.createElement('hr');
            actasContainer.appendChild(linea2);
            
            if (isAdmin) {
                const botonSubirActa = document.createElement('button');
                botonSubirActa.textContent = 'Subir Acta';
                botonSubirActa.classList.add('btn', 'btn-primary', 'mt-3');
                botonSubirActa.addEventListener('click', () => {
                    formularioActa();
                });
                actasContainer.appendChild(botonSubirActa);
            }
            mainContent.appendChild(actasContainer);
        })
        .catch(error => {
            console.error('Error al cargar las actas:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error al cargar las actas.';
            actasContainer.appendChild(errorMessage);
            mainContent.appendChild(actasContainer);
        });

    } else if (url === '#calendario') {
        mainContent.innerHTML = '';

        const calendarioContainer = document.createElement('div');
        calendarioContainer.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
        calendarioContainer.style.width = '90%';
        calendarioContainer.style.height = '80vh';
        calendarioContainer.style.overflowY = 'auto';
    
        const calendarioTitulo = document.createElement('h1');
        calendarioTitulo.textContent = 'Calendario';
        calendarioTitulo.style.color = '#0d4a8e';
        calendarioTitulo.classList.add('mb-4');
        calendarioContainer.appendChild(calendarioTitulo);

        const calendarioDescripcion = document.createElement('p');
        calendarioDescripcion.textContent = 'Nuestro calendario para ver o añadir eventos relacionados con la asociación. Da click en el día y añade el evento.';
        calendarioDescripcion.style.color = '#0d4a8e';
        calendarioDescripcion.style.marginBottom = '20px';
        calendarioDescripcion.classList.add('mb-4');
        calendarioContainer.appendChild(calendarioDescripcion);

        const linea = document.createElement('hr');
        calendarioContainer.appendChild(linea);
    
        const calendarioDiv = document.createElement('div');
        calendarioDiv.id = 'calendarContent';
        calendarioContainer.appendChild(calendarioDiv);
    
        mainContent.appendChild(calendarioContainer);
        
        muestraCalendario(calendarioDiv);

    } else if (url === '#presupuestos') {
        mainContent.innerHTML = '<h1>Presupuestos</h1>';
        cargaPresupuesto(mainContent)

    }else {
        mainContent.innerHTML = `<h1>${url}</h1><p>Contenido dinámico para ${url}</p>`;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////   Formulario crear/modificar usuario    /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function formularioMiembro(datosUsuario) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'bg-light', 'rounded');
    container.style.width = '90%';
    container.style.height = '80vh';
    container.style.margin = '0 auto'; 
    
    const formularioContainer = document.createElement('div');
    formularioContainer.classList.add('p-5', 'bg-white', 'shadow', 'rounded');
    formularioContainer.style.width = '100%';
    formularioContainer.style.maxWidth = '600px';
    formularioContainer.style.height = 'auto'; 

    const formulario = document.createElement('form');
    const esNuevo = !datosUsuario;

    const titulo = esNuevo ? 'Crear Nuevo Usuario' : 'Editar Usuario';
    const opcionTitulo = document.createElement('h2');
    opcionTitulo.textContent = titulo;
    opcionTitulo.classList.add('mb-4');
    opcionTitulo.style.color = '#0d4a8e';

    formulario.appendChild(opcionTitulo);

    formulario.innerHTML += `
        <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" name="name" value="${datosUsuario ? datosUsuario.user_name : ''}" required>
        </div>
        <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" class="form-control" id="username" name="username" value="${datosUsuario ? datosUsuario.user_username : ''}" required>
        </div>
    `;

    if (esNuevo) {
        formulario.innerHTML += `
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
        `;
    }

    const isAdminChecked = datosUsuario && datosUsuario.user_admin === '1';
    console.log('Datos usuario:', datosUsuario);
    console.log('Es Directiva:', isAdminChecked);
    
    formulario.innerHTML += `
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="isAdminCheckbox" name="isAdminCheckbox" ${isAdminChecked ? 'checked' : ''}>
            <label class="form-check-label" for="isAdminCheckbox">Es directiva</label>
        </div>
    `;

    const buttonText = esNuevo ? 'Guardar' : 'Guardar Cambios';
    formulario.innerHTML += `<button type="button" onclick="${esNuevo ? 'crearMiembro()' : `actualizarMiembro(${datosUsuario.user_id})`}" class="btn btn-primary">${buttonText}</button>
    <a href="socios.php" class="btn btn-secondary ms-2">Cancelar</a>
    `;
    

    formularioContainer.appendChild(formulario);
    container.appendChild(formularioContainer);
    mainContent.appendChild(container);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////             Crear Miembros              /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function crearMiembro() {

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('isAdminCheckbox').checked;


    const userData = { name: name, username: username, password: password, user_admin: isAdmin ? 1 : 0};

    fetch('users/crear_usuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al crear miembro');
    })
    .then(data => {
        alert('Miembro creado con éxito');
        loadContent('#usuarios');
    })
    .catch(error => {
        console.error('Error al crear miembro:', error);
        alert('Hubo un error al crear miembro');
    });

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////            Actualizar Miembros              //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function actualizarMiembro(idMiembro) {
    const nuevoName = document.getElementById('name').value;
    const nuevoUsername = document.getElementById('username').value;
    const isAdminCheckbox = document.getElementById('isAdminCheckbox');
    const isAdmin = isAdminCheckbox.checked;

    const userData = {
        id: idMiembro,
        name: nuevoName,
        username: nuevoUsername,
        admin: isAdmin
    };

    fetch('users/actualizar_usuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al actualizar miembro');
    })
    .then(data => {
        console.log('Miembro actualizado correctamente:', data);
        alert('Miembro actualizado correctamente');
        loadContent('#usuarios');
    })
    .catch(error => {
        console.error('Error al actualizar miembro:', error);
        alert('Hubo un error al actualizar miembro');
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////             Eliminar Miembros               //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function borrarMiembro(idMiembro) {
    if (!confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
        return;
    }

    fetch(`users/eliminar_usuario.php?id=${idMiembro}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al eliminar miembro');
    })
    .then(data => {
        alert('Miembro eliminado con éxito');
        loadContent('#usuarios');
    })
    .catch(error => {
        console.error('Error al eliminar miembro:', error);
        alert('Hubo un error al eliminar miembro');
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////             Mostrar Secciones               //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function muestraHeader() {
    const mainContent = document.getElementById('main-content');
    console.log('Mostrando secciones de encabezado...');

    fetch('sections/header_sections.php')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de secciones de encabezado:', data);

            mainContent.innerHTML = '';

            const headerContainer = document.createElement('div');
            headerContainer.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
            headerContainer.style.width = '90%';
            headerContainer.style.height = '80vh';
            headerContainer.style.margin = '0 auto';
            headerContainer.style.position = 'relative';

            const headerTitulo = document.createElement('h1');
            headerTitulo.textContent = 'Secciones Header';
            headerTitulo.style.color = '#0d4a8e';
            headerTitulo.classList.add('mb-4');
            headerTitulo.style.position = 'absolute';
            headerTitulo.style.top = '20px';
            headerTitulo.style.left = '20px';
            headerContainer.appendChild(headerTitulo);
    
            const headerDescripcion = document.createElement('p');
            headerDescripcion.textContent = 'Aquí puedes agregar o modificar secciones header de la página pública.';
            headerDescripcion.style.color = '#0d4a8e';
            headerDescripcion.style.marginTop = '60px';
            headerDescripcion.classList.add('mb-4');
            headerContainer.appendChild(headerDescripcion);
    
            const linea = document.createElement('hr');
            headerContainer.appendChild(linea);

            const divBotones = document.createElement('div');
            divBotones.style.display = 'flex';
            divBotones.style.flexDirection = 'column';
            divBotones.style.alignItems = 'center';
            divBotones.style.justifyContent = 'center';
            divBotones.style.height = '60%';

            const tabla = document.createElement('table');
            tabla.classList.add('table', 'table-striped', 'mb-4');

            const columna = document.createElement('tr');
            ['ID', 'Nombre', 'Acciones'].forEach(datosHeader => {
                const header = document.createElement('th');
                header.textContent = datosHeader;
                columna.appendChild(header);
            });

            tabla.appendChild(columna);

            data.forEach(seccion => {
                const columna = document.createElement('tr');

                const idHeader = document.createElement('td');
                idHeader.textContent = seccion.section_id;
                columna.appendChild(idHeader);

                const nombreHeader = document.createElement('td');
                nombreHeader.textContent = seccion.section_name;
                columna.appendChild(nombreHeader);

                const accionesHeader = document.createElement('td');

                const botonEditar = document.createElement('button');
                botonEditar.textContent = 'Editar';
                botonEditar.classList.add('btn', 'btn-primary', 'me-2');
                botonEditar.addEventListener('click', () => {
                    formularioHeader(seccion);
                });
                accionesHeader.appendChild(botonEditar);

                const botonBorrar = document.createElement('button');
                botonBorrar.textContent = 'Eliminar';
                botonBorrar.classList.add('btn', 'btn-danger');
                botonBorrar.addEventListener('click', () => {
                    borrarSeccion(seccion.section_id, 'header');
                });
                accionesHeader.appendChild(botonBorrar);

                columna.appendChild(accionesHeader);
                tabla.appendChild(columna);
            });

            divBotones.appendChild(tabla);

            const botonAñadir = document.createElement('button');
            botonAñadir.textContent = 'Agregar Sección';
            botonAñadir.classList.add('btn', 'btn-primary', 'mb-2');
            botonAñadir.addEventListener('click', () => {
                formularioHeader();
            });
            divBotones.appendChild(botonAñadir);

            const botonVolver = document.createElement('button');
            botonVolver.textContent = 'Volver Atrás';
            botonVolver.classList.add('btn', 'btn-secondary');
            botonVolver.addEventListener('click', () => {
                window.location.href = 'socios.php';
            });
            divBotones.appendChild(botonVolver);

            headerContainer.appendChild(divBotones);
            mainContent.appendChild(headerContainer);
        })
        .catch(error => {
            console.error('Error al cargar secciones de encabezado:', error);
            mainContent.innerHTML = '<p>Error al cargar secciones de encabezado.</p>';
        });
}

function muestraFooter() {
    const mainContent = document.getElementById('main-content');
    console.log('Mostrando secciones de footer...');

    fetch('sections/footer_sections.php')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de secciones de footer:', data);

            mainContent.innerHTML = '';

            const footerContainer = document.createElement('div');
            footerContainer.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
            footerContainer.style.width = '90%';
            footerContainer.style.height = '80vh';
            footerContainer.style.margin = '0 auto';
            footerContainer.style.position = 'relative';

            const footerTitulo = document.createElement('h1');
            footerTitulo.textContent = 'Secciones Footer';
            footerTitulo.style.color = '#0d4a8e';
            footerTitulo.classList.add('mb-4');
            footerTitulo.style.position = 'absolute';
            footerTitulo.style.top = '20px';
            footerTitulo.style.left = '20px';
            footerContainer.appendChild(footerTitulo);

            const footerDescripcion = document.createElement('p');
            footerDescripcion.textContent = 'Aquí puedes agregar o modificar secciones footer de la página pública.';
            footerDescripcion.style.color = '#0d4a8e';
            footerDescripcion.style.marginTop = '60px';
            footerDescripcion.classList.add('mb-4');
            footerContainer.appendChild(footerDescripcion);
    
            const linea = document.createElement('hr');
            footerContainer.appendChild(linea);
            

            const divBotones = document.createElement('div');
            divBotones.style.display = 'flex';
            divBotones.style.flexDirection = 'column';
            divBotones.style.alignItems = 'center';
            divBotones.style.justifyContent = 'center';
            divBotones.style.height = '60%';

            const tabla = document.createElement('table');
            tabla.classList.add('table', 'table-striped', 'mb-4');

            const columna = document.createElement('tr');
            ['ID', 'Nombre', 'Acciones'].forEach(datosFooter => {
                const footer = document.createElement('th');
                footer.textContent = datosFooter;
                columna.appendChild(footer);
            });

            tabla.appendChild(columna);

            data.forEach(seccion => {
                const columna = document.createElement('tr');

                const idFooter = document.createElement('td');
                idFooter.textContent = seccion.section_footer_id;
                columna.appendChild(idFooter);

                const nombreFooter = document.createElement('td');
                nombreFooter.textContent = seccion.section_footer_name;
                columna.appendChild(nombreFooter);

                const accionesFooter = document.createElement('td');

                const botonEditar = document.createElement('button');
                botonEditar.textContent = 'Editar';
                botonEditar.classList.add('btn', 'btn-primary', 'me-2');
                botonEditar.addEventListener('click', () => {
                    formularioFooter(seccion);
                });
                accionesFooter.appendChild(botonEditar);

                const botonBorrar = document.createElement('button');
                botonBorrar.textContent = 'Eliminar';
                botonBorrar.classList.add('btn', 'btn-danger');
                botonBorrar.addEventListener('click', () => {
                    borrarSeccion(seccion.section_footer_id, 'footer');
                });
                accionesFooter.appendChild(botonBorrar);

                columna.appendChild(accionesFooter);
                tabla.appendChild(columna);
            });

            divBotones.appendChild(tabla);

            const botonAñadir = document.createElement('button');
            botonAñadir.textContent = 'Agregar Sección';
            botonAñadir.classList.add('btn', 'btn-primary', 'mb-2');
            botonAñadir.addEventListener('click', () => {
                formularioFooter();
            });
            divBotones.appendChild(botonAñadir);

            const botonAtras = document.createElement('button');
            botonAtras.textContent = 'Volver Atrás';
            botonAtras.classList.add('btn', 'btn-secondary');
            botonAtras.addEventListener('click', () => {
                window.location.href = 'socios.php';
            });
            divBotones.appendChild(botonAtras);

            footerContainer.appendChild(divBotones);
            mainContent.appendChild(footerContainer);
        })
        .catch(error => {
            console.error('Error al cargar secciones de footer:', error);
            mainContent.innerHTML = '<p>Error al cargar secciones de footer.</p>';
        });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  Formulario crear/modificar secciones   /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function formularioHeader(datosSeccion) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'vh-100', 'w-100');
    container.style.textAlign = 'center';

    const formularioContainer = document.createElement('div');
    formularioContainer.classList.add('p-5', 'shadow', 'rounded', 'bg-white');
    formularioContainer.style.width = '80%'; 
    formularioContainer.style.maxWidth = '1000px'; 
    formularioContainer.style.height = 'auto'; 
    formularioContainer.style.maxHeight = '90vh'; 

    const formulario = document.createElement('form');

    const esNuevaSeccion = !datosSeccion;
    const titulo = esNuevaSeccion ? 'Crear Nueva Sección Header' : 'Editar Sección Header';
    formulario.innerHTML = `<h2 class="mb-4">${titulo}</h2>`;

    const nombreSeccion = datosSeccion ? datosSeccion.section_name : '';
    const contenidoSeccion = datosSeccion ? datosSeccion.section_content_html : '';

    formulario.innerHTML += `
        <div class="mb-3">
            <label for="sectionName" class="form-label">Nombre de la Sección:</label>
            <input type="text" class="form-control" id="sectionName" name="sectionName" value="${nombreSeccion}" required>
        </div>
        <div class="mb-3">
            <label for="sectionContent" class="form-label">Contenido de la Sección:</label>
            <textarea class="form-control" id="sectionContent" name="sectionContent" rows="4" required>${contenidoSeccion}</textarea>
        </div>
    `;

    const textoBoton = esNuevaSeccion ? 'Guardar' : 'Guardar Cambios';
    formulario.innerHTML += `<button type="button" onclick="${esNuevaSeccion ? 'crearHeader()' : `actualizarHeader(${datosSeccion.section_id})`}" class="btn btn-primary">${textoBoton}</button>
    <a href="socios.php" class="btn btn-secondary ms-2">Atrás</a>
    `;

    formularioContainer.appendChild(formulario);
    container.appendChild(formularioContainer);
    mainContent.appendChild(container);
}

function formularioFooter(datosSeccion) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'vh-100', 'w-100');
    container.style.textAlign = 'center';

    const formularioContainer = document.createElement('div');
    formularioContainer.classList.add('p-5', 'shadow', 'rounded', 'bg-white');
    formularioContainer.style.width = '80%'; 
    formularioContainer.style.maxWidth = '1000px'; 
    formularioContainer.style.height = 'auto'; 
    formularioContainer.style.maxHeight = '90vh'; 

    const formulario = document.createElement('form');

    const esNuevaSeccion = !datosSeccion;
    const titulo = esNuevaSeccion ? 'Crear Nueva Sección Footer' : 'Editar Sección Footer';
    formulario.innerHTML = `<h2 class="mb-4">${titulo}</h2>`;

    const nombreSeccion = datosSeccion ? datosSeccion.section_footer_name : '';
    const contenidoSeccion = datosSeccion ? datosSeccion.section_footer_content_html : '';

    formulario.innerHTML += `
        <div class="mb-3">
            <label for="sectionName" class="form-label">Nombre de la Sección:</label>
            <input type="text" class="form-control" id="sectionName" name="sectionName" value="${nombreSeccion}" required>
        </div>
        <div class="mb-3">
            <label for="sectionContent" class="form-label">Contenido de la Sección:</label>
            <textarea class="form-control" id="sectionContent" name="sectionContent" rows="10" required>${contenidoSeccion}</textarea>
        </div>
    `;

    const textoBoton = esNuevaSeccion ? 'Guardar' : 'Guardar Cambios';
    formulario.innerHTML += `
        <button type="button" onclick="${esNuevaSeccion ? 'crearFooter()' : `actualizarFooter(${datosSeccion.section_footer_id})`}" class="btn btn-primary">${textoBoton}</button>
        <a href="socios.php" class="btn btn-secondary ms-2">Atrás</a>
    `;

    formularioContainer.appendChild(formulario);
    container.appendChild(formularioContainer);
    mainContent.appendChild(container);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////              Crear secciones            /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function crearHeader() {
    const nombreInput = document.getElementById('sectionName');
    const contenidoInput = document.getElementById('sectionContent');

    const nombreSeccion = nombreInput.value.trim();
    const contenidoSeccion = contenidoInput.value.trim();

    if (nombreSeccion === '' || contenidoSeccion === '') {
        alert('Por favor completa todos los campos.');
        return;
    }

    const datosSeccion = {
        section_name: nombreSeccion,
        section_content_html: contenidoSeccion
    };

    fetch('sections/create_header_section.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosSeccion)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al crear sección del header');
    })
    .then(data => {
        alert('Sección del header creada exitosamente');
        loadContent('#secciones');    
    })
    .catch(error => {
        console.error('Error al crear sección del header:', error);
        alert('Hubo un error al crear sección del header');
    });
}

function crearFooter() {
    const nombreInput = document.getElementById('sectionName');
    const contenidoInput = document.getElementById('sectionContent');

    const nombreSeccion = nombreInput.value.trim();
    const contenidoSeccion = contenidoInput.value.trim();

    if (nombreSeccion === '' || contenidoSeccion === '') {
        alert('Por favor completa todos los campos.');
        return;
    }

    const datosSeccion = {
        section_footer_name: nombreSeccion,
        section_foter_content_html: contenidoSeccion
    };

    fetch('sections/create_footer_section.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosSeccion)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al crear sección del footer');
    })
    .then(data => {
        alert('Sección del footer creada exitosamente');
        loadContent('#secciones');
    })
    .catch(error => {
        console.error('Error al crear sección del footer:', error);
        alert('Hubo un error al crear sección del footer');
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////             Editar secciones            /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function actualizarHeader(idSeccion) {
    const nombreSeccion = document.getElementById('sectionName').value;
    const contenidoSeccion = document.getElementById('sectionContent').value;

    const datosSeccion = { section_id: idSeccion, section_name: nombreSeccion, section_content_html: contenidoSeccion, sectionType: 'header' };

    fetch(`sections/edit_header_section.php?id=${idSeccion}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosSeccion)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al actualizar sección del header');
    })
    .then(data => {
        alert('Sección del header actualizada exitosamente');
        loadContent('#secciones');  
    })
    .catch(error => {
        console.error('Error al actualizar sección del header:', error);
        alert('Hubo un error al actualizar sección del header');
    });
}

function actualizarFooter(idSeccion) {
    const nombreSeccion = document.getElementById('sectionName').value;
    const contenidoSeccion = document.getElementById('sectionContent').value;

    const datosSeccion = { section_footer_id: idSeccion, section_footer_name: nombreSeccion, section_footer_content_html: contenidoSeccion, sectionType: 'footer' };

    fetch(`sections/edit_footer_section.php?id=${idSeccion}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosSeccion)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error al actualizar sección del footer');
    })
    .then(data => {
        alert('Sección del footer actualizada exitosamente');
        loadContent('#secciones');  
    })
    .catch(error => {
        console.error('Error al actualizar sección del footer:', error);
        alert('Hubo un error al actualizar sección del footer');
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////           Eliminar secciones            /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function borrarSeccion(idSeccion, tipoSeccion) {
    const confirmaBorrar = confirm('¿Estás seguro de que deseas eliminar esta sección?');
    if (!confirmaBorrar) {
        return;
    }
    const tipoSeccionRuta = (tipoSeccion === 'header') ? 'sections/delete_header_section.php' : 'sections/delete_footer_section.php';

    fetch(tipoSeccionRuta + '?id=' + idSeccion, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sección eliminada exitosamente.');

            if (tipoSeccion === 'header') {
                muestraHeader();
            } else if (tipoSeccion === 'footer') {
                muestraFooter();
            }
        } else {
            alert('Error al eliminar la sección. Por favor, intenta nuevamente.');
        }
    })
    .catch(error => {
        console.error('Error al eliminar la sección:', error);
        alert('Error al eliminar la sección. Por favor, intenta nuevamente.');
    });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////         Formulario acta           /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function formularioActa(userIsAdmin) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'bg-light', 'rounded');
    container.style.width = '90%';
    container.style.height = '80vh';
    container.style.margin = '0 auto';

    const formularioContainer = document.createElement('div');
    formularioContainer.classList.add('p-5', 'bg-white', 'shadow', 'rounded');
    formularioContainer.style.width = '100%';
    formularioContainer.style.maxWidth = '600px';
    formularioContainer.style.height = 'auto';

    const formulario = document.createElement('form');

    const titulo = 'Subir Acta';
    const tipoTitulo = document.createElement('h2');
    tipoTitulo.textContent = titulo;
    tipoTitulo.classList.add('mb-4'); 
    tipoTitulo.style.color = '#0d4a8e';
    formulario.appendChild(tipoTitulo);

    formulario.innerHTML += `
        <div class="mb-3">
            <label for="actaYear" class="form-label">Año:</label>
            <input type="text" class="form-control" id="actaYear" name="actaYear" required>
        </div>
        <div class="mb-3">
            <label for="actaName" class="form-label">Nombre del Acta:</label>
            <input type="text" class="form-control" id="actaName" name="actaName" required>
        </div>
        <div class="mb-3">
            <label for="actaFile" class="form-label">Seleccionar Archivo PDF:</label>
            <input type="file" class="form-control" id="actaFile" name="actaFile" accept="application/pdf" required>
        </div>
    `;

    const textoBoton = 'Subir Acta';
    formulario.innerHTML += `
        <button type="button" onclick="subirActa()" class="btn btn-primary">${textoBoton}</button>
        <a href="socios.php" class="btn btn-secondary ms-2">Cancelar</a>
    `;

    formularioContainer.appendChild(formulario);
    container.appendChild(formularioContainer);
    mainContent.appendChild(container);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////             Guardar acta                /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function subirActa() {
    const añoActa = document.getElementById('actaYear').value;
    const nombreActa = document.getElementById('actaName').value;
    const pdfActa = document.getElementById('actaFile').files[0];

    const datosFormulario = new FormData();
    datosFormulario.append('acta_year', añoActa);
    datosFormulario.append('acta_name', nombreActa);
    datosFormulario.append('acta_document', pdfActa);

    fetch('actas/upload_acta.php', {
        method: 'POST',
        body: datosFormulario
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Error en la respuesta del servidor');
    })
    .then(result => {
        console.log(result);
        loadContent('#actas');
    })
    .catch(error => {
        console.error('Error en la subida del acta:', error);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////          Mostrar Calendario             /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function muestraCalendario(calendarioContainer) {
    calendarioContainer.innerHTML = ''; 

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const añoActual = fechaActual.getFullYear();
    
    const diasMes = new Date(añoActual, mesActual + 1, 0).getDate();

    const divCentrado = document.createElement('div');
    divCentrado.classList.add('d-flex', 'flex-column', 'align-items-center', 'bg-light', 'rounded', 'p-4');
    divCentrado.style.width = '100%';
    divCentrado.style.maxWidth = '800px';
    divCentrado.style.margin = '0 auto';

    const tituloCalendario = document.createElement('h3');
    tituloCalendario.textContent = `${nombreMes(mesActual)} ${añoActual}`;
    tituloCalendario.classList.add('text-center', 'mb-4', 'text-primary', 'fw-bold'); 
    divCentrado.appendChild(tituloCalendario);

    const tablaCalendario = document.createElement('table');
    tablaCalendario.classList.add('table', 'table-bordered', 'table-striped'); 

    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const filaDias = document.createElement('tr');
    diasSemana.forEach(dia => {
        const th = document.createElement('th');
        th.textContent = dia;
        th.classList.add('text-center', 'fw-bold', 'text-primary'); 
        filaDias.appendChild(th);
    });
    tablaCalendario.appendChild(filaDias);

    const primerDiaSemana = new Date(añoActual, mesActual, 1).getDay();

    let cuentaDias = 1;
    for (let i = 0; i < 6; i++) { 
        const columna = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const celda = document.createElement('td');
            if ((i === 0 && j < primerDiaSemana) || cuentaDias > diasMes) {
                celda.textContent = ''; 
            } else {
                celda.textContent = cuentaDias;
                celda.classList.add('text-center'); 
                celda.setAttribute('data-date', `${añoActual}-${mesActual + 1}-${cuentaDias}`);
                if (cuentaDias === fechaActual.getDate() && mesActual === fechaActual.getMonth()) {
                    celda.classList.add('fw-bold', 'bg-primary', 'text-white'); 
                }
                celda.addEventListener('click', formularioEvento); 
                cuentaDias++;
            }
            columna.appendChild(celda);
        }
        tablaCalendario.appendChild(columna);
    }

    divCentrado.appendChild(tablaCalendario);

    const eventos = document.createElement('div');
    eventos.id = 'detalleEventos';
    eventos.classList.add('mt-4', 'text-center', 'fw-bold', 'text-primary');
    divCentrado.appendChild(eventos);

    const diaHoy = `${añoActual}-${mesActual + 1}-${fechaActual.getDate()}`;
    eventoDia(diaHoy);

    calendarioContainer.appendChild(divCentrado);
}

function nombreMes(idMes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[idMes];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////            Añadir eventos               /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function formularioEvento(event) {
    const cell = event.target;
    const date = cell.getAttribute('data-date');
    console.log('Fecha seleccionada:', date); 

    document.getElementById('eventDate').value = date;

    $('#eventModal').modal('show');
    
    const saveBtn = document.getElementById('saveEventBtn');
    console.log('Botón de guardar:', saveBtn);

    saveBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const eventName = document.getElementById('eventDescription').value;
        console.log('Nombre del evento:', eventName); 

        const eventData = {
            fecha_calendario: date,
            descripcion_calendario: eventName  
        };

        console.log('Datos del evento a enviar:', eventData);

        fetch('calendario/guardar_evento.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Respuesta de red incorrecta');
            }
        })
        .then(data => {
            console.log('Datos recibidos del servidor:', data); 
            loadContent('#calendario');
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema con la solicitud al servidor');
        });
    });
    eventoDia(date);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////            Mostrar eventos              /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function eventoDia(date) {

    fetch(`calendario/obtener_eventos.php?fecha=${date}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Respuesta de red incorrecta');
            }
        })
        .then(data => {
            const detalleEventos = document.getElementById('detalleEventos');

            if (data.length > 0) {
                const descripcionEventos = data.map(event => event.descripcion_calendario);
                const mensajeEventos = `EVENTOS DE HOY`;
                detalleEventos.innerHTML = '';
                const divEventos = document.createElement('div');
                divEventos.textContent = mensajeEventos;
                divEventos.style.color = 'blue'; 
                divEventos.style.marginBottom = '10px';
                
                detalleEventos.appendChild(divEventos);
                descripcionEventos.forEach(description => {
                    const divDescripcion = document.createElement('div');
                    divDescripcion.textContent = description;
                    divDescripcion.style.color = 'grey';
                    divDescripcion.style.marginBottom = '5px';
                    detalleEventos.appendChild(divDescripcion);         
                });

            } else {
                detalleEventos.textContent = "NO EXISTEN EVENTOS PARA HOY";
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema con la solicitud al servidor');
        });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////            Mostrar presupuesto              /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cargaPresupuesto(mainContent) {
    fetch('presupuesto/get_anio.php')
        .then(response => response.json())
        .then(aniosDisponibles => {

            mainContent.innerHTML = '';

            const container = document.createElement('div');
            container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'bg-light', 'rounded');
            container.style.width = '90%';
            container.style.height = '80vh';
            container.style.margin = '0 auto';
            container.style.overflow = 'auto'; 

            const formularioContainer = document.createElement('div');
            formularioContainer.classList.add('p-5', 'bg-white', 'shadow', 'rounded');
            formularioContainer.style.width = '100%';
            formularioContainer.style.maxWidth = '600px';
            formularioContainer.style.height = 'auto';

            const titulo = document.createElement('h2');
            titulo.textContent = 'Presupuestos';
            titulo.classList.add('mb-4');
            titulo.style.color = '#0d4a8e';
            formularioContainer.appendChild(titulo);

            const seleccionaAño = document.createElement('select');
            seleccionaAño.classList.add('form-select', 'mb-3');

            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione un año';
            seleccionaAño.appendChild(opcionDefault);

            aniosDisponibles.forEach(anio => {
                const option = document.createElement('option');
                option.value = anio;
                option.text = anio;
                seleccionaAño.appendChild(option);
            });

            formularioContainer.appendChild(seleccionaAño);

            if (isAdmin) {
                const botonCrear = document.createElement('button');
                botonCrear.textContent = 'Nuevo Presupuesto';
                botonCrear.classList.add('btn', 'btn-primary', 'mb-3');
    
                botonCrear.addEventListener('click', () => {
                    nuevoPresupuesto(); 
                });
    
                formularioContainer.appendChild(botonCrear);
            }

            const botonCargaPresu = document.createElement('button');
            botonCargaPresu.textContent = 'Cargar Presupuesto';
            botonCargaPresu.classList.add('btn', 'btn-primary', 'mb-3');
            botonCargaPresu.addEventListener('click', () => {
                const añoSeleccionado = parseInt(seleccionaAño.value);
                if (!isNaN(añoSeleccionado)) {
                    fetch(`presupuesto/get_presupuesto.php?año=${añoSeleccionado}`)
                    .then(response => response.json())
                    .then(resultados => {
                        formularioContainer.innerHTML = '';

                        const tituloAño = document.createElement('h1');
                        tituloAño.textContent = `Presupuesto año ${añoSeleccionado}`;
                        formularioContainer.appendChild(tituloAño);

                        const tabla = document.createElement('table');
                         tabla.classList.add('table', 'table-bordered', 'table-striped');

                        const cabecera = ['Concepto', 'Monto'];
                        const filaCabecera = document.createElement('thead');
                        const celdaCabecera = cabecera.map(header => `<th>${header}</th>`).join('');
                        filaCabecera.innerHTML = `<tr>${celdaCabecera}</tr>`;
                        tabla.appendChild(filaCabecera);

                        const cuerpo = document.createElement('tbody');
                        const columnas = [
                            { concepto: 'Ingresos Totales', monto: resultados.ingresos.toFixed(2) },
                            { concepto: 'Gastos Totales', monto: resultados.gastos.toFixed(2) },
                            { concepto: 'Remanente', monto: resultados.remanente.toFixed(2) }
                        ];
                        columnas.forEach(datosColumna => {
                            const columna = document.createElement('tr');
                            columna.innerHTML = `<td>${datosColumna.concepto}</td><td>${datosColumna.monto}</td>`;
                            cuerpo.appendChild(columna);
                        });
                        tabla.appendChild(cuerpo);

                        formularioContainer.appendChild(tabla);

                        const botonAtras = document.createElement('a');
                        botonAtras.href = 'socios.php';
                        botonAtras.textContent = 'Atrás';
                        botonAtras.classList.add('btn', 'btn-primary', 'mb-3');
                        formularioContainer.appendChild(botonAtras);

                        const botonDesglose = document.createElement('button');
                        botonDesglose.textContent = 'Desglosar Presupuesto';
                        botonDesglose.classList.add('btn', 'btn-info', 'mb-3');
                        botonDesglose.addEventListener('click', () => {
                        formularioContainer.innerHTML = '';

                        const tituloDesglose = document.createElement('h1');
                        tituloDesglose.textContent = `Desglose año ${añoSeleccionado}`;
                        formularioContainer.appendChild(tituloDesglose);

                        const desgloseContainer = document.createElement('div');
                        desgloseContainer.style.maxHeight = '300px'; 
                        desgloseContainer.style.overflowY = 'auto'; 

                        fetch(`presupuesto/get_lineas.php?año=${añoSeleccionado}`)
                        .then(response => response.json())
                        .then(lineasDisponibles => {
                            lineasDisponibles.forEach(linea => {
                                const lineaDiv = document.createElement('div');
                                lineaDiv.classList.add('mb-3');

                                const descripcion = document.createElement('label');
                                descripcion.textContent = `${linea.desc_tipo} - ${linea.desc_nivel}`;

                                const valor = document.createElement('input');
                                valor.type = 'number';
                                valor.classList.add('form-control');
                                valor.name = `valor_${linea.id_nivel}`;
                                valor.value = linea.importe ? parseFloat(linea.importe.replace(',', '.')).toFixed(2) : '';

                                lineaDiv.appendChild(descripcion);
                                lineaDiv.appendChild(valor);
                                desgloseContainer.appendChild(lineaDiv);  
                            });

                            formularioContainer.appendChild(desgloseContainer);

                            const botonVolver = document.createElement('button');
                            botonVolver.textContent = 'Volver Atrás';
                            botonVolver.classList.add('btn', 'btn-secondary', 'mt-3');
                            botonVolver.addEventListener('click', () => {
                                botonCargaPresu.click();
                            });

                            formularioContainer.appendChild(botonVolver);
                        })
                        .catch(error => {
                            console.error('Error al obtener líneas presupuestarias:', error);
                            const errorDiv = document.createElement('div');
                            errorDiv.textContent = 'Error al obtener líneas presupuestarias.';
                            formularioContainer.appendChild(errorDiv);
                        });       
                    });

                    formularioContainer.appendChild(botonDesglose);
                })
                .catch(error => {
                    console.error('Error al cargar el presupuesto:', error);
                    formularioContainer.innerHTML = '<p>Error al cargar el presupuesto.</p>';   
                });
            }   
        });

        formularioContainer.appendChild(botonCargaPresu);
        container.appendChild(formularioContainer);
        mainContent.appendChild(container);
    })
    .catch(error => {
        console.error('Error al obtener años disponibles:', error);
        mainContent.innerHTML = '<p>Error al obtener años disponibles.</p>';
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////            Crear presupuesto                /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function nuevoPresupuesto() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
    container.style.width = '90%';
    container.style.height = '80vh';

    const formularioContainer = document.createElement('div');
    formularioContainer.classList.add('p-5', 'shadow', 'rounded', 'bg-white', 'w-100', 'h-100', 'overflow-auto');

    const formulario = document.createElement('form');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        guardarPresupuesto();
    });

    formulario.innerHTML = `
        <h2 class="mb-4">Nuevo Presupuesto</h2>
        <div class="mb-3">
            <label for="year" class="form-label">Año:</label>
            <input type="number" class="form-control" id="year" name="year" required>
        </div>
        <div id="lineasContainer" class="grid-container"></div>
        <button type="submit" class="btn btn-primary">Crear Presupuesto</button>
        <button type="button" onclick="cancelarPresupuesto()" class="btn btn-secondary ms-2">Cancelar</button>
    `;

    formularioContainer.appendChild(formulario);
    container.appendChild(formularioContainer);
    mainContent.appendChild(container);
}

function guardarPresupuesto() {
    const year = document.getElementById('year').value;

    const formData = new FormData();
    formData.append('year', year);

    fetch('presupuesto/guardar_presupuesto.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            abrirFormularioLineasPresupuesto(year);
        } else {
            console.error('Error al guardar el presupuesto');
        }
    })
    .catch(error => console.error('Error al guardar el presupuesto:', error));
}

function abrirFormularioLineasPresupuesto(year) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('content-container', 'p-4', 'bg-light', 'rounded');
    container.style.width = '90%';
    container.style.height = '80vh';

    fetch(`presupuesto/get_lineas.php?año=${year}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener líneas presupuestarias');
        }
        return response.json();
    })
    .then(lineas => {
        const formularioContainer = document.createElement('div');
        formularioContainer.classList.add('p-5', 'shadow', 'rounded', 'bg-white', 'w-100', 'h-100', 'overflow-auto');

        const desgloseContainer = document.createElement('div');
        desgloseContainer.classList.add('grid-container');

        const valoresLineas = new Map();

        lineas.forEach(linea => {
            valoresLineas.set(linea.id_nivel, linea.importe ? parseFloat(linea.importe.replace(',', '.')).toFixed(2) : '');
        });

        fetch('presupuesto/get_todas_lineas.php')
        .then(response => response.json())
        .then(todasLineas => {
            todasLineas.forEach(linea => {
                const lineaDiv = document.createElement('div');
                lineaDiv.classList.add('mb-3');
    
                const descripcion = document.createElement('label');
                descripcion.textContent = `${linea.desc_tipo} - ${linea.desc_nivel}`;
    
                const valor = document.createElement('input');
                valor.type = 'number';
                valor.classList.add('form-control');
                valor.name = `valor_${linea.id_nivel}`;
                valor.value = valoresLineas.get(linea.id_nivel) || '';
    
                lineaDiv.appendChild(descripcion);
                lineaDiv.appendChild(valor);
                desgloseContainer.appendChild(lineaDiv);
            });
    
            formularioContainer.appendChild(desgloseContainer);
    
            const guardarButton = document.createElement('button');
            guardarButton.textContent = 'Guardar presupuesto';
            guardarButton.classList.add('btn', 'btn-primary', 'mt-3');
            guardarButton.addEventListener('click', () => {
                const lineasPresupuesto = [];
                todasLineas.forEach(linea => {
                    const valorInput = document.querySelector(`input[name="valor_${linea.id_nivel}"]`);
                    const valor = valorInput ? valorInput.value : '';
                    lineasPresupuesto.push({ id_nivel: linea.id_nivel, valor: valor });
                });
    
                guardarTodasLineasPresupuesto(lineasPresupuesto);
            });
            formularioContainer.appendChild(guardarButton);

            const botonCancelar = document.createElement('button');
            botonCancelar.textContent = 'Cancelar';
            botonCancelar.classList.add('btn', 'btn-danger', 'mt-3');
            botonCancelar.addEventListener('click', () => {
                cancelarPresupuesto();
            });
            formularioContainer.appendChild(botonCancelar);

            container.appendChild(formularioContainer);
            mainContent.appendChild(container);
        })
        .catch(error => {
            console.error('Error al obtener todas las líneas presupuestarias:', error);
            alert('Error al obtener todas las líneas presupuestarias');
        });
    })
    .catch(error => {
        console.error('Error al obtener líneas presupuestarias:', error);
        alert('Error al obtener líneas presupuestarias');
    });
}

function guardarTodasLineasPresupuesto(lineasPresupuesto) {
    console.log('Datos a enviar:', { lineasPresupuesto: lineasPresupuesto });
    fetch('presupuesto/guardar_todas_lineas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lineasPresupuesto: lineasPresupuesto }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Líneas presupuestarias guardadas exitosamente');
        } else {
            console.error('Error al guardar las líneas presupuestarias');
        }
    })
    .catch(error => console.error('Error al guardar las líneas presupuestarias:', error));
}

function cancelarPresupuesto() {
    loadContent('#presupuestos');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////         Cambios en los menus            /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.nav-link');

    function estiloMenu(currentUrl) {
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentUrl) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }
    
    function cambiaUrl() {
        const urlActual = window.location.hash; 
        estiloMenu(urlActual);
    }
    cambiaUrl();
    window.addEventListener('hashchange', cambiaUrl);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('href');
            loadContent(url);
        });
    });

});