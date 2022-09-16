using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _BotUser;

        public ChatHub()
        {
            _BotUser = "MyChat Bot";
        }
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage",_BotUser, $"{userConnection.User} has joined {userConnection.Room}");
        }
    }
}
