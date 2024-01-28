import { Badge, Button, HStack, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { BsEmojiSunglassesFill } from "react-icons/bs";

type SimilaritiesType = {
    word:string,
    similarity:number
}

type PowerUpsProps = {
    target:string,
    similarities:SimilaritiesType[],
    setGuess:React.Dispatch<React.SetStateAction<string|null>>,
}

function PowerUps(props:PowerUpsProps) {

  const [loading, setLoading] = useState<boolean>(false);
  const [topMovies, setTopMovies] = useState<((string|number)[])[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    async function getTopMovies() {
        setLoading(true);
        let res = await fetch('/api/get_top_movies', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                target: props.target
            })
        });

        let data = await res.json();
        let topMoviesData:((string|number)[])[] = data['req'];

        setTopMovies(topMoviesData);

        setLoading(false);
    }

    getTopMovies();
  }, []);

  function addMovie() {
    for (let j = topMovies.length-1; j >= 0; j--) {
        let alreadyGuessed:boolean = false;
        console.log(topMovies[j][0])
        for (let i = 0; i < props.similarities.length; i++) {
            if (props.similarities[i].word == topMovies[j][0])
                alreadyGuessed = true;
        }
        if (alreadyGuessed)
            continue;
        else {
            /*let newSim = props.similarities.slice();
            newSim.push({
                word: String(topMovies[j][0]),
                similarity: Number(topMovies[j][1])*100.0
            });*/
            props.setGuess(String(topMovies[j][0]));
            /*newSim.sort(function(a, b) {
                if (a.similarity < b.similarity) return 1;
                else if (a.similarity > b.similarity) return -1;
                else return 0;
            })
            props.setSimilarities(newSim);*/
            break;
        }
    }
  }

  return (
    <Wrap gap={3} marginBottom={2} align='center'>
        <WrapItem>
            <Tooltip hasArrow label='Veja um filme similar'>
                <Button colorScheme='green' size='sm' isDisabled={loading || clicked} 
                    leftIcon={<FaEye/>} onClick={function() {
                        addMovie();
                        setClicked(true);
                    }}>
                    Revelar um filme ({clicked ? 1 : 0}/1)
                </Button>
            </Tooltip>
        </WrapItem>
        
        {/*<WrapItem>
            <Tooltip hasArrow label='Descrição do filme com emojis'>
                <Button colorScheme='yellow' size='sm' leftIcon={<BsEmojiSunglassesFill/>}>
                    Ver emojis
                </Button>
            </Tooltip>
        </WrapItem>*/}
    </Wrap>
  )
}

export default PowerUps