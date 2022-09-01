const customExpress = require("./config/customExpress")

const app = customExpress()

app.listen(8080, () => {console.log('listening in 8080')})