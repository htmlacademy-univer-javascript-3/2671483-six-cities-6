import { LoginForm } from '../../features/login-form/ui/login-form';
import { Header } from '../../widgets/header';

function LoginPage() {
  return (
    <div className="page page--gray page--login">
      <Header showNavigation={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
