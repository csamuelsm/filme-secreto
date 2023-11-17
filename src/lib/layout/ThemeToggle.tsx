import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip hasArrow label='Mudar tema'>
      <IconButton
        aria-label="theme toggle"
        icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
