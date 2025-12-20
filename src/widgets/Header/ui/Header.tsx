import { memo } from 'react';
import { UserNavigation } from '../../../features/user-navigation';
import Logo from '../../../shared/ui/logo';

type HeaderProps = {
  showNavigation?: boolean;
};

function Header({ showNavigation = true }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {showNavigation && <UserNavigation />}
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
