google sample:
1. client1 accesses root '/''
2. server add client1's user name
3. server generate template page, send back to client1.
4. client1 js init, use socket to open channel connecting to server
5. server '/_ah/channel/connected' handler triggered, set client1's user_connected = true
6. client1 js callback onChannelOpened is called and start as callee to process old offer/msg in cache
7. when client1 receives offer, it'll create p2p connection, add it's stream. set connection.description with info from that offer. then create connection.answer with self's description and send it to server, in a HTTPRequest with Post and path '/message?r=roomKey&u=userName'
8. in the same time, client1's pc.onaddstream triggered, then display it's local and remote stream in video div
9. server receives callee's offer, finds out there are other_user, then finds out other_user is connected, send offer message to that user(client2) thru channel.


1. client2 accesses root '/''
2. server add client2's user name
3. server generate template page, send back to client2.
4. client2 js init, use socket to open channel connecting to server
5. server '/_ah/channel/connected' handler triggered, set client2's user_connected = true
6. client2 js callback onChannelOpened is called and start as caller to create p2p connection, add it's stream and create offer with self's descriptor and send to server, in a HTTPRequest with Post and path '/message?r=roomKey&u=userName'
8. server receive caller's offer, finds out there are other_user, then finds out other_user is connected, send offer message to that user(client1) thru channel.
9. when client2 receives offer, it do nothing. in the same time, client2's pc.onaddstream triggered, then display it's local and remote stream in video div










my loby modification: