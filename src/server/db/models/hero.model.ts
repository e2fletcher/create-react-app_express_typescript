import * as Sequelize from 'sequelize'

export interface HeroAttributes extends Hero {
  archived?: boolean
  createdAt?: string
  updatedAt?: string
}

export type HeroInstance = Sequelize.Instance<HeroAttributes> & HeroAttributes

export default (seq: Sequelize.Sequelize | null = null) => {
  if (seq === null) {
    seq = global.sequelize
  }
  return seq.define<HeroInstance, HeroAttributes>('heroes', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    speed: Sequelize.SMALLINT,
    strong: Sequelize.SMALLINT,
    flay: Sequelize.BOOLEAN
  })
}

