const express = require('express')
const app = express()
const { PORT = 3000 } = process.env

app.get("/", (req, res) => {
    res.send("Hello You")
})

app.listen(PORT, () => console.log(`Instagram intergration ready on port ${PORT} 🎉`))