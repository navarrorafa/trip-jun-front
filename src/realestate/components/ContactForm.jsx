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
   <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4 h-full">
      <div className="flex flex-col space-y-2">
        <label className="font-semibold" htmlFor="user_name">Nombre</label>
        <input 
          {...register("user_name", { required: "Nombre es Obligatorio" })} 
          type="text" 
          name="user_name" 
          className="p-2 border rounded-md"
        />
        {errors.user_name && <span className="text-xs text-red-500">{errors.user_name.message}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold" htmlFor="user_email">Email</label>
        <input 
          {...register("user_email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "Formato de email inválido"
            }
          })} 
          type="text" 
          name="user_email" 
          className="p-2 border rounded-md"
        />
        {errors.user_email && <span className="text-xs text-red-500">{errors.user_email.message}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold" htmlFor="message">Mensaje</label>
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
          className="p-2 border rounded-md"
        />
        {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
      </div>
      
      <input 
        type="submit" 
        value="Enviar" 
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
      />
    </form>
  </FormProvider>
  );
};
