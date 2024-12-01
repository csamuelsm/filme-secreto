import { Text, Image, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Flex, Box, HStack, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaUnlock } from "react-icons/fa";
import SimilarMoviesBuyModal from './SimilarMoviesBuyModal';
import Cookies from 'universal-cookie';

type TmdbSimilarProps = {
    gameNumber: number,
}

type TmdbJson = {
    adult?: boolean,
    backdrop_path?: string,
    genre_ids?: number[],
    id: number,
    media_type?: string,
    original_language?: string,
    original_title?: string,
    overview: string,
    popularity?: number,
    poster_path: string,
    release_data?: string,
    title: string,
    video?: boolean|string,
    vote_average?: number,
    vote_count?: number,
}

const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

function TmdbSimilar(props:TmdbSimilarProps) {

    const [loading, setLoading] = useState<boolean>(true);
    const [similars, setSimilars] = useState<TmdbJson[]>([]);
    const [revelar, setRevelar] = useState<number>(1);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const cookies = new Cookies(`${props.gameNumber.toString()}_revelar`, { path: '/' });

    useEffect(() => {
        // cookies do jogo
        if(cookies.get(`${props.gameNumber.toString()}_revelar`)) {
            //console.log('cookies', cookies.get(props.gameNumber.toString()));
            setRevelar(cookies.get(`${props.gameNumber.toString()}_revelar`));
        };
      }, []);

    function setCookie(val:number) {
        cookies.set(`${props.gameNumber.toString()}_revelar`, 
            val, {
            path: '/',
            maxAge: 60 * 60 * 24 * 360,
        });
    }

    async function getSimilarMovies() {
        setLoading(true);
        const res = await fetch('/api/get_tmdb_similar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameNumber: props.gameNumber,
            })
        });
        const content = await res.json();
        setSimilars(content.tmdbData);
        setLoading(false);
        //console.log(content);
    }

    useEffect(() => {
        getSimilarMovies();
    }, []);

    return (
        <Popover placement='top-end'>
            <PopoverTrigger>
                <Button leftIcon={<FaEye/>} colorScheme='teal' size='sm' isDisabled={loading}>
                    Filmes Similares
                </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader><Text fontSize='sm'><b>Filmes Similares</b></Text></PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        <HStack gap={4} alignItems='flex-start'>
                                {!loading && similars.length > 0 &&
                                    (similars.map((val, idx) => {
                                        return (
                                                <Box filter='auto' blur={idx <= revelar ? '5px' : '0px'}>
                                                    <Text fontSize='xs' lineHeight='1.2'><b>#{idx+1}</b></Text>
                                                    <Image src={baseImgUrl+val.poster_path} marginBottom={1} />
                                                    <Text fontSize='sm' lineHeight='1.2'><b>{val.title}</b></Text>
                                                </Box>
                                        )
                                    }))
                                }
                        </HStack>
                        <Divider marginY={2} />
                        <Button leftIcon={<FaUnlock />} isDisabled={revelar < 0} size='xs' colorScheme='red' alignSelf='flex-end' justifySelf='flex-end' onClick={() => setModalOpen(true)}>Revelar Filme</Button>
                        <Image src='/tmdb-hor.svg' alt='tmdb-api' marginTop={3} marginBottom={2} width={150} />
                    </PopoverBody>
                </PopoverContent>
            </Portal>
            <SimilarMoviesBuyModal open={modalOpen} setOpen={setModalOpen} revelar={revelar} setRevelar={setRevelar} setCookie={setCookie} />
        </Popover>
    );
}

export default TmdbSimilar