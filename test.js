const copyObjectDeep = require("./index.js");

class Person {
  constructor(name) {
    this.name = name;
  }
}

class Pet {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
}

describe("copyObjectDeep function", () => {
  test("원시형 데이터 복사", () => {
    expect(copyObjectDeep(42)).toBe(42);
    expect(copyObjectDeep("hello")).toBe("hello");
    expect(copyObjectDeep(null)).toBe(null);
    expect(copyObjectDeep(undefined)).toBe(undefined);
    expect(copyObjectDeep(true)).toBe(true);
  });

  test("일반 객체 복사(특수 자료형 제외)", () => {
    const obj = {
      a: 1,
      b: {
        c: "this is value c",
        d: {
          e: true,
          f: [1, 2],
        },
      },
    };

    const copiedObj = copyObjectDeep(obj);
    expect(copiedObj).toEqual(obj);
    expect(copiedObj).not.toBe(obj);
    expect(copiedObj.b).not.toBe(obj.b);
    expect(copiedObj.b.d).not.toBe(obj.b.d);
    expect(copiedObj.b.d.f).not.toBe(obj.b.d.f);
  });

  test("배열 복사", () => {
    const arr = [1, [2, [3, 4]]];

    const copiedArr = copyObjectDeep(arr);
    expect(copiedArr).toEqual(arr);
    expect(copiedArr).not.toBe(arr);
    expect(copiedArr[1]).not.toBe(arr[1]);
    expect(copiedArr[1][1]).not.toBe(arr[1][1]);
  });

  test("Map", () => {
    const map = new Map([
      ["key1", "value1"],
      ["key2", new Map([["nestedKey", "nestedValue"]])],
    ]);

    const copiedMap = copyObjectDeep(map);
    expect(copiedMap).toEqual(map);
    expect(copiedMap).not.toBe(map);
    expect(copiedMap.get("key2")).not.toBe(map.get("key2"));
  });

  test("Set", () => {
    const set = new Set([1, 2, new Set([3, 4])]);

    const copiedSet = copyObjectDeep(set);
    expect(copiedSet).toEqual(set);
    expect(copiedSet).not.toBe(set);
    const originalNestedSet = Array.from(set)[2];
    const copiedNestedSet = Array.from(copiedSet)[2];
    expect(copiedNestedSet).not.toBe(originalNestedSet);
  });

  test("객체, 배열, map, set, 사용자 정의 클래스 혼합 객체", () => {
    const mixed = {
      num: 1,
      str: "test",
      arr: [1, 2, { nested: "value" }],
      map: new Map([["key1", new Set([1, 2])]]),
      obj: {
        a: null,
        b: {
          c: "hi",
          d: [1, 2],
          e: new Person("Saram"),
        },
      },
      person: new Person("Nayeon"),
      pets: [new Pet("Meow", "cat"), new Pet("Bowwow", "dog")],
    };

    const copiedMixed = copyObjectDeep(mixed);

    expect(copiedMixed).toEqual(mixed);
    expect(copiedMixed).not.toBe(mixed);

    expect(copiedMixed.arr).not.toBe(mixed.arr);
    expect(copiedMixed.arr[2]).not.toBe(mixed.arr[2]);
    expect(copiedMixed.map).not.toBe(mixed.map);
    expect(copiedMixed.map.get("key1")).not.toBe(mixed.map.get("key1"));
    expect(copiedMixed.person).toEqual(mixed.person);
    expect(copiedMixed.person).not.toBe(mixed.person);
    expect(copiedMixed.person instanceof Person).toBe(true);

    expect(copiedMixed.obj.b.e).toEqual(mixed.obj.b.e);
    expect(copiedMixed.obj.b.e).not.toBe(mixed.obj.b.e);

    expect(copiedMixed.pets).toEqual(mixed.pets);
    expect(copiedMixed.pets).not.toBe(mixed.pets);
    copiedMixed.pets.forEach((pet, index) => {
      expect(pet).toEqual(mixed.pets[index]);
      expect(pet).not.toBe(mixed.pets[index]);
      expect(pet instanceof Pet).toBe(true);
    });

    copiedMixed.person.name = "Human";
    copiedMixed.pets[0].name = "Human's pet 1";

    expect(mixed.person.name).toBe("Nayeon");
    expect(mixed.pets[0].name).toBe("Meow");
  });

  test("사용자 정의 클래스 인스턴스 복사", () => {
    const person = new Person("Saram");
    const copiedPerson = copyObjectDeep(person);

    expect(copiedPerson).toEqual(person);
    expect(copiedPerson).not.toBe(person);
    expect(copiedPerson.name).toBe("Saram");
  });

  test("사용자 정의 클래스 인스턴스 복사 후 변경", () => {
    const person = new Person("Saram");
    const copiedPerson = copyObjectDeep(person);

    copiedPerson.name = "John";
    expect(person.name).toBe("Saram");
    expect(copiedPerson.name).toBe("John");
  });
});
