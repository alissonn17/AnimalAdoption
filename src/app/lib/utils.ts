import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes with twMerge
 * Prevents conflicts between Tailwind classes and ensures proper styling
 * 
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to Brazilian format (DD/MM/YYYY)
 * 
 * @param date - Date string or Date object
 * @returns Formatted date string in pt-BR format
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Formats a date string to Brazilian format with time (DD/MM/YYYY HH:MM)
 * 
 * @param date - Date string or Date object
 * @returns Formatted datetime string in pt-BR format
 */
export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase
 * Useful for standardizing animal breed, species, and other text fields
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Calculates the age category based on animal age
 * Useful for filtering and displaying age-appropriate recommendations
 * 
 * @param age - Age in years
 * @returns Age category string
 */
export function getAgeCategory(age: number): string {
  if (age < 1) return 'Filhote';
  if (age <= 3) return 'Jovem';
  if (age <= 7) return 'Adulto';
  return 'Idoso';
}

/**
 * Formats animal information for display
 * Creates a standardized format for showing animal details
 * 
 * @param especie - Animal species
 * @param idade - Animal age
 * @param porte - Animal size
 * @returns Formatted string with animal info
 */
export function formatAnimalInfo(especie: string, idade: number, porte: string): string {
  const especieCapitalized = capitalize(especie);
  const porteCapitalized = capitalize(porte);
  const ageCategory = getAgeCategory(idade);
  
  return `${especieCapitalized} • ${idade} ${idade === 1 ? 'ano' : 'anos'} (${ageCategory}) • ${porteCapitalized}`;
}

/**
 * Generates a URL-friendly slug from a string
 * Useful for creating SEO-friendly URLs for animal pages
 * 
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validates if a string is a valid image URL
 * Checks for common image file extensions
 * 
 * @param url - URL string to validate
 * @returns Boolean indicating if URL is a valid image
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || url.includes('unsplash.com');
  } catch {
    return false;
  }
}
