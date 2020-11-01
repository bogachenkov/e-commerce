import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { ArrowLeft } from 'react-feather';
import { useForm } from "react-hook-form";

import { useResetRecoilState } from 'recoil';
import { shoppingCartState } from 'src/recoil';

import { countries } from 'src/types/data';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import Purchased from '../Purchased/Purchased';

const CheckoutForm:React.FC = () => {
  const [ formData, setFormData ] = useState(null);
  const { register, control, handleSubmit, errors } = useForm();
  const router = useRouter();
  const resetCartState = useResetRecoilState(shoppingCartState);

  const onSubmit = data => {
    setFormData(data);
  };

  return (
    <>
      <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="checkout-form__row">
          <h2 className="checkout-form__section">
            Customer Information
          </h2>
        </div>
        <div className="checkout-form__row">
          <InputField id="first-name" label="First name" name="firstName" type="text" register={register} error={errors.firstName} />
          <InputField id="last-name" label="Last name" name="lastName" type="text" register={register} error={errors.lastName} />
        </div>
        <div className="checkout-form__row">
          <InputField id="address" label="Address" name="address" type="text" register={register} error={errors.address} />
        </div>
        <div className="checkout-form__row">
          <SelectField id="country" label="Country" name="country" options={countries} control={control} error={errors.country} />
          <InputField id="city" label="City" name="city" type="text" register={register} error={errors.city} />
        </div>
        <div className="checkout-form__row">
          <InputField id="postal-code" label="Postal Code" name="postalCode" type="text" mask="999999" register={register} error={errors.postalCode} />
          <InputField id="phone" label="Phone" name="phone" type="text" mask="+7 (999) 999-99-99" register={register} error={errors.phone} />
        </div>
        <div className="checkout-form__row">
          <h2 className="checkout-form__section">
            Payment Information
          </h2>
        </div>
        <div className="checkout-form__payment">
          <div className="checkout-form__row">
            <InputField id="card-holder" label="Card Holder" name="cardHolder" type="text" register={register} error={errors.cardHolder} />
            <InputField id="card-number" label="Card Number" name="cardNumber" type="text" mask="9999 9999 9999 9999" register={register} error={errors.cardNumber} />
          </div>
          <div className="checkout-form__row">
            <InputField id="card-expires" label="Expires at" name="cardExpires" type="text" mask="99/99" register={register} error={errors.cardExpires} />
            <InputField id="card-cvc" label="Card CVC" name="cardCvc" type="text" mask="999" register={register} error={errors.cardCvc} />
          </div>
          <div className="checkout-form__row">
            <Link href="/">
              <a className="checkout-form__link">
                <ArrowLeft size={16} />
                Return to shop
              </a>
            </Link>
            <Button type="submit">Complete the order</Button>
          </div>
        </div>
      </form>
      <Modal isOpen={!!formData}
            onRequestClose={() => {
              router.push('/');
            }}
            onAfterClose={() => {
              resetCartState();
            }}
            className="modal"
            overlayClassName="modal__overlay" >
        { formData && <Purchased firstName={formData.firstName} /> }
      </Modal>
    </>
  );
};

export default React.memo(CheckoutForm);