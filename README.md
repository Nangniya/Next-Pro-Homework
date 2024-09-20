# 깊은 복사 함수 구현

 ### 커버 범위
 - 원시형 데이터(Symbol 제외)
 - 배열
 - 일반 객체
 - Map
 - Set
 - 사용자 정의 class (간단하게 프로퍼티 1~2개만 할당하는 클래스만 테스트)
```
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
```
![image](https://github.com/user-attachments/assets/48c9b561-5da0-41ac-9977-5867921037c8)

