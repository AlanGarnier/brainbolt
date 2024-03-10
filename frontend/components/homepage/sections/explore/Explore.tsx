import React from "react";
import Section from "@/components/Section";
import Image from "next/image";
import {
  ExploreSubtitle,
  ExploreTitle,
  FriendsTitle,
  FriendsText,
  ChatTitle,
  ChatText,
} from "@/components/CustomTexts";

const Explore = () => {
  return (
    <Section>
      <div className="flex flex-col lg:flex-row lg:space-x-6 lg:items-center">
        <div className="flex flex-col justify-center lg:w-1/2">
          <ExploreSubtitle>Lorem ipsum</ExploreSubtitle>

          <ExploreTitle>
            Lorem ipsum dolor sit amet consectetur. Euismod nam
          </ExploreTitle>

          <div className="flex mt-4">
            <div className="flex flex-col w-48 mr-12">
              <Image
                src="/assets/img/icone-friends.png"
                alt="Friends Icone"
                width={70}
                height={140}
              />
              <FriendsTitle>Lorem ipsum</FriendsTitle>
              <FriendsText>
                Lorem ipsum dolor sit amet consectetur augue egestas varius
              </FriendsText>
            </div>

            <div className="flex flex-col w-48">
              <Image
                src="/assets/img/icone-chat.png"
                alt="Chat Icone"
                width={70}
                height={140}
              />
              <ChatTitle>Lorem ipsum</ChatTitle>
              <ChatText>
                Lorem ipsum dolor sit amet consectetur augue egestas varius{" "}
              </ChatText>
            </div>
          </div>
        </div>

        <div className="flex-none lg:flex-grow lg:w-1/2">
          <Image
            src="/assets/img/image-a-definir.png"
            alt="Image a definir"
            width={800}
            height={1600}
          />
        </div>
      </div>
    </Section>
  );
};

export default Explore;
