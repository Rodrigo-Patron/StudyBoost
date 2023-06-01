# StudyBoost - Course Final Project

1. User Profiles: We will need to create user profiles for students and teachers that allow them to manage their personal information and view their appointment history.

Model:

Student schema:
studentId -- string -- unique identifier for the user
name -- string -- user's full name
email -- string -- user's email address
password -- string -- user's hashed password
appointment -- [relation appointment schema]

Teacher schema:
teacherId -- string -- unique identifier for the user
name -- string -- user's full name
email -- string -- user's email address
password -- string -- user's hashed password
availability -- Date
appointments [relation appointment schema]

2. User Validation: Express Validator

3. User Authentication: we will need to create a user authentication system that allows students and teachers to create accounts and log in. We can use JWT.

4. Calendar Integration: we will need to integrate a calendar system that allows teachers to manage their availability and allows students to view their schedules and book appointments. 

5. Appointment Booking: we will need to create a booking system that allows students to book appointments with their teachers. 




