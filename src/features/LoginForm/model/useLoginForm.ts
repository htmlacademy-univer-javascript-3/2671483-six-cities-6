import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/redux';

import { loginAction } from '../../../entities/user/model/user.thunks';
import type { AuthData } from '../../../shared/types/User.type';

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (formData.email && formData.password) {
        dispatch(loginAction(formData));
      }
    },
    [dispatch, formData]
  );

  return { formData, handleChange, handleSubmit };
};
