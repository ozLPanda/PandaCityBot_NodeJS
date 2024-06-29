export default class inlineButtons {
  constructor(buttons) {
    let inlineKeyboards = []

    buttons.forEach((el) => {
      if (el.row) {
        let id_row = el.row - 1
        let row = inlineKeyboards[id_row]
        delete el.row

        if (!row) inlineKeyboards[id_row] = []

        inlineKeyboards[id_row].push(el)
      } else {
        inlineKeyboards.push([el])
      }
    })

    return {
      reply_markup: {
        inline_keyboard: inlineKeyboards
      }
    }
  }
}