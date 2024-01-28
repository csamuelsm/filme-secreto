import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { getMostSimilarTags } from '~/lib/utils/similarity';
import { getHints } from '~/lib/utils/similarity';
import { top5search } from '~/lib/utils/similarity';

type Payload = {
    value: string
}

/*export const GET = async (req: Request) => {
    const file = '/sortedW2V.json';
    const fileDirectory = path.join(process.cwd(), 'public');

    const data = await fs.readFile(fileDirectory + file, 'utf8');
    const w2vdata = JSON.parse(data);

    let top5 = top5search(w2vdata, "Titanic (1997)");
    return NextResponse.json({ req: top5 }, { status: 200 });
}*/

export const POST = async (req: Request) => {
    const guessData = await req.json();

    const file = '/sortedW2V.json';
    const fileDirectory = path.join(process.cwd(), 'public');

    const data = await fs.readFile(fileDirectory + file, 'utf8');
    const w2vdata = JSON.parse(data);
    //console.log(data);
    try {
        const target = guessData['target'];
        //console.log(target, guess);

        let top5 = top5search(w2vdata, target);

        return NextResponse.json({ req: top5 }, { status: 200 });
    } catch (err) {
        console.log('Erro', err);
        return NextResponse.json({ message: err }, { status: 200 });
    }
};
