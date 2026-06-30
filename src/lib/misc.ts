import _ from 'lodash';

export function safeGetValue<T = unknown>(obj?: unknown, path?: string) {
  if (!obj || !path) {
    return null;
  }

  return _.get(obj, path) as T;
}
