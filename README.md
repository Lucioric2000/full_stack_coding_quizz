## coding_quizz
Coding quiz for interview

##Installation
The project uses Python 3.8 in an Anaconda virtual environment, and Node.js with the Angular2 package installed
Thus, to start you should install Anaconda and Node.js, along with its package Angular2.
To install the backend naconda virtual environment, you should go to the backend directory, in a shell, and execute
conda create --name coding_quiz_Lucio --file conda_packages.txt

##Execution
To run it, you should open 2 shell sessions in the directory of this repository
In the first shell sesion, you should execute the following commands:
- cd backend
- chmod +x ./bootstrap.bash
- ./bootstrap.bash
In the second shell sesion, you should execute the following commands:
- cd frontend
- ng serve --host <hostname>
where host can be a fully qualified domain name, or localhost

