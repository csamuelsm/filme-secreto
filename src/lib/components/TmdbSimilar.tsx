import { Text, Image, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Flex, Box, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';

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
                                    (similars.map(val => {
                                        return (
                                            <Box>
                                                <Image src={baseImgUrl+val.poster_path} marginBottom={1} />
                                                <Text fontSize='sm' lineHeight='1.2'><b>{val.title}</b></Text>
                                            </Box>
                                        )
                                    }))
                                }
                        </HStack>
                        <Image src='/tmdb-hor.svg' alt='tmdb-api' marginTop={3} marginBottom={2} width={150} />
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}

export default TmdbSimilar