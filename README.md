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
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**



  ```$.ajax({
            url: "/api/classes",
            dataType: "json",
            type : "GET",
            success : function(r) {
              console.log(r);
            }
     });
    ```
