import React from "react";
import { Meteors } from "./ui/meteors";

export function MeteorEffect() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
       {/* Meteor effect */}
       <Meteors number={20} />
    </div>
       
  );
}
