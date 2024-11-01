import { Box, Flex, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip } from '@chakra-ui/react';
import { FaLanguage, FaHandHoldingHeart, FaBars, FaRegCommentAlt, FaRegFlag, FaRegLightbulb, FaRegCalendarAlt } from 'react-icons/fa';
import { MdMovieFilter } from 'react-icons/md';

import ThemeToggle from './ThemeToggle';
import GiveUpModal from '../components/GiveUpModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { lastPlayedToday } from '../utils/cookies';

type HeaderProps = {
  finishOpen: Dispatch<SetStateAction<boolean>>,
  canGiveUp: boolean,
  setCanGiveUp: Dispatch<SetStateAction<boolean>>,
  setDonation: Dispatch<SetStateAction<boolean>>,
  setCredits: Dispatch<SetStateAction<boolean>>,
  setOldGames: Dispatch<SetStateAction<boolean>>,
  gameNumber: number,
  isOld: boolean
}

const Header = (props:HeaderProps) => {
  const [giveUp, setGiveUp] = useState<boolean>(false);

  return (
    <Flex as="header" width="full" align="center">
      <GiveUpModal open={giveUp} setOpen={setGiveUp} setFinishOpen={props.finishOpen} setCanGiveUp={props.setCanGiveUp} gameNumber={props.gameNumber} isOld={props.isOld} />
      <Box>
        <Heading as="h1" size="md" display="flex" flexDirection="row" alignItems="center">
          <MdMovieFilter /> <Link href='/'>FilmeSecreto</Link>
        </Heading>
      </Box>
      <Flex flexDirection="row" alignItems="flex-end" justifyContent="flex-end" w="100%">
        <Box marginX={1.5}>
          <Tooltip hasArrow label='Desistir'>
            <IconButton
              aria-label="give up"
              icon={<FaRegFlag />}
              isDisabled={props.canGiveUp}
              onClick={() => {
                setGiveUp(true);
              }}
            />
          </Tooltip>
        </Box>
        <Box marginX={1.5}>
          {/*<IconButton
            aria-label="donate"
            icon={<FaHandHoldingHeart />}
            onClick={() => {
              props.setDonation(true);
            }}
          />*/}
            <Menu>
              <Tooltip hasArrow label='Menu'>
                <MenuButton as={IconButton} icon={<FaBars />} />
              </Tooltip>
              <MenuList>
                <MenuItem icon={<FaRegCalendarAlt/>} onClick={() => {
                  props.setOldGames(true);
                }}>
                  Jogos antigos
                </MenuItem>
                <MenuItem icon={<FaHandHoldingHeart/>} onClick={() => {
                  props.setDonation(true);
                }}>Doar</MenuItem>
                <MenuItem as='a' href='https://forms.gle/32FbMft1d9hiVep49' icon={<FaRegCommentAlt/>}>
                  Feedback
                </MenuItem>
                <MenuItem icon={<FaRegLightbulb/>} onClick={() => {
                  props.setCredits(true);
                }}>
                  Créditos
                </MenuItem>
                {/*<MenuItem as='a' href='https://guess-the-movie-one.vercel.app/' icon={<FaLanguage />}>
                  Versão inglês
                </MenuItem>*/}
              </MenuList>
            </Menu>
        </Box>
        <Box marginX={1.5}>
          <ThemeToggle />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
