const config = require('../config');

exports.formatNumber = (number) => {
    // Format nomor WhatsApp
    if (!number.startsWith('62')) {
        if (number.startsWith('0')) {
            return '62' + number.slice(1) + '@c.us';
        } else if (number.startsWith('+')) {
            return '62' + number.slice(2) + '@c.us';
        }
    }
    return number + '@c.us';
};

exports.checkAdmin = async (client, msg) => {
    const chat = await msg.getChat();
    const sender = msg.author || msg.from;
    
    const participant = chat.participants.find(p => p.id._serialized === sender);
    return participant && participant.isAdmin;
};

exports.checkOwner = async (client, msg) => {
    const sender = msg.author || msg.from;
    return sender === config.ownerNumber;
};

exports.getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

exports.getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
