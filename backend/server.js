const app = require('./index');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`)
})