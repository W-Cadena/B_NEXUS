const { addKeyword } = require('@bot-whatsapp/bot')
const { bd } = require('../Config/database.js');

async function validar(nombre, numero) {
    let val = false
    const gadmitidos = [
        "120363385739026296@g.us" /*grupo*/, 
        "120363382670452990@g.us" /*prueba bot*/
    ];

    if(numero.includes("@g.us")){ 
        gadmitidos.forEach(g => {
            if(g == numero){
                val = true;
            }
        });
    }

    return val;
}

const REGEX2= `/^(\\/b_gind)(.+)/i`

const flujoagindice = addKeyword(REGEX2, { regex: true })
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
            let mensaje = ctx.body
            let ag = mensaje.split(" ")

            const queryInsert = 'INSERT INTO indice (nombre,descripcion) VALUES (?,?)';
            const insertResult = await bd.query(queryInsert, [ag[1],ag[2]]);

            if (insertResult && insertResult.affectedRows > 0) {
                await flowDynamic("Insertado: " + ag[1] + " descripcion: " + ag[2]);
            } else {
                await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
                await flowDynamic("");
            }
        
    })

// Flujo de bienvenida
const flujoindice = addKeyword("/b_ind")
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
        const query1 = 'SELECT * FROM indice';
        
        try {
            const rows = await bd.query(query1);
            let mensaje = "";

            rows.forEach(e => {
                mensaje = mensaje + "\n\n> " + e.nombre + " *" + e.descripcion + "*"
            });

            return await flowDynamic(
            `"Indice de comandos actuales: \n ${mensaje}`
            )
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
        }
        
    })

const REGEX1= `/^(\\/b_agc)(.+)/i`

// Flujo de bienvenida
const flujoAgclas = addKeyword(REGEX1, { regex: true })
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
        if(await validar(ctx.pushName,ctx.from) == true){
            let mensaje = ctx.body
            let ag = mensaje.split("-")

            const queryInsert = 'INSERT INTO clases (nombre) VALUES (?)';
            const insertResult = await bd.query(queryInsert, [ag[1]]);

            if (insertResult && insertResult.affectedRows > 0) {
                await flowDynamic("Insertado: " + ag[1]);
            } else {
                await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
                await flowDynamic("");
            }

            await flowDynamic("");
        }else{
            return endFlow();
        }
    })

const REGEX= `/^(\\/b_agr)(.+)/i`

// Flujo de bienvenida
const flujoAgraz = addKeyword(REGEX, { regex: true })
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
        if(await validar(ctx.pushName,ctx.from) == true){
            let mensaje = ctx.body
            let ag = mensaje.split("-")

            const queryInsert = 'INSERT INTO razas (nombre) VALUES (?)';
            const insertResult = await bd.query(queryInsert, [ag[1]]);

            if (insertResult && insertResult.affectedRows > 0) {
                await flowDynamic("Insertado: " + ag[1]);
            } else {
                await flowDynamic('Hubo un problema al registrar. Regresando al inicio.');
            }

        }else{
            return endFlow();
        }
    })

module.exports = {
    flujoAgclas,
    flujoAgraz,
    flujoagindice,
    flujoindice
};