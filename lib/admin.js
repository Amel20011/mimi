module.exports = {
  contact: async (sock, from, config) => {
    await sock.sendMessage(from, {
      text: '📞 *Hubungi Admin*',
      footer: config.botName,
      buttons: [
        {
          buttonId: 'owner',
          buttonText: { displayText: '📞 Hubungi Admin' },
          type: 1
        }
      ],
      headerType: 1
    })
  }
}
