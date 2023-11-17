type wordObjectType = {
    word: string,
    vector: number[],
}

const findFirstDiff = (str1: string, str2: string) =>
  str2[[...str1].findIndex((el, index) => el !== str2[index])];

export default function binarySearch(wordsObject:wordObjectType[], word:string) {
    //console.log('looking for word', word);
    //console.log('wordsObject length', wordsObject.length);
    let start = 0;
    let end = wordsObject.length - 1;
    let res = binSearchUtil(wordsObject, word, start, end);
    //console.log('res', res);
    return res;
}

function binSearchUtil(wordsObject:wordObjectType[], word:string, start:number, end:number) {
    if (start > end) return -1;

    let mid = Math.floor((start + end)/2);

    //console.log(mid, wordsObject[mid].word)

    if (wordsObject[mid].word.trim() === word.trim()) return wordsObject[mid];
    //else console.log(wordsObject[mid].word.trim() === word.trim(), wordsObject[mid].word, '!===', word, 'at: ', findFirstDiff(word, wordsObject[mid].word));

    if (wordsObject[mid].word > word)
        return binSearchUtil(wordsObject, word, start, mid-1);
    else
        return binSearchUtil(wordsObject, word, mid+1, end);
}