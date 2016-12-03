/* @flow */
import compression from 'compression'
import express from 'express'
import main from './main'

const app = express()

app.use(compression())
app.use('/assets', express.static('build', { maxAge: '200d' }))
app.get('*', main)

export default app
