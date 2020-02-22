# developmentSetup

Created By: Alexis Ortiz Ojeda
Last Edited: Feb 21, 2020 11:32 PM

# Welcome to Development Setup!

If you are reading this you are ready to contribute to c0d3.com!

To begin we will need to set up the code base on your own machine. To do this we will be creating a copy of the **c0d3** GitHub repository which can be found [here](https://github.com/garageScript/c0d3-app).

## Prerequisites

- Have Yarn installed as package manager

## Installation

![developmentSetup/Untitled.png](developmentSetup/Untitled.png)

1. In the screenshot above you will see a button in the top right corner with the text `Fork` which will create a copy of the repository that you will be able to use to experiment.

![developmentSetup/Untitled%201.png](developmentSetup/Untitled%201.png)

- Now that you have forked the repository, you will have a copy in your GitHub account.
- **Notice** in the top left corner of the screenshot above that it states that the repository was forked from garageScript/c0d3-app

1. In the screenshot above you will see a green button with the text "Clone or download" which brings up a menu when clicked.
2. Copy the web URL which will be used to clone the repository.
3. Next, navigate to your terminal where you will run the following command inside the folder you want the repository to be cloned into:

    git clone https://github.com/<your-username>/c0d3-app.git

- Notice the text after `git clone` is the web URL you copied. Make sure the URL contains your username in order to avoid authentication problems when submitting a pull request.

1. After cloning, you will want to change the current directory to the `c0d3-app` folder that was created.

    cd c0d3-app

1. Next, run the command `yarn install` to install all of the dependencies needed to run the app.
- **Note**: We have had students run into problems when using npm as their package manager so please use Yarn to avoid any problems in the following step.

1. Now that all of the dependencies are installed we can run the command `yarn run dev` to start our application locally. You can now navigate to [http://localhost:3000/](http://localhost:3000/login) in your browser and you will see the application.

### You are now all setup on your machine! Keep up the great work and thank you for your contributions 👍