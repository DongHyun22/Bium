
# "실전!스프링부트와 JPA 활용 1" 강의 필기 정리
- JPA에 대해 개인적으로 공부한 부분을 정리 
---

- spring boot devtools 라이브러리를 추가하면 html 파일을 컴파일만 해주면 서버 재시작 없이 View 파일 변경이 가능하다

### JPA와 DB설정, 동작 확인

- @Test와 @Transactional을 이용해 test를 진행함

테스트에서는 @Transactional에서 roll back을 진행함

- 테스트의 then부분에서 `Assertions.assertThat(findMember.getID()).isEqualTo(member.getID());`

→ isEqualTo 값이 똑같은지 나타내는 함수

### 엔티티 클래스 개발1

- 실무에서는 가급적 Getter는 열어두고, Setter는 꼭 필요한 경우에만 사용하는 것을 추천

- Embedded나 Embeddable 둘중에 하나만 써도 됨!
- jpa **내장 타입** : @Embedded, @Embeddable


**상속 어노테이션**

`@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`

`@DiscriminatorValue`

Enum타입에서는 아래의 어노테이션을 넣어야함

- `@Enumerated(EnumType.String)`

### 엔티티 클래스 개발2

**다대다 관계 @ManyToMany**

- 일대다 관계, 일대일 관계와 달리 `@JoinTable` 어노테이션이 필요함

- 한 테이블에 다대다 관계 일다 다 관계, 다대다 관계가 연결됨


**엔티티 클래스 개발**

- 엔티티를 변경할 때는 Setter 대신에 변경 지점이 명확하도록 변경을 위한 비즈니스 메서드를 별도로 제공해야 한다
- 실무에서는 @ManyToMany를 사용하지 말자
    - 중간테이블에 컬럼을 추가할 수 없고, 세밀하게 쿼리를 실행하기 어렵기 때문에 실무에서 사용하기에는 한계가 있다. 중간 엔티티를 만들고 @ManyToOne, @OnetoMany로 매핑해서 사용하자
    - 즉, 다대다 매핑을 일대다, 다대일 매핑으로 풀어서 사용하자
- Setter를 제거하고, 생성자에서 값을 모두 초기화해서 변경 불가능한 클래스를 만들자
- JPA 스펙상 엔티티나 임베디드 타입은 자바 기본 생성자를 public 또는 protected로 설정해야 한다.
    - public으로 두는 것 보다는 protected로 설정하는 것이 그나마 더 안전하다
    - JPA가 이런 제약을 두는 이유는 JPA 구현 라이브러리가 객체를 생성할 때 리플렉션 같은 기술을 사용할 수 있도록 지원해야 하기 때문이다.
  
    

### 엔티티 설계시 주의점

1. 엔티티에는 가급적 Setter를 사용하지말자
    
    → 유지 보수가 어렵다
    
2. **모든 연관관계는 지연 로딩으로 설정!!!**
    - 즉시로딩(EAGER) 는 예측이 어렵고 어떤 SQL이 실행될 지 추적하기 어렵다
    - JPQL 실행시 N+1문제 발생함
    - 지연로딩 (LAZY)로 설정해야함
    - OneToMany, ManyToOne은 기본이 EAGER이다. 그래서 일부러 LAZY로 해야함
        
        `@ManyToOne(fetch = FetchType.LAZY)`
        
3. 컬렉션은 필드에서 초기화하자
    - null 문제에서 안전하다
        - 아래처럼 생성시에만 초기화 하고 건들지 말자!
     
        
4. 테이블, 컬럼명 생성 전략
    - 스프링 부트에서 하이버네이트 기본 매핑 전략을 변경해서 실제 테이블 필드명은 다름
        
        
5. 연관관계 메서드

### 구현 요구사항

### 애플리케이션 아키텍처


**계층형 구조 사용**

- controller, web : 웹 계층
- service : 비즈니스 로직, 트랜잭션 처리
- repository : JPA를 직접 사용하는 계층, 엔티티 매니저 사용
- domain : 엔티티가 모여있는 계층, 모든 계층에서 사용
