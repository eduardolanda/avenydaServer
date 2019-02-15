const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../DB/db')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const dbID = await ctx.request.body.id
  const dbStatus = await ctx.request.body.status
  const item = await updateStatus(dbID,dbStatus)
  ctx.body = item
})

async function updateStatus(dbID,dbStatus) {
  try {
    const itemData = await pool.query(`UPDATE todo.todoList
    SET todoStatus = ${dbStatus}
    WHERE todoID = ${dbID};`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
