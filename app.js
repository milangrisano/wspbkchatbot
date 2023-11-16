const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const compra = addKeyword(['Compra'])
    .addAnswer(
        'Cuantas acciones desea comprar su limite son:',
        {capture: true},
        (ctx) => {
            console.log('Acciones a comprar', ctx.body)
        },
        )
        .addAnswer(
        'Le enviaremos una confirmación cuando los administradores aprueben su compra',
    )

const acciones = addKeyword(['acciones'])
    .addAnswer([
        'Que operacion desae realiza?',
        'escriba la opcion deseada con la palabra resaltada en negritas',
        '*Compra* de Acciones',
        '*Retiro* de acciones'
    ])

// const noValido = addKeyword(['noValido'])
//     .addAnswer(
    //         'el correo electronico suministrado no se encuentra en nuestra base de datos, por favor verifiquelo o intente con su numero de documento de identidad',
    //         {capture: true},
    //         (ctx) => {
        //             console.log('Codigo de confirmación:', ctx.body)
        //         },
        //         [logIn]
        // Vuelve a buscar por el documento y si es valido al login sino solicta nuevamente un docuemnto o correo un 5 oportunidades y lo envia a comunicarse con el administrador del banko o servicio tecnico
        //     )
        
// const valido = addKeyword(['valido'])
//     .addAnswer(
//         'Hemos enviado un codigo de confirmacion a su correo electronico, por favor escribalo a continuacion',
//         {capture: true},
//         (ctx) => {
//             console.log('Codigo de confirmación:', ctx.body)
//         },
//         [logIn]
//     )
                
const recoverPassword = addKeyword(['4'])
    .addAnswer(
        'Escriba su correo Electronico',
        {capture: true},
        (ctx) => {
            console.log('Codigo de confirmación:', ctx.body)
        },
        // [valido]
    )

const recoverUser = addKeyword(['3'])
    .addAnswer(
        'Escriba su correo electronico o documento de identidad',
        (ctx,{fallBack}) => {
            if (!ctx.body.includes('@')) {
                return fallBack()
            }
            console.log('Correo Electronico:', ctx.body)
        },
        //!OJO: Se valida la respuesta del servidor y te envia hacia dos flujos
        // [valido, noValido]
    )

const logIn = addKeyword(['2']) 
//!no entra despues del registro por que solo reconoce el 2 como opcion para entrar
    .addAnswer(
        'Escriba su correo electronico',
        {capture: true},
        (ctx,{fallBack}) => {
            if (!ctx.body.includes('@')) {
                return fallBack()
            }
            console.log('Correo Electronico:', ctx.body)
        }
    )
    .addAnswer(
        'Escriba una contraseña',
        {capture: true},
        (ctx) => {
            console.log('Contraseña:', ctx.body)
        },
    )
    .addAnswer(
        [
            'Bienvenido a su Bankomunal *NOMBRE DEL BANKO*',
            'Que Operacion desea realizar?',
            'Escriba la opcion que desea seleccionar',
            '*- Acciones*',
            '*- Creditos*',
            '*- Ganacias*'
        ],
        null,
        null,
        [acciones]
    )

const register = addKeyword(['1'])
    .addAnswer(
        'Escribe tu nombre completo',
        {capture: true},
        (ctx) => {
            console.log('Nombre Completo:', ctx.body)
        }
    )
    .addAnswer(
        'Escriba el correo electronico con el que desea registrarse',
        {capture: true},
        (ctx,{fallBack}) => {
            if (!ctx.body.includes('@')) {
                return fallBack()
            }
            console.log('Correo Electronico:', ctx.body)
        }
    )
    .addAnswer(
        'Escriba una contraseña de 6 digitos con al menos una mayuscula, una miniscula, un caracter especial y un numero',
        {capture: true},
        (ctx) => {
            console.log('Contraseña:', ctx.body)
        }
    )
    .addAnswer(
        'Confirme su contraseña',
        {capture: true},
        (ctx) => {
            console.log('Confirmacion de Contraseña:', ctx.body)
        },
    )
//? Aqui debe hacer un llamado al login

const wellcome = addKeyword(['hola','buenas','buenas tardes'])
    .addAnswer(
        [
            'Hola, bienvenido a *WSP BKApp*',,
            'Digita el numero de la opcion que deseas seleccionar',
            '*1* - Registrarse',
            '*2* - Ingresar a su *Banko*',
            '*3* - Recuperar su usuario',
            '*4* - Recuperar su contraseña',
        ],
        null,
        null,
        [register, logIn, recoverUser, recoverPassword]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([wellcome])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

}

main()
