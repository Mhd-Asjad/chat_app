import { useUser } from "@clerk/clerk-expo";
import {Stack , useRouter } from 'expo-router'
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

import ScreenLoading from '../../components/ScreenLoading'

const tokenProvider = async (userId: String) => {
    const response = await fetch('/token',  {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
        
    })
    const data = await response.json();
    return data.token;
}


const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY as string;

const HomeLayout = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [chatClient, setChatClient] = useState<StreamChat>();

  useEffect(() => {
    if (!isSignedIn) {
      router.replace('/sign-in');
    }

    const customProvider = async () => {
      const token = await tokenProvider(user!.id);
      return token;
    };

    const setUpStream = async () => {
      try {
        const chatClient = StreamChat.getInstance(API_KEY);
        const clerkUser = user!;
        const chatUser = {
          id: clerkUser.id,
          name: clerkUser.fullName!,
          image: clerkUser.hasImage ? clerkUser.imageUrl : undefined,
          username: clerkUser.username!,
        };

        if (!chatClient.user) {
          await chatClient.connectUser(chatUser, customProvider);
        }
        setChatClient(chatClient);
      } catch (error) {
        console.error('Error setting up Stream:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) setUpStream();

    return () => {
      if (!isSignedIn) {
        chatClient?.disconnectUser();
      }
    };
  }, [user, chatClient, isSignedIn, router]);
  
  if (loading) return <ScreenLoading />;

  return (
    <OverlayProvider>
      <Chat client={chatClient!}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        <Stack.Screen
          name="(modal)"
          options={{
            presentation: 'modal',
            headerShown: false
          }}
        
        />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
};

export default HomeLayout;
