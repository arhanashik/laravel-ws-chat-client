# Chat Land Client

## It's the client app for the chat-land web app

## Description
This is a simple client app for websocket using laravel. 

## Installation
- Clone or download the repo
- Run `composer install` on cmd
- Run `php artisan serve`

## How it works
- In the home page there are two options: Sign up and Start Chatting
- With sigh up new user can be added to the system
- With start chatting a user need to login to the system and then start chat
- Log in process and messaging are handled with websocket client
- After logging in the user can be able to see the previous chat history, active user list and send his/her own message via websocket
- The websocket connections and events are handled with jquery
- MySql database is used for storing data
- If any error occers or the server disconnects the app will show the status
- During the messaging a session-id is maintained
- So, with refreshing the page or logging in again will recreate the session
- With closing the browser or any other event of disconnecting from the server the session will be removed
- During the server running number of connection and online users can be found with an API called status