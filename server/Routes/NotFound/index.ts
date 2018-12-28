import { Router } from "express";

const router = Router();

router.use((req, res) => {
  res.status(404).json({
    err: "Такой ссылки у нас нет"
  });
});

export default router;
