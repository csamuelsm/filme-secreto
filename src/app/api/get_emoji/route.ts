import { NextResponse } from 'next/server';
import path from 'path';
import {promises as fs} from 'fs';
import { startDate } from '~/lib/utils/const';

type Payload = {
    gameNumber: number
}

export const POST = async (req: Request) => {
    const data = await req.json();
    try {
        const file = '/emojis.csv';
        const fileDirectory = path.join(process.cwd(), 'public');
        const fileContent = await fs.readFile(fileDirectory + file, 'utf8');
        const movies = fileContent.split(/\r\n|\n/);
        //console.log(movies);
        //console.log(diffDays)
        //console.log(movies);
        const today = new Date();
        let diffMs = today.getTime() - startDate.getTime();
        let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (data.gameNumber > diffDays+1) return NextResponse.json({ message: "Future games not allowed" }, { status: 500 });
        else return NextResponse.json({ emojis: movies[data.gameNumber-1], number: data.gameNumber }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};
