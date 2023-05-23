# Installation
- npm i
- To start "npm run server" in terminal


# Infoware_assignment

Api's for Employee's.

# 1.To get all Employees
http://localhost:3000/employees/getall
Method:GET
# 2.To get an Employees
http://localhost:3000/employees/getone/:id
Method:GET

# 3.To create an Employee
http://localhost:3000/employees/create
Method:POST
Body:{
    "name": "Prashant Verma",
    "designation": "Full-stack Web Developer",
    "contacts": [
      {
        "type": "email",
        "value": "talkprashant9@gmail.com"
      },
      {
        "type": "phone",
        "value": "9305633194"
      }
    ]
  }
# 4.To update an Employee by replacing whole existing Employee data using id
http://localhost:3000/employees/update/:id
Method:PUT
Body:{
    "name": "Ankesh Verma",
    "designation": "Web Developer",
    "contacts": [
      {
        "type": "email",
        "value": "ankesh@gmail.com"
      }
    ]
  }
# 5.To update an Employee by modifying existing Employee data by patching it using id
http://localhost:3000/employees/update/:id
Method:PATCH
Body:{
    "name": "Ram charan"
  }

# 6.To delete an Employee by id
http://localhost:3000/employees/update/:id
Method:DELETE
Body:{
    "name": "Ram charan"
  }
