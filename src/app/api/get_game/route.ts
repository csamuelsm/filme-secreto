import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

import { startDate } from '~/lib/utils/const';

export const GET = async (req: Request) => {
  try {
    const file = '/games.csv';
    const fileDirectory = path.join(process.cwd(), 'public');
    const fileContent = await fs.readFile(fileDirectory + file, 'utf8');
    const movies = fileContent.split(/\r\n|\n/);
    const movieNumber = movies.length;
    // console.log(movies);
    const today = new Date();
    const diffMs = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const index = diffDays % movieNumber;
    // console.log(diffDays)
    return NextResponse.json(
      { game: movies[index], number: diffDays + 1 },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const file = '/games.csv';
    const fileDirectory = path.join(process.cwd(), 'public');
    const fileContent = await fs.readFile(fileDirectory + file, 'utf8');
    const movies = fileContent.split(/\r\n|\n/);
    const movieNumber = movies.length;
    // console.log(movies);
    // console.log(diffDays)
    // console.log(movies);
    const today = new Date();
    const diffMs = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const index = data.gameNumber % movieNumber;
    if (data.gameNumber > diffDays)
      return NextResponse.json(
        { message: 'Future games not allowed' },
        { status: 500 }
      );
    return NextResponse.json(
      //{ game: movies[data.gameNumber - 1], number: data.gameNumber },
      { game: movies[index], number: data.gameNumber },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
