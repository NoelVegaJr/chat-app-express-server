import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
  })
);

const prisma = new PrismaClient();

app.post('/api/namespaces', async (req: Request, res: Response) => {
  const { name } = req.body;
  const namespace = await prisma.namespace.create({ data: { name: name } });
  res.json(namespace);
});

app.get('/api/namespaces', async (req: Request, res: Response) => {
  console.log('Getting namespaces');
  const allNamespaces = await prisma.namespace.findMany();
  console.log(allNamespaces);
  res.json(allNamespaces);
});

app.post('/api/rooms', async (req: Request, res: Response) => {
  const { namespaceId, name } = req.body;
  console.log(name);

  const room = await prisma.room.create({
    data: { namespaceId: namespaceId, name: name },
  });
  res.json(room);
});

app.listen(9000, () => {
  console.log(`🚀 Server ready at http://localhost:${9000}`);
});
