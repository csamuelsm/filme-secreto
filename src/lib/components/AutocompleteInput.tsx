import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Input, Flex, Text, Popover, PopoverAnchor, PopoverContent, PopoverBody, VStack, Box, StackDivider, Spinner, HStack, Button, Progress, ProgressLabel, Stack, useColorMode, useToast, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, Badge, Card, CardBody, Tooltip } from '@chakra-ui/react';
//import { getVectorsFromData } from '../utils';

//import { notFound } from 'next/navigation'

//import { buildSearch } from '../utils/search.ts';
//import { SearchResult } from '../utils/search.ts';

import binarySearch from '../utils/binarySearch';
//import { getVectorsFromData } from '../utils';
import Instructions from './Instructions';
import SimilarTags from './SimilarTags';
import Hints from './Hints';
import PowerUps from './PowerUps';
import JSConfetti from 'js-confetti';
import Cookies from 'universal-cookie';

import { increaseNumberOfGames, increaseNumberOfVictories, setLastPlayed, lastPlayedToday, increaseStreak, alreadyPlayedThisGame, addGamePlayed } from '../utils/cookies';
//import { toTitleCase, normalizeString, reducedNormalize } from '../utils/stringNormalization';

import { motion } from 'framer-motion';
import GoogleSearchButton from './GoogleSearchButton';

var similarity = require( 'compute-cosine-similarity' );

type AutocompleteProps = {
    word: string,
    finishOpen: Dispatch<SetStateAction<boolean>>,
    setCanGiveUp: Dispatch<SetStateAction<boolean>>,
    gameNumber: number,
    oldGame: boolean,
    setBlue: Dispatch<SetStateAction<number>>,
    setGreen: Dispatch<SetStateAction<number>>,
    setYellow: Dispatch<SetStateAction<number>>,
    setRed: Dispatch<SetStateAction<number>>,
    blue: number,
    green: number,
    yellow:number,
    red: number,
}

function getColorScheme(sim:number) {
    if (sim == 100) {
        //TODO: end the game and show CONGRATS!
        return 'blue'
    }else if (sim >= 50) {
        return 'green';
    } else if (sim < 50 && sim >= 25) {
        return 'yellow';
    } else if (sim < 25) {
        return 'pink';
    }
}

function transformValue(sim:number, biggest_sim:number) {
    if (sim == 100) return sim;
    return 99*sim/biggest_sim;
}

function AutocompleteInput( props:AutocompleteProps ) {
  const [value, setValue] = useState<string>('');
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const inputRef = useRef(null);

  const [search, setSearch] = useState<React.JSX.Element[]>([]);
  const [searchData, setSearchData] = useState<string>('');
  const [searchList, setSearchList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'movies'|'organizing'|'vectors'|'word2vec'|null>(null);
  const [allWords, setAllWords] = useState(null);
  const [currWordData, setCurrWordData] = useState();
  const [guess, setGuess] = useState<string|null>(null);
  const [similarities, setSimilarities] = useState<{
    word:string,
    similarity:number
  }[]>([]);
  const [mostSimilar, setMostSimilar] = useState<number>(0);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const [allTags, setAllTags] = useState<string[]>([]);

  const cookies = new Cookies(props.gameNumber.toString(), { path: '/' });

  function increaseCorrespondingColor(val:number) {
    let color = getColorScheme(val);
    if (color == 'blue') props.setBlue(props.blue+1);
    else if (color == 'green') props.setGreen(props.green+1);
    else if (color == 'yellow') props.setYellow(props.yellow+1);
    else if (color == 'pink') props.setRed(props.red+1);
  }

  function winGame() {
    if (!props.oldGame)
        increaseStreak();
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
        confettiNumber: 100,
        confettiRadius: 4,
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸']
    })
    if (!props.oldGame && !lastPlayedToday()) {
        let today = new Date();
        setLastPlayed(today);
    }
    if (!alreadyPlayedThisGame(props.gameNumber)) {
        increaseNumberOfGames();
        addGamePlayed(props.gameNumber);
        increaseNumberOfVictories();
    }
    setTimeout(() => {
        props.finishOpen(true); // finishing
    }, 1000);
    props.setCanGiveUp(false);
  }

  useEffect(() => {
    // cookies do jogo
    if(cookies.get(props.gameNumber.toString())) {
        //console.log('cookies', cookies.get(props.gameNumber.toString()));
        setSimilarities(cookies.get(props.gameNumber.toString()));
    };
  }, []);

  useEffect(() => {
    if ((!props.oldGame && lastPlayedToday()) || (props.oldGame && alreadyPlayedThisGame(props.gameNumber))) {
        props.finishOpen(true);
    }
  }, []);

  useEffect(() => {
    setSearch([]);
    setIsLoading(true);
    const delaySearch = setTimeout(() => {
        if (value.length >= 2) {
            setPopoverOpen(true);
            var results = [];

            for (let i = 0; i < searchList.length; i++) {
                try {
                    let matches = searchList[i].toLowerCase()
                                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                    .indexOf(
                                        value.toLowerCase()
                                        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                    ) >= 0 ? true : false;
                    if (matches) {
                        results.push(
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                key={(Math.random() + 1).toString(36).substring(7)}
                                >
                                <Button variant='ghost' size="sm" onClick={() => {
                                    setValue('');
                                    setSearch([]);
                                    setGuess(searchList[i].trim().replaceAll('"', ''));
                                }}>
                                    <Text>{searchList[i].trim().replaceAll('"', '')}</Text>
                                </Button>
                            </Box>
                        );
                        setSearch(results);
                    }
                } catch(e) {
                    console.log((e as Error).message);
                    toast({
                        title: 'Perdão! Algum erro desconhecido aconteceu.',
                        description: 'Você pode reportar este erro enviando um feedback pelo menu.',
                        status: 'error',
                        isClosable: true,
                        duration: 4000
                    })
                }
            }

            setIsLoading(false);
        } else {
            setSearch([]);
            setPopoverOpen(false);
        }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [value]);

  useEffect(() => {
    async function getData() {
        setStatus('movies');
        const data = await fetch('/api/get_plain');
        const res = await data.json();
        setStatus('organizing');
        const searchData:string = res.req;

        setSearchList(searchData.split('\n'));
        //console.log(searchData.split('\n'));
        //console.log(searchData);
        setSearchData(searchData);
        //setStatus('vectors');

        // code to get the fetch the word2vec data
        /*const vectors = await fetch('/api/vectors');
        const vector_data = await vectors.json();
        //console.log(vector_data);
        const w2v = await getVectorsFromData(vector_data.vectors, 100);
        w2v.sort(function(a, b) {
            //@ts-ignore
            if (a.word < b.word) return -1;
            //@ts-ignore
            if (a.word > b.word) return 1;
            return 0;
        })
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(w2v));
        var downloadLink = document.createElement("a");
        downloadLink.innerHTML = "Download JSON";
        downloadLink.setAttribute("href", dataStr);
        downloadLink.setAttribute("download", "sortedW2V.json");
        downloadLink.click();*/
        // end of code to fetch the word2vec data

        setStatus('vectors');
        let vectorData = await fetch('/api/sortedVectors');
        let vectors = await vectorData.json();
        //console.log(vectors);
        setAllWords(vectors.vectors);
        let currWord = binarySearch(vectors.vectors, props.word);
        if (currWord !== -1) {
            //@ts-ignore
            setCurrWordData(currWord);
        }

        // finding the closest movie to the current

        let biggest_sim = -999;
        for (let i = 0; i < vectors.vectors.length; i++) {
            //@ts-ignore
            //console.log(vectors.vectors[i].vector, currWord.vector)
            //@ts-ignore
            let sim = similarity(vectors.vectors[i].vector, currWord.vector);
            //@ts-ignore
            if (sim > biggest_sim && sim < 99.999>)
                biggest_sim = sim
        }
        //console.log('biggest_sim', biggest_sim)
        setMostSimilar(biggest_sim*100);
        setStatus(null);
    }

    getData()
  }, [])

  useEffect(() => {
    //console.log('guess changed', guess, allWords, currWordData)
    if (guess && allWords && currWordData) {
        console.log('checking guess');
        let guessData = binarySearch(allWords, guess);
        //console.log('guessData', guessData)
        //console.log('allWords: ', allWords)
        //@ts-ignore
        let sim = Math.abs((similarity(currWordData.vector, guessData.vector)*100));
        if (sim > 99.999) {
            sim = 100;
            winGame();
        }
        increaseCorrespondingColor(transformValue(sim, mostSimilar));
        let newGuess = {
            //@ts-ignore
            word: guessData.word,
            similarity: sim,
        }
        let contains = similarities.some(elem => {
            return newGuess.word == elem.word;
        })
        if (guessData !== -1 && !contains) {
            const similarityArray = [...similarities, newGuess].sort((a, b) => {
                if (a.similarity < b.similarity) return 1;
                if (a.similarity > b.similarity) return -1;
                return 0;
            });
            //@ts-ignore
            setSimilarities(similarityArray);
            cookies.set(props.gameNumber.toString(), similarityArray, {
                path: '/',
                maxAge: 60 * 60 * 24 * 360,
            });
            //@ts-ignore
            //console.log('similarity:',(similarity(currWordData.vector, guessData.vector)*100).toFixed(1));
        } else {
            //TODO: else SHOW ERROR MESSAGE
            //throw Error('Something went wrong and we don\'t know what :(');
            toast({
                title: 'Filme já escolhido!',
                description: 'Você já chutou esse filme ou algum erro aconteceu.',
                status: 'error',
                isClosable: true,
                duration: 4000
            })
        }
    }
  }, [guess]);

  return (
    <Flex
        flexDirection="column"
        w="100%"
        justifyContent={status === null ? "flex-start" : "center"}
        minHeight="50vh"
        >
        {status != null &&
            <VStack alignItems="center" justifyContent="center" textAlign="center">
                <Spinner />
                <Text fontSize="sm">
                    {status === 'movies' && 'Obtendo os dados dos filmes...'}
                    {status === 'organizing' && 'Organizando os dados...'}
                    {status === 'vectors' && 'Obtendo os dados de similaridades...'}
                    {status === 'word2vec' && 'Estruturando os dados de similaridade...'}
                </Text>
                {status === 'vectors' && <Text fontSize="xs" >Isto pode demorar um pouco.</Text>}
            </VStack>}

        {status === null &&
        <>
            <Text fontSize="sm"><b>Jogo</b> {'#'}{props.gameNumber} / <b>Nº de tentativas:</b> {similarities.length}</Text>
            <Popover
                isOpen={popoverOpen}
                closeOnBlur={false}
                isLazy
                lazyBehavior='keepMounted'
                initialFocusRef={inputRef}
                variant="responsive"
            >
                <PopoverAnchor>
                    <Input size="lg"
                    placeholder='Digite o nome de um filme'
                    variant="filled"
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}></Input>
                </PopoverAnchor>

                <PopoverContent
                    minW={{ base: "100%", lg: "max-content" }}
                    maxH={500}
                    overflowY="scroll"
                >
                    <PopoverBody>
                        <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={2}
                        align='stretch'>
                            {isLoading && <HStack alignItems="center" justifyContent="center"><Spinner /><Text fontSize="sm">Procurando...</Text></HStack>}
                            {!isLoading && search}
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <Card variant='filled' size='sm' mb={0} mt={2}>
                <CardBody>
                    <Text fontSize='xs'><b>Está com dificuldade?</b> Utilize nossas ajudas:</Text>
                    <Hints target={props.word} />
                    <PowerUps target={props.word} similarities={similarities} setGuess={setGuess} gameNumber={props.gameNumber} />
                </CardBody>
            </Card>
        </>
        }
        {(similarities.length == 0 || status != null) &&
            <>
                <Instructions />
            </>
        }
        {status === null &&
        <Stack spacing={1} marginY={5} w="100%" justify='center' align='center'>
            {similarities.map((el) => {
                return (
                    <Box key={el.word} p={2} 
                        border={el.word.trim() === guess?.trim() ? "2px dashed" : "none"}
                        borderColor={el.word.trim() === guess?.trim() ? "blue.500" : "gray.500"}
                        borderRadius={10}
                        w={transformValue(el.similarity, mostSimilar) >= 99.999 ? '100%' : '95%'}
                        >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.23,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            <Flex flexDirection='row'>
                                <Text
                                    fontSize={transformValue(el.similarity, mostSimilar) >= 99.999 ? 'lg' : 'md'}
                                ><b>{el.word}</b></Text>
                                <GoogleSearchButton movieName={el.word} />
                            </Flex>
                            <Tooltip label={`${transformValue(el.similarity, mostSimilar).toFixed(2)}%`} hasArrow>
                                <Progress value={transformValue(el.similarity, mostSimilar)}
                                    colorScheme={getColorScheme(transformValue(el.similarity, mostSimilar))}
                                    //height={transformValue(el.similarity, mostSimilar) > 99.999 ? 37 : 30}
                                    size={transformValue(el.similarity, mostSimilar) >= 99.999 ? 'md' : 'sm'}
                                    borderRadius={2}
                                    //border={el.word.trim() === guess?.trim() ? "2px solid" : "none"}
                                    //borderColor={el.word.trim() === guess?.trim() ? "blue.500" : "none"}
                                    marginBottom={0}
                                    >
                                    {/*<ProgressLabel color={colorMode == 'dark' ? "gray.900" : "white"}
                                        fontSize="sm" textAlign="left" marginX={3} >{el.word}</ProgressLabel>*/}
                                </Progress>
                            </Tooltip>
                            {transformValue(el.similarity, mostSimilar) >= 99.999 &&
                                <Badge colorScheme='blue'>Você acertou!</Badge>
                            }
                            {transformValue(el.similarity, mostSimilar) >= 25 && transformValue(el.similarity, mostSimilar) < 99.999 &&
                                <SimilarTags target={props.word} guess={el.word} allTags={allTags} setAllTags={setAllTags} />
                            }
                            {transformValue(el.similarity, mostSimilar) < 25 &&
                                <Badge colorScheme='red'>Similaridade muito pequena</Badge>
                            }
                        </motion.div>
                    </Box>
                )
            })}
        </Stack>
        }
    </Flex>
  )
}

export default AutocompleteInput