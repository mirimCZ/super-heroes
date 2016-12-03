/* @flow */
import compression from 'compression'
import express from 'express'
import main from './main'

const app = express()

app.use(compression())
app.use('/assets', express.static('target/web', { maxAge: '200d' }))
app.get('*', main)

export default app
