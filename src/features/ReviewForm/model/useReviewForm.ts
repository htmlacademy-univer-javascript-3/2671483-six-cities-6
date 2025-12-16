import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/redux';

import { MIN_COMMENT_LENGTH } from '../../../shared/config/const';

import type { Offer } from '../../../shared/types/Offer.type';
import type { ReviewData } from '../../../shared/types/Review.type';
import { postReviewAction } from './review.thunks';

const INITIAL_STATE: ReviewData = {
  comment: '',
  rating: 0,
};

export const useReviewForm = (offerId: Offer['id']) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const isValid =
    formData.rating > 0 &&
    formData.rating <= 5 &&
    formData.comment.length >= MIN_COMMENT_LENGTH;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setIsPending(true);

    await dispatch(
      postReviewAction({
        offerId,
        comment: formData.comment,
        rating: formData.rating,
      })
    );

    setIsPending(false);
    setFormData(INITIAL_STATE);
  };

  return {
    comment: formData.comment,
    rating: formData.rating,
    isValid,
    isPending,
    handleChange,
    handleSubmit,
  };
};
