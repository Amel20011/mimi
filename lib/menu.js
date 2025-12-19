const config = require('../config');

exports.showMainMenu = async (client, msg) => {
    const buttons = [
        { buttonId: 'menu1', buttonText: { displayText: 'Info Bot' }, type: 1 },
        { buttonId: 'menu2', buttonText: { displayText: 'Fitur Grup' }, type: 1 },
        { buttonId: 'menu3', buttonText: { displayText: 'Tools' }, type: 1 }
    ];
    
    const buttonMessage = {
        contentText: "🤖 *WhatsApp Bot Menu* 🤖\n\nPilih menu di bawah:",
        footerText: "Klik salah satu opsi untuk melanjutkan",
        buttons: buttons,
        headerType: 1
    };
    
    await client.sendMessage(msg.from, buttonMessage);
};

exports.showInfoMenu = async (client, msg) => {
    const buttons = [
        { buttonId: 'back', buttonText: { displayText: 'Kembali' }, type: 1 },
        { buttonId: 'contact', buttonText: { displayText: 'Kontak Owner' }, type: 1 }
    ];
    
    const buttonMessage = {
        contentText: `🤖 *Informasi Bot*\n\nOwner: ${config.owner}\nVersi: 1.0.0\nDeskripsi: ${config.description}`,
        footerText: "Pilih opsi di bawah",
        buttons: buttons,
        headerType: 1
    };
    
    await client.sendMessage(msg.from, buttonMessage);
};

exports.showGroupMenu = async (client, msg) => {
    const buttons = [
        { buttonId: 'tagall', buttonText: { displayText: 'Tag All' }, type: 1 },
        { buttonId: 'kick', buttonText: { displayText: 'Kick Member' }, type: 1 },
        { buttonId: 'promote', buttonText: { displayText: 'Promote' }, type: 1 },
        { buttonId: 'back', buttonText: { displayText: 'Kembali' }, type: 1 }
    ];
    
    const buttonMessage = {
        contentText: "👥 *Fitur Grup*\n\nPilih fitur grup di bawah:",
        footerText: "Hanya bisa digunakan di grup",
        buttons: buttons,
        headerType: 1
    };
    
    await client.sendMessage(msg.from, buttonMessage);
};

exports.showToolsMenu = async (client, msg) => {
    const buttons = [
        { buttonId: 'sticker', buttonText: { displayText: 'Sticker Maker' }, type: 1 },
        { buttonId: 'toimg', buttonText: { displayText: 'To Image' }, type: 1 },
        { buttonId: 'tomp3', buttonText: { displayText: 'To MP3' }, type: 1 },
        { buttonId: 'back', buttonText: { displayText: 'Kembali' }, type: 1 }
    ];
    
    const buttonMessage = {
        contentText: "🔧 *Tools*\n\nPilih tools di bawah:",
        footerText: "Beberapa tools mungkin memerlukan waktu",
        buttons: buttons,
        headerType: 1
    };
    
    await client.sendMessage(msg.from, buttonMessage);
};
