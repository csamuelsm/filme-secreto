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
                Um algoritmo de aprendizado de máquina <u><b>avalia a semelhança entre o filme chutado e o filme secreto</b></u>, treinado com base em <u><b>tags atribuídas por usuários</b></u> a filmes. As tags passaram por filtragem para remover conteúdo sem sentido ou subjetivo, mas feedbacks sobre tags inadequadas são bem-vindos para remoção rápida pelo menu.
            </Text>
        }

        {currInstr === 3 &&
            <Text marginY={3}>
                <b><u>Obs.</u>: </b> O conjunto de dados inclui <u><b>filmes lançados até 2018 e alguns de 2019</b></u>. A busca não identificará filmes lançados após esses anos, e o filme secreto seguirá essa limitação. Filmes pouco conhecidos foram excluídos, e o desenvolvedor está ampliando o banco de dados.
            </Text>
        }

        {currInstr === 4 &&
            <Text marginY={3}>
                <b><u>Dica</u>: </b> Ao buscar filmes, considere que títulos com artigos podem estar <u><b>registrados de forma diferente no banco de dados</b></u>. Por exemplo, "O Diabo Veste Prada" pode ser listado como "Diabo Veste Prada, O". Caso não encontre um filme, <u><b>tente novamente omitindo o artigo inicial</b></u>. Além disso, é útil <u><b>buscar por partes do título</b></u> em vez de digitar o título completo.
            </Text>
        }

        {currInstr === 5 &&
            <>
                <Text marginY={3}>
                    Você pode <b>desistir a qualquer momento</b>, e um novo jogo estará disponível no dia seguinte. <b>Jogos antigos não contam</b> para a contagem de vitórias seguidas. Jogar em grupo é uma opção divertida, onde cada pessoa do grupo pode chutar um filme por rodada. O principal objetivo é se divertir. <u><b>Bom jogo!</b></u>
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