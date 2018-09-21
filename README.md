# Socket Chat for HAPI with Mongo

This project can be used for chatting applications, using sockets as the channel of communication between two users. The applications is based upon HAPI framework of Node.JS and uses JWT for authentication.
And is coupled with MongoDB to save the messages. This setup, currently, can only be used for textual communication or sending bookings, sessions etc. for business applications between two stakeholders of the same type.


### To run the application:

1. Setup Node.JS and MongoDB on the system.
2. Clone the project.
3. Install PM2 from npm globally on the system.
4. Open terminal, goto project base folder and execute the following the command:

    NODE_ENV=dev pm2 start server.js --name "socket_chat"

    The project can also be run using NGINX. Do remember to change config environment constants to PROCESS.ENV and add the all the constants in config to your system environment variables.


### Tags to emit data to server:

1. `auth`:  To change user status to online. Send the following JSON alonwith the tag -

                {
                    "token": "JWT_ACCESS_TOKEN"
                }

2. `sendMessage`: To send message to another user. Send the following JSON alonwith the tag -

                {
                    sender: "SENDER_USER_ID",
                    userId: "RECEIVER_USER_ID",
                    message: "TEXT_MESSAGE",
                    booking: "BOOKING_ID"   // if any
                }

3. `checkOnline` : Check whether a user is online or not. Send the following JSON along with the tag -

                {
                    userId: 'USERID_CHECK_ONLINE'
                }

4. `disconnectSock`: To go offline as soon as the user exits application. Send the following JSON alonwith the tag -

                {
                    user: "USER_ID_OFFLINE"
                }



### Tags to listen, to receive data from server:


1. `messageFromServer`: To check user connection status with the server.

2. `newMessage`: New message has been received from a user.

3. `messageSent`: Whether a message is sent to the user.

4. `isOnline` : Update on checkOnline tag.




This application sends the FCM push notifications along with the messages and saves the messages in the DB before emitting them to the user.



### Upcoming Features

1. Chat APIs for users
2. Sending Media Files along with Text
3. VoIP Pushes for sent messages