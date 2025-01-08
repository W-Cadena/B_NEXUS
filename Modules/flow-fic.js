const { addKeyword } = require('@bot-whatsapp/bot')
const { bd } = require('../Config/database.js');

async function validar(nombre, numero) {
    let val = false;
    let num = numero

    if (!numero.includes("@g.us")) {
        const query1 = 'SELECT * FROM usuarios WHERE numero = ?';
        
        try {
            const [rows] = await bd.query(query1, [num]);
            console.log(rows)
            console.log("---------------")

            if (rows) {
                val = true;
            }
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
        }
    }

    return val;
}

async function mensajeR(numero){ 
    
    const query1 = 'SELECT * FROM usuarios WHERE numero = ?';
    let mensaje = "";
        
    try {
        const [row] = await bd.query(query1, [numero]);
        const rows = row[0];
        const mensajesB = ["hi...","biennn te ayudare","si claro ya sabes donde estas","shh hay muchos por aqui","acceso consedido... no molestes","bien, dime que quieres","los chicos de hoy deberian entender el respeto","bien estas aqui que requieres","mi nombre?... llamame flora"]
        const rmensajeb = mensajesB[Math.floor(Math.random() * mensajesB.length)];

    if(rows.rol == 2){

        mensaje = rmensajeb + '\nEste es el sistema de fichas para administradores,' + 
        '\nEres: _*' + rows.nombre + '*_ **AD**' + 
        '\nAcciones:' +
        '\n> [Ag] agregar fichas' +
        '\n> [Ve] Ver fichas' +
        '\n> [Bu] Buscar fichas' +
        '\n> [Ac] Actualizar fichas' +
        '\n> [Nd] Salir'
    }else if(rows.rol == 3){

        mensaje = rmensajeb + '\nEste es el sistema de fichas para Super administradores,' + 
        '\nEres: _*' + rows.nombre + '*_ **SU**' + 
        '\nAcciones:' +
        '\n> [Ag] agregar fichas' +
        '\n> [Ve] Ver fichas' +
        '\n> [Bu] Buscar fichas' +
        '\n> [Ac] Actualizar fichas' +
        '\n> [El] Eliminar fichas' +
        '\n> [Nd] Salir'
    }else{
        mensaje = rmensajeb + '\nEste es el sistema de fichas,' + 
        '\nEres: _*' + rows.nombre + '*_' + 
        '\nAcciones:' +
        '\n> [In] Ayuda para el usuario' +
        '\n> [Ag] agregar fichas' +
        '\n> [Ve] Ver fichas' +
        '\n> [Ac] Actualizar ficha' +
        '\n> [Nd] Salir'
    }
} catch (error) {
    console.error("Error ejecutando la consulta:", error);
}

return mensaje;
}

function mensjaeInfo() {

    let mensaje = '\nEste es el sistema de informacion,' + 
        '\ndigita la accion que necesites ayuda a comprender:' +
        '\n> [Ag] agregar fichas' +
        '\n> [Ve] Ver fichas' +
        '\n> [Ac] Actualizar fichas' +
        '\n> [Vt] Regresar al menu principal'

    return mensaje;
}

async function separarnombre(numero, ficha) {

    let val = 0;

    try {
        let ag = ficha.split("】")
        let nag = ag[2].split("【")
        let nombre = nag[0].trim();

        let raz = ag[6].toLowerCase()
        let raza

        let clas = ag[12].toLowerCase()
        let clase
    
    

    const query1 = 'SELECT * FROM razas';
        
    try {
        const rows = await bd.query(query1);

        rows.forEach(e => {
            if(raz.includes(e.nombre.toLowerCase())){
                raza = e.nombre
                val = 1
            }
        });
        
        if(val == 0){
            raza = "S/R"
        }
    }catch(error){
        console.error(error)
    }

    const query2 = 'SELECT * FROM clases';
        
    try {
        val = 0
        const rows1 = await bd.query(query2);

        rows1.forEach(e => {
            if(clas.includes(e.nombre.toLowerCase())){
                clase = e.nombre
                val = 1
            }
        });

        if(val == 0){
            clase = "S/C"
        }
    }catch(error){
        console.error(error)
    }

    const query3 = 'INSERT INTO fichas (nombre,numero,clase,raza,ficha) VALUES (?,?,?,?,?)';
        
    try {
        val = 0
        const insertResult = await bd.query(query3,[nombre,numero,clase,raza,ficha]);

        if (insertResult && insertResult.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }catch(error){
        console.error(error)
    }

    } catch (error) {
        console.log(error);
    }

}

const flujoPinfoP = addKeyword("AGREGAR_FICHA")
      .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
        let ver = mensjaeInfo();

        await flowDynamic(ver);
        return gotoFlow(flujoSInfoP)
            
      })

const flujoSInfoP = addKeyword('FLUJO_PRINS')
    .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow ,flowDynamic }) => {
        let nombre = ctx.body;
        let numero = ctx.from;

        if (ctx.body.toLowerCase() === 'ag') {
            await flowDynamic("El sistema AG funciona para agregar una nueva ficha y es el mas simple, funciona de la siguiente forma: ");
            await flowDynamic("US: ag");
            await flowDynamic("BOT: Para agregar una nueva ficha simplemente manda un mensaje con la ficha y yo la almacenare por favor digitala:");
            await flowDynamic("US: Ficha [], (Lanza la ficha no importa la cantidad de lineas de la ficha)");
            await flowDynamic("BOT: Te informara si la ficha fue agregada de manera exitosa!");
            
            return gotoFlow(flujoPinfoP);
        }
        if (ctx.body.toLowerCase() === 've') {
            await flowDynamic("El sistema VE permite la visualizacion de fichas si es que has agregado una antes, funciona de la siguiente manera:");
            await flowDynamic("US: ve");
            await flowDynamic("BOT: Dezpliegara una lista con tus fichas, identifica el apartado encima de tu nombre que dice 'ID' ese es el numero de identificacion de tu ficha");
            await flowDynamic("US: (solo digita el numero ID de tu ficha)");
            await flowDynamic("BOT: Te dara la informacion de tu ficha y el estatus actual de esta");

            return gotoFlow(flujoPinfoP);
        }
        if (ctx.body.toLowerCase() === 'ac') {
            await flowDynamic("El sistema AC permite la actualizacion de una ficha asi como el etiquetado de esta, es decir el como se visualiza para los admins o en el sistema VE");
            await flowDynamic("US: ac");
            await flowDynamic("BOT: Dezpliegara una lista con tus fichas, identifica el apartado encima de tu nombre que dice 'ID' ese es el numero de identificacion de tu ficha");
            await flowDynamic("US: (solo digita el numero ID de tu ficha)");
            await flowDynamic("BOT: Te dara una lista como submenu, con los apartados: nom, raz, cla, fic: estas indican lo que quieres cambiar, nombre, raza, clase, o la ficha completa, las tres primeras cambian las etiquetas que puedes ver en el sistema VE, y fic, cambia la ficha por completo (Esto provocara que el estatus cambie a Espera de nuevo)");
            await flowDynamic("US: digita uno de los comandos");
            await flowDynamic("BOT: Indica que esta a la espera de algun cambio dentro del apartado ");
            await flowDynamic("US: (digita el cambio que necesites)");
            await flowDynamic("BOT: Indica que la tarea se completo");
            await flowDynamic("US: Vt");
            await flowDynamic("BOT: regresa al menu principal");

            return gotoFlow(flujoPinfoP);
        }
        if (ctx.body.toLowerCase() === 'vt') { 
            return gotoFlow(flujoBiF);
        }

        return gotoFlow(flujoSInfoP);
  });


const flujoPrinF = addKeyword('FLUJO_PRINS')
    .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow ,flowDynamic }) => {
        let nombre = ctx.body;
        let numero = ctx.from;

        if (ctx.body.toLowerCase() === 'in') {
            return gotoFlow(flujoPinfoP);
        }
        if (ctx.body.toLowerCase() === 'ag') {
            await flowDynamic("Para agregar una nueva ficha simplemente manda un mensaje con la ficha y yo la almacenare por favor digitala:");
            return gotoFlow(flujoAgficha);
        }
        if (ctx.body.toLowerCase() === 've') {
            return gotoFlow(flujoVeficha);
        }
        if (ctx.body.toLowerCase() === 'ac') {
            return gotoFlow(flujoAcficha);
        }
        if (ctx.body.toLowerCase() === 'bu') {
            await flowDynamic("Para buscar una ficha por favor digitala con el id, o el nombre:");
            return gotoFlow(flujoBficha);
        }
        if (ctx.body.toLowerCase() === 'el') {
            //return gotoFlow(flujoTodo);
        }
        if (ctx.body.toLowerCase() === 'nd') { 
            return endFlow({
                body: 'Gracias por usarme! por el momento es todo pero veras de mi muajajajaja',
            }); 
        }

        return gotoFlow(flujoPrinF);
  });

  const flujoBfichaId = addKeyword("AGREGAR_FICHA")
  .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  

    let Obs = "";
    const query = 'SELECT ficha,estado FROM fichas WHERE id = ?';
    const query1 = 'SELECT f.observaciones, s.nombre FROM fichas_aceptadas f INNER JOIN usuarios s on s.numero = f.numero WHERE id_ficha = ?';
        
    try {
        const [rows1] = await bd.query(query,[ctx.body]);
        const rows = await bd.query(query1,[ctx.body]);

        if(rows1){
            await flowDynamic("La ficha solicitada esta aqui:");
            await flowDynamic(rows1.ficha)

            if(rows1.estado == 1){
                await flowDynamic("El estatus de esta ficha es: _*💤En Espera💤*_");
            }else if(rows1.estado == 2){
                await flowDynamic("El estatus de esta ficha es: _*🔰Aprobada🎉*_");
            }else{
                await flowDynamic("El estatus de esta ficha es: _*❌Negada❌*_");
            }
            let mensaje ='\nATENCION, Para los administradores de fichas pueden ejecutar 2 comandos para aceptar o rechazar,' + 
                '\nAcciones:' +
                '\n> [Aceptar] Ac + (Id de la ficha) ejemplo: Ac 1' +
                '\n> [Rechazar] Rc + (-) + (Id de la ficha) + (-) + (Comentario)\nejemplo Rc-1-Negado Por Razones: ... ' +
                '\n> [Vt] regresar //no afectara nada'
                await flowDynamic(mensaje);
            return gotoFlow(flujoBadm);

        }else{
            await flowDynamic("te equivocaste al digitar el id que tal si lo intentas de nuevo?");
            return gotoFlow(flujoBiF);
        }
    }catch(error){
        console.error(error)
    }
  })

  const flujoBficha = addKeyword("BUSCAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  

        let Fichas = "Fichas Encontradas con los parametros";
        let query = '';

        let busqueda;
        let valor = ctx.body;
        const convertido = parseInt(valor, 10);
        
        if(isNaN(convertido)){
            query = "SELECT id, nombre, raza, clase FROM fichas WHERE nombre LIKE ?";
            busqueda = `%${valor}%`;
        }else{
            query = 'SELECT id,nombre,raza,clase FROM fichas WHERE id = ?';
            busqueda = valor;
        }

        try {
            const [rows1] = await bd.query(query,busqueda);

            console.log(rows1[0])
            console.log("---------------")

            if(rows1){
                rows1.forEach(e => {
                    Fichas += "\n> ID *_[ " + e.id + " ]_* \n> Nombre: *["  + e.nombre + "]* \n> Raza _[" + e.raza + "]_\n> Clase _[" + e.clase + "]_\n\n" ;
                });
            }else{
                await flowDynamic("No Existe ninguna ficha para este usuario");
                return gotoFlow(flujoBiF);
            }

            Fichas += "Digite el ID presentado al inicio de la ficha que necesita actualizar"
            await flowDynamic(Fichas);
            return gotoFlow(flujoBfichaId);
            
        }catch(error){
            console.error(error)
        }
      })

      const flujoBadm = addKeyword('FLUJO_PRINS')
      .addAction({ capture: true }, async (ctx, { gotoFlow,endFlow ,flowDynamic }) => {
          let mensaje;
          let nombre = ctx.body.toLowerCase();
          console.log(nombre);
          let id;
  
          if (nombre.includes("ac")) {
            id = ctx.body.split(" ");
            const query1 = 'INSERT INTO fichas_aceptadas (observaciones,estado,id_ficha,numero) VALUES ("",1,?,?)';
            const query2 = 'UPDATE fichas_aceptadas SET estado = 1 WHERE numero = ? AND id_ficha = ?';
            const query = 'SELECT * FROM fichas_aceptadas WHERE numero = ? And id_ficha = ?';
            const query3 = 'SELECT COUNT(*) AS total FROM fichas_aceptadas WHERE estado = 1 AND id_ficha = ?';

            try {
                const [select] = await bd.query(query,[ctx.from,id[1]]);

                if(select){
                    await bd.query(query2,[ctx.from,id[1]]);
                }else{
                    await bd.query(query1,[id[1],ctx.from]);
                }

                const [tot] = await bd.query(query3,[id[1]]);

                let acep = 2 - tot.total;

                mensaje = "Aceptada! faltan: " + acep + " para que sea aceptada"

                if(acep == 0){
                    const query4 = 'UPDATE fichas SET estado = 2 WHERE id = ?';
                    mensaje = "Aceptada totalmente!"
                    await bd.query(query4,[id[1]]);
                }

            } catch (error) {
                console.error(error)
            }

              await flowDynamic(mensaje);
              return gotoFlow(flujoBiF);
          }
          if (nombre.includes("rc")) {
            id = ctx.body.split("-");
            const query1 = 'INSERT INTO fichas_aceptadas (observaciones,estado,id_ficha,numero) VALUES (?,2,?,?)';
            const query2 = 'UPDATE fichas_aceptadas SET estado = 2, observaciones = ? WHERE numero = ? AND id_ficha = ?';
            const query = 'SELECT * FROM fichas_aceptadas WHERE numero = ?';

            try {
                const [select] = await bd.query(query,[ctx.from]);

                if(select){
                    await bd.query(query2,[id[2],ctx.from,id[1]]);
                }else{
                    await bd.query(query1,[id[2],id[1],ctx.from]);
                }
                
                const query4 = 'UPDATE fichas SET estado = 3 WHERE id = ?';
                mensaje = "Ficha Rechazada!"
                await bd.query(query4,[id[1]]);

            } catch (error) {
                console.error(error)
            }

              await flowDynamic(mensaje);
              return gotoFlow(flujoBiF);
          }
          if (ctx.body.toLowerCase() === 'vt') { 
  
              return gotoFlow(flujoBiF)
          }
  
          return gotoFlow(flujoBadm);
    });

  const flujoSecF = addKeyword('FLUJO_PRINS')
    .addAction({ capture: true }, async (ctx, { gotoFlow,endFlow ,flowDynamic }) => {
        let nombre = ctx.body;
        let numero = ctx.from;

        if (ctx.body.toLowerCase() === 'nom') {
            await flowDynamic("Indica el nuevo Nombre para esta ficha");
            return gotoFlow(flujoAcNom);
        }
        if (ctx.body.toLowerCase() === 'raz') {
            await flowDynamic("Indica la nueva Raza para esta ficha");
            return gotoFlow(flujoAcRaz);
        }
        if (ctx.body.toLowerCase() === 'cla') {
        await flowDynamic("Indica la nueva Clase para esta ficha");
            return gotoFlow(flujoAcCla);
        }
        if (ctx.body.toLowerCase() === 'fi') {
        await flowDynamic("Indica la nueva ficha");
            return gotoFlow(flujoActficha);
        }
        if (ctx.body.toLowerCase() === 'vt') { 
            
            const query1 = 'UPDATE fichas set modificar = 0 WHERE numero = ?';

            try {
                await bd.query(query1,[ctx.from]);
            } catch (error) {
                console.error(error)
            }

            return gotoFlow(flujoBiF)
        }

        return gotoFlow(flujoSecF);
  });

  const flujoAgficha = addKeyword("AGREGAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
        let ver = await separarnombre(ctx.from,ctx.body);

            if (ver == true) {
                await flowDynamic("Agregado! la ficha deberia aparecer en la opcion > []Ver fichas");
                return gotoFlow(flujoBiF)
            } else {
                await flowDynamic('Hubo un problema al registrar. Intente nuevamente');
                return gotoFlow(flujoBiF)
            }
      })

      const flujoActficha = addKeyword("ACTUALIZAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
        let nombre = ctx.body;
        let numero = ctx.from;

        const queryUpdate = 'UPDATE fichas SET ficha = ? WHERE numero = ? AND modificar = 1';
        const updateResult = await bd.query(queryUpdate, [nombre, numero]);
        
        if (updateResult && updateResult.affectedRows > 0) {
            await flowDynamic('Nueva clase: ' + nombre);
            let mensaje ='\nEste es el sistema de Actualizaciones,' + 
                '\nAcciones:' +
                '\n> [Nom] Actualizar nombre' +
                '\n> [Raz] Actualizar Raza' +
                '\n> [Cla] Actualizar clase' +
                '\n> [Fi] Actualizar la ficha a su totalidad' +
                '\n> [Vt] regresar'
                await flowDynamic(mensaje);
            return gotoFlow(flujoSecF);
        } else {
            await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
            return gotoFlow(flujoBiF);
        }
      })

      const flujoAcCla = addKeyword("ACTUALIZAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
        let nombre = ctx.body;
        let numero = ctx.from;

        const queryUpdate = 'UPDATE fichas SET clase = ? WHERE numero = ? AND modificar = 1';
        const updateResult = await bd.query(queryUpdate, [nombre, numero]);
        
        if (updateResult && updateResult.affectedRows > 0) {
            await flowDynamic('Nueva clase: ' + nombre);
            let mensaje ='\nEste es el sistema de Actualizaciones,' + 
                '\nAcciones:' +
                '\n> [Nom] Actualizar nombre' +
                '\n> [Raz] Actualizar Raza' +
                '\n> [Cla] Actualizar clase' +
                '\n> [Fi] Actualizar la ficha a su totalidad' +
                '\n> [Vt] regresar'
                await flowDynamic(mensaje);
            return gotoFlow(flujoSecF);
        } else {
            await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
            return gotoFlow(flujoBiF);
        }
      })

  const flujoAcRaz = addKeyword("ACTUALIZAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
        let nombre = ctx.body;
        let numero = ctx.from;

        const queryUpdate = 'UPDATE fichas SET raza = ? WHERE numero = ? AND modificar = 1';
        const updateResult = await bd.query(queryUpdate, [nombre, numero]);
        
        if (updateResult && updateResult.affectedRows > 0) {
            await flowDynamic('Nueva raza: ' + nombre);
            let mensaje ='\nEste es el sistema de Actualizaciones,' + 
                '\nAcciones:' +
                '\n> [Nom] Actualizar nombre' +
                '\n> [Raz] Actualizar Raza' +
                '\n> [Cla] Actualizar clase' +
                '\n> [Fi] Actualizar la ficha a su totalidad' +
                '\n> [Vt] regresar'
                await flowDynamic(mensaje);
            return gotoFlow(flujoSecF);
        } else {
            await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
            return gotoFlow(flujoBiF);
        }
      })

      const flujoAcNom = addKeyword("ACTUALIZAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
        let nombre = ctx.body;
        let numero = ctx.from;

        const queryUpdate = 'UPDATE fichas SET nombre = ? WHERE numero = ? AND modificar = 1';
        const updateResult = await bd.query(queryUpdate, [nombre, numero]);
        
        if (updateResult && updateResult.affectedRows > 0) {
            await flowDynamic('Nuevo nombre: ' + nombre);
            let mensaje ='\nEste es el sistema de Actualizaciones,' + 
                '\nAcciones:' +
                '\n> [Nom] Actualizar nombre' +
                '\n> [Raz] Actualizar Raza' +
                '\n> [Cla] Actualizar clase' +
                '\n> [Fi] Actualizar la ficha a su totalidad' +
                '\n> [Vt] regresar'
                await flowDynamic(mensaje);
            return gotoFlow(flujoSecF);
        } else {
            await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
            return gotoFlow(flujoBiF);
        }
      })

    const flujoAcfichaId = addKeyword("AGREGAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  

        let mensaje = "";
        const query = 'SELECT nombre FROM fichas WHERE numero = ? AND id = ?';
        const query1 = 'UPDATE fichas set modificar = 1 WHERE numero = ? AND id = ?';
          
        try {
            const [rows1] = await bd.query(query,[ctx.from,ctx.body]);
            await bd.query(query1,[ctx.from,ctx.body]);

            if(rows1){
                
                mensaje ='\nEste es el sistema de Actualizaciones,' + 
                '\nSeleccionaste: ' + rows1.nombre + 
                '\nAcciones:' +
                '\n> [Nom] Actualizar nombre' +
                '\n> [Raz] Actualizar Raza' +
                '\n> [Cla] Actualizar clase' +
                '\n> [Fi] Actualizar la ficha a su totalidad' +
                '\n> [Vt] regresar'
                await flowDynamic(mensaje);
                return gotoFlow(flujoSecF);
            }else{
                await flowDynamic("es probable que te equivocaras al intentar acceder");
                return gotoFlow(flujoBiF);
            }
        }catch(error){
            console.error(error)
        }
      })

    const flujoAcficha = addKeyword("AGREGAR_FICHA")
      .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  

        let Fichas = "Fichas Actuales sobre esta cuenta";
        const query = 'SELECT id,nombre,raza,clase FROM fichas WHERE numero = ?';
        const query1 = 'UPDATE fichas set modificar = 0 WHERE numero = ?';
            
        try {
            val = 0
            const rows1 = await bd.query(query,[ctx.from]);
            await bd.query(query1,[ctx.from]);

            if(rows1){
                rows1.forEach(e => {
                    Fichas += "\n> ID *_[ " + e.id + " ]_* \n> Nombre: *["  + e.nombre + "]* \n> Raza _[" + e.raza + "]_\n> Clase _[" + e.clase + "]_\n\n" ;
                });
            }else{
                await flowDynamic("No Existe ninguna ficha para este usuario");
                return gotoFlow(flujoBiF);
            }

            Fichas += "Digite el ID presentado al inicio de la ficha que necesita actualizar"
            await flowDynamic(Fichas);
            return gotoFlow(flujoAcfichaId);
            
        }catch(error){
            console.error(error)
        }
      })

    const flujoVeficha = addKeyword("AGREGAR_FICHA")
      .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  

        let Fichas = "Fichas Actuales sobre esta cuenta";
        const query = 'SELECT id,nombre,raza,clase FROM fichas WHERE numero = ?';
            
        try {
            val = 0
            const [rows1] = await bd.query(query,[ctx.from]);

            if(rows1){
                rows1.forEach(e => {
                    Fichas += "\n> ID *_[ " + e.id + " ]_* \n> Nombre: *["  + e.nombre + "]* \n> Raza _[" + e.raza + "]_\n> Clase _[" + e.clase + "]_\n\n" ;
                });
            }else{
                await flowDynamic("No Existe ninguna ficha para este usuario");
                return gotoFlow(flujoBiF);
            }

            Fichas += "Digite el ID presentado al inicio de la ficha que necesita ver"
            await flowDynamic(Fichas);
            return gotoFlow(flujoVefichaID);
            
        }catch(error){
            console.error(error)
        }
      })

      const flujoVefichaID = addKeyword("AGREGAR_FICHA")
      .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  

        let Obs = "";
        const query = 'SELECT ficha,estado FROM fichas WHERE numero = ? AND id = ?';
        const query1 = 'SELECT f.observaciones, s.nombre FROM fichas_aceptadas f INNER JOIN usuarios s on s.numero = f.numero WHERE id_ficha = ?';
            
        try {
            const [rows1] = await bd.query(query,[ctx.from,ctx.body]);
            const rows = await bd.query(query1,[ctx.body]);

            if(rows1){
                await flowDynamic("Aqui tienes tu ficha");
                await flowDynamic(rows1.ficha)

                if(rows1.estado == 1){
                    await flowDynamic("El estatus de tu ficha es: _*💤En Espera💤*_");
                }else if(rows1.estado == 2){
                    await flowDynamic("El estatus de tu ficha es: _*🔰Aprobada🎉*_");
                }else{

                    if(rows){
                        rows.forEach(e => {
                            Obs += "\n\n Admin de la observacion: " + e.nombre + " \n Observaciones: " + e.observaciones;
                        });
                    }

                    await flowDynamic("El estatus de tu ficha es: _*❌Negada❌*_ \nAqui algunas observaciones:\n" + Obs);
                }
                return gotoFlow(flujoBiF);

            }else{
                await flowDynamic("O intentaste entrar en un id que no te pertenece o te equivocaste al digitar el id (si es que estas seguro que ingresaste una ficha antes), que tal si lo intentas de nuevo despues?");
                return gotoFlow(flujoBiF);
            }
        }catch(error){
            console.error(error)
        }
      })

// Flujo de bienvenida
const flujoBiF = addKeyword('/b_fic')
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
        if(await validar(ctx.pushName,ctx.from) == true){
            await flowDynamic(await mensajeR(ctx.from));
            return gotoFlow(flujoPrinF);
        }else{
            if(!ctx.from.includes("@g.us")){
                return endFlow({
                    body: 'no estas registrado en el bot al parecer contacta a @its k o un administrador para que te brinde ayuda para registrarte',
                });
            }
            return endFlow();
        }
    })

module.exports = {
    flujoAcCla,
    flujoAcNom,
    flujoAcRaz,
    flujoAcficha,
    flujoAcfichaId,
    flujoActficha,
    flujoAgficha,
    flujoBadm,
    flujoBficha,
    flujoBfichaId,
    flujoBiF,
    flujoPrinF,
    flujoSecF,
    flujoVeficha,
    flujoVefichaID,
    flujoPinfoP,
    flujoSInfoP,
};