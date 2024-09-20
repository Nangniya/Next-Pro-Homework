const copyObjectDeep = (target) => {
  if (target === null || typeof target !== "object") {
    if (typeof target === "function") {
      // 함수 복사
      return function (...args) {
        return target.apply(this, args);
      };
    }
    return target;
  }

  // 배열
  if (Array.isArray(target)) {
    return target.map((item) => copyObjectDeep(item));
  }

  // Map
  if (target instanceof Map) {
    const result = new Map();
    target.forEach((value, key) => {
      result.set(copyObjectDeep(key), copyObjectDeep(value));
    });
    return result;
  }

  // Set
  if (target instanceof Set) {
    const result = new Set();
    target.forEach((value) => {
      result.add(copyObjectDeep(value));
    });
    return result;
  }

  // 사용자 정의 클래스 인스턴스 처리
  const prototype = Object.getPrototypeOf(target);
  const result = Object.create(prototype);

  // 일반 객체
  for (const prop in target) {
    result[prop] = copyObjectDeep(target[prop]);
  }
  return result;
};

module.exports = copyObjectDeep;
