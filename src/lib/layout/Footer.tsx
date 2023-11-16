import { Flex, Link, Text, Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { track } from '@vercel/analytics';
import Script from 'next/script';

type FooterProps = {
  setDonation: Dispatch<SetStateAction<boolean>>,
}

const Footer = ( props:FooterProps ) => {

  const banner = useRef<HTMLDivElement>(null);
  const atOptions = {
    key: '7d2c5adb840e04096ed73658ccba6760',
    format: 'iframe',
    height: 60,
    width: 468,
    params: {}
  }

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]) 

  return (
    <Flex as="footer" width="full" justifyContent="center" alignItems='center' display='flex' flexDirection='column' textAlign='center'>
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link href="https://meu-blog-csamuelsm.vercel.app" isExternal rel="noopener noreferrer">
          samuel santos
        </Link>
      </Text>
      <div ref={banner} style={{
        marginTop: '3px',
        marginBottom: '8px'
      }}>
      </div>
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
