import { Text, Image, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Flex, Box, HStack, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaCamera, FaUnlock } from 'react-icons/fa';
import BackdropBuyModal from './BackdropBuyModal';
import Cookies from 'universal-cookie';

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
    const [backdropView, setBackdropView] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const cookies = new Cookies(`${props.gameNumber.toString()}_backdropView`, { path: '/' });

    useEffect(() => {
        // cookies do jogo
        if(cookies.get(`${props.gameNumber.toString()}_backdropView`)) {
            //console.log('cookies', cookies.get(props.gameNumber.toString()));
            setBackdropView(cookies.get(`${props.gameNumber.toString()}_backdropView`));
        };
      }, []);

    function setCookieToTrue() {
        cookies.set(`${props.gameNumber.toString()}_backdropView`, 
            true, {
            path: '/',
            maxAge: 60 * 60 * 24 * 360,
        });
    }

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
                        {!loading && backdrops.length > 0 && <Image filter='auto' blur={!backdropView ? '8px' : '0px'} src={baseImgUrl+backdrops[random].file_path} />}
                        <Divider marginY={2} />
                        <Button leftIcon={<FaUnlock />} size='xs' colorScheme='red' isDisabled={backdropView} onClick={() => setModalOpen(true)}>Revelar frame</Button>
                        <Image src='/tmdb-hor.svg' alt='tmdb-api' marginTop={3} marginBottom={2} width={150} />
                    </PopoverBody>
                </PopoverContent>
            </Portal>
            <BackdropBuyModal open={modalOpen} setOpen={setModalOpen} setBackdropView={setBackdropView} setCookies={setCookieToTrue} />
        </Popover>
    );
}

export default TmdbBackdrop