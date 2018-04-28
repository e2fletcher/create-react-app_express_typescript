import { Router } from 'express'
import heroesController from '../controllers/heroes.controller'

const router = Router()

router.get('/', heroesController.index)
router.post('/', heroesController.store)
router.get('/:id', heroesController.show)
router.delete('/:id', heroesController.destroy)

export default router
