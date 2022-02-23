var express = require('express');
var router = express.Router();
var { Message } = require('./../database/models')

Message = new Message()

router.get('/messages', async function({ res }) {
    try {
        let { rows } = await Message.findAll()
        console.log('messages', rows)
        res.status(200).json({ success: true, rows })
    } catch(e) {
        res.status(201).json({ success: false  })
        console.log('error:', e)
    }
})

router.post('/message', async function(req, res, next) {
    try {
        let { nama, pesan } = req.body
        data = { nama, pesan }
        req.io.emit('message:sent', { data })
        let rows = await Message.insert({ data: data })
        res.status(200).json({ success: true, data, body: req.body, result: rows })
    } catch (e) {
        res.status(201).json({ success: false })
        console.log('error:', e)
    }
})

module.exports = router;
