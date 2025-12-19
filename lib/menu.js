module.exports = async (sock, from, config) => {
  const listMessage = {
    title: '≡ Lihat Menu',
    text: `🤖 *${config.botName}*\n\nPilih menu di bawah`,
    footer: 'Ketuk item untuk memilihnya',
    buttonText: 'OPEN MENU',
    sections: [
      {
        title: '💞 GROUP MENU ✨',
        rows: [
          { title: '🔗 Antilink', description: 'Antilink on/off', rowId: '.antilink' },
          { title: '👋 Welcome', description: 'Welcome on/off', rowId: '.welcome' },
          { title: '👋 Goodbye', description: 'Goodbye on/off', rowId: '.goodbye' },
          { title: '🔐 Group', description: 'Open / Close Group', rowId: '.group' },
          { title: '➕ Add', description: 'Tambah member', rowId: '.add' },
          { title: '➖ Kick', description: 'Kick member', rowId: '.kick' },
          { title: '⬆ Promote', description: 'Jadikan admin', rowId: '.promote' },
          { title: '⬇ Demote', description: 'Hapus admin', rowId: '.demote' },
          { title: '📣 Tagall', description: 'Tag semua member', rowId: '.tagall' }
        ]
      }
    ]
  }

  await sock.sendMessage(from, listMessage)
}
