# Book Hub

This is an app that helps you manage your books and explore new books , add them to your favourites , review them and much more

# Set Up

To test the application on your machine follow the following steps

- You should have node installed in your machine
- clone the repository by running the command 
```bash
git clone 
```
- navigate to the repository where you cloned the repository and ```bash run npm init -y```
- now run the command```bash npm i ```
- after this make a .env file and set the following variables
```bash
BookHubAPIKEY="YOUR_Google_Books API_KEY"
mongoDbConnectionString="mongoDb connection URl"s
BookHubPort=8080
BookHubJWTKEY="YOUR_JWT_KEY"
BookHub_App_Password="Your google account app password"

```
- To get the google api key go to https://console.cloud.google.com and create a new project
- search google 