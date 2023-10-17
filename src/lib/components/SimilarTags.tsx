import React, { useEffect, useState } from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

type SimilarTagsProps = {
    target:string,
    guess:string
}

function SimilarTags(props:SimilarTagsProps) {

  const [top, setTop] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function getTop3() {
        setIsLoading(true);
        const data = await fetch('/api/get_tags', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                target:props.target,
                guess:props.guess
            })
        });
        const json = await data.json();
        //console.log(json);
        try {
            setTop(json.req);
            setIsLoading(false);
        } catch (e) {
            //throw Error('Couldn\'t get the Top tags');
            setError(true);
            setIsLoading(false);
        }
    }

    getTop3();

  }, [])

  return (
    <Flex>
        {isLoading &&
        <Flex flexDirection='row' alignItems='center'>
            <Spinner size='xs' marginRight={1} />
            <Text fontSize="xs" marginTop={0}>Carregando tags mais similares...</Text>
        </Flex>
        }

        {!isLoading && top && top.length > 0 &&
            <Text fontSize="xs" marginTop={0}>Top tags similares: {top.join(', ')}</Text>
        }

        {!isLoading && top && top.length == 0 &&
            <Text fontSize="xs" marginTop={0}>Nenhuma tag similar</Text>
        }

        {error || (!isLoading && !top) &&
            <Text fontSize="xs" marginTop={0} color='red.500'>Não foi possível obter as tags similares</Text>
        }
    </Flex>
  )
}

export default SimilarTags