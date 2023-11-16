import { Flex, Heading, Text, Grid, GridItem, Button } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaHandHoldingHeart } from 'react-icons/fa'

type FooterProps = {
    setDonation: Dispatch<SetStateAction<boolean>>,
}

function DonationRequest(props:FooterProps) {
  return (
    <Flex w='100%' padding={5} borderRadius={10} flexDirection='column' textAlign='left' backgroundColor='green.500'>

        <Grid templateColumns={['repeat(1, 1fr)' ,null, null, 'repeat(4, 1fr)']} gap={6}>

            <GridItem w='100%' textAlign={['center', null, null, 'left']}>
                <Heading size='md' color='white'>
                    Eu tenho um pedido 👋
                </Heading>
            </GridItem>

            <GridItem colSpan={2} color='white' w='100%' textAlign={['center', null, null, 'left']}>
                <Text fontSize='xs'>
                    Filme Secreto é um <u><b>jogo grátis</b></u>, sem anúncios, e que <u><b>pretendo manter assim</b></u>. Porém, mantê-lo funcionando toma um pouco de meu tempo e finanças.
                    Em mais de um mês de jogo, eu recebi <u><b>apenas duas doações de R$1,00</b></u>. Por isso, se você gosta do jogo, gostaria de pedir sua ajuda para <u><b>doar qualquer valor</b></u> 
                    e contribuir com a manutenção do Filme Secreto!
                </Text>
            </GridItem>

            <GridItem display='flex' justifyContent='center' w='100%' textAlign='center'>
                <Button display='block' width='auto' colorScheme='red' variant='solid' rightIcon={<FaHandHoldingHeart />}
                    onClick={() => props.setDonation(true)}
                >
                    Doar
                </Button>
            </GridItem>

        </Grid>

    </Flex>
  )
}

export default DonationRequest
