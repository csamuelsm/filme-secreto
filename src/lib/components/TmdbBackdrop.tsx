import { Text, Image, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Flex, Box, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';

type TmdbBackdropProps = {
    gameNumber: number,
}

type Backdrops = {
    aspect_ratio?: number,
    height?: number,
    iso_639_1?: null|number|string,
    file_path: string,
    vote_average?: number,
    vote_count?: number,
    width?: number,
}

const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

function TmdbBackdrop(props:TmdbBackdropProps) {

    const [loading, setLoading] = useState<boolean>(true);
    const [backdrops, setBackdrops] = useState<Backdrops[]>([]);
    const [random, setRandom] = useState<number>(0);

    async function getSimilarMovies() {
        setLoading(true);
        const res = await fetch('/api/get_tmdb_backdrop', {
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
        let backdropsNumber = content.tmdbData.length;
        let randomChoosen = Math.floor(Math.random() * (backdropsNumber+1));
        setRandom(randomChoosen);
        setBackdrops(content.tmdbData);
        setLoading(false);
        //console.log(content);
        //console.log(backdropsNumber, randomChoosen, content.tmdbData[randomChoosen]);
    }

    useEffect(() => {
        getSimilarMovies();
    }, []);

    return (
        <Popover placement='top-end'>
            <PopoverTrigger>
                <Button leftIcon={<FaCamera/>} colorScheme='pink' size='sm' isDisabled={loading}>
                    Imagem Aleatória
                </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader><Text fontSize='sm'><b>Imagem Aleatória</b></Text></PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        {/*<HStack gap={4} alignItems='flex-start'>
                                {
                                    (similars.map(val => {
                                        return (
                                            <Box>
                                                <Image src={baseImgUrl+val.poster_path} marginBottom={1} />
                                                <Text fontSize='sm' lineHeight='1.2'><b>{val.title}</b></Text>
                                            </Box>
                                        )
                                    }))
                                }
                        </HStack>*/}
                        {!loading && backdrops.length > 0 && <Image src={baseImgUrl+backdrops[random].file_path} />}
                        <Image src='/tmdb-hor.svg' alt='tmdb-api' marginTop={3} marginBottom={2} width={150} />
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}

export default TmdbBackdrop