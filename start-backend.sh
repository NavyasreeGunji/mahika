#!/bin/bash
M2=~/.m2/repository
CLASSES="$(dirname "$0")/backend/target/classes"

CP="$CLASSES"
for jar in spring-core spring-beans spring-context spring-aop spring-expression spring-jcl spring-web spring-webmvc spring-jdbc spring-orm spring-tx spring-context-support spring-aspects; do
  f=$(find $M2 -name "${jar}-6.1.1.jar" 2>/dev/null | grep -v sources | head -1); [ -n "$f" ] && CP="$CP:$f"
done
for jar in spring-data-jpa spring-data-commons spring-boot spring-boot-autoconfigure; do
  f=$(find $M2 -name "${jar}-3.2.0.jar" 2>/dev/null | grep -v sources | head -1); [ -n "$f" ] && CP="$CP:$f"
done
for jar in tomcat-embed-core tomcat-embed-el tomcat-embed-websocket; do
  f=$(find $M2 -name "${jar}-10.1.16.jar" 2>/dev/null | head -1); [ -n "$f" ] && CP="$CP:$f"
done
for jar in jackson-databind jackson-core jackson-annotations jackson-datatype-jdk8 jackson-datatype-jsr310 jackson-module-parameter-names; do
  f=$(find $M2 -name "${jar}-2.15.3.jar" 2>/dev/null | head -1); [ -n "$f" ] && CP="$CP:$f"
done
for f in \
  "$M2/org/slf4j/slf4j-api/2.0.9/slf4j-api-2.0.9.jar" \
  "$M2/ch/qos/logback/logback-classic/1.4.11/logback-classic-1.4.11.jar" \
  "$M2/ch/qos/logback/logback-core/1.4.11/logback-core-1.4.11.jar" \
  "$M2/org/slf4j/jul-to-slf4j/2.0.9/jul-to-slf4j-2.0.9.jar" \
  "$M2/org/apache/logging/log4j/log4j-to-slf4j/2.21.1/log4j-to-slf4j-2.21.1.jar" \
  "$M2/org/postgresql/postgresql/42.6.0/postgresql-42.6.0.jar" \
  "$M2/com/zaxxer/HikariCP/5.0.1/HikariCP-5.0.1.jar" \
  "$M2/org/hibernate/orm/hibernate-core/6.3.1.Final/hibernate-core-6.3.1.Final.jar" \
  "$M2/org/hibernate/common/hibernate-commons-annotations/6.0.6.Final/hibernate-commons-annotations-6.0.6.Final.jar" \
  "$M2/jakarta/persistence/jakarta.persistence-api/3.1.0/jakarta.persistence-api-3.1.0.jar" \
  "$M2/jakarta/transaction/jakarta.transaction-api/2.0.1/jakarta.transaction-api-2.0.1.jar" \
  "$M2/jakarta/annotation/jakarta.annotation-api/2.1.1/jakarta.annotation-api-2.1.1.jar" \
  "$M2/jakarta/validation/jakarta.validation-api/3.0.2/jakarta.validation-api-3.0.2.jar" \
  "$M2/jakarta/activation/jakarta.activation-api/2.1.2/jakarta.activation-api-2.1.2.jar" \
  "$M2/jakarta/xml/bind/jakarta.xml.bind-api/4.0.1/jakarta.xml.bind-api-4.0.1.jar" \
  "$M2/org/antlr/antlr4-runtime/4.10.1/antlr4-runtime-4.10.1.jar" \
  "$M2/net/bytebuddy/byte-buddy/1.14.10/byte-buddy-1.14.10.jar" \
  "$M2/org/jboss/logging/jboss-logging/3.5.3.Final/jboss-logging-3.5.3.Final.jar" \
  "$M2/com/fasterxml/classmate/1.6.0/classmate-1.6.0.jar" \
  "$M2/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar" \
  "$M2/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar" \
  "$M2/org/yaml/snakeyaml/2.2/snakeyaml-2.2.jar" \
  "$M2/org/springframework/spring-context-support/6.1.1/spring-context-support-6.1.1.jar" \
  "$M2/org/eclipse/angus/jakarta.mail/2.0.2/jakarta.mail-2.0.2.jar" \
  "$M2/org/eclipse/angus/angus-activation/2.0.1/angus-activation-2.0.1.jar"; do
  [ -f "$f" ] && CP="$CP:$f"
done

echo "Starting Mahika backend on http://localhost:8080 ..."
java -cp "$CP" com.shopping.ShoppingApplication
