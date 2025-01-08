const { addKeyword } = require('@bot-whatsapp/bot')
const { bd } = require('../Config/database.js');

function validar(nombre,usr){
    let val = false
    const gadmitidos = [
        "120363385739026296@g.us" /*grupo*/, 
        "120363382670452990@g.us" /*prueba bot*/,
        "5493549460109-1601274101@g.us" /*fichas*/,
        '5493549460109-1601274017@g.us' /*spam*/,
        '120363120844017112@g.us' /*timba-apuestas*/,
        '5493549460109-1613405052@g.us' /*clasista*/,

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

// Función para obtener un dado aleatorio de los 20 posibles
function d20() {
    const dados = [
        "[]•1⚀[]","[]••2⚁[]","[]•••3⚂[]","[]••••4⚃[]",
        "[]—5⚄[]","[]•—6⚅[]","[]••—7⚅⚀[]","[]•••—8⚅⚁[]","[]••••—9⚅⚂[]","[]=10⚄⚄[]",
        "[]•=11⚅⚄[]","[]••=12⚅⚅[]","[]•••=13⚅⚅⚀[]","[]••••=14⚅⚅⚁[]","[]•—=15⚄⚄⚄[]",
        "[]•—=16⚅⚅⚃[]","[]••—=17⚅⚅⚄[]","[]•••—=18⚅⚅⚅[]","[]••••—=19⚅⚅⚅⚀[]","[]==20⚄⚄⚄⚄[]"
    ];
    const indiceAleatorio = Math.floor(Math.random() * dados.length);
    return dados[indiceAleatorio];
}

// Función para obtener un dado aleatorio de los primeros 10 dados
function d10() {
    const dados = [
        "[]•1⚀[]","[]••2⚁[]","[]•••3⚂[]","[]••••4⚃[]",
        "[]—5⚄[]","[]•—6⚅[]","[]••—7⚅⚀[]","[]•••—8⚅⚁[]","[]••••—9⚅⚂[]","[]=10⚄⚄[]"
    ];
    const indiceAleatorio = Math.floor(Math.random() * dados.length);
    return dados[indiceAleatorio];
}

function bsn() {
    const dados = [
        "|==| 𝑁𝑜 |==|","|==| 𝑺𝒊 |==|"
    ];
    const indiceAleatorio = Math.floor(Math.random() * dados.length);
    return dados[indiceAleatorio];
}

function b10() {
    let numero = Math.floor(Math.random() * 100) + 1;
    return `[]${numero}%[]`
}

const REGEX= `/^(d20)$/i`

const flujod20 = addKeyword( REGEX, { regex: true })
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
        if(validar(ctx.from,ctx.pushName) == true){
            return endFlow({
                body: d20(),
            });
        }else{
            return endFlow({
                body: 'Este bot no parece estar incluido dentro de este grupo, porfavor contactar a @its K si lo necesitas',
            });
        }
    })

const REGEX2= `/^(b10)$/i`

const flujob10 = addKeyword(REGEX2, { regex: true })
.addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
    if(validar(ctx.from,ctx.pushName) == true){
        return endFlow({
            body: b10(),
        });
    }else{
        return endFlow({
            body: 'Este bot no parece estar incluido dentro de este grupo, porfavor contactar a @its K si lo necesitas',
        });
    }
})

const REGEX3= `/^(d10)$/i`

const flujod10 = addKeyword(REGEX3, { regex: true })
.addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
    (async () => {
        try {
            const [rows] = await bd.query('SELECT 1 + 1 AS result');
            console.log('Conexión exitosa:', rows);
        } catch (error) {
            console.error('Error conectando a la base de datos:', error);
        }
    })();    

    if(validar(ctx.from,ctx.pushName) == true){
        return endFlow({
            body: d10(),
        });
    }else{
        return endFlow({
            body: 'Este bot no parece estar incluido dentro de este grupo, porfavor contactar a @its K si lo necesitas',
        });
    }
})

const REGEX4= `/^(bsn)$/i`

const flujobsn = addKeyword(REGEX4, { regex: true })
.addAction(async (ctx, { gotoFlow, endFlow, flowDynamic }) => {
    if(validar(ctx.from,ctx.pushName) == true){
        return endFlow({
            body: bsn(),
        });
    }else{
        return endFlow({
            body: 'Este bot no parece estar incluido dentro de este grupo, porfavor contactar a @its K si lo necesitas',
        });
    }
})

module.exports = {
    flujod10,
    flujod20,
    flujob10,
    flujobsn
};