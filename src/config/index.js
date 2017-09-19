import * as configDev from './config-dev'
import * as configProd from './config-prod'
import * as configTest from './config-test'
export const ENV = process.env.NODE_ENV

let configProps = null
if (ENV === 'development') {
  configProps = configDev
} else if (ENV === 'production') {
  configProps = configProd
} else if (ENV === 'testing') {
  configProps = configTest
}

export const props = configProps
