import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";

type GoogleButtonProps = {
    movieName:string
}

function GoogleSearchButton({ movieName }: GoogleButtonProps) {
  return (
    <Tooltip label='Pesquisar no Google' hasArrow placement='right'>
        <IconButton
            size='xs'
            mx={2}
            mb={1}
            aria-label='Pesquisar no Google'
            icon={<FaSearch />}
            onClick={() => {
                window.open('http://google.com/search?q='+movieName)
            }}
        />
    </Tooltip>
  )
}

export default GoogleSearchButton