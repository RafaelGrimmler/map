import {
  StyledAvatar,
  StyledNavbarContainer,
  StyledOverlay,
  StyledWrapper,
} from './styles';
import { ReactNode } from 'react';
import NavbarButton from '../NavbarButton';

export type NavbarItem = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};
export type NavbarProps = {
  items: NavbarItem[];
  image: string;
  disabled?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ items, image, disabled }) => {
  return (
    <StyledNavbarContainer>
      <StyledWrapper>
        <StyledAvatar src={image} />
        {items?.map((item) => (
          <NavbarButton
            key={`${item?.label}-navbar`}
            icon={item?.icon}
            label={item?.label}
            onClick={item?.onClick}
          />
        ))}
        {disabled && <StyledOverlay />}
      </StyledWrapper>
    </StyledNavbarContainer>
  );
};

export default Navbar;
