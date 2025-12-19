const config = require('../config');

exports.tagAll = async (client, msg) => {
    const chat = await msg.getChat();
    let text = "📢 *Tag All*\n\n";
    let mentions = [];
    
    for (let participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized);
        mentions.push(contact);
        text += `@${participant.id.user}\n`;
    }
    
    await chat.sendMessage(text, { mentions });
};

exports.kickMember = async (client, msg) => {
    const chat = await msg.getChat();
    const mentionedJidList = msg.mentionedJidList;
    
    if (mentionedJidList.length === 0) {
        const buttons = [
            { buttonId: 'tagall', buttonText: { displayText: 'Tag Member' }, type: 1 },
            { buttonId: 'cancel', buttonText: { displayText: 'Batal' }, type: 1 }
        ];
        
        const buttonMessage = {
            contentText: "❌ *Kick Member*\n\nTag member yang akan di kick:",
            footerText: "Pilih opsi di bawah",
            buttons: buttons,
            headerType: 1
        };
        
        await client.sendMessage(msg.from, buttonMessage);
        return;
    }
    
    for (let jid of mentionedJidList) {
        await chat.removeParticipant(jid);
    }
    
    await client.sendMessage(msg.from, "✅ Member berhasil di kick!");
};

exports.promoteMember = async (client, msg) => {
    const chat = await msg.getChat();
    const mentionedJidList = msg.mentionedJidList;
    
    if (mentionedJidList.length === 0) {
        const buttons = [
            { buttonId: 'tagall', buttonText: { displayText: 'Tag Member' }, type: 1 },
            { buttonId: 'cancel', buttonText: { displayText: 'Batal' }, type: 1 }
        ];
        
        const buttonMessage = {
            contentText: "⭐ *Promote Member*\n\nTag member yang akan di promote:",
            footerText: "Pilih opsi di bawah",
            buttons: buttons,
            headerType: 1
        };
        
        await client.sendMessage(msg.from, buttonMessage);
        return;
    }
    
    for (let jid of mentionedJidList) {
        await chat.promoteParticipant(jid);
    }
    
    await client.sendMessage(msg.from, "⭐ Member berhasil di promote!");
};
