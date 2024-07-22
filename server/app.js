import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, {static as expressStatic, json, urlencoded} from 'express'
import helmet from 'helmet'
import createError from 'http-errors'
import logger from 'morgan'

const filename = fileURLToPath(import.meta.url)
const dir = dirname(filename)

import indexRouter from './routes/index.js'
import marketplaceRouter from './routes/marketplace.tsx'

const app = express()
// Use Helmet to set CSP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          'https://ajax.googleapis.com',
          'https://maxcdn.bootstrapcdn.com',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://images.salsify.com',
          'https://s3.distributorcentral.com',
          'https://media.snugzusa.com',
          'https://assets.pcna.com',
          'https://www.hitpromo.net',
          'https://belusaweb.s3.amazonaws.com',
          'https://etsexpress.com',
          'https://www.terrytown.com',
          'https://blobstorage.kooziegroup.com',
          'https://hirschpromo.com',
          'https://s7d7.scene7.com',
          'https://logomark.com',
          'https://d2b9vjwb3yw5iu.cloudfront.net',
          'https://s3.wasabisys.com',
          'https://rainingrosepromos.blob.core.windows.net',
          'https://cdn.ssactivewear.com',
          'https://cdnm.sanmar.com',
          'https://www.alphabroder.com',
          'https://d207zvy2rsg5b5.cloudfront.net',
          'https://kgstorageprod.blob.core.windows.net', // Add the new domain here
        ],
      },
    },
  })
)

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())
app.use(expressStatic(join(dir, 'public')))
console.log('fooo', join(dir, 'public'))
app.use('/', indexRouter)
app.use('/marketplace', marketplaceRouter)
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
