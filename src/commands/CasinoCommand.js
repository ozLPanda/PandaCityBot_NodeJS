import Command from '../../engine/commonClasses/Command.js'
import { Helper } from '../functions/commonFunctions.js'
import inlineButtons from '../../engine/commonClasses/InlineButtons.js'
import LoginMiddleware from '../middleware/LoginMiddleware.js'

export default class CasinoCommand extends Command {
  constructor(bot) {
    super(['💎Казино', 'казино'], async (msg) => {
      const args = msg.text.split(' ')
      const user = await bot.getUser(msg)
      let bet = 0

      try {
        if (args[1].toLowerCase().indexOf('к') > -1) {
          const _countK = (
            args[1]
              .substring(args[1].toLowerCase().indexOf('к'), args[1].length)
              .match(new RegExp('к', 'g')) || []
          ).length
          bet = Number(args[1].substring(0, args[1].toLowerCase().indexOf('к')))
          for (let i = 0; i < _countK; i++) bet *= 1000
        } else {
          bet = Number(args[1])
        }
      } catch (ex) {
        bet = null
      }

      if (!user.use_casino) {
        await this.showRulesMessage(bot, msg)
        return
      }

      if (args.length != 2 || bet == null) {
        if (user.money === 0) {
          await bot.sendMessage(msg.chat.id, 'Быстрых предложений для ставок нет, ваш баланс 0')
          return
        }

        await bot.sendMessage(
          msg.chat.id,
          'Вот несколько быстрых предложений',
          this.selectBets(user.money)
        )
        return
      }

      await sendBet(bot, msg, user, bet)
    })
    this.middlewares.push(new LoginMiddleware(bot))
  }

  // Подбор подходящих ставок, для текущего баланса
  selectBets(money) {
    return new inlineButtons([
      {
        text: `${Helper.math.formatPrice(Math.round(money * 1))} (100%)`,
        callback_data: `casino.bet/${Math.round(money * 1)}`
      },
      {
        text: `${Helper.math.formatPrice(Math.round(money * 0.8))} (80%)`,
        callback_data: `casino.bet/${Math.round(money * 0.8)}`
      },
      {
        text: `${Helper.math.formatPrice(Math.round(money * 0.65))} (65%)`,
        callback_data: `casino.bet/${Math.round(money * 0.65)}`
      },
      {
        text: `${Helper.math.formatPrice(Math.round(money * 0.5))} (50%)`,
        callback_data: `casino.bet/${Math.round(money * 0.5)}`
      },
      {
        text: `${Helper.math.formatPrice(Math.round(money * 0.35))} (35%)`,
        callback_data: `casino.bet/${Math.round(money * 0.35)}`
      },
      {
        text: `${Helper.math.formatPrice(Math.round(money * 0.15))} (15%)`,
        callback_data: `casino.bet/${Math.round(money * 0.15)}`
      },
      {
        text: `${Helper.math.formatPrice(Math.round(money * 0.1))} (10%)`,
        callback_data: `casino.bet/${Math.round(money * 0.1)}`
      }
    ])
  }

  async showRulesMessage(bot, msg) {
    await bot.sendMessage(
      msg.chat.id,
      `Этот раздел исключительно для развлекательных целей, вся волюта является игровой и никак не связанна с реальным миром.
Чтобы начать играть в это виртуальное казино необходимо использовать "Казино {сумма}", если хотите сыграть на определённую сумму.
Команда поддерживает "к"
Например:
10к = 10 000
10кк = 10 000 000
10ккк = 10 000 000 000
Также можно использовать готовые суммы которые предлагает вам система.
Для игры в казино необходимо подтвердить что вы прочитали это сообщение и согласны играть в виртуальное казино.`,
      new inlineButtons([
        {
          text: `Прочитал, согласен`,
          callback_data: `access.casino.rules`
        }
      ])
    )
  }
}

function getChanse() {
  const probabilities = {
    0: 0.2,
    0.25: 0.25,
    0.5: 0.2,
    0.75: 0.15,
    1: 0.1,
    1.5: 0.05,
    2: 0.03,
    5: 0.02
  }

  const randomValue = Math.random()

  let cumulativeProbability = 0
  for (const multiplier in probabilities) {
    cumulativeProbability += probabilities[multiplier]
    if (randomValue <= cumulativeProbability) {
      return Number(multiplier)
    }
  }
}

export async function sendBet(bot, msg, user, bet) {
  if (user.money < bet) {
    await bot.sendMessage(msg.chat.id, 'У вас недостаточно средств для игры такой ставкой')
    return
  }

  const chance = getChanse()
  const winning = bet * chance

  if (chance >= 1) {
    user.money += Math.ceil(winning)
    await user.save()

    await bot.sendMessage(
      msg.chat.id,
      `Вы выиграли ${chance}x 🤑\nСумма: ${Helper.math.formatPrice(Math.ceil(winning))}🎉`
    )
  } else {
    user.money -= bet - Math.floor(winning)
    await user.save()

    await bot.sendMessage(
      msg.chat.id,
      `Вы проиграли ${chance}x 😔\nСумма: ${Helper.math.formatPrice(Math.floor(winning))}`
    )
  }
}
