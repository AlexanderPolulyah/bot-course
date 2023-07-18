const TelegramApi = require('node-telegram-bot-api')
const { againOptions, gameOptions } = require('./options')
const { startServer } = require('./vercel')
// import * as vercel from './vercel'
const token = '6078332961:AAG9UfDnA0AksmKcHz2vSO3CUoi0J8_H-a4'

const bot = new TelegramApi(token, {polling: true})

let chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты отгадай')
    const randomNumber = Math.ceil(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const startBot = async () => {
    await bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра "Угадай цифру"'},
    ])

    await bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
    
        switch(text) {
            case '/start':
                await bot.sendSticker(chatId,'https://t.me/TgSticker/31424')
                return bot.sendMessage(chatId, `Добро пожаловать!`)
            case '/info':
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
            case '/game':
                return startGame(chatId)
            default:
                return bot.sendMessage(chatId, `Я тебя не понимаю`)
                // return bot.sendMessage(chatId, `Ты написал мне ${text}`)
    
        }
        // console.log(msg)
    })

    await bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === '/again') {
            return startGame(chatId)
        }
        if(chats[chatId] == data) {
            bot.sendMessage(chatId, `Ты угадал!`, againOptions)
        } else {
            bot.sendMessage(chatId, `Ты НЕ угадал, бот задумал цифру ${chats[chatId]}...`, againOptions)
        }
        // bot.sendMessage(chatId, `Ты выбрал цифру ${data} и ${chats[chatId] == data ? 'угадал' : 'не угадал'}`)
        // console.log(msg)
    })
    console.log('бот запущен')
}

console.log('запуск бота...')
startBot()
startServer(bot)
