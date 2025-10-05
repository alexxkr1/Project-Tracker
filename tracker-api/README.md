# Read Me First
The following was discovered as part of building this project:

* The original package name 'com.demo.tracker-api' is invalid and this project uses 'com.demo.tracker_api' instead.

# Getting Started

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.5.6/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.5.6/maven-plugin/build-image.html)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.


# IntelliJ Setup

1. Open the project in **IntelliJ IDEA**.
2. Make sure **Maven** is enabled for the project. IntelliJ should detect `pom.xml` automatically.
3. Build the project using Maven:
    ```bash
    ./mvnw clean install      # MacOS
    mvnw.cmd clean install    # Windows
    ```
4. Create a Run Configuration:
    - Go to **Run -> Edit Configurations -> + -> Application**.
    - Name it `TrackerApiApplication`.
    - Select the main class: `com.demo.tracker_api.TrackerApiApplication`.
    - Apply and Save.


# Application Properties

Update `src/main/resources/application.properties` with your environment values:

```properties
spring.application.name=tracker-api
server.port=7070

spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```