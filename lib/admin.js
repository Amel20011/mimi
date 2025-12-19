const config = require('../config');

exports.setWelcome = async (client, msg, welcomeData) => {
    const chat = await msg.getChat();
    const newWelcome = msg.body.split(' ').slice(1).join(' ');
    
    if (!newWelcome) {
        const buttons = [
            { buttonId: 'default', buttonText: { displayText: 'Default' }, type: 1 },
            { buttonId: 'custom', buttonText: { displayText: 'Custom' }, type: 1 }
        ];
        
        const buttonMessage = {
            contentText: "🎉 *Set Welcome Message*\n\nPilih opsi:",
            footerText: "Default: Selamat datang di grup! 🎉",
            buttons: buttons,
            headerType: 1
        };
        
        await client.sendMessage(msg.from, buttonMessage);
        return;
    }
    
    welcomeData[chat.id._serialized] = newWelcome;
    await saveDatabase('welcome', welcomeData);
    
    await client.sendMessage(msg.from, "✅ Welcome message berhasil di set!");
};

exports.setGoodbye = async (client, msg, goodbyeData) => {
    const chat = await msg.getChat();
    const newGoodbye = msg.body.split(' ').slice(1).join(' ');
    
    if (!newGoodbye) {
        const buttons = [
            { buttonId: 'default', buttonText: { displayText: 'Default' }, type: 1 },
            { buttonId: 'custom', buttonText: { displayText: 'Custom' }, type: 1 }
        ];
        
        const buttonMessage = {
            contentText: "👋 *Set Goodbye Message*\n\nPilih opsi:",
            footerText: "Default: Sampai jumpa! 👋",
            buttons: buttons,
            headerType: 1
        };
        
        await client.sendMessage(msg.from, buttonMessage);
        return;
    }
    
    goodbyeData[chat.id._serialized] = newGoodbye;
    await saveDatabase('goodbye', goodbyeData);
    
    await client.sendMessage(msg.from, "✅ Goodbye message berhasil di set!");
};

async function saveDatabase(type, data) {
    const fs = require('fs');
    const path = require('path');
    
    const filePath = path.join(__dirname, '../database/', `${type}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
