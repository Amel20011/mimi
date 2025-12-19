const config = require('../config');
const menu = require('./menu');

exports.autoReply = async (client, msg, body) => {
    // Button response
    if (msg.buttonReply) {
        const buttonId = msg.buttonReply.id;
        
        switch(buttonId) {
            case 'menu1':
                await menu.showInfoMenu(client, msg);
                break;
            case 'menu2':
                await menu.showGroupMenu(client, msg);
                break;
            case 'menu3':
                await menu.showToolsMenu(client, msg);
                break;
            case 'back':
                await menu.showMainMenu(client, msg);
                break;
            case 'contact':
                await client.sendMessage(msg.from, `Owner: ${config.owner}\nNomor: ${config.ownerNumber}`);
                break;
            case 'tagall':
                await menu.showGroupMenu(client, msg);
                break;
            case 'kick':
                await menu.showGroupMenu(client, msg);
                break;
            case 'promote':
                await menu.showGroupMenu(client, msg);
                break;
            case 'sticker':
                await menu.showToolsMenu(client, msg);
                break;
            case 'toimg':
                await menu.showToolsMenu(client, msg);
                break;
            case 'tomp3':
                await menu.showToolsMenu(client, msg);
                break;
        }
    }
    
    // Simple auto replies
    const autoReplies = {
        'halo': 'Halo! 👋 Ada yang bisa saya bantu?',
        'help': 'Ketik !menu untuk melihat menu bot',
        'assalamualaikum': 'Waalaikumsalam warahmatullahi wabarakatuh 🌹',
        'assalamualaikum warahmatullahi wabarakatuh': 'Waalaikumsalam warahmatullahi wabarakatuh 🌹'
    };
    
    if (autoReplies[body]) {
        await client.sendMessage(msg.from, autoReplies[body]);
    }
};
