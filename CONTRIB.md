# Basics of templating:

1. `<div th:replace>` and `<div th:fragment>`

    `<div th:replace="path/to/file :: fragmentname" >` is replaced by `<div th:fragment="fragmentname">` in the relative `path/to/file`

2. View Layouts

    Each html file in [src/main/resources/templates](src/main/resources/templates) is a full view for the content of a webpage. The general layout wrapper is in [layout.html](src/main/resources/templates/layout.html) and has a generic template (headers, footers, etc) with a content layout. Essentially,

    `<div layout:fragment="content" id="content">` in [layout.html](src/main/resources/templates/layout.html) is replaced by `<div layout:fragment="content" class="row">` in the other files in [templates](src/main/resources/templates).

3. Relative path to static assets

    For files in the [static folder](src/main/resources/static), inside 'content' blocks refer to it as if the base path is inside the static folder already.

    Eg: for "iiit-logo" href to 'images/iiit-logo' regardless of filepath of edited file.


