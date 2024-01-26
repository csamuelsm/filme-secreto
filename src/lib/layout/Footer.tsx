import { Flex, Link, Text, Button, Wrap, WrapItem } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
//import { FaHandHoldingHeart } from 'react-icons/fa';
//import { track } from '@vercel/analytics';
import DonationRequest from '../components/DonationRequest';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaGithubAlt, FaProductHunt, FaHandHoldingHeart } from "react-icons/fa6";

type FooterProps = {
  setDonation: Dispatch<SetStateAction<boolean>>,
}

const Footer = ( props:FooterProps ) => {

  return (
    <Flex as="footer" width="full" justifyContent="center" alignItems='center' display='flex' flexDirection='column' textAlign='center'>
      {/*<Button display='block' width='auto' colorScheme='green' variant='outline' rightIcon={<FaHandHoldingHeart />}
          onClick={() => {
              track('Donation')
              props.setDonation(true);
          }}>
          Ajude o jogo
        </Button>*/}
      {/*<DonationRequest setDonation={props.setDonation} />*/}
      <Text fontSize="xs" marginTop={3}>
        {new Date().getFullYear()} -{' '}
        <Link href="https://meu-blog-csamuelsm.vercel.app" isExternal rel="noopener noreferrer">
          <u><b>Samuel Santos</b></u> <ExternalLinkIcon mx='2px' />
        </Link>
      </Text>

      <Wrap gap={3} marginY={2}>
        <WrapItem>
          <Link href='https://github.com/csamuelsm/filme-secreto' isExternal>
            <Button colorScheme='gray' leftIcon={<FaGithubAlt />} variant='outline'>Github</Button>
          </Link>
        </WrapItem>

        <WrapItem>
          <Link href='https://github.com/csamuelsm/filme-secreto' isExternal>
            <Button colorScheme='orange' leftIcon={<FaProductHunt />} variant='outline'>ProductHunt</Button>
          </Link>
        </WrapItem>

        <WrapItem>
          <Button display='block' width='auto' colorScheme='red' variant='solid' leftIcon={<FaHandHoldingHeart />}
              onClick={() => {
                  props.setDonation(true);
              }}>
              Doar
          </Button>
        </WrapItem>
      </Wrap>

    </Flex>
  );
};

export default Footer;
