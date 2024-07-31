# Book Hub

This is an app that helps you manage your books and explore new books , add them to your favourites , review them and much more

# Set Up

To test the application on your machine follow the following steps

- You should have node installed in your machine
- clone the repository by running the command 
```bash
git clone https://github.com/Revant-S/spider-Task2.git
```
- navigate to the repository where you cloned the repository and ```bash run npm init -y```
- now run the command```bash npm i ```
- after this make a .env file and set the following variables
```bash
BookHubAPIKEY="YOUR_Google_Books API_KEY"
mongoDbConnectionString="mongoDb connection URl"
BookHubPort=8080
BookHubJWTKEY="YOUR_JWT_KEY"
BookHub_App_Password="Your google account app password"
```

- To get the google api key go to [this link](https://console.cloud.google.com) and create a new project and enable the google books api.  
- Create the credentials for the api and get the api key and place it in the .env file in  place of "YOUR_Google_Books API_KEY" 
- Get Your google account password after enabling the 2 step verification for your google password.

- replace "Your google account app password" with your google app password. 

- Put the mongoodb connection url in place of "mongoDb connection URl"

- run command ```bash npm start ``` to start the server and everything is set to test
