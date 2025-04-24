
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Collaborate() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const { toast } = useToast();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomId.trim()) {
      toast({
        title: "Room ID Required",
        description: "Please enter a valid room ID to join a collaboration session.",
        variant: "destructive",
      });
      return;
    }

    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username to identify yourself in the collaboration.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Collaboration Feature Coming Soon",
      description: "Real-time collaboration is currently under development.",
    });
  };

  const handleCreateRoom = () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username to create a collaboration room.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Collaboration Feature Coming Soon",
      description: "Real-time collaboration is currently under development.",
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container px-4 md:px-6">
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-display font-bold gradient-heading">
                Collaborate in Real-time
              </h1>
              <p className="text-xl text-muted-foreground">
                Join or create a collaborative analysis room to work with others on data science projects
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Join Existing Room</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter a room ID and your username to join an existing collaborative session
                  </p>
                </div>

                <form onSubmit={handleJoinRoom} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomId">Room ID</Label>
                    <Input 
                      id="roomId" 
                      placeholder="Enter room ID" 
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Your Name</Label>
                    <Input 
                      id="username" 
                      placeholder="Enter your name" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Join Room
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">
                      OR
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Create New Room</h2>
                  <p className="text-sm text-muted-foreground">
                    Start a new collaborative session and invite others to join
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="create-username">Your Name</Label>
                  <Input 
                    id="create-username" 
                    placeholder="Enter your name" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleCreateRoom} 
                  variant="outline"
                  className="w-full"
                >
                  Create New Room
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Collaboration Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col items-start space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-data-blue to-data-purple flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium">User Presence</h3>
                    <p className="text-sm text-muted-foreground">
                      See who's currently viewing and working on the same module
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-data-purple to-data-pink flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium">Chat Sidebar</h3>
                    <p className="text-sm text-muted-foreground">
                      Discuss findings and insights with collaborators in real-time
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-data-pink to-data-orange flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium">Annotation Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Highlight interesting data points and add shared comments
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-data-orange to-data-green flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <h3 className="font-medium">Save & Share</h3>
                    <p className="text-sm text-muted-foreground">
                      Save analysis sessions and share them via unique URLs
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
