const express = require('express')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const app = express()
const path = require('path')
const { PORT = 3000 } = process.env

/*
https://developers.facebook.com/docs/instagram-basic-display-api/getting-started#valid-oauth-redirect-uris
*/

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'public','auth.html'))
})

app.get("/app/", (req, res) => {
    const {access_token} = req.body
    console.log("/app/ gets", access_token, req.body)
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.get("/auth/", (req, res) => {
    console.log('params', req.params)
    console.log('body', req.body)
    const {code} = req.params
    const body = new URLSearchParams()
    body.append('client_id', 2637301779709157)
    body.append('client_secret', process.env.INSTAGRAM_SECRET)
    body.append('grant_type', 'authorization_code')
    body.append('redirect_uri', 'https://bernards-photos.herokuapp.com/auth/')
    body.append('code', code)
    fetch(`https://api.instagram.com/oauth/access_token`, { method: 'POST', body})
    .then(res => res.json())
    .then(instagram => {
        res.send(`OK we have an access token: ${instagram.access_token}`)
    })
    .catch(err => {
        res.send(JSON.stringify(err, null, 4))
    })
})

app.listen(PORT, () => console.log(`Instagram intergration ready on port ${PORT} 🎉`))