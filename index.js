require('dotenv').config()
const express = require('express')
const paypal = require('./services/paypal')
const app = express()

app.set('view engine', 'ejs')

app.get('/', ( req, res ) => {
    res.render('index')
})

app.post('/pay', async(req, res) => {
    try {
        const url = await paypal.createOrder()
        res.redirect(url)

    } catch (error) {
        res.send('problem: '+error)
    }
})

app.get('/complete-order', async ( req, res ) => {
    
    try {
        await paypal.capturePayment(req.query.token)
        res.send('course purchase went very well')
        
    } catch (error) {
        res.send('small problem: ' + error)
    }
    
})

app.get('/cancel-order', ( req, res ) => {
    res.redirect('/')
})

app.listen(7000, () => console.log('server started on port 3k'))