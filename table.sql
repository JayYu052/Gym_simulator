CREATE TABLE Member (
    Member_id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    FitnessGoal VARCHAR(255),
    Health_Metrics VARCHAR(255)
);

CREATE TABLE Membership (
    ID SERIAL PRIMARY KEY,
    Member_id INT NOT NULL,
    Validity DATE NOT NULL,
    FOREIGN KEY (Member_id) REFERENCES Member(Member_id)
);

CREATE TABLE HealthMetrics (
    ID SERIAL PRIMARY KEY,
    Member_id INT NOT NULL,
    Height DECIMAL,
    Weight DECIMAL,
    Fat_rate DECIMAL,
    FOREIGN KEY (Member_id) REFERENCES Member(Member_id)
);

CREATE TABLE Attendance (
    ID SERIAL PRIMARY KEY,
    Member_id INT NOT NULL,
    Date DATE NOT NULL,
    Type VARCHAR(50),
    FOREIGN KEY (Member_id) REFERENCES Member(Member_id)
);

CREATE TABLE Transaction (
    ID SERIAL PRIMARY KEY,
    Member_id INT NOT NULL,
    Amount DECIMAL NOT NULL,
    Date DATE NOT NULL,
    Type VARCHAR(50),
    FOREIGN KEY (Member_id) REFERENCES Member(Member_id)
);

CREATE TABLE Class (
    Class_id SERIAL PRIMARY KEY,
    Trainer_id INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(50),
    Time TIMESTAMP NOT NULL,
    FOREIGN KEY (Trainer_id) REFERENCES Trainer(ID)
);

CREATE TABLE Trainer (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Specialization VARCHAR(100)
);

CREATE TABLE Booking (
    Booking_id SERIAL PRIMARY KEY,
    Member_id INT NOT NULL,
    Class_id INT NOT NULL,
    Time TIMESTAMP NOT NULL,
    FOREIGN KEY (Member_id) REFERENCES Member(Member_id),
    FOREIGN KEY (Class_id) REFERENCES Class(Class_id)
);

CREATE TABLE Manager (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE Equipment_use (
    ID SERIAL PRIMARY KEY,
    Equipment_id INT NOT NULL,
    Manager_id INT NOT NULL,
    Level VARCHAR(50),
    Last_check DATE,
    Last_main DATE,
    FOREIGN KEY (Equipment_id) REFERENCES Equipment(ID),
    FOREIGN KEY (Manager_id) REFERENCES Manager(ID)
);

CREATE TABLE Equipment (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    PurchaseDate DATE NOT NULL
);