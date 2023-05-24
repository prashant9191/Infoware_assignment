# Installation
- downlode and unzip 
- add .env file add these  mysqluserName='yourmySqlusername'; mysqlPassword='yourMyslPassword';
- npm i
- To start "npm run server" in terminal


# Infoware_assignment

Api's for Employee's.

# 1.To get all Employees with limit and pagination (default page=1, limit=10)
- http://localhost:3000/employees/getall
- Method:GET
- or 
- http://localhost:3000/employees/getall?page=1&limit=1
- Method:GET
# 2.To get an Employees
- http://localhost:3000/employees/getone/:id
- Method:GET

# 3.To create an Employee
- http://localhost:3000/employees/create
- Method:POST
- Body:{
    "name": "Ankesh Kumar",
    "jobtitle": "HR",
    "address":"Kanpur Uttar Pradesh",
    "contacts": [
      {
        "category":"Primary Emergency Contact",
        "type": "email",
        "value": "ankesh@gmail.com"
      },
      {
         "category":"Secondary Emergency Contact",
        "type": "phone",
        "value": "9305633194"
      }
    ]
  }
# 4.To update an Employee by replacing whole existing Employee data using id
- http://localhost:3000/employees/update/:id
- Method:PUT
- Body:{
    "name": "Ankesh shah",
    "jobtitle":"software developer",
    "address":"delhi",
    "contacts": [
      {
        "category":"Primary Emergency Contact",
        "type": "email",
        "value": "ankesh.verma123@gmail.com"
      }
    ]
  }
# 5.To update an Employee by modifying existing Employee data by patching it using id
- http://localhost:3000/employees/update/:id
- Method:PATCH
- Body:{
    "name": "Ram charan"
  }

# 6.To delete an Employee by id
- http://localhost:3000/employees/update/:id
- Method:DELETE
