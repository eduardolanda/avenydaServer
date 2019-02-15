const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../DB/db')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const dbItem = await ctx.request.body.item
  const dbDueBy = await ctx.request.body.by
  const item = await post(dbItem,dbDueBy)
  ctx.body = item
})

async function post(dbItem,dbDueBy) {
  try {
    const itemData = await pool.query(`INSERT INTO todo.todoList (todoDateAdded,todoDueBy,todoItem)
    VALUES ( NOW(), DATE '${dbDueBy}', "${dbItem}" );`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
