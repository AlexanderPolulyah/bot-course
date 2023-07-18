//для работы бота под платформой Vercel
const express = require('express');
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();

app.use(express.json());

function setWebHook(host) {
    // alert('host:', host)
    // bot.setWebHook(host,)
}

function startServer(bot) {
    app.get(`/hello`, (req, res) => {
        // bot.handleUpdate(req.body, res);
        // bot.setWebHook()
        // console.log('req', req.body)
        res.status(200).json('Сервер работает!')
        // res = 'я вас вижу'
        // return res
    });
    
    app.post(`/runHook`, urlencodedParser, (req, res) => {
        // bot.handleUpdate(req.body, res);
        // console.log('req', req.body.host2)
        console.log('req', req?.body?.host3)
        // console.log('bot', bot)
        if(req.body.host3) {
            bot.setWebHook(req.body.host3 + '/' + bot.token )
            res.status(200).json(`Сервер hook работает! (${req?.body?.host3})`)
        } else {
            res.status(200).json(`Сервер hook неоткуда установить!`)
        }
    });
    
    app.listen(3000, () => {
        console.log('Webhook запущен');
    });    
}

module.exports = {startServer}
