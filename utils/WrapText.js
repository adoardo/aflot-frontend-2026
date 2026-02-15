// utils/text.js

/**
 * Обрезает строку до указанной длины и добавляет в конец '...'
 * @param {String} text Текст для обрезки
 * @param {Number} maxLength Максимальная длина текста
 * @returns {String} Обрезанный текст
 */
export function truncateText(text, maxLength = 273) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
