import React from 'react';
import emailjs from '@emailjs/browser';

import { useForm, FormProvider } from 'react-hook-form';

export const ContactForm = () => {
  const methods = useForm();
  const { handleSubmit, register, formState: { errors } } = methods;

  const serviceId = import.meta.env.VITE_APP_SERVICE_ID;
  const templateId = import.meta.env.VITE_APP_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

  const onSubmit = (data, e) => {
    emailjs.sendForm(serviceId, templateId, e.target, publicKey)
      .then((result) => {
        console.log(result.text);
        e.target.reset();  
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input 
          {...register("user_name", { required: "Nombre es Obligatorio" })} 
          type="text" 
          name="user_name" 
        />
        {errors.user_name && <span>{errors.user_name.message}</span>}

        <label>Email</label>
        <input 
          {...register("user_email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "Formato de email invalido"
            }
          })} 
          type="text" 
          name="user_email" 
        />
        {errors.user_email && <span>{errors.user_email.message}</span>}

        <label>Mensaje</label>
        <textarea 
          {...register("message", { 
            required: "El mensaje es obligatorio",
            minLength: {
              value: 30,
              message: "El mensaje debe tener al menos 30 caracteres"
            },
            maxLength: {
              value: 500,
              message: "El mensaje no debe superar los 500 caracteres"
            }
          })} 
          name="message" 
        />
        {errors.message && <span>{errors.message.message}</span>}
        
        <input type="submit" value="Send" />
      </form>
    </FormProvider>
  );
};
