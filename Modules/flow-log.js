const { addKeyword } = require('@bot-whatsapp/bot')
const { bd } = require('../Config/database.js');

async function validar(nombre, numero) {
    let val = false;

    if (!numero.includes("@g.us")) {
        const query1 = 'SELECT * FROM usuarios WHERE numero = ?';
        
        try {
            const [rows] = await bd.query(query1, [numero]);

            if (!rows) {
                val = true;
            }
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
        }
    }

    return val;
}

function mensajeR(nombre,numero,error){    

    if(error == true){
        const mensajesB = ["Que tal aventurero", "nuevo por aqui?", "Hola!", "genial parece que estas dando el primer paso", "hola hola", "hey there!", "hey!", "sip dejame ayudarte"]
        const rmensajeb = mensajesB[Math.floor(Math.random() * mensajesB.length)];

        return rmensajeb + ' Bienvenido al sistema de registro,' + 
        '\ntu nombre base es: _*' + nombre + '*_' + 
        '\ntu numero es: _*' + numero + '*_' +
        '\nAhora porfavor indicame como deberia llamarte?, dime como quieres llamarte?'
    }else{
        return 'Lo lamento hubo un error al registrarte, empecemos de nuevo' + 
        '\ntu nombre base es: _*' + nombre + '*_' + 
        '\ntu numero es: _*' + numero + '*_' +
        '\nAhora porfavor indicame como deberia llamarte?, dime como quieres llamarte?'

    }
}

  const flujoPrinL = addKeyword('FLUJO_PRINS')
    .addAction({ capture: true }, async (ctx, { gotoFlow,endFlow ,flowDynamic }) => {
        let nombre = ctx.body;
        let numero = ctx.from;

        if (ctx.body.toLowerCase() === 'ag') {
            await flowDynamic("Comensando a agregar nuevos logs, mientras este comando este activo puedes ingresar nuevos logs, solo podras salir colocando vt");
            return gotoFlow(flujoAcNom);
        }
        if (ctx.body.toLowerCase() === 'ac') {
            const query1 = 'UPDATE log set modi = 0 ';

            try {
                await bd.query(query1);
            } catch (error) {
                console.error(error)
            }

            return gotoFlow(flujoAcRaz);
        }
        if (ctx.body.toLowerCase() === 'el') {
            await flowDynamic("Indica el log a eliminar en el siguiente apartado");
            return gotoFlow(flujoAcCla);
        }
        if (ctx.body.toLowerCase() === 'nd') { 
            return endFlow({
                body: 'Parece que intentaste registrarte pero seguramente ya estas registrado, o intentaste usar el comando en un grupo',
            });
        }

        return gotoFlow(flujoSecF);
  });

   const flujoBlog = addKeyword("BUSCAR_FICHA")
        .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
  
          let Fichas = "Logs encontrados";
          let query;
          let valor = ctx.body;
          
            query = 'SELECT * FROM log';
           
          try {
              const rows1 = await bd.query(query);
  
              if(rows1){
                  rows1.forEach(e => {
                      Fichas += "\n[]- ID *_[ " + e.id + " ]_*  -- Nombre log: *["  + e.nombre + "]*\n" ;
                  });
              }else{
                  await flowDynamic("No Existe ningun log");
                  return gotoFlow();
              }
  
              Fichas += "Digite el ID presentado al inicio del log que desea ver"
              await flowDynamic(Fichas);
              return gotoFlow(flujoBfichaId);
              
          }catch(error){
              console.error(error)
          }
        })

        const flujoBlog2 = addKeyword("BUSCAR_FICHA")
        .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
  
          let Fichas = "Logs encontrados\n";
          let query;
          let valor = ctx.body;
          
            query = 'SELECT * FROM log';
           
          try {
              const rows1 = await bd.query(query);
  
              if(rows1){
                  rows1.forEach(e => {
                      Fichas += "\n[]- ID *_[ " + e.id + " ]_*  -- Nombre log: *["  + e.nombre + "]*\n" ;
                  });
              }else{
                  await flowDynamic("No Existe ningun log");
                  return gotoFlow();
              }
  
              Fichas += "Digite el ID presentado al inicio del log que desea actualizar"
              await flowDynamic(Fichas);
              return gotoFlow(flujoBfichaId);
              
          }catch(error){
              console.error(error)
          }
        })

        const flujoBlog1 = addKeyword("BUSCAR_FICHA")
        .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow, flowDynamic }) => {  
  
          let Fichas = "Logs encontrados\n";
          let query;
          let valor = ctx.body;
          
            query = 'SELECT * FROM log';
           
          try {
              const rows1 = await bd.query(query);
  
              if(rows1){
                  rows1.forEach(e => {
                      Fichas += "\n[]- ID *_[ " + e.id + " ]_*  -- Nombre log: *["  + e.nombre + "]*\n" ;
                  });
              }else{
                  await flowDynamic("No Existe ningun log");
                  return gotoFlow();
              }
  
              Fichas += "Digite el ID presentado al inicio del log que desea eliminar"
              await flowDynamic(Fichas);
              return gotoFlow(flujoBfichaId);
              
          }catch(error){
              console.error(error)
          }
        })

// Flujo de bienvenida
const flujoBiR1 = addKeyword('FLUJOBIR')
    .addAction(async (ctx, { gotoFlow, flowDynamic }) => {
            await flowDynamic(mensajeR(ctx.pushName,ctx.from,false));
            return gotoFlow(flujoPrinR);
})

const flujoEsc = addKeyword('FLUJOESC')
    .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow  }) => {

    if(ctx.body.toLowerCase() === "si"){
        return endFlow("Muy bien, el registro esta hecho, gracias por usarme!!")
    }else{
        return gotoFlow(flujoBiR1)
    }
});

// Flujo de bienvenida
const flujoBiR = addKeyword('/b_ini')
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
        if(await validar(ctx.pushName,ctx.from) == true){
            await flowDynamic(mensajeR(ctx.pushName,ctx.from,true));
            return gotoFlow(flujoPrinR);
        }else{
            if(!ctx.from.includes("@g.us")){
                return endFlow({
                    body: 'Parece que intentaste registrarte pero seguramente ya estas registrado, o intentaste usar el comando en un grupo',
                });
            }
            return endFlow();
        }
    })

module.exports = {
    flujoBiR,
    flujoBiR1,
    flujoPrinR,
    flujoRegi,
    flujoEsc,
};