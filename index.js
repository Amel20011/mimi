const { Client, LocalAuth } = require('whatsapp-web.js');
const config = require('./config');
const menu = require('./lib/menu');
const group = require('./lib/group');
const admin = require('./lib/admin');
const reply = require('./lib/reply');
const functionUtils = require('./lib/function');

// Initialize client
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "bot-wa" }),
    puppeteer: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Load database
const antilink = require('./database/antilink.json');
const welcome = require('./database/welcome.json');
const users = require('./database/users.json');

// Client events
client.on('qr', (qr) => {
    console.log('QR Code received, scan it with your phone');
    require('qrcode-terminal').generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
    console.log(`Logged in as ${client.info.wid.user}`);
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const body = msg.body.toLowerCase();
    const isGroup = chat.isGroup;
    
    // Check if message is command
    if (body.startsWith(config.prefix)) {
        const command = body.slice(config.prefix.length).trim().toLowerCase();
        
        // Menu command
        if (command === 'menu' || command === 'help') {
            menu.showMainMenu(client, msg);
            return;
        }
        
        // Group commands
        if (isGroup) {
            if (command === 'tagall') {
                group.tagAll(client, msg);
                return;
            }
            if (command === 'kick') {
                group.kickMember(client, msg);
                return;
            }
            if (command === 'promote') {
                group.promoteMember(client, msg);
                return;
            }
        }
        
        // Admin commands
        if (msg.fromMe) {
            if (command === 'setwelcome') {
                admin.setWelcome(client, msg, welcome);
                return;
            }
            if (command === 'setgoodbye') {
                admin.setGoodbye(client, msg, goodbye);
                return;
            }
        }
    }
    
    // Auto reply for specific messages
    reply.autoReply(client, msg, body);
});

// Group events
client.on('group_join', (groupChat, user) => {
    const welcomeMsg = welcome[groupChat.id._serialized] || config.welcomeMessage;
    groupChat.sendMessage(welcomeMsg.replace('{user}', user.name));
});

client.on('group_leave', (groupChat, user) => {
    const goodbyeMsg = goodbye[groupChat.id._serialized] || config.goodbyeMessage;
    groupChat.sendMessage(goodbyeMsg.replace('{user}', user.name));
});

client.on('group_update', (groupChat, update) => {
    if (update.isChangeSubject) {
        groupChat.sendMessage(`Subject changed to: ${update.subject}`);
    }
});

// Initialize bot
client.initialize();
