const { app } = require("./server.js")

const port = 3001

app.listen(port, () => console.log(`api listening on port ${port}`))
