import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get('/set-cookie', (req, res) => {
  // res.setHeader('set-cookie', 'foo=bar');
  res.cookie('foo', 'bar', {
    // masAge: 5000,
    // expires: new Date('26 July 2021'),
    httpOnly: true,
    secure: true,
  });
  res.send('🍪 Cookies are set');
});

app.get('/get-cookie', (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

app.get('/del-cookie', (req, res) => {
  res.clearCookie('foo');
  res.send('Cookie has been deleted');
});

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
