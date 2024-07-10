from json import dumps
from ..services.gameplay_service import *
from flask import Blueprint, Response, jsonify, render_template, session, request
from flask_socketio import emit, join_room, disconnect, leave_room
from backend.app import socketio, app
from random import randint
import uuid
from ..services.match_service import MatchService
from ..services.user_service import UserService
match_service = MatchService
user_service = UserService
from bson.objectid import ObjectId
# def generate_random_pseudo():
#     adjectives = [
#         'Brave', 'Clever', 'Witty', 'Happy', 'Lucky', 'Swift', 'Bright', 'Wise', 'Fierce', 'Gentle'
#     ]
#     nouns = [
#         'Lion', 'Tiger', 'Eagle', 'Hawk', 'Wolf', 'Fox', 'Bear', 'Shark', 'Panther', 'Dragon'
#     ]
    
#     # Select a random adjective and noun
#     adjective = random.choice(adjectives)
#     noun = random.choice(nouns)
    
#     # Optionally add a random number or special character
#     number = str(random.randint(1, 99))  # Adds a number between 1 and 99
#     special_char = random.choice(string.punctuation)  # Adds a random special character
    
#     # Combine parts to create the pseudo
#     pseudo = f"{adjective}{noun}{number}{special_char}"
    
#     return pseudo

activeGamingRooms = []
connectedToPortalUsers = []
 
@app.route("/api/gameplay", methods=["GET"])
def index():
    return render_template('index.html')

@socketio.event
def connect(auth):
    global connectedToPortalUsers
    user_id = request.args.get('id')
    if not user_id or not ObjectId.is_valid(user_id):
        emit('error', 'Invalid user ID')
        disconnect()
        return
    user, status_code = user_service.find_user_by_id(user_id)
    player = Player(request.sid, user['_id'], user['pseudo'])
    connectedToPortalUsers.append(player)
    emit('connection-established', 'go', to=request.sid)
    return jsonify(logged_in_as=user_id), status_code
    

@socketio.on('check-game-room')
def checkGameRoom():
    global onlineClients
    global connectedToPortalUsers
    global activeGamingRooms
    # pseudo = generate_random_pseudo()
    userIdx = getPlayerIdx(connectedToPortalUsers, request.sid)
    # if userIdx is not None:
    #     connectedToPortalUsers[userIdx].pseudo = pseudo
    # for room in activeGamingRooms:
    #     if room.roomAvailable():
    #         current_player = getPlayer(request.sid)
    #         inRoom = room.userAlreadyInRoom(current_player.pseudo)
    #         if inRoom:
    #             print("YOU ARE ALREADY IN A ROOM")
    #             # player_sid = room.getPlayerSid()
    #             # print(player_sid)
    #             # request.sid = current_player.set_sid = player_sid
    #             # room.add_player(connectedToPortalUsers[userIdx])
    #             # join_room(room.roomID)
    #             # session['username'] = connectedToPortalUsers[userIdx].pseudo
    #             # session['room'] = room.roomID
    #             return
            
    for room in activeGamingRooms:
        if room.roomAvailable():        
            connectedToPortalUsers[userIdx].gameRoomId = room.roomID
            room.add_player(connectedToPortalUsers[userIdx])
            join_room(room.roomID)
            session['username'] = connectedToPortalUsers[userIdx].pseudo
            session['room'] = room.roomID
            emit('room-assigned', {'roomId': room.roomID}, to=request.sid)
            return
    roomID = str(uuid.uuid4())
    room = GameRoom(roomID)
    connectedToPortalUsers[userIdx].gameRoomId = room.roomID
    room.add_player(connectedToPortalUsers[userIdx])
    print(f"added player with SID : {request.sid}")
    activeGamingRooms.append(room)
    join_room(room.roomID)
    session['username'] = connectedToPortalUsers[userIdx].pseudo
    session['room'] = room.roomID
    emit('room-assigned', {'roomId': room.roomID}, to=request.sid)

@socketio.event
def readyToStart():
    global activeGamingRooms
    
    if 'room' not in session:
        emit('error', {'message': 'Room not found in session'})
        return

    roomIdx = getRoomIdx(activeGamingRooms, session['room'])
    if roomIdx is None:
        emit('error', {'message': 'Room not found'})
        return
    playerId = activeGamingRooms[roomIdx].getPlayerIdx(request.sid)
    onlineClients = activeGamingRooms[roomIdx].getClientsInRoom('byName')
    
    emit('clientId', (playerId, session.get('room')))
    emit('connected-Players', [onlineClients], to=session['room'])
    emit('status', {'clientsNbs': len(onlineClients), 'clientId': request.sid, 'pseudo': activeGamingRooms[roomIdx].get_player_name(playerId)}, to=session['room'])


@socketio.event
def my_broadcast_event(message):
    emit('player message',
         {'data': message['data'], 'sender':message['sender']}, to=session['room'])

@socketio.event
def startGame():
    global activeGamingRooms
    global connectedToPortalUsers
    userIdx = getPlayerIdx(connectedToPortalUsers, request.sid)
    if 'room' not in session:
        emit('error', {'message': 'Room not found in session'})
        return

    roomIdx = getRoomIdx(activeGamingRooms, session['room'])
    if roomIdx is None:
        emit('error', {'message': 'Room not found'})
        return

    connectedToPortalUsers[userIdx].start_game_intention()
    started = activeGamingRooms[roomIdx].get_ready_for_game()

    activePlayer = activeGamingRooms[roomIdx].get_rand_active_player()
    if (started):
        # match, status_code = match_service.create_match({
        #     "room": activeGamingRooms[roomIdx].id,
        #     "score_user1": 0,
        #     "score_user2": 0,
        #     "user_1": connectedToPortalUsers,
        #     "user_2": 
        # })
        emit('start', {'activePlayer':activePlayer, 'started': started, 'pseudo': activeGamingRooms[roomIdx].get_player_name(activePlayer)}, to=session['room'])
    else:
        emit('waiting second player start', to=session['room'])

@socketio.on('turn')
def turn(data):
    global activeGamingRooms
    roomIdx = getRoomIdx(activeGamingRooms, session['room'])

    activePlayer = activeGamingRooms[roomIdx].get_swap_player()


    # global activePlayer
    print('turn by {}: position {}'.format(data['player'], data['pos']))
      
    # ! TODO set the fields
    # notify all clients that turn happend and over the next active id
    emit('turn', {'recentPlayer':data['player'], 'username':session['username'], 'lastPos': data['pos'], 'next':activePlayer}, to=session['room'])

@socketio.on('winner')
def check_winner(data):
    user, status_code = user_service.increments_user_wins(data['winner_id'])
    return Response(response=dumps(user), status=status_code, mimetype="application/json")

@socketio.on('game_status')
def game_status(msg):
    
    # get status for restart game
    global activeGamingRooms
    roomIdx = getRoomIdx(activeGamingRooms, session['room'])
    activeGamingRooms[roomIdx].startRound()
    
    print(msg['status'])
    print(msg['player'])
    
# get key by value from a dict
def getKeybyValue(obj, value):
    key = [k for k, v in obj.items() if v == value]
    return key

# get player's index from all players list
def getPlayerIdx(obj, sid):
    idx = 0
    for player in obj:
        if player.id == sid:
            return idx
        idx +=1

# get room's index from active rooms list
def getRoomIdx(obj, roomName):
    idx = 0
    for room in obj:
        if room.roomID == roomName:
            return idx
        idx +=1

def getPlayer(sid):
    global connectedToPortalUsers
    for player in connectedToPortalUsers:
        if player.id == sid:
            return player
    return None

@socketio.event
def disconnect():
    global activeGamingRooms
    global connectedToPortalUsers
    userIdx = getPlayerIdx(connectedToPortalUsers, request.sid)             # user position in connectedToPortalUsers
    
    if session.get('room') is not None:
    
        roomIdx = getRoomIdx(activeGamingRooms, session['room'])                # active room of the user
        userIdxInRoom = activeGamingRooms[roomIdx].getPlayerIdx(request.sid)    # user index in active room
        
        del activeGamingRooms[roomIdx].onlineClients[userIdxInRoom]             # delete the user from active room

        onlineClients = activeGamingRooms[roomIdx].get_players_nbr()
        print("client with sid: {} disconnected".format(request.sid))

        if onlineClients == 0:
            roomName = activeGamingRooms[roomIdx].roomID
            del activeGamingRooms[roomIdx]
            print ('room: {} closed'.format(roomName))
        else:
            # emit('status', {'clients': onlineClients}, to=session['room'])
            emit('disconnect-status', {'clientsNbs': onlineClients, 'clientId': request.sid, 'pseudo': connectedToPortalUsers[userIdx].pseudo}, to=session['room'])

        del connectedToPortalUsers[userIdx]                                     # delete user from connectedToPortalUsers
