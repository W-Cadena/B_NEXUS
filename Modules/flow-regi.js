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

const flujoPrinR = addKeyword('FLUJO_PRINS')
    .addAction({ capture: true }, async (ctx, { gotoFlow, flowDynamic }) => {
        let nombre = ctx.body;
        let numero = ctx.from;

        const query1 = 'SELECT nombre FROM usuarios WHERE numero = ?';

        try {
            const [result1] = await bd.query(query1, [numero]);

            if (result1) {
                // Usuario ya existe, actualizamos
                const queryUpdate = 'UPDATE usuarios SET nombre = ? WHERE numero = ?';
                const [updateResult] = await bd.query(queryUpdate, [nombre, numero]);

                if (updateResult && updateResult.affectedRows > 0) {
                    return gotoFlow(flujoRegi);
                } else {
                    await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
                    return gotoFlow(flujoBiR1);
                }
            } else {
                // Usuario no existe, lo insertamos
                const queryInsert = 'INSERT INTO usuarios (nombre, numero) VALUES (?, ?)';
                const [insertResult] = await bd.query(queryInsert, [nombre, numero]);

                if (insertResult && insertResult.affectedRows > 0) {
                    return gotoFlow(flujoRegi);
                } else {
                    await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
                    return gotoFlow(flujoBiR1);
                }
            }
        } catch (error) {
            console.error(`Error en flujo principal con número ${numero}:`, error);
            await flowDynamic('Ocurrió un error inesperado. Regresando al inicio.');
            return gotoFlow(flujoBiR1);
        }
    });


  const flujoRegi = addKeyword('FLUJO_PRINS')
    .addAction( async (ctx, { gotoFlow, flowDynamic  }) => {
        let numero = ctx.from;
        const query2 = 'SELECT nombre FROM usuarios WHERE numero = ?';
        try{
            const [results2] = await bd.query(query2, [numero]);
            const result2 = results2[0];

            if(result2){
                await flowDynamic( `El nombre que escogio es: _*${result2.nombre}*_ \n esta seguro? \n[]-> si \n[]-> no`);
                return gotoFlow(flujoEsc);
            }else{
                await flowDynamic('hubo un problema al registrar regresando al principio');
                return gotoFlow(flujoBiR1);
            }
        }catch (error) {
            console.error("Error ejecutando la consulta:", error);
            return gotoFlow(flujoBiR1);
        }    
  });

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