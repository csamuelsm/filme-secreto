import { Flex, Link, Text, Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { track } from '@vercel/analytics';
import Script from 'next/script';

type FooterProps = {
  setDonation: Dispatch<SetStateAction<boolean>>,
}

const Footer = ( props:FooterProps ) => {
  return (
    <Flex as="footer" width="full" justifyContent="center" alignItems='center' display='flex' flexDirection='column' textAlign='center'>
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link href="https://meu-blog-csamuelsm.vercel.app" isExternal rel="noopener noreferrer">
          samuel santos
        </Link>
      </Text>
      <Flex w='468px' h='60px' marginY={1}>
        <Script>
          {
            `
            atOptions = {
              'key' : '7d2c5adb840e04096ed73658ccba6760',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//www.highcpmcreativeformat.com/7d2c5adb840e04096ed73658ccba6760/invoke.js"></scr' + 'ipt>');
            `
          }
        </Script>
      </Flex>
      <Button display='block' width='auto' colorScheme='green' variant='outline' rightIcon={<FaHandHoldingHeart />}
          onClick={() => {
              track('Donation')
              props.setDonation(true);
          }}>
          Doar
      </Button>
    </Flex>
  );
};

export default Footer;
