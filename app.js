const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowBienvenida = addKeyword(['buenas', 'hola', 'buenas tardes'])
    .addAnswer(['Bienvenido a BKApp', 'Cual es tu nombre?'], {capture:true})
    // Aca se deberia buscar en la base de datos si el nombre existe?
    .addAnswer('Cual es tu contraseña?', {capture:true})
    // Igual aca?? Si tod esta correcto, continuar
    .addAnswer([`Bienvenido ${nombre}!`, 'Que deseas hacer hoy?' , 
    '*1* - Ver mis datos',
    '*2* - Comprar acciones', 
    '*3* - Solicitar un credito', 
    '*4* - Pagar una cuota'])

const flowVerDatos = addKeyword(['1']).addAnswer(['Estos son tus datos:', 
`Mis acciones: ${acciones}`,
`Historico de mis creditos: ${historicoCreditos}`,
`Mis ganancias acumuladas: ${gananciasAcumuladas}`,
`Total deuda vigente: ${deudaVigente}`,])
// Deberiamos anadir una opcion que diga como: Volver al menu princilpal o algo asi?

const flowComprarAcciones = addKeyword(['2']).addAnswer(['Usted tiene ___ acciones', 
'Puede comprar hasta ___ acciones', // Verificar con base de datos?
'Cuantas acciones desea comprar?'], {capture:true}, {delay:1000}) // No se puede exceder del maximo
// No se 


const flowSolicitarCredito = addKeyword(['3'])
    .addAnswer(['Cual es el monto que desea solicitar?'], {capture:true}) // Monto
    .addAnswer(['En cuantas cuotas desea pagarlo?'], {capture:true}) // Guardar en cuotas
    .addAnswer(['Resumen del credito solicitado:',
    `Monto: ${monto}`,
    `Cuotas: ${cuotas}`,
    `Detalles cuotas: ???`, // Fechas y montos de cada cuota
     'Esta de acuerdo con solicitar el credito?', 
    '*Si* - Solicitar credito',
    '*No* - Cancelar solicitud', 
    [flowSi, flowNo]])
// Aca se que hay que agregar los flujos hijos pero no se si lo hice bien 
const flowSi = addKeyword(['Si']).addAnswer(['Su solicitud ha sido enviada!'])
const flowNo = addKeyword(['No']).addAnswer(['Su solicitud ha sido cancelada!'])

const flowPagarCuota = addKeyword(['4'])


    QRPortalWeb()




main()
