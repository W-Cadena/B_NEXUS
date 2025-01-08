const { addKeyword } = require('@bot-whatsapp/bot')
const MySQLAdapter = require('@bot-whatsapp/database/mysql');

function validar(nombre,usr){
    let val = false
    const gadmitidos = [
        "120363385739026296@g.us" /*grupo*/, 
        "120363382670452990@g.us" /*prueba bot*/,
        "5493549460109-1601274101@g.us" /*fichas*/
    ];

    if(nombre.includes("@g.us")){ 
        gadmitidos.forEach(g => {
            if(g == nombre){
                val = true;
            }
        });
    }else{
        val= true;
    }

    return val;
}

function mensaje(nombre,inicio){    

    if(inicio != true){
        const mensajesB = ["BUENAS!!","Que tal forajido?","Como te encuentras?","Supongo que sabemos a que vienes","que tal! pasa","oh viniste?","olvidaste algo huh?","hey!","HEYY!!","Oh otra vez por aqui?"]
        const rmensajeb = mensajesB[Math.floor(Math.random() * mensajesB.length)];
    
        return rmensajeb + ' bienvenido al bot de obtencion de PDFS: *' + nombre + '*' +
        '\nPor ahora cuento con estos documentos si necesitas alguno solo pidelo!!'+
        '\n[Sis] -> Doc de sistemas' +
        '\n[Raz] -> Doc de Razas' +
        '\n[Mun] -> Doc de Mundo' +
        '\n[Td] -> Todos los documentos' +
        '\n[ND] -> Salir del sistema';
    }else{
        const mensajesE = ["Aun por aqui?","Oh bien aun necesitas algo?","aqui espero no te preocupes","nesecitas algo mas?","aun puedes ver si necesitas algo mas","que necesitas?","oh bien parece que todo debe estar bien no?","no tienes dudas?","necesitas algo mas?"]
        const rmensajee = mensajesE[Math.floor(Math.random() * mensajesE.length)];

        return rmensajee + ' Sigues en el bot de obtencion de PDfS: *'+ nombre + '*' +
        '\nPor ahora cuento con estos documentos si necesitas alguno solo pidelo!!'+
        '\n[Sis] -> Doc de sistemas' +
        '\n[Raz] -> Doc de Razas' +
        '\n[Mun] -> Doc de Mundo' +
        '\n[Td] -> Todos los documentos' +
        '\n[ND] -> Salir del sistema';

    }

}

const flujoPrinS = addKeyword('FLUJO_PRINS')
    .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow  }) => {
            
            if (ctx.body.toLowerCase() === 'sis') {
                return gotoFlow(flujoSistema);
            }
            if (ctx.body.toLowerCase() === 'raz') {
                return gotoFlow(flujoRaza);
            }
            if (ctx.body.toLowerCase() === 'mun') {
                return gotoFlow(flujoMundo);
            }
            if (ctx.body.toLowerCase() === 'td') {
                return gotoFlow(flujoTodo);
            }
            if (ctx.body.toLowerCase() === 'nd') {
                return endFlow({
                    body: 'Gracias por usarme! por el momento es todo pero veras de mi muajajajaja',
                });
            }

            return gotoFlow(flujoPrinS);
        
  });

// Flujo para sistemas
const flujoSistema1 = addKeyword('/b_Sis')
        .addAnswer('El Documento de sistema, Claro! aqui tienes')
        .addAnswer(['a'],
            {
                media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Sistemas.pdf'
            },
            )

    // Flujo para mundos
const flujoMundo1 = addKeyword('/b_mun')
    .addAnswer('El Documento de Mundo, Claro! aqui tienes')
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Mundo.pdf'
        },
        
);

// Flujo para Raza
const flujoRaza1 = addKeyword('/b_raz')
    .addAnswer('El Documento de Raza, Claro! aqui tienes')
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Razas.pdf'
        },
       
    );

const flujoTodo1 = addKeyword('/b_tod')
    .addAnswer('Todos los documentos, Claro! aqui tienes')
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Sistemas.pdf'
        },
    )
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Mundo.pdf'
        },
    )
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Razas.pdf'
        },
        
    );


// Flujo para sistemas
const flujoSistema = addKeyword('FLUJOSISTEMA')
        .addAnswer('El Documento de sistema, Claro! aqui tienes')
        .addAnswer(['a'],
            {
                media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Sistemas.pdf'
            },
            async (_, { gotoFlow }) => {
                return gotoFlow(flujoBiS1);
            })

    // Flujo para mundos
const flujoMundo = addKeyword('FLUJOMUNDO')
    .addAnswer('El Documento de Mundo, Claro! aqui tienes')
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Mundo.pdf'
        },
        async (_, { gotoFlow }) => {
            return gotoFlow(flujoBiS1);
        }
);

// Flujo para Raza
const flujoRaza = addKeyword('FLUJORAZA')
    .addAnswer('El Documento de Raza, Claro! aqui tienes')
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Razas.pdf'
        },
        async (_, { gotoFlow }) => {
            return gotoFlow(flujoBiS1);
        }
    );

const flujoTodo = addKeyword('FLUJOTODO')
    .addAnswer('Todos los documentos, Claro! aqui tienes')
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Sistemas.pdf'
        },
    )
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Mundo.pdf'
        },
    )
    .addAnswer(['a'],
        {
            media: 'C:/Users/Wilber Cadena/Downloads/botw/base-baileys-mysql/Documents/Razas.pdf'
        },
        async (_, { gotoFlow }) => {
            return gotoFlow(flujoBiS1);
        }
    );

    // Flujo de bienvenida
const flujoBiS1 = addKeyword('FLUJOSECPRIN')
.addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
    if(validar(ctx.from,ctx.pushName) == true){
        await flowDynamic(mensaje(ctx.pushName,true));
        return gotoFlow(flujoPrinS);
    }else{
        return endFlow({
            body: 'Este bot no parece estar incluido dentro de este grupo, porfavor contactar a @its K si lo necesitas',
        });
    }
})

// Flujo de bienvenida
const flujoBiS = addKeyword('/b_doc')
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
        if(validar(ctx.from,ctx.pushName) == true){
            await flowDynamic(mensaje(ctx.pushName,false));
            return gotoFlow(flujoPrinS);
        }else{
            return endFlow({
                body: 'Este bot no parece estar incluido dentro de este grupo, porfavor contactar a @its K si lo necesitas',
            });
        }
    })

module.exports = {
    flujoBiS,
    flujoRaza,
    flujoMundo,
    flujoSistema,
    flujoRaza1,
    flujoMundo1,
    flujoSistema1,
    flujoBiS1,
    flujoPrinS,
    flujoTodo,
    flujoTodo1,
};