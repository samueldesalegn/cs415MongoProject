# cs415MongoProject

Problem Statement
[Project - Library _1_.pdf](https://github.com/samueldesalegn/cs415MongoProject/files/11823943/Project.-.Library._1_.pdf)


Analyze, Design and Implement Database Solution for 
the City of Fairfield Public Libraries system 
For this Project task, you are required to undertake Requirements Analysis, 
Design and Implementation of suitable database(s) from the problem statement 
given below, for a Library system which you have been tasked to design and 
develop: 
Assume you have been hired by the Department of Public Libraries for the City of 
Fairfield, to update their library record keeping. The department currently owns 
and runs a network of public libraries at three different locations within the city. 
Currently the libraries share an electronic card catalog that contains information 
such as author, title, publisher, description and location of all of the books in the 
libraries. All the library member information and book check-in and checkout 
information, however, is still kept on paper, at each location. This system was 
previously workable, because the Libraries had only a few hundred registered 
members. Due to the increasing city population, the Library now needs to 
automate the check-in/checkout system. The new system will have a web-based 
application to allow librarians to check-in and checkout books. 
The system should also maintain information about each publisher, including their 
head-office address and main telephone number, to enable the libraries order 
new supplies of books. All the books in the library are classified under a subject 
(such as Science, Arts, Medicine, Poetry, Engineering, Music, History etc.), to 
enable members find books that are pertaining to a subject which they are 
interested in. 
All books in the library have a unique bookid, in addition to the book’s unique 
ISBN number. The books in the library are ordered on the shelves by their bookid. 
The new system must allow registered library members to search through the 
electronic card catalog to find the bookid of the desired book. 
The system will either run on a server hosted by the library or hosted in a cloud 
service. Librarians and library members will be able to gain access into and use 
the system through a web-browser interface. However, only librarians are able to 
check-in and checkout books. The system will retain information on all library 
members, including their addresses, phone numbers and their fees payment 
options (in form of the debit or credit card information, to be used to pay any fees 
owed). Only valid identifiable residents of the City of Fairfield can become library 
members. To be registered as a Library member, a valid City of Fairfield-issued 
identification card is required to be presented to the Librarian. Standard members 
can check-out books for a maximum of 21 days. If a standard member returns a 
book later than 21 days, then he/she has to pay an overdue fee of 25 cents per 
day. Member who are staff of the Library, including the Librarians, can also 
checkout books for a maximum of 21 days, but pay an overdue fee of 10 cents per 
day. Members who are senior citizens (i.e. those of age 70 or older) can checkout 
books for a maximum of 42 days, and they pay only 5 cents per day for every 
book returned late. The system will keep track of the amount of money that each 
library member owes the library. No member will be able to checkout a book if 
they have another book overdue or owe a fee greater than 100 cents.
Tasks: 
1. Analyze the Database requirements from the above Problem statement and 
create a Conceptual database model.
2. Implement your design on either (or both) an SQL Database
(RDBMS e.g. MySQL) or NoSQL Database (e.g. MongoDB))
3. Develop a Nodejs/java application where End User can do these following 
tasks.
a. Add,Update,Remove Members 
b. Search Members by name/phone
c. Add Book
d. Search and Sort books by Author /category/book name
e. Check out Books
f. Check in Books
g. Show the list of books that are checked out
h. Show the list of books borrowed by member.
i. Show the members that are in overdue list and the books they borrowed
j. Show the amount of overdue to be paid by members


