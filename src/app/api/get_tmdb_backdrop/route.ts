import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

import { startDate } from '~/lib/utils/const';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_KEY}`
  }
};

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const file = '/tmdb_ids.csv';
    const fileMovies = '/games.csv';

    const fileDirectory = path.join(process.cwd(), 'public');
    const fileContent = await fs.readFile(fileDirectory + file, 'utf8');
    const fileMoviesContent = await fs.readFile(fileDirectory + fileMovies, 'utf8');

    const ids = fileContent.split(/\r\n|\n/);
    const movies = fileMoviesContent.split(/\r\n|\n/);

    const movieNumber = movies.length;
    // console.log(movies);
    // console.log(diffDays)
    // console.log(movies);

    const today = new Date();
    const diffMs = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const index = (data.gameNumber-1) % movieNumber;

    if (data.gameNumber > diffDays+1){
      return NextResponse.json(
        { message: 'Future games not allowed' },
        { status: 500 }
      );
    }

    let url = `https://api.themoviedb.org/3/movie/${ids[index]}/images`;

    let tmdbApiData = await fetch(url, options);
    let tmdbJson = await tmdbApiData.json();

    return NextResponse.json(
      // { game: movies[data.gameNumber - 1], number: data.gameNumber },
      { tmdbId: ids[index], number: data.gameNumber, tmdbData: tmdbJson.backdrops },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
