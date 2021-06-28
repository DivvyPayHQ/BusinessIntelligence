import React from 'react';
import { get } from 'lodash';

/**
 * Genreate a callback to render a component.
 *
 * @param {object} params - Parameters
 * @param {any} params.Component - React Component.
 * @param {boolean} params.shouldSpreadItem - Whether or not the item prop should be spread
 *
 * @returns {Function} callback - Callback to render a component.
 */
export function generateComponent({ Component, shouldSpreadItem, ...props }) {
  return (params) => {
    const { index, item, separators } = params;

    if (shouldSpreadItem) {
      return <Component {...item} index={index} separators={separators} {...props} />;
    }

    return <Component {...params} {...props}/>;
  };
}

/**
 * Generate a key extractor callback.
 *
 * @param {object} params - Parameters
 * @param {string} params.key - Dot notated key to extract the key value
 *
 * @returns {Function} callback - Key extractor callback.
 */
export function generateKeyExtractor({ key }) {
  return (item) => `${get(item, key || 'id', null)}`;
}
