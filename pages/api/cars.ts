import { searchByTerm } from '@/services/data';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchTerm = req.query.search as string;

  const cars = await searchByTerm(searchTerm);

  res.status(200).json(cars);
}
