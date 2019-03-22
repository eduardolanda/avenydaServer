const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../../DB/db')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  // const dbtitle = await ctx.request.body.title
  const item = await show()

  var i;
  for(i=0; i<=item.length; i++) {
    ctx.body = item[i];
  }
//   var b = 'item[0]';
//         var a = new Date(b);
//         var days = new Array(7);
//         days[0] = "Sunday";
//         days[1] = "Monday";
//         days[2] = "Tuesday";
//         days[3] = "Wednesday";
//         days[4] = "Thursday";
//         days[5] = "Friday";
//         days[6] = "Saturday";
//         var r = days[a.getDay()];
//         ctx.body = r;


})

async function show() {
  try {
    const itemData = await pool.query('SELECT `active` FROM avenyda.Reservation')
    return itemData;
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
