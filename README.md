**Schedule Builder Backend RESTful API**
----
  Returns all possible classes in a JSON Array

* **URL**

  /api/classes

* **Method:**

  `GET`


* **Success Response:**
  
  A successful response should send the course Title, Credits, and Subject/Course in a dictionary.

  * **Code:** 200 <br />
    **Content:** `[
                      {
                          "Title": "Principles of Accounting I",
                          "Credits": "3.00",
                          "Class": "ACCT 260"
                      },
                      {
                          "Title": "Principles of Accounting II",
                          "Credits": "3.00",
                          "Class": "ACCT 261"
                      },
                      ...]`

                       ```json
                              [
                                {
                                    "Title": "Principles of Accounting I",
                                    "Credits": "3.00",
                                    "Class": "ACCT 260"
                                },
                                {
                                    "Title": "Principles of Accounting II",
                                    "Credits": "3.00",
                                    "Class": "ACCT 261"
                                },
                                ...]
                          ```


* **Sample Call:**

  ```javascript
        $.ajax({
             url: "/api/classes",
             dataType: "json",
             type : "GET",
             success : function(r) {
               console.log(r);
             }
        });
    ```
