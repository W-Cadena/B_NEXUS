const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')

const { bd1 } = require('./Config/database.js');
const { flujod10, flujod20, flujob10, flujobsn } = require('./Modules/flow-dices');
const { flujoBiR, flujoBiR1, flujoPrinR, flujoRegi, flujoEsc } = require('./Modules/flow-regi');
const { flujoPinfoP, flujoSInfoP, flujoAcCla, flujoAcNom, flujoAcRaz, flujoAcficha, flujoAcfichaId, flujoActficha, flujoAgficha, flujoBadm, flujoBficha, flujoBfichaId, flujoBiF, flujoPrinF, flujoSecF, flujoVeficha, flujoVefichaID, } = require('./Modules/flow-fic');
const { flujoAgclas, flujoAgraz, flujoagindice, flujoindice} = require('./Modules/flow-clrz');
const { flujoTodo, flujoTodo1, flujoBiS, flujoRaza, flujoMundo, flujoSistema, flujoRaza1, flujoMundo1, flujoSistema1, flujoBiS1, flujoPrinS } = require('./Modules/flow-doc');


    
const main = async () => {

    const adapterFlow = createFlow([
        //flujos de documentos
        flujoBiS,
        flujoRaza,
        flujoMundo,
        flujoTodo,
        flujoSistema,
        flujoRaza1,
        flujoMundo1,
        flujoTodo1,
        flujoSistema1,
        flujoBiS1,
        flujoPrinS,

        //flujos de registros
        flujoBiR,
        flujoBiR1,
        flujoPrinR,
        flujoRegi,
        flujoEsc,

        //flujos de indice, agregar raza y clase
        flujoAgclas,
        flujoAgraz,
        flujoagindice,
        flujoindice,

        //flujos de fichas
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

        //flujo de dados
        flujod10,
        flujod20,
        flujob10,
        flujobsn
    ])

    const adapterProvider = createProvider(BaileysProvider, { allowGroups: true });

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: bd1,
    })

    QRPortalWeb()
}

main()

