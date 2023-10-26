import React, { useState } from 'react'
import { Button, Flex, Heading, Text, useColorMode } from '@chakra-ui/react'
import { FaInfoCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Instructions() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [currInstr, setCurrInstr] = useState<number>(1);

  return (
    <Flex padding={4} marginY={3} borderRadius={8} flexDirection="column"
        background={
            colorMode === 'dark' ? "gray.700" : "gray.100"
        }>
        <Heading as="h3" size="md" display="flex" flexDirection="row" alignItems="center" >
            <FaInfoCircle style={{
                marginRight: "3px"
            }} /> Como jogar
        </Heading>

        {currInstr === 1 &&
            <>
                <Text marginY={3}>
                    O objetivo do jogo é <u><b>descobrir o filme secreto</b></u> do dia. Para fazer isso, você deve chutar filmes que você acha que podem ser similares ao filme secreto. Você pode chutar quantas vezes quiser.
                    Digite o seu palpite na caixa de texto acima e selecione o filme que você deseja da lista.
                </Text>
            </>
        }

        {currInstr === 2 &&
            <Text marginY={3}>
                Um algoritmo de aprendizado de máquina irá lhe dizer o <u><b>quão similar</b></u> o filme que você chutou é do filme secreto. Este algoritmo foi treinado em um grande conjunto de <i>tags</i> que milhares de usuários atribuíram aos filmes. As tags passaram por uma filtragem para remover tags sem sentido ou que representam opiniões subjetivas dos usuários, porém pode ser que alguma tag ou outra sobreviveram pela filtragem. Se você encontrar alguma tag deste tipo ou uma tag inapropriada, pode submeter um feedback pelo menu e ela será removida o quanto antes.
            </Text>
        }

        {currInstr === 3 &&
            <Text marginY={3}>
                <b><u>Obs.<sup>1</sup></u>: </b> O conjunto de dados contém filmes lançados <u><b>até 2018 e alguns de 2019</b></u>, portanto a busca nunca irá encontrar um filme lançados após estes anos. Além disso, o filme secreto sempre será um filme lançado até estas datas.
                Ah, e alguns filmes pouquíssimo conhecidos foram removidos do conjunto de dados. O desenvolvedor do jogo está trabalhando para aumentar a quantidade de filmes no banco de dados.
            </Text>
        }

        {currInstr === 4 &&
            <Text marginY={3}>
                <b><u>Obs.<sup>2</sup></u>: </b> Se você <u><b>pesquisar por algum filme que começa com um artigo</b></u> como, por exemplo, 'O Diabo Veste Prada', ele pode não aparecer pois é possível que o filme esteja registrado no banco de dados como 'Diabo Veste Prata, O'.
                Então, se você procurar por um filme assim e ele não aparecer, <u><b>tente novamente omitindo o artigo do início</b></u>. Outra dica é buscar por partes do título e não escrever o título inteiro.
            </Text>
        }

        {currInstr === 5 &&
            <>
                <Text marginY={3}>
                    Você pode desistir a qualquer momento e outro jogo ficará disponível no dia seguinte. Enquanto espera, você pode jogar os jogos antigos, porém eles não contam para a contagem de vitórias seguidas.
                    Jogar este jogo em grupo também pode ser muito divertido, por exemplo com uma pessoa do grupo chutando um filme em cada rodada até alguém acertar.
                    Finalmente e o mais importante, <u><b>divirta-se e bom jogo!</b></u>
                </Text>
            </>
        }
        <Flex w='100%'>
            <Button marginRight='auto' isDisabled={currInstr == 1}
            onClick={() => {
                if (currInstr > 1) {
                    setCurrInstr(currInstr - 1);
                }
            }}
            leftIcon={<FaArrowLeft />}
            >
                Anterior
            </Button>
            <Button marginLeft='auto' isDisabled={currInstr == 5}
            onClick={() => {
                if (currInstr < 5) {
                    setCurrInstr(currInstr + 1);
                }
            }}
            rightIcon={<FaArrowRight />}
            >
                Próximo
            </Button>
        </Flex>
    </Flex>
  )
}

export default Instructions