import { RequestHandler } from 'express'
import HeroModel from '../db/models/hero.model'

export default abstract class HeroesController {

  static index: RequestHandler = (req, res, next) => {
    const heroModel = HeroModel()
    heroModel.all().then((result) => {
      res.send(result)
    })
  }

  static show: RequestHandler = async (req, res, next) => {
    const heroModel = HeroModel()
    const hero = await heroModel.findById(req.params.id)
    if (hero) {
      console.log('Hero: ', hero.toJSON())
      res.send(hero)
    } else {
      res.status(404).end()
    }
  }

  static store: RequestHandler = async (req, res) => {
    const heroModel = HeroModel()
    try {
      await heroModel.create(req.body)
      console.log('Hero add: ', req.body)
      res.status(200).end()
    } catch (e) {
      res.status(401).end()
    }
  }

  static destroy: RequestHandler = async (req, res) => {
    const hero = await HeroModel().findById(req.params.id)
    if (hero) {
      console.log('Deleted hero: ', hero.name)
      await hero.destroy()
      res.end()
    } else {
      res.status(404).end()
    }
  }
}
