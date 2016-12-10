/* @flow */
import compression from 'compression'
import express from 'express'
import main from './main'
import constants from '../../../constants'

const app = express()

app.use(compression())
app.use('/assets', express.static(constants.TARGET.browser, { maxAge: '200d' }))
app.get('*', main)

export default app
