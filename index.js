const express = require('express')
const fetch = require('node-fetch')
const app = express()
const { PORT = 3000 } = process.env

app.get("/", (req, res) => {
    res.redirect(`https://api.instagram.com/oauth/authorize
    ?client_id=2637301779709157
    &redirect_uri=http://instainter.herokuapp.com/auth
    &scope=user_profile,user_media
    &response_type=code`)
})

app.get("/auth", (req, res) => {
    const {code} = req.query
    fetch(`https://api.instagram.com/oauth/access_token`, {
        method: 'POST',
        body: JSON.stringify({
            client_id: 2637301779709157,
            client_secret: process.env.INSTAGRAM_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: 'http://instainter.herokuapp.com/app',
            code: code
        })
    })
    .then(res => res.json())
    .then(instagram => {
        res.send(`OK we have an access token: ${instagram.access_token}`)
    })
})

app.listen(PORT, () => console.log(`Instagram intergration ready on port ${PORT} 🎉`))