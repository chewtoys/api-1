import { Router } from "express"
import path from "path"
import API from '../../API'

const router = Router()

router.all('/api/:classname.:method', async (req, res, next) => {
  let classname = req.params.classname[0].toUpperCase() + req.params.classname.slice(1)
  let method = req.params.method
  let params = req.query

  try {
    res.json(await API.call({classname, method, params}))
  } catch (e) {
    res.json({
      result: false,
      error_text: e.message,
      error_stack: e.stack
    })
  }
})

router.get('*', (req, res, next) => {
    // console.log(process.cwd())
    res.sendFile(path.resolve(process.cwd(), "static/desktop/index.html"));
})

export default router