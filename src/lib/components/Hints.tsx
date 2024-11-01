import { Badge, Button, HStack, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaQuestionCircle } from "react-icons/fa";

type HintsProps = {
    target:string
}

function Hints(props:HintsProps) {

  const [hints, setHints] = useState<string[]>([]);
  const [hintNumber, setHintNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getHints() {
        setLoading(true);
        let res = await fetch('/api/get_hints', {
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
        let hints:string[] = data['req'];

        setHints(hints);
        setLoading(false);
    }

    getHints();
  }, []);

  return (
    <Wrap gap={3} marginY={2} align='center'>
        <WrapItem>
            <Tooltip hasArrow label='Descubra uma tag'>
                <Button colorScheme='purple' size='sm' isDisabled={!(hintNumber < 3) || loading} onClick={() => {
                    let currHintNumber = hintNumber;
                    setHintNumber(hintNumber+1);
                }} leftIcon={<FaQuestionCircle/>}>
                    Dica ({hintNumber}/3)
                </Button>
            </Tooltip>
        </WrapItem>
        {
            hints.map((el, idx) => {
                return (
                    <WrapItem>
                        <Badge fontSize='xs' fontWeight='bold' colorScheme='purple' display={
                            hintNumber > idx ? 'block' : 'none'
                        }>{idx + 1}. {el}</Badge>
                    </WrapItem>
                )
            })
        }
    </Wrap>
  )
}

export default Hints