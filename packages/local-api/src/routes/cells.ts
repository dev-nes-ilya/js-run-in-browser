import express, { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text'
}

const createCellsRouter = (filename: string, dir: string) => {
  const router = Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const results = await fs.readFile(fullPath, { encoding: 'utf-8' })
      return res.send(results);
    } catch (error) {
      if (error.code === 'ENOENT') {
        const newFile = await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send(newFile);
      } else {
        return res.status(404);
      }
    }

  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    try {
      await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')
    } catch (error) {
      return res.status(404);
    }

    return res.status(200);
  });

  return router;
}

export default createCellsRouter