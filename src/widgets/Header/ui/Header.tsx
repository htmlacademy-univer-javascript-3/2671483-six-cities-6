import { UserNavigation } from '../../../features/UserNavigation';
import Logo from '../../../shared/ui/Logo';

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

export default Header;
