import * as Sequelize from 'sequelize'

export const init = (): Promise<Sequelize.Sequelize> => {
  return new Promise<Sequelize.Sequelize>((resolve, reject) => {
    const { DB_DRIVER, DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env
    if (DB_DATABASE && DB_DRIVER && DB_HOST && DB_PORT && DB_USERNAME && DB_PASSWORD) {
      global.sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
        dialect: DB_DRIVER,
        host: DB_HOST,
        port: parseInt(DB_PORT),
      })

      global.sequelize.authenticate()
        .then(() => {
          console.log('Connected with ragnarok db!')
          resolve(global.sequelize)
        })
        .catch((err) => {
          reject(err)
        })
    } else {
      reject('Missing bd parameters in .env')
    }
  })
}
