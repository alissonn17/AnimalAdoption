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
 * Enhanced Contact Form Component with React Hook Form + Zod validation
 * Features: Real-time validation, API integration, loading states, success/error feedback
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

  const getFieldValidationState = (fieldName: keyof ContactFormData) => {
    const hasError = errors[fieldName];
    const isDirty = dirtyFields[fieldName];
    const fieldValue = watchedFields[fieldName];
    const hasValue = fieldValue && fieldValue.toString().length > 0;

    if (hasError && isDirty) return "error";
    if (!hasError && isDirty && hasValue) return "success";
    return "default";
  };

  const getFieldIcon = (fieldName: keyof ContactFormData) => {
    const state = getFieldValidationState(fieldName);
    if (state === "error")
      return <FiAlertCircle className="h-4 w-4 text-red-500" />;
    if (state === "success")
      return <FiCheck className="h-4 w-4 text-green-500" />;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-full">
            <FiMessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Entre em Contato</h2>
            <p className="text-purple-100">Adoraríamos ouvir de você!</p>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="m-6 mb-0 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center space-x-3">
            <FiCheck className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="text-sm font-medium text-green-800">
                Mensagem enviada com sucesso!
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Obrigado pelo contato. Responderemos em breve!
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="m-6 mb-0 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center space-x-3">
            <FiAlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Erro ao enviar mensagem
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Tente novamente ou entre em contato por telefone.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            Nome Completo *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Seu nome completo"
              className={`pl-10 pr-10 ${
                getFieldValidationState("name") === "error"
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : getFieldValidationState("name") === "success"
                  ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                  : ""
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {getFieldIcon("name")}
            </div>
          </div>
          {errors.name && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={`pl-10 pr-10 ${
                getFieldValidationState("email") === "error"
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : getFieldValidationState("email") === "success"
                  ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                  : ""
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {getFieldIcon("email")}
            </div>
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700"
          >
            Telefone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiPhone className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              {...register("phone")}
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              className={`pl-10 pr-10 ${
                getFieldValidationState("phone") === "error"
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : getFieldValidationState("phone") === "success"
                  ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                  : ""
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {getFieldIcon("phone")}
            </div>
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errors.phone.message}</span>
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-gray-700"
          >
            Assunto *
          </label>
          <select
            {...register("subject")}
            id="subject"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              getFieldValidationState("subject") === "error"
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : getFieldValidationState("subject") === "success"
                ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Selecione um assunto</option>
            <option value="adocao">Interesse em Adoção</option>
            <option value="voluntariado">Voluntariado</option>
            <option value="doacao">Doações</option>
            <option value="parcerias">Parcerias</option>
            <option value="suporte">Suporte Técnico</option>
            <option value="outros">Outros</option>
          </select>
          {errors.subject && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errors.subject.message}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700"
          >
            Mensagem *
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            placeholder="Conte-nos como podemos ajudar você..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none ${
              getFieldValidationState("message") === "error"
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : getFieldValidationState("message") === "success"
                ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                : "border-gray-300"
            }`}
          />
          {errors.message && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errors.message.message}</span>
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="space-y-2">
          <label className="flex items-start space-x-3">
            <input
              {...register("acceptTerms")}
              type="checkbox"
              className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">
              Aceito os{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 underline"
              >
                termos de uso
              </a>{" "}
              e{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 underline"
              >
                política de privacidade
              </a>{" "}
              *
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <FiAlertCircle className="h-4 w-4" />
              <span>{errors.acceptTerms.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 btn-dog-hover group relative overflow-hidden ${
            !isValid || isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="loading-dog text-lg mr-2">🐕</span>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="dog-emoji text-lg mr-2">📨</span>
                <span>Enviar Mensagem</span>
              </span>
              <span className="group-hover:opacity-0 transition-opacity duration-300 flex items-center space-x-2">
                <FiSend className="h-5 w-5" />
                <span>Enviar Mensagem</span>
              </span>
            </>
          )}
        </Button>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Seus dados estão seguros e não serão compartilhados com terceiros.
          </p>
          <p className="mt-1">
            Tempo de resposta médio:{" "}
            <span className="font-semibold text-purple-600">24 horas</span>
          </p>
        </div>
      </form>
    </div>
  );
}
