const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys-pro')

const Pino = require('pino')
const readline = require('readline')
const config = require('./config')
const menu = require('./lib/menu')
const group = require('./lib/group')
const admin = require('./lib/admin')

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    logger: Pino({ level: 'silent' }),
    auth: state,
    version,
    printQRInTerminal: false,
    browser: ['Bot WhatsApp', 'Safari', '1.0']
  })

  // ===== PAIRING CODE =====
  if (!sock.authState.creds.registered) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question('Masukkan nomor WA (628xxx): ', async (number) => {
      const code = await sock.requestPairingCode(number)
      console.log('\n🔑 PAIRING CODE:', code)
      console.log('📱 WhatsApp > Perangkat tertaut > Masukkan kode')
      rl.close()
    })
  }

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection }) => {
    if (connection === 'open') {
      console.log('✅ BOT CONNECTED')
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message) return

    const from = m.key.remoteJid
    const isGroup = from.endsWith('@g.us')
    const body =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ''

    const cmd = body.toLowerCase()

    if (cmd === `${config.prefix}menu`) {
      return menu(sock, from, config)
    }

    if (cmd === `${config.prefix}admin`) {
      return admin.contact(sock, from, config)
    }

    if (cmd === `${config.prefix}tagall`) {
      return group.tagall(sock, from, isGroup)
    }

    if (cmd === `${config.prefix}group`) {
      return group.close(sock, from, isGroup)
    }
  })
}

startBot()
