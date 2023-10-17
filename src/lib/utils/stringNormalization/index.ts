let regex = new RegExp(/ De| A| O| Que| E| Do| Da| Em| Um| Para| É| Com| Não| Uma| Os| No| Se| Na| Por| Mais| As| Dos| Como| Mas| Foi| Ao| Ele| Das| Tem| À| Seu| Sua| Ou| Ser| Quando| Muito| Há| Nos| Já| Está| Também| Só| Pelo| Pela| Até| Isso| Ela| Entre| Era| Depois| Sem| Mesmo| Aos| Ter| Seus| Quem| Nas| Me| Esse| Eles| Estão| Você| Tinha| Foram| Essa| Num| Nem| Suas| Meus| Às| Minha| Tem| Têm| Numa| Pelos| Elas| Havia| Seja| Qual| Será| Nós| Tenho| Lhe| Deles| Essas| Esses| Pelas| Este| Fosse| Dele| Tu| Te| Vocês| Vos| Lhes| Meus| Minhas| Teu| Tua| Teus| Tuas| Nosso| Nossa| Nossos| Nossas| Dela| Delas| Esta| Estes| Estas| Aquele| Aquela| Aqueles| Aquelas| Isto| Aquilo| Estou| Está| Estamos| Estão| Estive| Esteve| Estivemos| Estiveram| Estava| Estávamos| Estavam| Estivera| Estivéramos| Esteja| Estejamos| Estejam| Estivesse| Estivéssemos| Estivessem| Estiver| Estivermos| Estiverem| Hei| Há| Havemos| Hão| Houve| Houvemos| Houvera| Houvéramos| Haja| Hajamos| Hajam| Houvesse| Houvéssemos| Houvessem| Houver| Houvermos| Houverem| Houverei| E| Houverá| Houveremos| Houverem| Houverei| Houveremos| Houverão| Houveria| Houveríamos| Houveram| Sou| Somos| São| Era| Éramos| Eram| Fui| Foi| Fomos| Foram| Fora| Seja| Sejamos| Sejam| Fosse| Fôssemos| Fossem| For| Formos| Forem| Serei| Será| Seremos| Serão| Seria| Seríamos| Seriam| Tenho| Tem| Temos| Tém| Tinha| Tínhamos| Tinham| Tive| Teve| Tivemos| Tivera| Tivéramos| Tiveram| Tenha| Tenhamos| Tenham| Tivesse| Tivéssemos| Tivessem| Tiver| Tivermos| Tiverem| Terei| Terá| Teremos| Terão| Teria| Teríamos| Teriam/, 'g');
let reduced_regex = new RegExp(/ A | E | I | O | U | De | Em | Por | Ao | Do | No | Pelo | Da | Na | Pela | Os | Aos | Dos | Nos | Pelos | As | À | Às | Das | Nas | Pelas | Um | Dum | Num | Uma | Duma | Numa | Uns | Duns | Nuns | Umas | Dumas | Numas | Ante | Após | Até | Com | Conforme | Contra | Consoante | De | Desde | Durante | Em | Exceto | Entre | Mediante | Para | Perante | Pôr | Sem | Sob | Sobre | Trás /, 'g');

export function toTitleCase(word:string) {
    return word.toLowerCase().split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
}

export function normalizeString(word:string) {
    let title = toTitleCase(word);
    let modified = title.replaceAll(regex, function(match) {
        return match.toLowerCase();
    })
    return modified.charAt(0).toUpperCase() + modified.slice(1);
}

export function reducedNormalize(word:string) {
    let title = toTitleCase(word);
    let modified = title.replaceAll(reduced_regex, function(match) {
        return match.toLowerCase();
    })
    return modified.charAt(0).toUpperCase() + modified.slice(1);
}