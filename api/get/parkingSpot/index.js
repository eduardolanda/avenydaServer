const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../../DB/db')

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  // const dbtitle = await ctx.request.body.title
  const item = await show()
  ctx.body = item
})

async function show() {
  try {
    const itemData = await pool.query(`SELECT * FROM avenyda.ParkingSpot`)
    return itemData
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
