"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactFormSchema, type ContactFormData } from "../lib/validations";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiPhone,
  FiMail,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { apiClient } from "../services/api-integration-enhanced";

/**
 * Modern Contact Form Component with React Hook Form + Zod validation
 * Features: Real-time validation, loading states, success/error feedback, API integration
 */
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange", // Real-time validation
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      acceptTerms: false,
    },
  });

  // Watch form values for dynamic UI
  const watchedFields = watch();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Use the enhanced API integration for contact form
      await apiClient.contact.sendMessage({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });

      setSubmitStatus("success");
      reset(); // Clear form after successful submission

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as (XX) XXXXX-XXXX
    if (digits.length <= 11) {
      return digits
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
    }
    return value;
  };

  const getFieldClassName = (
    fieldName: keyof ContactFormData,
    baseClass: string = ""
  ) => {
    const hasError = errors[fieldName];
    const isDirty = dirtyFields[fieldName];
    const isValid = !hasError && isDirty;

    let classes = `${baseClass} transition-all duration-300 border-2 rounded-xl px-4 py-3 `;

    if (hasError) {
      classes +=
        "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200";
    } else if (isValid) {
      classes +=
        "border-green-300 bg-green-50 focus:border-green-500 focus:ring-green-200";
    } else {
      classes +=
        "border-gray-300 bg-white focus:border-purple-500 focus:ring-purple-200";
    }

    return classes;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Entre em Contato Conosco
        </h2>
        <p className="text-gray-600 text-lg">
          Tem dúvidas sobre adoção? Quer contribuir? Estamos aqui para ajudar!
        </p>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center space-x-3 animate-fade-in">
          <FiCheck className="text-green-600 h-6 w-6 flex-shrink-0" />
          <div>
            <h4 className="text-green-800 font-semibold">
              Mensagem enviada com sucesso!
            </h4>
            <p className="text-green-700">Retornaremos o contato em breve.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center space-x-3 animate-fade-in">
          <FiAlertCircle className="text-red-600 h-6 w-6 flex-shrink-0" />
          <div>
            <h4 className="text-red-800 font-semibold">
              Erro ao enviar mensagem
            </h4>
            <p className="text-red-700">
              Tente novamente ou entre em contato por telefone.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex text-sm font-semibold text-gray-700 items-center space-x-2"
            >
              <FiUser className="h-4 w-4" />
              <span>Nome Completo *</span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              className={getFieldClassName("name")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <FiAlertCircle className="h-4 w-4" />
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex text-sm font-semibold text-gray-700 items-center space-x-2"
            >
              <FiMail className="h-4 w-4" />
              <span>Email *</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={getFieldClassName("email")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <FiAlertCircle className="h-4 w-4" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone and Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="flex text-sm font-semibold text-gray-700 items-center space-x-2"
            >
              <FiPhone className="h-4 w-4" />
              <span>Telefone (opcional)</span>
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              className={getFieldClassName("phone")}
              {...register("phone", {
                onChange: (e) => {
                  e.target.value = formatPhoneNumber(e.target.value);
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <FiAlertCircle className="h-4 w-4" />
                <span>{errors.phone.message}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="flex text-sm font-semibold text-gray-700 items-center space-x-2"
            >
              <FiMessageSquare className="h-4 w-4" />
              <span>Assunto *</span>
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="Como podemos ajudar?"
              className={getFieldClassName("subject")}
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <FiAlertCircle className="h-4 w-4" />
                <span>{errors.subject.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700"
          >
            Mensagem *
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Conte-nos mais sobre seu interesse em adoção, dúvidas sobre o processo, ou como gostaria de contribuir..."
            className={getFieldClassName("message", "w-full resize-none")}
            {...register("message")}
          />
          <div className="flex justify-between items-center">
            {errors.message ? (
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <FiAlertCircle className="h-4 w-4" />
                <span>{errors.message.message}</span>
              </p>
            ) : (
              <span></span>
            )}
            <span className="text-sm text-gray-500">
              {watchedFields.message?.length || 0}/1000 caracteres
            </span>
          </div>
        </div>

        {/* Terms Acceptance */}
        <div className="space-y-2">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              {...register("acceptTerms")}
            />
            <span className="text-sm text-gray-700">
              Aceito os{" "}
              <a
                href="/termos"
                className="text-purple-600 hover:text-purple-800 underline"
              >
                termos de uso
              </a>{" "}
              e concordo que meus dados sejam utilizados para responder esta
              mensagem.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-red-600 text-sm flex items-center space-x-1 ml-8">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errors.acceptTerms.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-4 px-8 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 ${
              isValid && !isSubmitting
                ? "cta-button hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <FiSend className="h-5 w-5" />
                <span>Enviar Mensagem</span>
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Additional Contact Info */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Outras formas de contato
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-purple-50 rounded-xl">
            <FiMail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">Email</p>
            <p className="text-sm text-purple-600">
              contato@animaladoption.com
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <FiPhone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">Telefone</p>
            <p className="text-sm text-blue-600">(11) 3333-4444</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <FiMessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
            <p className="text-sm text-green-600">(11) 99999-8888</p>
          </div>
        </div>
      </div>
    </div>
  );
}
