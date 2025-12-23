import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { changeCity } from '../../features/city-selector/model/city-selector-slice';
import { LoginForm } from '../../features/login-form/ui/login-form';
import { AppRoute } from '../../shared/config/route';
import { useAppDispatch } from '../../shared/lib/hooks/redux';
import { getRandomCity } from '../../shared/lib/utils';
import { Header } from '../../widgets/header';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomCity = getRandomCity();

  const handleCityClick = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--login">
      <Header showNavigation={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={AppRoute.Root}
                className="locations__item-link"
                onClick={handleCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
