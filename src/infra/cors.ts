import cors from 'cors';

export const corsOptions = {
  origin: [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    'https://atom-fe-challenge.onrender.com',
  ],
  credentials: true,
};

export default cors(corsOptions);
