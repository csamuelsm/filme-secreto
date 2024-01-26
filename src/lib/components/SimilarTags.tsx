import React, { useEffect, useState } from 'react';
import { Badge, Flex, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react';

type SimilarTagsProps = {
    target:string,
    guess:string,
    allTags:string[],
    setAllTags:React.Dispatch<React.SetStateAction<string[]>>
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
            let tags = props.allTags;
            for (let i = 0; i < json.req.length; i++) {
                if (!props.allTags.includes(json.req[i])) {
                    tags.push(json.req[i]);
                }
            };
            tags.sort();
            props.setAllTags(tags);
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
            <Text fontSize="xs" marginTop={0} color="grey.500">Carregando tags mais similares...</Text>
        </Flex>
        }

        {!isLoading && top && top.length > 0 &&
            <Wrap gap={3} marginY={2} align='center'>
                {/*<Text fontSize="xs" marginTop={0}>Top tags similares: */}
                    {
                        //top.join(', ')
                        top.map((el, idx) => {
                            return (
                                <WrapItem>   
                                    <Badge fontSize='xs' fontWeight='bold' colorScheme='purple'>
                                        {idx + 1}. {el}
                                    </Badge>
                                </WrapItem>
                            )
                        })
                    }
                {/*</Text>*/}
            </Wrap>
        }

        {!isLoading && top && top.length == 0 &&
            <Wrap gap={3} marginY={2} align='center'>
                <WrapItem>   
                    <Badge fontSize='xs' fontWeight='bold' colorScheme='red'>
                        Nenhuma tag similar
                    </Badge>
                </WrapItem>
            </Wrap>
        }

        {error || (!isLoading && !top) &&
            <Text fontSize="xs" marginTop={0} color='red.500'>Não foi possível obter as tags similares</Text>
        }
    </Flex>
  )
}

export default SimilarTags