/* Brand-wide contact details. Change once, propagates everywhere. */
export const WHATSAPP_NUMBER = '919961770673'; // +91 99617 70673
export const WHATSAPP_DISPLAY = '+91 99617 70673';
export const PHONE_NUMBER = '+91 99617 70673';
export const PHONE_NUMBER_2 = '+91 97456 14982';
export const ADDRESS_LINE1 = 'Near Don Bosco School';
export const ADDRESS_LINE2 = 'Kodakara';

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
