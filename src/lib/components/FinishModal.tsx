import React, { Dispatch, SetStateAction } from 'react'
import { Text, Modal, ModalOverlay, ModalContent,
        ModalHeader, ModalCloseButton, ModalBody,
        ModalFooter, Button, Accordion, AccordionButton, AccordionIcon,
        AccordionPanel, AccordionItem, Box, Grid, GridItem, Heading, Divider } from '@chakra-ui/react'
import { FaHandHoldingHeart, FaShareAlt } from 'react-icons/fa';
import { getLastPlayed, getNumberOfGames, getNumberOfVictories, getVictoriesPercentage, getStreak } from '../utils/cookies';
import CountDown from './CountDown';
import { RWebShare } from "react-web-share";
import { track } from '@vercel/analytics';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    answer: string,
    setDonation: Dispatch<SetStateAction<boolean>>,
    gameNumber: number,
    blue:number,
    green:number,
    yellow:number,
    red:number
}

function FinishModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Jogo {'#'}{props.gameNumber} finalizado!
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>

                <Text marginY={3}>Outro jogo estará disponível amanhã!</Text>

                <Divider />

                {/*<Text marginY={3}>
                    Games played: {getNumberOfGames()} <br/>
                    Nº of victories: {getNumberOfVictories()} <br/>
                    Percentage of victories: {getVictoriesPercentage()}
                </Text>*/}

                <Grid templateColumns='repeat(2, 1fr)' gap={6} marginY={4}>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Nº de jogos</Text>
                        <Heading size='md'>
                            {getNumberOfGames()}
                        </Heading>
                    </GridItem>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Vitórias</Text>
                        <Heading size='md'>
                            {getNumberOfVictories()}
                        </Heading>
                    </GridItem>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Porcentagem de vitórias</Text>
                        <Heading size='md'>
                            {getVictoriesPercentage()} %
                        </Heading>
                    </GridItem>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Vitórias seguidas</Text>
                        <Heading size='md'>
                            {getStreak()}
                        </Heading>
                    </GridItem>

                    <GridItem colSpan={2} w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Próximo jogo em</Text>
                        <CountDown />
                    </GridItem>
                </Grid>

                <Accordion allowToggle marginY={3}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left'>
                                    Revelar resposta
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Text><b>{props.answer}</b></Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                {/*<Divider />*/}

                <Text marginY={3} fontSize="sm">
                    Se você gostou deste jogo, por favor considere fazer uma <b>doação de qualquer valor para apoiar sua manutenção.</b>
                </Text>
                <Text marginY={3} fontSize="sm">
                    Compartilhe com seus amigos no <b>Twitter, Telegram, WhatsApp, Facebook</b> e outras redes sociais no botão abaixo.
                </Text>
            </ModalBody>
            <ModalFooter>
                <RWebShare
                    data={{
                        text: encodeURIComponent(`🎥 Filme Secreto #${props.gameNumber}\n\n🔵 ${props.blue}\n🟢 ${props.green}\n🟡 ${props.yellow}\n🔴 ${props.red}\n\n🏆 Nº de vitórias seguidas: ${getStreak()}\n\n`),
                        url: window.location.href,
                        title: "AdivinheOFilme",
                    }}
                    disableNative={true}
                    onClick={() => {
                        track('Share');
                    }}
                >
                <Button marginX={2} rightIcon={<FaShareAlt />}>
                    Compartilhar
                </Button>
                </RWebShare>
                <Button colorScheme='green' variant='outline' rightIcon={<FaHandHoldingHeart />}
                    onClick={() => {
                        track('Donation')
                        props.setDonation(true);
                    }}>
                    Doar
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default FinishModal