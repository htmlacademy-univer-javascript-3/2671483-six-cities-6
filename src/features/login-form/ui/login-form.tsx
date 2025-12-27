import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthorized } from '../../../entities/user/model/user.selectors';
import { AppRoute } from '../../../shared/config/route';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { InputWrapper } from '../../../shared/ui/input-wrapper';
import { useLoginForm } from '../model/use-login-form';

export function LoginForm(): JSX.Element {
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const {
    formData: { email, password },
    handleChange,
    handleSubmit,
  } = useLoginForm();

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoute.Root);
    }
  }, [isAuth, navigate]);

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" method="post" onSubmit={handleSubmit}>
        <InputWrapper
          label="E-mail"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChange}
        />
        <InputWrapper
          label="Password"
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={handleChange}
        />
        <button className="login__submit form__submit button" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}
