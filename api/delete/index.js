const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../DB/db')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const dbID = await ctx.request.body.id
  const item = await deleteByID(dbID)
  ctx.body = item
})

async function deleteByID(dbID) {
  try {
    const itemData = await pool.query(`DELETE FROM todo.todoList
    WHERE todoID = ${dbID};`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
