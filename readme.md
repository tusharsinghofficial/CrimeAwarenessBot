# CrimeAwarenessBot

This is a User Friendly Crime Awareness Bot.

It is the solution for the Problem Statement -27 of HackOut'21.

## RUN IT ON YOUR MACHINE

1. Clone the repo.
2. Navigate to the Server folder and run `npm install` in the bash shell to install the dependencies.
3. Type in `npm run starting` to start the server  as well as the email scripting.

## END POINTS

### `/api/user/register` - Register the user. POST REQUEST

Payload -  
* `name` : Contains the name of the user(Required)
* `email`: Email id of the user(Required)
* `password`: Password of the user.(Password should be 6 letters long)(Required)

Returns - 
Json object - {
    user: - userIdoftheUserCreated
}

### `api/user/login` - Login with the credentials. POST REQUEST

Payload - 
* `email`: The email with which the user registered.
* `password`:The password to login.

Returns - 
String Type - JSON web Token - This has to be added to the headers as `auth-token`:JWT to make requests to private routes.

If for any reason the JWT token is note present or can't be verified then a message `Access Denied` will be sent by the server.

###  `api/chat/postChat` - Post The Chat to the database - POST REQUEST

Payload - 
* `text` : The text of the chat(Required)

Returns - 
A String reponse depending on what was sent by the user.

### `api/chat/getChat` - Gets all the messages for the user from their db. GET REQUEST

Returns- 
Object with all the messages

## MOTIVE

Seeing the recent rise in crimes and people that can't report things anonymously or as they prefer this bot helps them to do so!. 
The user can talk, take a look at their own chats and report a crime with as much detail as they want.

This is Server for the bot, when integrated with the backend it can give a user friendly UI to match it User Friendly Server.

