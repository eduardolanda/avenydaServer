const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../../DB/db')
const cors = require('@koa/cors');

const app = new Koa()
let options = {
  origin:"*"
};
app.use(cors(options));
app.use(bodyParser())


app.use(async ctx => {
  // const dbtitle = await ctx.request.body.title
  const item = await show()
  ctx.body = item
})

async function show() {
  try {
    const itemData = await pool.query(`SELECT * FROM avenyda.Vehicle WHERE owner_id=1`)
    return itemData
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()

