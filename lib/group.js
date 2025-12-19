module.exports = {
  tagall: async (sock, from, isGroup) => {
    if (!isGroup) {
      return sock.sendMessage(from, { text: '❌ Fitur hanya untuk grup' })
    }

    const metadata = await sock.groupMetadata(from)
    let text = '📣 *TAG ALL MEMBER*\n\n'
    let mentions = []

    metadata.participants.forEach(p => {
      mentions.push(p.id)
      text += `@${p.id.split('@')[0]}\n`
    })

    await sock.sendMessage(from, { text, mentions })
  },

  close: async (sock, from, isGroup) => {
    if (!isGroup) return
    await sock.groupSettingUpdate(from, 'announcement')
    await sock.sendMessage(from, { text: '🔒 Grup ditutup (admin only)' })
  }
}
