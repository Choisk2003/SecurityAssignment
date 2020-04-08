# EJS (Embedded JavaScript)

---

### 자바스크립트가 내장된 html 파일을 말함

## <% %> 태그

---

### 예

```ejs
<html>
    <head>
        <title>EJS</title>
    </head>
    <body>
        <% for(let i = 0; i < 3; i++) { %>
        	<h1>안녕하세요!</h1>
        <% } %>
    </body>
</html>
```

## <%= %> 태그

---

**태그 안의 변수 값을 코드처럼 옮겨준다**

### 예

```ejs
<html>
    <head>
        <title>EJS</title>
    </head>
    <body>
        <% for(let i = 0; i < 3; i++) { %>
        	<h1><%= i + 1 %>번째</h1>
        <% } %>
    </body>
</html>
```

##### ※ <%= %> 태그 안의 값은 문자열이나 숫자이든 코드로 옮겨진다.

### 예

```ejs
<script>
    var test = <% = "test1"%>
</script>
```

이 예시에서 2번째 줄은 test 변수에 test1이라는 변수를 저장하라는 코드를 뜻한다.

**문자열 형식으로 나타내야 할 때는 "<%= %>" 처럼 사용해야 한다.**

```ejs
"<%= "test1"%>"
```
